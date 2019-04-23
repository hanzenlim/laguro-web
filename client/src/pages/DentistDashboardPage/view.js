import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Box, Container, Text, Card, Truncate } from '@laguro/basic-components';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import DentistAppointments from '../common/DentistAppointments';
import {
    PROFILE_SETTINGS_MENU_TEXT,
    DENTIST_VERIFICATION_MENU_TEXT,
    CREATE_A_NEW_APPOINTMENT_MENU_TEXT,
    MY_PATIENTS_MENU_TEXT,
    BOOKINGS_MENU_TEXT,
    LAGURO_BALANCE_MENU_TEXT,
    VIEW_PROFILE_MENU_TEXT,
    CALENDAR_MENU_TEXT,
    DENTIST,
    AVAILABILITY_SETTINGS_MENU_TEXT,
} from '../../util/strings';
import { dentistDashboardMenuTexts } from '../../util/menuItems';
import { getKeyFromText } from '../Dashboard/utils';
import { addSearchParams, redirect } from '../../history';
import Confirmation from '../Dashboard/Confirmation';
import {
    DashboardGrid,
    StyledDashboardMenu,
    StyledDashboardMenuItem,
} from '../Dashboard/common';
import KioskDentistProfilePage from '../KioskDentistProfilePage';
import DentistVerification from '../Onboarding/Dentist/Verification/';
import NewAppointment from '../common/NewAppointment';
import { DENTIST_PROFILE_PAGE_URL } from '../../util/urls';
import PatientsList from '../common/PatientsList';
import BalanceHistory from '../common/BalanceHistory';
import DentistDetails from '../common/DentistDetails';
import ReviewContainer from '../common/ReviewContainer/index';
import { Responsive, Link, Button, Flex } from '../../components/index';
import PreferredLocations from '../common/PreferredLocations';
import DentistAvailabilityForm from '../common/Forms/DentistAvailabilityForm';
import { version } from '../../../package.json';

const currentUrl = window.location.href;
const { TabletMobile, Desktop, withScreenSizes } = Responsive;

const StyledButton = styled(Button)`
    &&&& {
        border-radius: 17px;
    }
`;
const menuTextToDescription = {
    [PROFILE_SETTINGS_MENU_TEXT]:
        'Manage your dentist profile and insurance policy',
    [AVAILABILITY_SETTINGS_MENU_TEXT]:
        'Select your location and time preferences',
    [DENTIST_VERIFICATION_MENU_TEXT]:
        'Submit your verification information and documents',
    [CALENDAR_MENU_TEXT]: 'View your upcoming appointments and make changes',
    [CREATE_A_NEW_APPOINTMENT_MENU_TEXT]:
        'Create a follow-up appointment for your patients',
    [MY_PATIENTS_MENU_TEXT]: 'View your patients and their documents',
    [BOOKINGS_MENU_TEXT]: 'View and edit your bookings',
    [LAGURO_BALANCE_MENU_TEXT]: 'View your current account balance',
    [VIEW_PROFILE_MENU_TEXT]: 'View your public dentist page',
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

    handleClick = ({ key }) => {
        // to allow browser back from calendar page back to dashboard page. when clicking on these menus, only redirect and do not add searchParams
        if (key === CALENDAR_MENU_TEXT) {
            redirect({ url: DENTIST_PROFILE_PAGE_URL });
            return null;
        }

        // add new searchParams to render next panel
        const params = queryString.parse(window.location.search);
        const newParams = {
            ...params,
            selectedTab: getKeyFromText(key),
        };
        addSearchParams(newParams);

        return null;
    };

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
        const { offices, preferredLocations, zipCode, dentistId } = this.props;

        switch (key) {
            case PROFILE_SETTINGS_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <KioskDentistProfilePage
                            onFinish={this.onDentistProfileFormComplete} // to render confirmation panel on finish
                            withoutProgressBar={true}
                            fromDentistDashboard={true}
                        />
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
                                zipCode={zipCode}
                                dentistId={dentistId}
                            />
                        </Card>
                        <Box mb="40px" />
                        <Card>
                            {this.renderPanelHeader(key)}
                            <DentistAvailabilityForm />
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
                            withoutProgressBar={true}
                            fromDentistDashboard={true}
                        />
                    </Card>
                );
                break;
            case CREATE_A_NEW_APPOINTMENT_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <NewAppointment />
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
            case BOOKINGS_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <DentistAppointments />
                    </Card>
                );
                break;
            case LAGURO_BALANCE_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <BalanceHistory
                            userId={this.props.userId}
                            persona={DENTIST}
                        />
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
                                viewOnly={true}
                            />
                            <ReviewContainer
                                type={DENTIST}
                                id={this.props.dentistId}
                                viewOnly={true}
                            />
                        </Container>
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
                                    to={
                                        currentUrl.includes('laguro-stage')
                                            ? 'http://ltm.laguro-stage.com/'
                                            : 'http://ltm.laguro.com/'
                                    }
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
export default withScreenSizes(DentistDashboardPageView);
