import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import _flowRight from 'lodash/flowRight';

import {
    Box,
    Container,
    Text,
    Card,
    Truncate,
    Responsive,
    Link,
    Button,
    Flex,
} from '~/components';
import {
    PROFILE_SETTINGS_MENU_TEXT,
    DENTIST_VERIFICATION_MENU_TEXT,
    CREATE_A_NEW_APPOINTMENT_MENU_TEXT,
    MY_PATIENTS_MENU_TEXT,
    VIEW_PROFILE_MENU_TEXT,
    CALENDAR_MENU_TEXT,
    DENTIST,
    AVAILABILITY_SETTINGS_MENU_TEXT,
    DENTIST_POS_PIN_CODE,
    GROUP_WALLET_MENU_TEXT,
    APPOINTMENTS_MENU_TEXT,
} from '~/util/strings';
import { dentistDashboardMenuTexts } from '~/util/menuItems';
import { getKeyFromText } from '../Dashboard/utils';
import Confirmation from '../Dashboard/Confirmation';
import {
    DashboardGrid,
    StyledDashboardMenu,
    StyledDashboardMenuItem,
} from '../Dashboard/common';
import KioskDentistProfilePage from '~/common/KioskDentistProfilePage';
import DentistVerification from '~/common/Onboarding/Dentist/Verification';
import NewAppointment from '~/common/NewAppointment';
import { DENTIST_PROFILE_PAGE_URL, getLTMBaseUrl } from '~/util/urls';
import PatientsList from '~/common/PatientsList';
import DentistDetails from '~/common/DentistDetails';
import DentistPosPinCode from '~/common/DentistPosPinCode';
import ReviewContainer from '~/common/ReviewContainer/index';
import PreferredLocations from '~/common/PreferredLocations';
import DentistAvailabilityForm from '~/common/Forms/DentistAvailabilityForm';
import DentistDashboardAppoinments from '~/common/DentistDashboardAppointments';
import GroupWallet from '~/common/GroupWallet';
import { version } from '~/package.json';

const { TabletMobile, Desktop, withScreenSizes } = Responsive;

const StyledButton = styled(Button)`
    &&&& {
        border-radius: 17px;
    }
`;
const menuTextToDescription = {
    [PROFILE_SETTINGS_MENU_TEXT]:
        'Manage your dentist profile and insurance policy',
    [APPOINTMENTS_MENU_TEXT]: 'View your upcoming patient visits',
    [AVAILABILITY_SETTINGS_MENU_TEXT]:
        'Select your location and time preferences',
    [DENTIST_VERIFICATION_MENU_TEXT]:
        'Submit your verification information and documents',
    [CALENDAR_MENU_TEXT]: 'View your upcoming appointments and make changes',
    [CREATE_A_NEW_APPOINTMENT_MENU_TEXT]:
        'Create a follow-up appointment for your patients',
    [MY_PATIENTS_MENU_TEXT]: 'View your patients and their documents',
    [VIEW_PROFILE_MENU_TEXT]: 'View your public dentist page',
    [DENTIST_POS_PIN_CODE]: 'View your dentist pos pin code',
    [GROUP_WALLET_MENU_TEXT]: 'View your group wallet',
};

class DentistDashboardPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDentistProfileFormConfirmation: false,
        };
    }

    componentDidUpdate() {
        // this is so that dentistProfileFormConfirmation is only displayed once, but since dentistProfileFormConfirmation is not a state variable, this function does not cause a re-render
        if (this.state.showDentistProfileFormConfirmation) {
            this.dentistProfileFormConfirmation = null;
        }
        // this is so that dentistVerificationConfirmation is only displayed once, but since dentistVerificationConfirmation is not a state variable, this function does not cause a re-render
        if (this.state.showDentistVerificationConfirmation) {
            this.dentistVerificationConfirmation = null;
        }
    }

    onDentistProfileFormComplete = () => {
        // this will be displayed instead of the dentist profile form. dentistProfileFormConfirmation will be turned back to null if displayed once, due to componentDidUpdate
        this.dentistProfileFormConfirmation = (
            <Confirmation formName={PROFILE_SETTINGS_MENU_TEXT} />
        );
        this.setState({ showDentistProfileFormConfirmation: true }); // this will cause a re-render to show dentistProfileFormConfirmation
    };

    onDentistVerificationComplete = () => {
        // this will be displayed instead of the dentist verification form. dentistVerificationFormConfirmation will be turned back to null if displayed once, due to componentDidUpdate
        this.dentistVerificationConfirmation = (
            <Confirmation formName={DENTIST_VERIFICATION_MENU_TEXT} />
        );
        this.setState({ showDentistVerificationConfirmation: true }); // this will cause a re-render to show dentistVerificationConfirmation
    };

    handleClick = ({ key }) => {
        const { history, location } = this.props;

        if (key === CALENDAR_MENU_TEXT) {
            window.location.href = DENTIST_PROFILE_PAGE_URL;
            return;
        }

        const params = queryString.parse(location.search);
        const newParams = {
            ...params,
            selectedTab: getKeyFromText(key),
        };

        if (this.props.refetch) {
            this.props.refetch();
        }

        history.push(`/dentist?${queryString.stringify(newParams)}`);
    };

    renderPanelHeader = key => (
        <Box
            borderBottom="solid 0.5px"
            borderColor="divider.gray"
            width="auto"
            mb={30}
            // Hacky implementation for custom position of card heading
            mx={-22}
            mt={-28}
            pt={15}
            pl={10}
        >
            <Text
                color="text.lightGray"
                opacity="0.6"
                mb={15}
                fontWeight="normal"
                fontSize={1}
            >
                {key}
            </Text>
        </Box>
    );

    renderPanel = key => {
        let panelContent;
        const {
            offices,
            preferredLocations,
            serializedPreferredLocations,
            zipCode,
            dentistId,
            dentist,
            userLanguages,
            refetchUser,
            hasPreferredDays,
            setHasPreferredDays,
            hasPreferredDaysFromAPI,
            setHasPreferredDaysFromAPI,
        } = this.props;

        switch (key) {
            case PROFILE_SETTINGS_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <KioskDentistProfilePage
                            onFinish={this.onDentistProfileFormComplete} // to render confirmation panel on finish
                            withoutProgressBar
                            fromDentistDashboard
                            userLanguages={userLanguages}
                            refetchUser={refetchUser}
                            dentist={dentist}
                        />
                    </Card>
                );
                break;
            case APPOINTMENTS_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <DentistDashboardAppoinments />
                    </Card>
                );
                break;
            case AVAILABILITY_SETTINGS_MENU_TEXT:
                panelContent = (
                    <Box>
                        <Card>
                            <PreferredLocations
                                renderPanelHeader={this.renderPanelHeader}
                                offices={offices}
                                preferredLocations={preferredLocations}
                                serializedPreferredLocations={
                                    serializedPreferredLocations
                                }
                                zipCode={zipCode}
                                dentistId={dentistId}
                                hasPreferredDays={hasPreferredDays}
                            />
                        </Card>
                        <Box mb="40px" />
                        <Card>
                            {this.renderPanelHeader(key)}
                            <DentistAvailabilityForm
                                hasPreferredDays={hasPreferredDays}
                                setHasPreferredDays={setHasPreferredDays}
                                hasPreferredDaysFromAPI={
                                    hasPreferredDaysFromAPI
                                }
                                setHasPreferredDaysFromAPI={
                                    setHasPreferredDaysFromAPI
                                }
                            />
                        </Card>
                    </Box>
                );
                break;
            case DENTIST_VERIFICATION_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <DentistVerification
                            onFinish={this.onDentistVerificationComplete} // to render confirmation panel on finish
                            withoutProgressBar
                            fromDentistDashboard
                            dentist={dentist}
                        />
                    </Card>
                );
                break;
            case DENTIST_POS_PIN_CODE:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <DentistPosPinCode />
                    </Card>
                );
                break;
            case CREATE_A_NEW_APPOINTMENT_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <Flex justifyContent="center">
                            <NewAppointment />
                        </Flex>
                    </Card>
                );
                break;
            case MY_PATIENTS_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <PatientsList />
                    </Card>
                );
                break;
            case VIEW_PROFILE_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}

                        <Container px={[25, '', 0]}>
                            <DentistDetails
                                dentist={this.props.dentist}
                                viewOnly
                            />
                            <ReviewContainer
                                type={DENTIST}
                                id={this.props.dentistId}
                                viewOnly
                            />
                        </Container>
                    </Card>
                );
                break;
            case GROUP_WALLET_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <GroupWallet dentalGroups={this.props.dentalGroups} />
                    </Card>
                );
                break;
            default:
        }

        return (
            <Box pt={[10, '', 0]}>{this.renderPanelContent(panelContent)}</Box>
        );
    };

    renderPanelContent = panelContent => {
        // dentistProfileFormConfirmation will be null if it has been rendered once, due to componentDidUpdate
        // if dentistProfileFormConfirmation is not null, it means it has just been set by onDentistProfileFormComplete and it needs to be shown for the first time
        if (
            !_isEmpty(this.dentistProfileFormConfirmation) &&
            this.state.showDentistProfileFormConfirmation
        ) {
            return this.dentistProfileFormConfirmation;
        }
        // dentistVerificationConfirmation will be null if it has been rendered once, due to componentDidUpdate
        // if dentistVerificationConfirmation is not null, it means it has just been set by onDentistVerificationFormComplete and it needs to be shown for the first time
        else if (
            !_isEmpty(this.dentistVerificationConfirmation) &&
            this.state.showDentistVerificationConfirmation
        ) {
            return this.dentistVerificationConfirmation;
        }
        // display normal content

        return panelContent;
    };
    renderMenu = panel => (
        <Card p={0}>
            <StyledDashboardMenu
                selectedKeys={panel}
                onClick={this.handleClick}
            >
                {dentistDashboardMenuTexts.map(menuText => (
                    <StyledDashboardMenuItem key={menuText}>
                        {/* menu item text */}
                        <Text
                            mb={6}
                            fontSize={1}
                            fontWeight="medium"
                            color="inherit"
                            letterSpacing="-0.4px"
                        >
                            {menuText}
                        </Text>
                        {/* menu item description */}
                        <Text
                            fontSize={0}
                            fontWeight="regular"
                            color="text.lightGray"
                            letterSpacing="-0.4px"
                        >
                            <Truncate lines={2}>
                                {menuTextToDescription[menuText]}
                            </Truncate>
                        </Text>
                    </StyledDashboardMenuItem>
                ))}
            </StyledDashboardMenu>
        </Card>
    );

    render() {
        return (
            <Fragment>
                <TabletMobile>
                    <Box pb={50}>{this.renderPanel(this.props.panel)}</Box>
                </TabletMobile>
                <Desktop>
                    <Container>
                        <Flex
                            justifyContent="space-between"
                            alignItems="flex-end"
                            mb={9}
                        >
                            <Text
                                mt={20}
                                mb={4}
                                fontWeight="medium"
                                fontSize={4}
                            >
                                Dentist Dashboard
                                <Text
                                    is="span"
                                    fontSize={1}
                                    color="text.darkGray"
                                    ml={10}
                                >
                                    {`v${version}`}
                                </Text>
                            </Text>
                            <Desktop>
                                <Link
                                    height={34}
                                    isExternal
                                    target="_blank"
                                    rel="noopener"
                                    to={getLTMBaseUrl()}
                                >
                                    <StyledButton
                                        px={30}
                                        height="100%"
                                        fontSize={1}
                                    >
                                        Laguro Treatment Module
                                    </StyledButton>
                                </Link>
                            </Desktop>
                        </Flex>
                        <DashboardGrid pb={50}>
                            {this.renderMenu(this.props.panel)}
                            {this.renderPanel(this.props.panel)}
                        </DashboardGrid>
                    </Container>
                </Desktop>
            </Fragment>
        );
    }
}
export default _flowRight(withRouter, withScreenSizes)(
    DentistDashboardPageView
);
