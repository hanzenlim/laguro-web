import React, { Component, Fragment } from 'react';
import cookies from 'browser-cookies';
import styled from 'styled-components';
import { Alert, message } from 'antd';
import { Query, Mutation, compose, withApollo } from 'react-apollo';
import queryString from 'query-string';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { renderCents } from '../../util/paymentUtil';
import {
    GET_USER,
    GET_OFFICE,
    CREATE_OFFICE,
    CREATE_LISTING,
    UPDATE_OFFICE,
} from './queries';

import {
    getActiveUser,
    saveUploadedImagesMutation,
    createPatientDocumentMutation,
} from '../common/Forms/HostOnboardingForm/queries';

import history from '../../history';
import {
    Container,
    Steps,
    Form,
    Box,
    Flex,
    Progress,
    Responsive,
} from '../../components';
import AddOfficeInfo from '../common/Forms/HostOnboardingForm/AddOfficeInfo';
import AddOfficeEquipments from '../common/Forms/HostOnboardingForm/AddOfficeEquipments';
import AddDocument from '../common/Forms/HostOnboardingForm/AddDocument';
import AddOfficeListing from '../common/Forms/HostOnboardingForm/AddOfficeListing';
import ListingConfirmation from '../common/ListingConfirmation';
import {
    ACTIVE_USER,
    EDIT_OFFICE_MODE,
    ADD_LISTING_MODE,
    HOST_ONBOARDING_CREATE_MODE,
} from '../../util/strings';

import { withScreenSizes } from '../../components/Responsive';
import OfficeVerificationUtil from './util';
import { UPPERCASE_DAYS } from '../../util/timeUtil';

const { TabletMobile } = Responsive;
const ABBREVIATED_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const StyledAlert = styled(Alert)`
    && {
        padding: relative;
        padding-right: 60px;
        margin-bottom: 12px;
        z-index: ${props => props.theme.zIndex.header};

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            top: 20px;
            position: absolute;
            margin-bottom: 0;
        }
    }
`;

// modes:
//      edit-office
//      add-listing
//      default(host onboarding)

// to be used to distinguish between each step and to decide when to show previous buttona and what kind of submit buttons
const OFFICE_STEP = 'add-office';
const EQUIPMENT_STEP = 'add-equipment';
const DOCUMENT_STEP = 'add-document';
const LISTING_STEP = 'add-listing';
const CONFIRMATION_STEP = 'listing-confirmation';

// to be used for next and previous buttons
const HOST_ONBOARDING = '/host-onboarding/';
const OFFICE_STEP_URL = `${HOST_ONBOARDING}${OFFICE_STEP}/`;
const EQUIPMENT_STEP_URL = `${HOST_ONBOARDING}${EQUIPMENT_STEP}/`;
const DOCUMENT_STEP_URL = `${HOST_ONBOARDING}${DOCUMENT_STEP}/`;
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
    [DOCUMENT_STEP]: DOCUMENT_STEP_URL,
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
                return null;
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

        this.signedURLs = {};

        this.officeVerificationUtil = new OfficeVerificationUtil(
            this.props.client,
            this.props.createPatientDocument,
            this.props.saveUploadedImages
        );

        switch (mode) {
            case EDIT_OFFICE_MODE: {
                // repeat DOCUMENT_STEP because there is no confirmation page for edit office, this is used for displaying previous buttons
                // TODO: come up with a better way for displaying previous buttons
                this.stepList = [
                    OFFICE_STEP,
                    EQUIPMENT_STEP,
                    DOCUMENT_STEP,
                    DOCUMENT_STEP,
                ];
                // will take the user back to HOST_PROFILE_URL after clicking 'Save Changes'

                this.urlList = [
                    OFFICE_STEP_URL,
                    EQUIPMENT_STEP_URL,
                    DOCUMENT_STEP_URL,
                    HOST_PROFILE_URL,
                ];

                this.headerList = ['', ''];
                this.buttonTexts = ['Next', 'Next', 'Save Changes'];

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
                    DOCUMENT_STEP,
                    LISTING_STEP,
                    CONFIRMATION_STEP,
                ];

                this.urlList = [
                    OFFICE_STEP_URL,
                    EQUIPMENT_STEP_URL,
                    DOCUMENT_STEP_URL,
                    LISTING_STEP_URL,
                    CONFIRMATION_STEP_URL,
                    HOST_PROFILE_URL,
                ];
                this.buttonTexts = [
                    'Next',
                    'Next',
                    'Next',
                    'Publish',
                    'Go to My Listings',
                ];
                this.headerList = [
                    "let's start with some basic info about your office",
                    'Tell us more about your office',
                    'Upload information about your Business license and Liability insurance',
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
            submitting: false,
            officeDocumentsDefaultValues: {},
            hasFetchedOffice: false,
        };
    }

    async componentDidMount() {
        if (this.mode === EDIT_OFFICE_MODE) {
            const { user } = this.props;
            // Need to get the current user document to populate the default values
            // on the office verification step.
            const result = await this.officeVerificationUtil.fetchUserDocuments(
                user.id
            );

            const officeDocuments = {
                generalInsurance: [],
                businessLicense: [],
            };

            if (get(result, 'documents.businessLicense')) {
                result.documents.businessLicense.forEach(document => {
                    if (document.officeId === this.officeId) {
                        officeDocuments.businessLicense.push(document);
                    }
                });
            }

            if (get(result, 'documents.generalInsurance')) {
                result.documents.generalInsurance.forEach(document => {
                    if (document.officeId === this.officeId) {
                        officeDocuments.generalInsurance.push(document);
                    }
                });
            }

            this.setState({
                officeDocumentsDefaultValues: officeDocuments,
            });
        }
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
    advanceStep = async () => {
        const { step } = this.props.match.params;

        const _currentURL = stepURLs[step];

        const nextIndex = this.urlList.indexOf(_currentURL) + 1;
        const nextURL = this.urlList[nextIndex];

        if (nextIndex === this.urlList.length - 1) {
            this.destroyWizardState();
            await this.setState({ submitting: false });
            return history.push(nextURL);
        }

        await this.setState({ submitting: false });
        return history.push(this.buildNextIntermediateURL(nextURL));
    };

    // given values, compute next url and add computedParams to url
    handleBack = () => {
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
        await this.setState({ submitting: true });
        // save listing step values to create listings after creating office, in createListings
        this.values = values;

        const { step } = this.props.match.params;

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
                // This is the last step when in edit office mode.
                if (step === DOCUMENT_STEP) {
                    const { officeName, imageUrls } = wizardState;
                    const { officeDescription } = values;
                    const equipment = parseEquipmentFormData(values);

                    // makes the api call to submit changes to office
                    await updateOffice({
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

                    // The office documents is stored on the form values and not
                    // the local storage since this is the last step.
                    const officeDocuments = get(values, 'documents');

                    if (officeDocuments) {
                        // save the office verification images
                        await this.officeVerificationUtil.saveOfficeDocuments(
                            officeDocuments,
                            this.officeId,
                            this.props.user.id
                        );
                    }

                    this.destroyWizardState();
                } else {
                    this.advanceStep();
                }
                break;

            case ADD_LISTING_MODE:
                if (step === LISTING_STEP) {
                    const urlParams = queryString.parse(
                        this.state.historyLocationSearch
                    );
                    const { officeId } = urlParams;

                    await this.createListings(officeId, batchCreateListings);
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

                if (step === DOCUMENT_STEP) {
                    this.saveWizardState({
                        ...wizardState,
                        officeDocuments: values.documents,
                    });
                }

                if (step === LISTING_STEP) {
                    const listings = parseListingFormData(values);
                    if (!listings || listings.includes(null)) {
                        this.setState({ submitting: false });
                        break;
                    }

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
                        officeId,
                        officeDocuments,
                    } = wizardState;

                    let result = null;

                    /**
                     * Only create an office on first try
                     */
                    if (!officeId) {
                        result = await createOffice({
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

                        await this.saveWizardState({
                            ...wizardState,
                            officeId: result.data.createUserOffice.id,
                        });

                        await this.officeVerificationUtil.saveOfficeDocuments(
                            officeDocuments,
                            result.data.createUserOffice.id,
                            this.props.user.id
                        );

                        await this.createListings(
                            result.data.createUserOffice.id,
                            batchCreateListings
                        );
                    } else {
                        this.createListings(officeId, batchCreateListings);
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
                const index = key.slice(AVAILABILITY.length);
                const startTime = this.values[`startTime${index}`];
                const endTime = this.values[`endTime${index}`];
                const cleaningFee = renderCents(
                    this.values[`cleaningFee${index}`]
                );
                const chairHourlyPrice = renderCents(
                    this.values[`hourlyChairPrice${index}`]
                );
                const numChairsAvailable = this.values[`numChairs${index}`];
                // this.values[key] is availability array
                const startDay = this.values[key][0];
                const endDay = this.values[key][1];
                const recurringDays = ABBREVIATED_DAYS.map(
                    d => this.values[`${d}${index}`]
                );

                if (startTime >= endTime) {
                    message.error(
                        'Your daily end time has to be after your daily start time'
                    );
                    return null;
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
                            .split('T')[1]
                            .split('+')[0]
                            .split('-')[0],
                        endTime: endTime
                            .startOf('hour')
                            .format()
                            .split('T')[1]
                            .split('+')[0]
                            .split('-')[0],
                        startDay: startDay.format().split('T')[0],
                        endDay: endDay.format().split('T')[0],
                        days: UPPERCASE_DAYS.filter(
                            (num, i) => recurringDays[i]
                        ),
                    },
                };
            });

        if (listings.includes(null)) {
            this.setState({ submitting: false });
            return null;
        }

        try {
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
        } catch (error) {
            if (get(error, 'graphQLErrors[0].message')) {
                message.error(get(error, 'graphQLErrors[0].message'));
            }
            this.setState({ submitting: false });
        }

        return null;
    };

    // save office data to state to trigger render
    handleGetOffice = async data => {
        if (!this.state.hasFetchedOffice) {
            await this.setState({
                defaultValues: data.getOffice,
                hasFetchedOffice: true,
            });
        }
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
            addressDetail: location.addressDetails,
            locationLat: location.geoPoint.lat,
            locationLong: location.geoPoint.lon,
            imageUrls,
            officeDescription: description,
            equipment,
        };
    };

    handleOnCompleted = () => this.advanceStep();

    handleRestart = () => {
        this.destroyWizardState();
        window.location.href = OFFICE_STEP_URL;
    };

    // forms should not be embedded within forms
    render() {
        const {
            historyLocationSearch,
            defaultValues,
            resumeWarning,
        } = this.state;
        const urlParams = queryString.parse(historyLocationSearch);
        const { step } = this.props.match.params;
        const { mode } = this;
        const isConfirmationStep = step !== CONFIRMATION_STEP;

        const wizardState = this.fetchWizardState();

        const initialFormValues = {
            // office data for edit-office mode
            ...this.turnOfficeDataIntoParams(defaultValues),
            officeDocuments: this.state.officeDocumentsDefaultValues,
            ...wizardState,
        };

        const stepCount = this.stepList.indexOf(step);
        const { officeId } = urlParams;

        let numSteps;
        switch (this.mode) {
            case EDIT_OFFICE_MODE:
                numSteps = 3;
                break;
            case ADD_LISTING_MODE:
                numSteps = 2;
                break;
            // host onboarding
            default:
                numSteps = 4;
                break;
        }

        const progressBarPercent = ((stepCount + 1) / numSteps) * 100;

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
                                    <Mutation mutation={CREATE_LISTING}>
                                        {batchCreateListings => (
                                            <Mutation mutation={CREATE_OFFICE}>
                                                {(createOffice, { client }) => (
                                                    <Fragment>
                                                        <TabletMobile>
                                                            <Progress
                                                                strokeLinecap="square"
                                                                strokeWidth="3px"
                                                                percent={
                                                                    progressBarPercent
                                                                }
                                                            />
                                                        </TabletMobile>
                                                        <Container
                                                            position="relative"
                                                            maxWidth={[
                                                                '',
                                                                '',
                                                                624,
                                                            ]}
                                                            px={[25, '', 0]}
                                                        >
                                                            {isConfirmationStep &&
                                                                resumeWarning && (
                                                                    <StyledAlert
                                                                        type="info"
                                                                        showIcon
                                                                        message={
                                                                            <Fragment
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
                                                                            </Fragment>
                                                                        }
                                                                    />
                                                                )}
                                                        </Container>
                                                        <StyledContainer
                                                            pb={[100, '', 200]}
                                                        >
                                                            <Form
                                                                debounce="false"
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
                                                                {this.props
                                                                    .desktopOnly && (
                                                                    <Box
                                                                        position="absolute"
                                                                        top={
                                                                            200
                                                                        }
                                                                    >
                                                                        <Steps
                                                                            mt={[
                                                                                0,
                                                                                '',
                                                                                210,
                                                                            ]}
                                                                            mb={[
                                                                                0,
                                                                                '',
                                                                                46,
                                                                            ]}
                                                                            current={
                                                                                stepCount
                                                                            }
                                                                            size={
                                                                                numSteps
                                                                            }
                                                                            direction={
                                                                                this
                                                                                    .props
                                                                                    .desktopOnly
                                                                                    ? 'vertical'
                                                                                    : 'horizontal'
                                                                            }
                                                                        />
                                                                    </Box>
                                                                )}

                                                                <Container
                                                                    position="relative"
                                                                    maxWidth={[
                                                                        '',
                                                                        '',
                                                                        624,
                                                                    ]}
                                                                    px={0}
                                                                >
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
                                                                        DOCUMENT_STEP && (
                                                                        <AddDocument
                                                                            header={
                                                                                this
                                                                                    .headerList[2]
                                                                            }
                                                                            {...initialFormValues}
                                                                            {...this
                                                                                .props}
                                                                        />
                                                                    )}
                                                                    {step ===
                                                                        LISTING_STEP && (
                                                                        <AddOfficeListing
                                                                            isOnboarding={
                                                                                this
                                                                                    .mode !==
                                                                                ADD_LISTING_MODE
                                                                            }
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
                                                                </Container>
                                                                {/* previous button is shown when the user is not on the first page or the last page. using indexOf for edit office */}
                                                                <Box
                                                                    position={[
                                                                        'relative',
                                                                        '',
                                                                        'fixed',
                                                                    ]}
                                                                    bg="white"
                                                                    left="0"
                                                                    right="0"
                                                                    bottom="0"
                                                                    height={[
                                                                        '',
                                                                        '',
                                                                        100,
                                                                    ]}
                                                                    border={[
                                                                        'none',
                                                                        '',
                                                                        '1px solid',
                                                                    ]}
                                                                    borderColor={[
                                                                        'none',
                                                                        '',
                                                                        'divider.gray',
                                                                    ]}
                                                                    zIndex="modal"
                                                                >
                                                                    <Container
                                                                        px={[
                                                                            0,
                                                                            '',
                                                                            25,
                                                                        ]}
                                                                    >
                                                                        <Flex
                                                                            justifyContent="space-between"
                                                                            alignItems="center"
                                                                            flexDirection={[
                                                                                'column-reverse',
                                                                                '',
                                                                                'row',
                                                                            ]}
                                                                        >
                                                                            {stepCount !==
                                                                                0 &&
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
                                                                                    width={[
                                                                                        'calc(100vw - 50px)',
                                                                                        '',
                                                                                        188,
                                                                                    ]}
                                                                                    height={[
                                                                                        50,
                                                                                        '',
                                                                                        60,
                                                                                    ]}
                                                                                    mt={[
                                                                                        10,
                                                                                        '',
                                                                                        20,
                                                                                    ]}
                                                                                    buttonText="Previous"
                                                                                />
                                                                            ) : (
                                                                                <div />
                                                                            )}

                                                                            <SubmitButton
                                                                                disabled={
                                                                                    this
                                                                                        .mode ===
                                                                                    LISTING_STEP
                                                                                        ? false
                                                                                        : this
                                                                                              .state
                                                                                              .numImage ===
                                                                                          0
                                                                                }
                                                                                loading={
                                                                                    this
                                                                                        .state
                                                                                        .submitting
                                                                                }
                                                                                width={[
                                                                                    'calc(100vw - 50px)',
                                                                                    '',
                                                                                    188,
                                                                                ]}
                                                                                height={[
                                                                                    50,
                                                                                    '',
                                                                                    60,
                                                                                ]}
                                                                                mt={[
                                                                                    10,
                                                                                    '',
                                                                                    20,
                                                                                ]}
                                                                                mr={[
                                                                                    0,
                                                                                    '',
                                                                                    30,
                                                                                ]}
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
                                                    </Fragment>
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

export default compose(
    withApollo,
    getActiveUser,
    createPatientDocumentMutation,
    saveUploadedImagesMutation,
    withScreenSizes
)(HostOnboarding);
