import React, { Component } from 'react';
import cookies from 'browser-cookies';
import styled from 'styled-components';
import { message } from 'antd';
import { Query, Mutation } from 'react-apollo';
import queryString from 'query-string';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import _mapValues from 'lodash/mapValues';
import { renderCents, renderPrice } from '../../util/paymentUtil';
import {
    GET_USER,
    GET_OFFICE,
    CREATE_OFFICE,
    CREATE_LISTING,
    UPDATE_OFFICE,
} from './queries';
import history from '../../history';
import { Container, Steps, Form, Grid } from '../../components';
import AddOfficeInfo from '../common/Forms/AddOfficeInfo';
import AddOfficeEquipments from '../common/Forms/AddOfficeEquipments';
import AddOfficeListing from '../common/Forms/AddOfficeListing';
import ListingConfirmation from '../common/ListingConfirmation';
import {
    ACTIVE_USER,
    EDIT_OFFICE_MODE,
    ADD_LISTING_MODE,
} from '../../util/strings';

// modes:
//      edit-office
//      add-listing
//      default(host onboarding)

const { GridItem } = Grid;

// to be used to distinguish between each step and to decide when to show previous buttona and what kind of submit buttons
const OFFICE_STEP = 'add-office';
const EQUIPMENT_STEP = 'add-equipment';
const LISTING_STEP = 'add-listing';
const CONFIRMATION_STEP = 'listing-confirmation';

// to be used for next and previous buttons
const HOST_ONBOARDING = '/host-onboarding/';
const OFFICE_STEP_URL = `${HOST_ONBOARDING}${OFFICE_STEP}/`;
const EQUIPMENT_STEP_URL = `${HOST_ONBOARDING}${EQUIPMENT_STEP}/`;
const LISTING_STEP_URL = `${HOST_ONBOARDING}${LISTING_STEP}/`;
const CONFIRMATION_STEP_URL = `${HOST_ONBOARDING}${CONFIRMATION_STEP}/`;

const HOST_PROFILE_URL = '/profile?selectedTab=my_listings';

const EQUIPMENT = 'equipment';
const EQUIPMENT_NAME = `${EQUIPMENT}Name`;
const EQUIPMENT_PRICE = `${EQUIPMENT}Price`;
const StyledContainer = styled(Container)`
    min-height: 100vh;
`;

const AVAILABILITY = 'availability';

const { BackButton, SubmitButton } = Form;

class HostOnboarding extends Component {
    constructor(props) {
        super(props);

        const historyLocationSearch = get(this.props, 'location.search'); // same thing as history.location.search but with less bugs
        const { mode } = queryString.parse(historyLocationSearch);
        // will be used as state variable for disabling submit button when the user has not selected from autocomplete

        let locationSelected;

        switch (mode) {
            case EDIT_OFFICE_MODE:
                // repeat EQUIPMENT_STEP because there is no confirmation page for edit office, this is used for displaying previous buttons
                // TODO: come up with a better way for displaying previous buttons
                this.stepList = [OFFICE_STEP, EQUIPMENT_STEP, EQUIPMENT_STEP];
                // will take the user back to HOST_PROFILE_URL after clicking 'Save Changes'
                this.urlList = [
                    OFFICE_STEP_URL,
                    EQUIPMENT_STEP_URL,
                    HOST_PROFILE_URL,
                ];
                this.headerList = ['', ''];
                this.buttonTexts = ['Next', 'Save Changes'];

                // edit office does not show location
                locationSelected = true;
                break;

            // usual host onboarding
            default:
                this.stepList = [
                    OFFICE_STEP,
                    EQUIPMENT_STEP,
                    LISTING_STEP,
                    CONFIRMATION_STEP,
                ];

                // will take the user back to HOST_PROFILE_URL after clicking 'Done' in CONFIRMATION_STEP
                this.urlList = [
                    OFFICE_STEP_URL,
                    EQUIPMENT_STEP_URL,
                    LISTING_STEP_URL,
                    CONFIRMATION_STEP_URL,
                    HOST_PROFILE_URL,
                ];
                this.buttonTexts = [
                    'Next',
                    'Next',
                    'Publish',
                    'Go to My Listings',
                ];
                this.headerList = [
                    "let's start with some basic info about your office",
                    'Tell us more about your office',
                ];

                locationSelected = false;
        }

        this.state = {
            historyLocationSearch,
            locationSelected,
            imageSelected: false,
            defaultValues: {},
        };
    }

    // this is for url transition, to trigger a render upon URL change
    componentDidUpdate() {
        const { historyLocationSearch } = this.state;
        const currentLocationSearch = get(this.props, 'location.search');

        if (currentLocationSearch !== historyLocationSearch) {
            this.setState({
                historyLocationSearch: currentLocationSearch,
            });
        }
    }

    // mode: host onboarding
    // to be called by OFFICE_STEP, when the user clicks on the first object
    handleLocationSelected = () => {
        this.setState({ locationSelected: true });
    };

    // mode: host onboarding
    // to be called by OFFICE_STEP, when the user clicks on the first object
    handleImageChange = numImage => {
        this.setState({ numImage });
    };

    // given form values and current urlParams, compute next url and add computedParams to url
    advanceStep = (values, urlParams) => {
        const { pathname } = this.props.location;

        const nextIndex = this.urlList.indexOf(pathname) + 1;
        const nextUrl = this.urlList[this.urlList.indexOf(pathname) + 1];

        // when redirecting to profile pages, no query params
        let url = nextUrl;

        // all other times, add query params to url
        if (nextIndex !== this.urlList.length - 1) {
            url = `${nextUrl}?${this.buildUrlParams(
                values,
                urlParams,
                this.officeId
            )}`;
        }

        history.push(url);
    };

    // given values, compute next url and add computedParams to url
    handleBack = values => {
        const { historyLocationSearch } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);

        const { pathname } = this.props.location;
        const nextStep = this.urlList[this.urlList.indexOf(pathname) - 1];
        const url = `${nextStep}?${this.buildUrlParams(values, urlParams)}`;

        history.push(url);
    };

    // values: form values that are submitted
    // id: hostId from link state
    // createOffice: gql mutation function for creating an office
    // updateOffice: gql mutation function for updating an office
    onSubmit = async (values, createOffice, updateOffice, id, client) => {
        // save listing step values to create listings after creating office, in handleOfficeCreated
        this.values = values;
        const { step } = this.props.match.params;
        const { historyLocationSearch } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);
        const { mode } = queryString.parse(historyLocationSearch);

        // due to form value bugs, equipmentNames will not be deleted upon equipment delete. therefore, select all equipment prices form urlParams and find matching equipment names and drop equipment names that do not have a price
        const urlEquipment = Object.keys(urlParams)
            .filter(key => key.startsWith('equipmentPrice'))
            .map(key => ({
                name:
                    urlParams[
                        `${EQUIPMENT_NAME}${key.slice(EQUIPMENT_PRICE.length)}`
                    ],
                price: renderCents(urlParams[key]),
            }));

        // same process as above, but for form values
        const valueEquipment = Object.keys(values)
            .filter(key => key.startsWith('equipmentPrice'))
            .map(key => ({
                name:
                    values[
                        `${EQUIPMENT_NAME}${key.slice(EQUIPMENT_PRICE.length)}`
                    ],
                price: renderCents(values[key]),
            }));

        switch (mode) {
            case EDIT_OFFICE_MODE:
                if (step === EQUIPMENT_STEP) {
                    const { officeId, officeName, imageUrls } = urlParams;
                    const { officeDescription } = values;

                    // makes the api call to submit changes to office
                    updateOffice({
                        variables: {
                            input: {
                                id: officeId,
                                name: officeName,
                                description: officeDescription,
                                imageUrls: JSON.parse(imageUrls),
                                equipment: valueEquipment,
                            },
                        },
                    });
                } else {
                    this.advanceStep(values, urlParams);
                }
                break;

            // usual host onboarding
            default:
                if (step === LISTING_STEP) {
                    const {
                        addressDetail,
                        imageUrls,
                        location,
                        locationLat,
                        locationLong,
                        officeDescription,
                        officeName,
                    } = urlParams;

                    const result = await createOffice({
                        variables: {
                            input: {
                                userId: id,
                                name: officeName,
                                location: {
                                    name: location,
                                    geoPoint: {
                                        lat: locationLat,
                                        lon: locationLong,
                                    },
                                    addressDetails: !isEmpty(addressDetail)
                                        ? addressDetail
                                        : undefined,
                                },
                                imageUrls: JSON.parse(imageUrls),
                                equipment: urlEquipment,
                                description: officeDescription,
                            },
                        },
                    });

                    if (result) {
                        // Need to update the cookie and local cache to populate the dentist id.
                        const user = get(
                            result,
                            'data.createUserOffice.host.user'
                        );
                        cookies.set('user', JSON.stringify(user), {
                            maxAge: 86400000,
                        });

                        client.writeData({
                            data: {
                                activeUser: {
                                    ...user,
                                    __typename: ACTIVE_USER,
                                },
                            },
                        });
                    }

                    // url transition to confirmation page happens in handleListingCreated. skip transition in current function
                } else {
                    this.advanceStep(values, urlParams);
                }
                break;
        }
    };

    // host onboarding
    handleOfficeCreated = (officeId, batchCreateListings) => {
        // save officeId to pass to confirmation step
        this.officeId = officeId;

        // find all properties that start with availability and find matching index data(startTime, endTime, cleaningFee, hourlyChairPrice, numChairs)
        const listings = Object.keys(this.values)
            .filter(key => key.startsWith(AVAILABILITY))
            .map(key => {
                const startTime = this.values[
                    `startTime${key.slice(AVAILABILITY.length)}`
                ];
                const endTime = this.values[
                    `endTime${key.slice(AVAILABILITY.length)}`
                ];
                const cleaningFee = renderCents(
                    this.values[`cleaningFee${key.slice(AVAILABILITY.length)}`]
                );
                const chairHourlyPrice = renderCents(
                    this.values[
                        `hourlyChairPrice${key.slice(AVAILABILITY.length)}`
                    ]
                );
                const numChairsAvailable = this.values[
                    `numChairs${key.slice(AVAILABILITY.length)}`
                ];
                // this.values[key] is availability array
                const startDay = this.values[key][0];
                const endDay = this.values[key][1];

                if (startTime >= endTime) {
                    message.error(
                        'Your daily end time has to be after your daily start time'
                    );
                    return {};
                }

                return {
                    officeId,
                    cleaningFee,
                    chairHourlyPrice,
                    numChairsAvailable,
                    availability: {
                        startTime: startTime
                            .startOf('hour')
                            .format()
                            .split('T')[1],
                        endTime: endTime
                            .startOf('hour')
                            .format()
                            .split('T')[1],
                        startDay: startDay.format().split('T')[0],
                        endDay: endDay.format().split('T')[0],
                    },
                };
            });

        batchCreateListings({
            variables: {
                input: listings,
            },
        });
    };

    buildUrlParams = (values = {}, urlParams = {}, officeId = '') => {
        const { step } = this.props.match.params;
        const { defaultValues } = this.state;

        // drop equipmentNames and equipmentPrices from url params, so that only current equipment values will make up new equipmentNames and equipmentPrices. This is due to deleting feature of equipment. For other pages, since there is no deleting of form items, we can just use urlParams for computedUrlParams
        const urlParamsWithoutEquipment = pick(
            urlParams,
            Object.keys(urlParams).filter(key => !key.startsWith('equipment'))
        );
        // same process for imageUrls deletions
        const urlParamsWithoutImageUrls = pick(
            urlParams,
            Object.keys(urlParams).filter(key => !key.startsWith('imageUrls'))
        );
        let computedUrlParams;
        switch (step) {
            case OFFICE_STEP:
                computedUrlParams = urlParamsWithoutImageUrls;
                break;
            case EQUIPMENT_STEP:
                computedUrlParams = urlParamsWithoutEquipment;
                break;
            default:
                computedUrlParams = urlParams;
        }

        // to address weird bug where equipmentName values are accessble in listing step. this is only for antd Select components
        const valuesWithoutEquipment = pick(
            values,
            Object.keys(values).filter(key => !key.startsWith('equipment'))
        );

        let computedValues;
        switch (step) {
            case OFFICE_STEP:
                computedValues = valuesWithoutEquipment;
                break;
            case LISTING_STEP:
                computedValues = valuesWithoutEquipment;
                break;
            default:
                computedValues = values;
                break;
        }

        // since availability and startTime and endTime are moment objects, need to JSON.stringify
        const dateTime = _mapValues(
            pick(
                values,
                Object.keys(values).filter(
                    key =>
                        key.startsWith(AVAILABILITY) ||
                        key.startsWith('startTime') ||
                        key.startsWith('endTime')
                )
            ),
            JSON.stringify
        );

        // these are from state variables of OFFICE_STEP
        const addOfficeState = get(this, 'addOfficeInfo.state');
        const imageUrls = get(addOfficeState, 'imageUrls');
        const locationLat = get(addOfficeState, 'locationLat');
        const locationLong = get(addOfficeState, 'locationLong');

        const params = queryString.stringify({
            officeId,
            // params from backend data for office for edit office
            ...this.turnOfficeDataIntoParams(defaultValues),
            // state variables from children. imageUrls is an array, and needs to be stringified.
            imageUrls: JSON.stringify(imageUrls),
            locationLat,
            locationLong,
            // url params
            ...computedUrlParams,
            // form values
            ...computedValues,
            ...dateTime,
        });
        return params;
    };

    // save office data to state to trigger render
    handleGetOffice = data => {
        this.setState({ defaultValues: data.getOffice });
    };

    // after receiving existing office data, turn it into urlParams
    turnOfficeDataIntoParams = data => {
        if (isEmpty(data)) {
            return {};
        }

        // going from [{name: "equipmentName", price: $20.00}...] to { equipmentName: 'equipmentName', equipmentPrice: '$20.00' }
        const { equipment, name, location, imageUrls, description } = data;
        const equipmentParams = equipment
            .map((eq, index) => {
                const key = `${EQUIPMENT_NAME}${index}`;
                const price = `${EQUIPMENT_PRICE}${index}`;
                return {
                    [key]: eq.name,
                    [price]: renderPrice(eq.price),
                };
            })
            .reduce((a, b) => ({ ...a, ...b }), {});

        return {
            officeName: name,
            location: location.name,
            locationLat: location.geoPoint.lat,
            locationLong: location.geoPoint.lon,
            imageUrls,
            officeDescription: description,
            ...equipmentParams,
        };
    };

    render() {
        const {
            historyLocationSearch,
            defaultValues,
            locationSelected,
            numImage,
        } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);
        const { location } = this.props;
        const { step } = this.props.match.params;

        // turn urlparams availability and time into parsed, moment objects to pass to add-listing step for initial values
        const availabilities = _mapValues(
            pick(
                urlParams,
                Object.keys(urlParams).filter(key =>
                    key.startsWith(AVAILABILITY)
                )
            ),
            availability => [
                moment(JSON.parse(availability)[0]),
                moment(JSON.parse(availability)[1]),
            ]
        );
        const times = _mapValues(
            pick(
                urlParams,
                Object.keys(urlParams).filter(
                    key =>
                        key.startsWith('startTime') || key.startsWith('endTime')
                )
            ),
            time => moment(JSON.parse(time))
        );

        const initialFormValues = {
            // office data for edit-office mode
            ...this.turnOfficeDataIntoParams(defaultValues),
            ...urlParams,
            ...availabilities,
            ...times,
        };

        const stepCount = this.stepList.indexOf(step);
        const { officeId, mode } = urlParams;

        let submitDisabled;
        let numSteps;
        switch (mode) {
            case EDIT_OFFICE_MODE:
                submitDisabled = !numImage;
                numSteps = 2;
                break;
            // host onboarding
            default:
                submitDisabled = !numImage || locationSelected;
                numSteps = 4;
                break;
        }

        return (
            <Query query={GET_USER}>
                {({ data: userData }) => (
                    <Query
                        query={GET_OFFICE}
                        variables={{ id: officeId }}
                        onCompleted={this.handleGetOffice}
                        fetchPolicy="network-only"
                    >
                        {() => (
                            <Mutation
                                mutation={UPDATE_OFFICE}
                                onCompleted={this.advanceStep}
                            >
                                {updateOffice => (
                                    <Mutation
                                        mutation={CREATE_LISTING}
                                        onCompleted={this.advanceStep}
                                    >
                                        {batchCreateListings => (
                                            <Mutation
                                                mutation={CREATE_OFFICE}
                                                onCompleted={data => {
                                                    this.handleOfficeCreated(
                                                        data.createUserOffice
                                                            .id,
                                                        batchCreateListings
                                                    );
                                                }}
                                            >
                                                {(createOffice, { client }) => (
                                                    <StyledContainer>
                                                        <Form
                                                            onSuccess={values => {
                                                                this.onSubmit(
                                                                    values,
                                                                    createOffice,
                                                                    updateOffice,
                                                                    get(
                                                                        userData,
                                                                        'activeUser.id'
                                                                    ),
                                                                    client
                                                                );
                                                            }}
                                                        >
                                                            <Grid
                                                                gtc="188px 624px 188px"
                                                                gtr="auto 60px"
                                                                gcg="140px"
                                                                grg="100px"
                                                            >
                                                                <Steps
                                                                    mt={210}
                                                                    mb={46}
                                                                    current={
                                                                        stepCount
                                                                    }
                                                                    direction="vertical"
                                                                    size={
                                                                        numSteps
                                                                    }
                                                                />

                                                                <GridItem gc="2 / 4">
                                                                    {step ===
                                                                        OFFICE_STEP && (
                                                                        <AddOfficeInfo
                                                                            ref={value => {
                                                                                this.addOfficeInfo = value;
                                                                            }}
                                                                            locationDisabled={
                                                                                mode ===
                                                                                EDIT_OFFICE_MODE
                                                                            }
                                                                            handleSelect={
                                                                                this
                                                                                    .enableSubmit
                                                                            }
                                                                            firstName={get(
                                                                                userData,
                                                                                'activeUser.firstName'
                                                                            )}
                                                                            lastName={get(
                                                                                userData,
                                                                                'activeUser.lastName'
                                                                            )}
                                                                            onImageChange={
                                                                                this
                                                                                    .handleImageChange
                                                                            }
                                                                            header={
                                                                                this
                                                                                    .headerList[0]
                                                                            }
                                                                            mode={
                                                                                mode
                                                                            }
                                                                            {...initialFormValues}
                                                                        />
                                                                    )}
                                                                    {step ===
                                                                        EQUIPMENT_STEP && (
                                                                        <AddOfficeEquipments
                                                                            header={
                                                                                this
                                                                                    .headerList[1]
                                                                            }
                                                                            {...initialFormValues}
                                                                        />
                                                                    )}
                                                                    {step ===
                                                                        LISTING_STEP && (
                                                                        <AddOfficeListing
                                                                            {...initialFormValues}
                                                                        />
                                                                    )}

                                                                    {step ===
                                                                        CONFIRMATION_STEP && (
                                                                        <ListingConfirmation
                                                                            location={
                                                                                location
                                                                            }
                                                                        />
                                                                    )}
                                                                </GridItem>
                                                                {/* previous button is shown when the user is not on the first page or the last page. using indexOf for edit office */}
                                                                {stepCount !==
                                                                    0 &&
                                                                    this.stepList.indexOf(
                                                                        step
                                                                    ) !==
                                                                        this
                                                                            .stepList
                                                                            .length -
                                                                            1 && (
                                                                        <GridItem gc="1 / 2">
                                                                            <BackButton
                                                                                disabled={
                                                                                    false
                                                                                }
                                                                                onBack={
                                                                                    this
                                                                                        .handleBack
                                                                                }
                                                                                type="primary"
                                                                                ghost
                                                                                width={
                                                                                    188
                                                                                }
                                                                                height={
                                                                                    60
                                                                                }
                                                                                buttonText="Previous"
                                                                            />
                                                                        </GridItem>
                                                                    )}

                                                                <GridItem gc="3 / 4">
                                                                    <SubmitButton
                                                                        disabled={
                                                                            submitDisabled
                                                                        }
                                                                        position="absolute"
                                                                        width={
                                                                            188
                                                                        }
                                                                        height={
                                                                            60
                                                                        }
                                                                        buttonText={
                                                                            this
                                                                                .buttonTexts[
                                                                                stepCount
                                                                            ]
                                                                        }
                                                                    />
                                                                </GridItem>
                                                            </Grid>
                                                        </Form>
                                                    </StyledContainer>
                                                )}
                                            </Mutation>
                                        )}
                                    </Mutation>
                                )}
                            </Mutation>
                        )}
                    </Query>
                )}
            </Query>
        );
    }
}

export default HostOnboarding;
