import React, { Component, Fragment } from 'react';
import { Box, Text, Card, Truncate } from '@laguro/basic-components';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import UpdateProfileForm from '../../pages/common/Forms/UpdateProfileForm';
import PaymentHistory from '../common/PaymentHistory';
import PatientAppointments from '../common/PatientAppointments';
import ProcedurePaymentRequestPage from '../../pages/ProcedurePaymentRequestPage';
import {
    // profile menu
    ACCOUNT_SETTINGS_MENU_TEXT,
    APPOINTMENTS_MENU_TEXT,
    MEDICAL_HISTORY_MENU_TEXT,
    INSURANCE_MENU_TEXT,
    PENDING_REQUESTS_MENU_TEXT,
    RECEIPTS_MENU_TEXT,
    PAYMENT_METHODS_MENU_TEXT,
} from '../../util/strings';
import { profileMenuTexts } from '../../util/menuItems';
import KioskMedicalHistoryFormPage from '../KioskMedicalHistoryFormPage';
import KioskInsurancePage from '../KioskInsurancePage';
import { getKeyFromText } from '../Dashboard/utils';
import { addSearchParams } from '../../history';
import Confirmation from '../Dashboard/Confirmation';
import {
    DashboardGrid,
    StyledDashboardMenu,
    StyledDashboardMenuItem,
} from '../Dashboard/common';
import PaymentMethods from '../PaymentMethods';
import { Responsive, Container } from '../../components/index';

const { TabletMobile, Desktop, withScreenSizes } = Responsive;

const menuTextToDescription = {
    [ACCOUNT_SETTINGS_MENU_TEXT]:
        'View and edit your general information and notification settings ',
    [APPOINTMENTS_MENU_TEXT]: 'View your upcoming dentist visits',
    [MEDICAL_HISTORY_MENU_TEXT]:
        'View and edit your medical history information',
    [INSURANCE_MENU_TEXT]: 'View and edit your dental insurance information',
    [PENDING_REQUESTS_MENU_TEXT]:
        'View procedure payment requests from your dentist',
    [RECEIPTS_MENU_TEXT]:
        'View details about your completed treatment payments and print invoices',
    [PAYMENT_METHODS_MENU_TEXT]: 'Manage your payment options',
};

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

    // add new searchParams to render next panel
    handleClick = ({ key }) => {
        const params = queryString.parse(window.location.search);
        const newParams = {
            ...params,
            selectedTab: getKeyFromText(key),
        };
        addSearchParams(newParams);
    };

    // this will be displayed instead of the dentist insurance form. insuranceConfirmation will be turned back to null if displayed once, due to componentDidUpdate
    onInsuranceFormComplete = () => {
        this.insuranceConfirmation = (
            <Confirmation formName={INSURANCE_MENU_TEXT} />
        );
        this.setState({ showInsuranceConfirmation: true }); // this will cause a re-render to show insuranceConfirmation
    };

    // this will be displayed instead of the dentist medical history form. medicalHistoryConfirmation will be turned back to null if displayed once, due to componentDidUpdate
    onMedicalHistoryFormComplete = () => {
        this.medicalHistoryConfirmation = (
            <Confirmation formName={MEDICAL_HISTORY_MENU_TEXT} />
        );
        this.setState({ showMedicalHistoryConfirmation: true }); // this will cause a re-render to show medicalHistoryConfirmation
    };

    renderPanel = key => {
        const { userId } = this.props;

        let panelContent;
        let TabletMobileContainerComponent = Container;

        switch (key) {
            case ACCOUNT_SETTINGS_MENU_TEXT:
                panelContent = <UpdateProfileForm />;
                TabletMobileContainerComponent = Fragment;
                break;
            case APPOINTMENTS_MENU_TEXT:
                panelContent = <PatientAppointments />;
                TabletMobileContainerComponent = Fragment;
                break;
            case MEDICAL_HISTORY_MENU_TEXT:
                panelContent = (
                    <KioskMedicalHistoryFormPage
                        onFinish={this.onMedicalHistoryFormComplete} // to render confirmation panel on finish
                        fromPatientDashboard={true}
                        withoutProgressBar={true}
                        cannotSkip={true} // medical history form has a skip to insurance button. does not make sense to skip to insurance in medical history panel
                    />
                );
                break;
            case INSURANCE_MENU_TEXT:
                panelContent = (
                    <KioskInsurancePage
                        onFinish={this.onInsuranceFormComplete} // to render confirmation panel on finish
                        fromPatientDashboard={true}
                        withoutProgressBar={true}
                    />
                );
                TabletMobileContainerComponent = Fragment;
                break;
            case PENDING_REQUESTS_MENU_TEXT:
                panelContent = <ProcedurePaymentRequestPage />;
                break;
            case RECEIPTS_MENU_TEXT:
                panelContent = <PaymentHistory userId={userId} />;
                TabletMobileContainerComponent = Fragment;
                break;
            case PAYMENT_METHODS_MENU_TEXT:
                panelContent = <PaymentMethods />;
                break;
            default:
        }

        const ContainerComponent = this.props.tabletMobileOnly
            ? TabletMobileContainerComponent
            : Card;

        return (
            <ContainerComponent>
                <Desktop>
                    <Box
                        borderBottom="solid 0.5px"
                        borderColor="divider.gray"
                        width="100%"
                        mb={30}
                    >
                        <Text mb={15} fontWeight="bold" fontSize={1}>
                            {key}
                        </Text>
                    </Box>
                </Desktop>

                {this.renderPanelContent(panelContent)}
            </ContainerComponent>
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
        else {
            return panelContent;
        }
    };
    renderMenu = panel => {
        return (
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
    };

    render() {
        return (
            <Fragment>
                <TabletMobile>
                    <Container>
                        <Text
                            fontSize={1}
                            color="text.blue"
                            fontWeight="bold"
                            lineHeight={2.86}
                            my={8}
                        >
                            {this.props.panel}
                        </Text>
                    </Container>
                    <Box pb={50}>{this.renderPanel(this.props.panel)}</Box>
                </TabletMobile>
                <Desktop>
                    <Container>
                        <Text mt={20} mb={13} fontWeight="medium" fontSize={4}>
                            Patient Dashboard
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
export default withScreenSizes(PatientDashboardPageView);
