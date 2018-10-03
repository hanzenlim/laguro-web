import React, { Component } from 'react';
import cookies from 'browser-cookies';
import styled from 'styled-components';
import { Alert, message } from 'antd';

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
import { Container, Steps, Form, Grid, Box, Flex } from '../../components';
import AddOfficeInfo from '../common/Forms/AddOfficeInfo';
import AddOfficeEquipments from '../common/Forms/AddOfficeEquipments';
import AddOfficeListing from '../common/Forms/AddOfficeListing';
import ListingConfirmation from '../common/ListingConfirmation';
import {
    ACTIVE_USER,
    EDIT_OFFICE_MODE,
    ADD_LISTING_MODE,
    HOST_ONBOARDING_CREATE_MODE,
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
const HOST_ONBOARDING_LOCALSTORAGE_KEY = 'host-onboarding-localstorage-key';

const { BackButton, SubmitButton } = Form;

const stepURLs = {
    [OFFICE_STEP]: OFFICE_STEP_URL,
    [EQUIPMENT_STEP]: EQUIPMENT_STEP_URL,
    [LISTING_STEP]: LISTING_STEP_URL,
    [CONFIRMATION_STEP]: CONFIRMATION_STEP_URL,
};

const parseEquipmentFormData = values =>
    Object.keys(values)
        .filter(key => key.startsWith('equipmentPrice'))
        .map(key => ({
            name:
                values[`${EQUIPMENT_NAME}${key.slice(EQUIPMENT_PRICE.length)}`],
            price: renderCents(values[key]),
        }));

const parseListingFormData = values =>
    Object.keys(values)
        .filter(key => key.startsWith(AVAILABILITY))
        .map(key => {
            const startTime =
                values[`startTime${key.slice(AVAILABILITY.length)}`];
            const endTime = values[`endTime${key.slice(AVAILABILITY.length)}`];
            const cleaningFee = renderCents(
                values[`cleaningFee${key.slice(AVAILABILITY.length)}`]
            );
            const chairHourlyPrice = renderCents(
                values[`hourlyChairPrice${key.slice(AVAILABILITY.length)}`]
            );
            const numChairsAvailable =
                values[`numChairs${key.slice(AVAILABILITY.length)}`];
            // this.values[key] is availability array
            const startDay = values[key][0];
            const endDay = values[key][1];

            if (startTime >= endTime) {
                message.error(
                    'Your daily end time has to be after your daily start time'
                );
                return {};
            }

            return {
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

const StyledAlert = styled(Alert)`
    && {
        max-width: 620px;
        position: absolute;
        top: 20px;
        padding-right: 60px;
    }
`;

const RestartText = styled.span`
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
`;

class HostOnboarding extends Component {
    constructor(props) {
        super(props);

        const historyLocationSearch = get(this.props, 'location.search'); // same thing as history.location.search but with less bugs
        const { mode, officeId } = queryString.parse(historyLocationSearch);
        // will be used as state variable for disabling submit button when the user has not selected from autocomplete

        let locationSelected = false;
        let resumeWarning = false;
        let numImage = 0;

        switch (mode) {
            case EDIT_OFFICE_MODE: {
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

                this.mode = EDIT_OFFICE_MODE;
                this.officeId = officeId;

                // edit office does not show location
                locationSelected = true;

                const { step } = this.props.match.params;
                if (step === OFFICE_STEP) {
                    this.destroyWizardState();
                }

                break;
            }
            case ADD_LISTING_MODE:
                this.stepList = [LISTING_STEP, CONFIRMATION_STEP];

                this.urlList = [
                    LISTING_STEP_URL,
                    CONFIRMATION_STEP_URL,
                    HOST_PROFILE_URL,
                ];

                this.buttonTexts = ['Publish', 'Go to My Listings'];
                this.mode = ADD_LISTING_MODE;
                // doesn't need to select location for add listing
                locationSelected = true;
                break;

            // usual host onboarding
            default: {
                this.stepList = [
                    OFFICE_STEP,
                    EQUIPMENT_STEP,
                    LISTING_STEP,
                    CONFIRMATION_STEP,
                ];

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

                this.mode = HOST_ONBOARDING_CREATE_MODE;

                const wizardState = this.fetchWizardState();

                if (wizardState.imageUrls) {
                    numImage = wizardState.imageUrls.length;
                } else {
                    numImage = 0;
                }

                if (!isEmpty(wizardState)) {
                    resumeWarning = true;
                }

                locationSelected = false;
            }
        }

        this.state = {
            historyLocationSearch,
            locationSelected,
            imageSelected: false,
            numImage,
            defaultValues: {},
            resumeWarning,
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
    advanceStep = () => {
        const { step } = this.props.match.params;

        const _currentURL = stepURLs[step];

        const nextIndex = this.urlList.indexOf(_currentURL) + 1;
        const nextURL = this.urlList[nextIndex];

        if (nextIndex === this.urlList.length - 1) {
            this.destroyWizardState();

            return history.push(nextURL);
        }

        return history.push(this.buildNextIntermediateURL(nextURL));
    };

    // given values, compute next url and add computedParams to url
    handleBack = values => {
        const { pathname } = this.props.location;
        const nextStep = this.urlList[this.urlList.indexOf(pathname) - 1];
        const url = this.buildNextIntermediateURL(nextStep);

        history.push(url);
    };

    buildNextIntermediateURL = nextURL => {
        const { historyLocationSearch } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);

        return `${nextURL}?${queryString.stringify(urlParams)}`;
    };

    saveWizardState = state => {
        localStorage.setItem(
            `${this.mode}-${HOST_ONBOARDING_LOCALSTORAGE_KEY}`,
            JSON.stringify(state)
        );
    };

    destroyWizardState = () => {
        localStorage.removeItem(
            `${this.mode}-${HOST_ONBOARDING_LOCALSTORAGE_KEY}`
        );
    };

    fetchWizardState = () => {
        const wizardState = localStorage.getItem(
            `${this.mode}-${HOST_ONBOARDING_LOCALSTORAGE_KEY}`
        );

        return wizardState ? JSON.parse(wizardState) : {};
    };

    // values: form values that are submitted
    // id: hostId from link state
    // createOffice: gql mutation function for creating an office
    // updateOffice: gql mutation function for updating an office
    onSubmit = async (
        values,
        createOffice,
        updateOffice,
        batchCreateListings,
        id,
        client
    ) => {
        // save listing step values to create listings after creating office, in createListings
        this.values = values;

        const { step } = this.props.match.params;
        const { historyLocationSearch } = this.state;

        const wizardState = this.fetchWizardState();

        // same process as above, but for form values

        if (step === OFFICE_STEP) {
            const addOfficeState = get(this, 'addOfficeInfo.state', {});

            const { imageUrls, locationLat, locationLong } = addOfficeState;
            const { officeName, location, addressDetail } = values;

            this.saveWizardState({
                ...wizardState,
                officeName,
                location,
                addressDetail,
                locationLat,
                locationLong,
                imageUrls,
            });
        }

        switch (this.mode) {
            case EDIT_OFFICE_MODE:
                if (step === EQUIPMENT_STEP) {
                    const { officeName, imageUrls } = wizardState;
                    const { officeDescription } = values;
                    const equipment = parseEquipmentFormData(values);

                    // makes the api call to submit changes to office
                    updateOffice({
                        variables: {
                            input: {
                                id: this.officeId,
                                name: officeName,
                                description: officeDescription,
                                imageUrls,
                                equipment,
                            },
                        },
                    });

                    this.destroyWizardState();
                } else {
                    this.advanceStep();
                }
                break;

            case ADD_LISTING_MODE:
                if (step === LISTING_STEP) {
                    const { officeId } = wizardState;

                    this.createListings(officeId, batchCreateListings);
                } else {
                    this.advanceStep();
                }
                break;

            // usual host onboarding
            default: {
                if (step === EQUIPMENT_STEP) {
                    const { officeDescription } = values;
                    const equipment = parseEquipmentFormData(values);

                    this.saveWizardState({
                        ...wizardState,
                        officeDescription,
                        equipment,
                    });
                }

                if (step === LISTING_STEP) {
                    const listings = parseListingFormData(values);
                    this.saveWizardState({
                        ...wizardState,
                        listings,
                    });

                    const {
                        addressDetail,
                        imageUrls,
                        location,
                        locationLat,
                        locationLong,
                        officeDescription,
                        officeName,
                        equipment,
                    } = wizardState;

                    const result = await createOffice({
                        variables: {
                            input: {
                                userId: id,
                                name: officeName,
                                imageUrls,
                                equipment,
                                description: officeDescription,
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
                    this.advanceStep();
                }

                break;
            }
        }
    };

    // host onboarding
    createListings = async (officeId, batchCreateListings) => {
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

        const result = await batchCreateListings({
            variables: {
                input: listings,
            },
        });

        const wizardState = this.fetchWizardState();

        if (get(result, 'data.batchCreateListings')) {
            await this.saveWizardState({
                ...wizardState,
                officeId,
                listingIds: get(result, 'data.batchCreateListings').map(
                    ({ id }) => id
                ),
            });

            await this.setState({});
            await this.handleOnCompleted();
        }
    };

    // save office data to state to trigger render
    handleGetOffice = data => {
        const historyLocationSearch = get(this.props, 'location.search');
        const { mode } = queryString.parse(historyLocationSearch);

        this.setState({ defaultValues: data.getOffice });
    };

    // after receiving existing office data, turn it into urlParams
    turnOfficeDataIntoParams = data => {
        if (isEmpty(data)) {
            return {};
        }

        // going from [{name: "equipmentName", price: $20.00}...] to { equipmentName: 'equipmentName', equipmentPrice: '$20.00' }
        const { equipment, name, location, imageUrls, description } = data;

        return {
            officeName: name,
            location: location.name,
            locationLat: location.geoPoint.lat,
            locationLong: location.geoPoint.lon,
            imageUrls,
            officeDescription: description,
            equipment,
        };
    };

    handleOnCompleted = data => this.advanceStep();

    handleRestart = () => {
        this.destroyWizardState();
        window.location.href = OFFICE_STEP_URL;
    };

    handleResumeWarningClose = () => {
        this.setState({
            resumeWarning: false,
        });
    };

    // forms should not be embedded within forms
    render() {
        const { historyLocationSearch, defaultValues } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);
        const { step } = this.props.match.params;
        const { mode } = this;

        const wizardState = this.fetchWizardState();

        const initialFormValues = {
            // office data for edit-office mode
            ...this.turnOfficeDataIntoParams(defaultValues),
            ...wizardState,
        };

        const stepCount = this.stepList.indexOf(step);
        const { officeId } = urlParams;

        let numSteps;
        switch (this.mode) {
            case EDIT_OFFICE_MODE:
                numSteps = 2;
                break;
            case ADD_LISTING_MODE:
                numSteps = 2;
                break;
            // host onboarding
            default:
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
                                onCompleted={this.handleOnCompleted}
                            >
                                {updateOffice => (
                                    <Mutation
                                        mutation={CREATE_LISTING}
                                        // onCompleted={this.handleOnCompleted}
                                    >
                                        {(
                                            batchCreateListings,
                                            { data: batchCreateListingsData }
                                        ) => (
                                            <Mutation
                                                mutation={CREATE_OFFICE}
                                                onCompleted={data => {
                                                    this.createListings(
                                                        data.createUserOffice
                                                            .id,
                                                        batchCreateListings
                                                    );
                                                }}
                                            >
                                                {(
                                                    createOffice,
                                                    {
                                                        client,
                                                        data: createOfficeData,
                                                    }
                                                ) => (
                                                    <StyledContainer>
                                                        <Form
                                                            onSuccess={values => {
                                                                this.onSubmit(
                                                                    values,
                                                                    createOffice,
                                                                    updateOffice,
                                                                    batchCreateListings,
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

                                                                <GridItem
                                                                    gc="2 / 4"
                                                                    position="relative"
                                                                >
                                                                    {step !==
                                                                        CONFIRMATION_STEP &&
                                                                        this
                                                                            .state
                                                                            .resumeWarning && (
                                                                            <StyledAlert
                                                                                type="info"
                                                                                showIcon
                                                                                closeText="Close"
                                                                                afterClose={
                                                                                    this
                                                                                        .handleResumeWarningClose
                                                                                }
                                                                                message={
                                                                                    <React.Fragment
                                                                                    >
                                                                                        Looks
                                                                                        like
                                                                                        you
                                                                                        were
                                                                                        middle
                                                                                        of
                                                                                        creating
                                                                                        an
                                                                                        office!
                                                                                        We&#39;ve
                                                                                        saved
                                                                                        your
                                                                                        changes
                                                                                        or{' '}
                                                                                        <RestartText
                                                                                            onClick={
                                                                                                this
                                                                                                    .handleRestart
                                                                                            }
                                                                                        >
                                                                                            you
                                                                                            can
                                                                                            start
                                                                                            over
                                                                                        </RestartText>

                                                                                        .
                                                                                    </React.Fragment>
                                                                                }
                                                                            />
                                                                        )}

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
                                                                        CONFIRMATION_STEP &&
                                                                        wizardState.officeId &&
                                                                        wizardState
                                                                            .listingIds
                                                                            .length && (
                                                                            <ListingConfirmation
                                                                                officeId={
                                                                                    wizardState.officeId
                                                                                }
                                                                                listingIds={
                                                                                    wizardState.listingIds
                                                                                }
                                                                            />
                                                                        )}
                                                                </GridItem>
                                                            </Grid>
                                                            {/* previous button is shown when the user is not on the first page or the last page. using indexOf for edit office */}
                                                            <Box
                                                                position="fixed"
                                                                bg="white"
                                                                left="0"
                                                                right="0"
                                                                bottom="0"
                                                                height="100px"
                                                                border="1px solid"
                                                                borderColor="divider.gray"
                                                                zIndex="modal"
                                                            >
                                                                <Container>
                                                                    <Flex
                                                                        justifyContent="space-between"
                                                                        alignItems="center"
                                                                    >
                                                                        {stepCount !==
                                                                        0 ? (
                                                                            this.stepList.indexOf(
                                                                                step
                                                                            ) !==
                                                                            this
                                                                                .stepList
                                                                                .length -
                                                                                1 ? (
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
                                                                                    mt={
                                                                                        20
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <div />
                                                                            )
                                                                        ) : (
                                                                            // Added this so that flex space between will work
                                                                            <div />
                                                                        )}

                                                                        <SubmitButton
                                                                            width={
                                                                                188
                                                                            }
                                                                            height={
                                                                                60
                                                                            }
                                                                            mt={
                                                                                20
                                                                            }
                                                                            mr={
                                                                                30
                                                                            }
                                                                            buttonText={
                                                                                this
                                                                                    .buttonTexts[
                                                                                    stepCount
                                                                                ]
                                                                            }
                                                                        />
                                                                    </Flex>
                                                                </Container>
                                                            </Box>
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
