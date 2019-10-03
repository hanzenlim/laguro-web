import React, { Component, Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import UpdateProfileForm from '~/common/Forms/UpdateProfileForm';
import ContactInformationForm from '~/common/Forms/ContactInformationForm';
// import PaymentHistory from '~/common/PaymentHistory'; //TODO We need to remove the code relateded with this old page
import Family from '~/common/Family';
import PatientAppointments from '~/common/PatientAppointments';
import ProcedurePaymentRequestPage from '~/routes/ProcedurePaymentRequestPage';
import {
    // profile menu
    ACCOUNT_SETTINGS_MENU_TEXT,
    APPOINTMENTS_MENU_TEXT,
    DENTAL_RECORDS_MENU_TEXT,
    MEDICAL_HISTORY_MENU_TEXT,
    INSURANCE_MENU_TEXT,
    PENDING_REQUESTS_MENU_TEXT,
    LOG_OUT_MENU_TEXT,
    INSURANCE_CONFIRMATION_TEXT,
    LAGURO_WALLET_MENU_TEXT,
    FAMILY_PLAN_MENU_TEXT,
} from '~/util/strings';
import { profileMenuTexts } from '~/util/menuItems';
import { getLTMBaseUrl } from '~/util/urls';
import { onLogout } from '~/util/authUtils';
import KioskMedicalHistoryFormPage from '~/common/KioskMedicalHistoryFormPage';
import { getKeyFromText } from '../Dashboard/utils';
import Confirmation from '../Dashboard/Confirmation';
import {
    DashboardGrid,
    StyledDashboardMenu,
    StyledDashboardMenuItem,
} from '../Dashboard/common';
import { Box, Text, Card, Truncate, Responsive, Container } from '~/components';
import PatientInsuranceForm from '~/common/PatientInsuranceForm';
import { version } from '~/package.json';
import WalletDashboard from '~/common/WalletDashboard';
// import { AppContextConsumer } from '../../../appContext'; todo

const { TabletMobile, Desktop, withScreenSizes } = Responsive;

const menuTextToDescription = {
    [ACCOUNT_SETTINGS_MENU_TEXT]:
        'View and edit your general information and notification settings ',
    [FAMILY_PLAN_MENU_TEXT]:
        "View, manage, and update your family members' information",
    [APPOINTMENTS_MENU_TEXT]: 'View your upcoming dentist visits',
    [DENTAL_RECORDS_MENU_TEXT]:
        'View your previous treatment details, dental charts, and x-rays',
    [MEDICAL_HISTORY_MENU_TEXT]:
        'View and edit your medical history information',
    [INSURANCE_MENU_TEXT]: 'View and edit your dental insurance information',
    [PENDING_REQUESTS_MENU_TEXT]:
        'View procedure payment requests from your dentist',
    [LAGURO_WALLET_MENU_TEXT]: 'View current balance and past transactions',
    [LOG_OUT_MENU_TEXT]: '',
};

const LTM_LINK_BASE_URL = getLTMBaseUrl();

const StyledCard = styled(Card)`
    &&.ant-card {
        min-height: calc(100vh - 73px);
    }
`;

class PatientDashboardPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInsuranceConfirmation: false,
            showMedicalHistoryConfirmation: false,
        };
    }

    componentDidUpdate() {
        // this is so that insuranceConfirmation is only displayed once, but since insuranceConfirmation is not a state variable, this function does not cause a re-render
        if (this.state.showInsuranceConfirmation) {
            this.insuranceConfirmation = null;
        }
        // this is so that medicalHistoryConfirmation is only displayed once, but since medicalHistoryConfirmation is not a state variable, this function does not cause a re-render
        if (this.state.showMedicalHistoryConfirmation) {
            this.medicalHistoryConfirmation = null;
        }
    }

    // this will be displayed instead of the dentist insurance form. insuranceConfirmation will be turned back to null if displayed once, due to componentDidUpdate
    onInsuranceFormComplete = () => {
        this.insuranceConfirmation = (
            <Card>
                <Confirmation ownMessage={INSURANCE_CONFIRMATION_TEXT} />
            </Card>
        );
        this.setState({ showInsuranceConfirmation: true }); // this will cause a re-render to show insuranceConfirmation
    };

    // this will be displayed instead of the dentist medical history form. medicalHistoryConfirmation will be turned back to null if displayed once, due to componentDidUpdate
    onMedicalHistoryFormComplete = () => {
        this.medicalHistoryConfirmation = (
            <Card>
                <Confirmation formName={MEDICAL_HISTORY_MENU_TEXT} />
            </Card>
        );
        this.setState({ showMedicalHistoryConfirmation: true }); // this will cause a re-render to show medicalHistoryConfirmation
    };

    // add new searchParams to render next panel
    handleClick = ({ key }) => {
        const url = `${LTM_LINK_BASE_URL}/go?to=/chart`;
        if (key === DENTAL_RECORDS_MENU_TEXT) {
            window.open(url, '_blank');
            return;
        }

        if (key === LOG_OUT_MENU_TEXT) {
            onLogout();
        }

        const { history, location } = this.props;

        const params = queryString.parse(location.search);
        const newParams = {
            ...params,
            selectedTab: getKeyFromText(key),
        };

        if (this.props.refetch) {
            this.props.refetch();
        }

        history.push(`/patient?${queryString.stringify(newParams)}`);
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
        switch (key) {
            case ACCOUNT_SETTINGS_MENU_TEXT:
                panelContent = (
                    <Box>
                        <Card>
                            {this.renderPanelHeader('Account settings')}
                            <UpdateProfileForm />
                        </Card>
                        <Box mb="40px" />
                        <Card>
                            {this.renderPanelHeader('Contact information')}
                            <ContactInformationForm />
                        </Card>
                    </Box>
                );
                break;
            case FAMILY_PLAN_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <Family />
                    </Card>
                );
                break;
            case APPOINTMENTS_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <PatientAppointments />
                    </Card>
                );
                break;
            case MEDICAL_HISTORY_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <KioskMedicalHistoryFormPage
                            onFinish={this.onMedicalHistoryFormComplete} // to render confirmation panel on finish
                            fromPatientDashboard
                            withoutProgressBar
                            cannotSkip // medical history form has a skip to insurance button. does not make sense to skip to insurance in medical history panel
                        />
                    </Card>
                );
                break;
            case INSURANCE_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <PatientInsuranceForm
                            onFinish={this.onInsuranceFormComplete} // to render confirmation panel on finish
                        />
                    </Card>
                );
                break;
            case PENDING_REQUESTS_MENU_TEXT:
                panelContent = (
                    <Card>
                        {this.renderPanelHeader(key)}
                        <ProcedurePaymentRequestPage />
                    </Card>
                );
                break;
            case LAGURO_WALLET_MENU_TEXT:
                panelContent = (
                    <StyledCard>
                        {this.renderPanelHeader(key)}
                        <WalletDashboard />
                    </StyledCard>
                );
                break;
            // case LOG_OUT_MENU_TEXT:
            //     this.props.setIsAuth(false);
            //     onLogout();
            //     break;
            default:
        }

        return (
            <Box pt={[10, '', 0]}>{this.renderPanelContent(panelContent)}</Box>
        );
    };

    renderPanelContent = panelContent => {
        // insuranceConfirmation will be null if it has been rendered once, due to componentDidUpdate
        // if insuranceConfirmation is not null, it means it has just been set by onInsuranceFormComplete and it needs to be shown for the first time
        if (
            !_isEmpty(this.insuranceConfirmation) &&
            this.state.showInsuranceConfirmation
        ) {
            return this.insuranceConfirmation;
        }
        // medicalHistoryConfirmation will be null if it has been rendered once, due to componentDidUpdate
        // if medicalHistoryConfirmation is not null, it means it has just been set by onMedicalHistoryFormComplete and it needs to be shown for the first tim
        else if (
            !_isEmpty(this.medicalHistoryConfirmation) &&
            this.state.showMedicalHistoryConfirmation
        ) {
            return this.medicalHistoryConfirmation;
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
                {profileMenuTexts.map(menuText => (
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
                        <Text mt={20} mb={13} fontWeight="medium" fontSize={4}>
                            General Dashboard
                            <Text
                                is="span"
                                fontSize={1}
                                color="text.darkGray"
                                ml={10}
                            >
                                {`v${version}`}
                            </Text>
                        </Text>
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

export default withRouter(withScreenSizes(PatientDashboardPageView));
