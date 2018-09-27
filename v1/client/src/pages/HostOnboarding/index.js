import React, { Component } from 'react';
import cookies from 'browser-cookies';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import queryString from 'query-string';
import moment from 'moment';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import _mapValues from 'lodash/mapValues';
import { renderCents } from '../../util/paymentUtil';
import { GET_USER, CREATE_OFFICE, CREATE_LISTING } from './queries';
import history from '../../history';
import { Button, Container, Steps, Form, Grid } from '../../components';
import AddOfficeInfo from '../common/Forms/AddOfficeInfo';
import AddOfficeEquipments from '../common/Forms/AddOfficeEquipments';
import AddOfficeListing from '../common/Forms/AddOfficeListing';
import ListingConfirmation from '../common/ListingConfirmation';
import { ACTIVE_USER } from '../../util/strings';

const { GridItem } = Grid;

const OFFICE_STEP = 'add-office';
const EQUIPMENT_STEP = 'add-equipments';
const LISTING_STEP = 'add-listing';
const CONFIRMATION_STEP = 'listing-confirmation';
const stepList = [OFFICE_STEP, EQUIPMENT_STEP, LISTING_STEP, CONFIRMATION_STEP];
const DEFAULT_STEP_COUNT = 0;

const EQUIPMENT = 'equipment';
const EQUIPMENT_NAME = `${EQUIPMENT}Name`;
const EQUIPMENT_PRICE = `${EQUIPMENT}Price`;
const StyledContainer = styled(Container)`
    min-height: 100vh;
`;

const { BackButton, SubmitButton } = Form;

class HostOnboarding extends Component {
    constructor(props) {
        super(props);

        const historyLocationSearch = get(this.props, 'location.search');

        this.state = {
            historyLocationSearch,
            submitDisabled: true,
        };
    }

    // this is for url transition
    componentDidUpdate() {
        const { historyLocationSearch } = this.state;
        const currentLocationSearch = get(this.props, 'location.search');

        if (currentLocationSearch !== historyLocationSearch) {
            this.setState({
                historyLocationSearch: currentLocationSearch,
            });
        }
    }

    enableSubmit = () => {
        this.setState({ submitDisabled: false });
    };

    onSubmit = async (values, createOffice, id, client) => {
        const { step } = this.props.match.params;
        const { historyLocationSearch } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);

        this.values = values;
        const {
            addressDetail,
            imageUrls,
            location,
            locationLat,
            locationLong,
            officeDescription,
            officeName,
        } = urlParams;

        const equipment = Object.keys(urlParams)
            .filter(key => key.startsWith('equipmentPrice'))
            .map(key => ({
                name:
                    urlParams[
                        `${EQUIPMENT_NAME}${key.slice(EQUIPMENT_PRICE.length)}`
                    ],
                price: renderCents(urlParams[key]),
            }));

        if (step === 'add-listing') {
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
                            addressDetails: addressDetail,
                        },
                        imageUrls: JSON.parse(imageUrls),
                        equipment,
                        description: officeDescription,
                    },
                },
            });

            if (result) {
                // Need to update the cookie and local cache to populate the dentist id.
                const user = get(result, 'data.createUserOffice.host.user');
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

            // url transition to confirmation page happens in handleListingCreated. skip transition in current function with a return
            return;
        }

        // for all pages before CONFIRMATION_STEP, move on to the next step with computed params
        const nextStep = stepList[stepList.indexOf(step) + 1];
        const url = `/host-onboarding/${nextStep}?${this.computeParams(
            values,
            urlParams
        )}`;

        history.push(url);
    };

    handleOfficeCreated = (id, batchCreateListings) => {
        const listings = Object.keys(this.values)
            .filter(key => key.startsWith('availability'))
            .map(key => {
                const startTime = this.values[
                    `startTime${key.slice('availability'.length)}`
                ];
                const endTime = this.values[
                    `endTime${key.slice('availability'.length)}`
                ];

                const startDay = this.values[key][0];
                const endDay = this.values[key][1];

                return {
                    officeId: id,

                    cleaningFee: renderCents(
                        this.values[
                            `cleaningFee${key.slice('availability'.length)}`
                        ]
                    ),
                    chairHourlyPrice: renderCents(
                        this.values[
                            `hourlyChairPrice${key.slice(
                                'availability'.length
                            )}`
                        ]
                    ),
                    numChairsAvailable: this.values[
                        `numChairs${key.slice('availability'.length)}`
                    ],
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

        this.officeId = id;
    };

    handleListingCreated = () => {
        const url = `/host-onboarding/${CONFIRMATION_STEP}?${queryString.stringify(
            {
                officeId: this.officeId,
            }
        )}`;

        history.push(url);
    };

    handleBack = values => {
        const { step } = this.props.match.params;
        const { historyLocationSearch } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);

        const previousStep = stepList[stepList.indexOf(step) - 1];
        history.push(
            `/host-onboarding/${previousStep}?${this.computeParams(
                values,
                urlParams
            )}`
        );
    };

    computeParams = (values, urlParams) => {
        const { step } = this.props.match.params;

        const urlParamsEquipment = pick(
            urlParams,
            Object.keys(urlParams).filter(key => !key.startsWith('equipment'))
        );

        let computedUrlParams;

        switch (step) {
            case EQUIPMENT_STEP:
                computedUrlParams = urlParamsEquipment;
                break;
            default:
                computedUrlParams = urlParams;
        }

        const dateTime = _mapValues(
            pick(
                values,
                Object.keys(values).filter(
                    key =>
                        key.startsWith('availability') ||
                        key.startsWith('startTime') ||
                        key.startsWith('endTime')
                )
            ),
            JSON.stringify
        );

        const addOfficeState = get(this, 'addOfficeInfo.state');
        const { imageUrls, ...restOfAddOffice } = !isEmpty(addOfficeState)
            ? addOfficeState
            : {};

        const params = queryString.stringify({
            // state variables from children
            imageUrls: JSON.stringify(imageUrls),
            // url params
            ...computedUrlParams,
            // form values
            ...restOfAddOffice,
            ...values,
            ...dateTime,
        });

        return params;
    };

    handleDone = () => {
        this.props.history.push('/profile?selectedTab=my_listings');
    };

    // isExistingOffice is true if officeId defined (when adding new listing)
    // isExistingOffice() {
    //     this.urlParams = queryString.parse(history.location.search);
    //     const { officeId } = this.urlParams;

    //     return officeId !== undefined;
    // }

    render() {
        const { historyLocationSearch, submitDisabled } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);
        const { location } = this.props;
        const { step } = this.props.match.params;
        let stepCount;

        const availabilities = _mapValues(
            pick(
                urlParams,
                Object.keys(urlParams).filter(key =>
                    key.startsWith('availability')
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

        const initialValues = {
            ...urlParams,
            ...availabilities,
            ...times,
        };

        switch (step) {
            case OFFICE_STEP:
                stepCount = stepList.indexOf(OFFICE_STEP);
                break;
            case EQUIPMENT_STEP:
                stepCount = stepList.indexOf(EQUIPMENT_STEP);
                break;
            case LISTING_STEP:
                stepCount = stepList.indexOf(LISTING_STEP);
                break;
            case CONFIRMATION_STEP:
                stepCount = stepList.indexOf(CONFIRMATION_STEP);
                break;
            default:
                stepCount = DEFAULT_STEP_COUNT;
        }

        return (
            <Query query={GET_USER}>
                {({ data: userData }) => (
                    <Mutation
                        mutation={CREATE_LISTING}
                        onCompleted={this.handleListingCreated}
                    >
                        {batchCreateListings => (
                            <Mutation
                                mutation={CREATE_OFFICE}
                                onCompleted={data => {
                                    this.handleOfficeCreated(
                                        data.createUserOffice.id,
                                        batchCreateListings
                                    );
                                }}
                            >
                                {(createOffice, { client }) => (
                                    <StyledContainer>
                                        <Form
                                            onSuccess={values =>
                                                this.onSubmit(
                                                    values,
                                                    createOffice,
                                                    userData.activeUser.id,
                                                    client
                                                )
                                            }
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
                                                    current={stepCount}
                                                    direction="vertical"
                                                    size={4}
                                                />

                                                <GridItem gc="2 / 4">
                                                    {step === OFFICE_STEP && (
                                                        <AddOfficeInfo
                                                            ref={value => {
                                                                this.addOfficeInfo = value;
                                                            }}
                                                            onSelect={
                                                                this
                                                                    .enableSubmit
                                                            }
                                                            {...initialValues}
                                                        />
                                                    )}
                                                    {step ===
                                                        EQUIPMENT_STEP && (
                                                        <AddOfficeEquipments
                                                            {...initialValues}
                                                        />
                                                    )}
                                                    {step === LISTING_STEP && (
                                                        <AddOfficeListing
                                                            {...initialValues}
                                                        />
                                                    )}

                                                    {step ===
                                                        CONFIRMATION_STEP && (
                                                        <ListingConfirmation
                                                            location={location}
                                                        />
                                                    )}
                                                </GridItem>
                                                {step !== OFFICE_STEP &&
                                                    step !==
                                                        CONFIRMATION_STEP && (
                                                        <GridItem gc="1 / 2">
                                                            <BackButton
                                                                disabled={false}
                                                                onBack={
                                                                    this
                                                                        .handleBack
                                                                }
                                                                type="primary"
                                                                ghost
                                                                width={188}
                                                                height={60}
                                                                buttonText="Previous"
                                                            />
                                                        </GridItem>
                                                    )}

                                                {step !== CONFIRMATION_STEP ? (
                                                    <GridItem gc="3 / 4">
                                                        <SubmitButton
                                                            disabled={
                                                                submitDisabled
                                                            }
                                                            position="absolute"
                                                            width={188}
                                                            height={60}
                                                            buttonText="Next"
                                                        />
                                                    </GridItem>
                                                ) : (
                                                    <GridItem gc="3 / 4">
                                                        <Button
                                                            position="absolute"
                                                            type="primary"
                                                            onClick={
                                                                this.handleDone
                                                            }
                                                            width={188}
                                                            height={60}
                                                        >
                                                            Done
                                                        </Button>
                                                    </GridItem>
                                                )}
                                            </Grid>
                                        </Form>
                                    </StyledContainer>
                                )}
                            </Mutation>
                        )}
                    </Mutation>
                )}
            </Query>
        );
    }
}

export default HostOnboarding;
