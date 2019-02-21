import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { Box, Container, Text, Responsive } from '../../components/';
import UpdateProfileForm from '../../pages/common/Forms/UpdateProfileForm';
import Menu from '../common/Menu';
import DentistDetails from '../common/DentistDetails';
import ReviewContainer from '../common/ReviewContainer';
import HostListings from '../common/HostListings';
import PaymentHistory from '../common/PaymentHistory';
import BalanceHistory from '../common/BalanceHistory';
import DentistAppointments from '../common/DentistAppointments';
import NewAppointment from '../common/NewAppointment';
import PatientAppointments from '../common/PatientAppointments';
import PatientsList from '../common/PatientsList';
import ProcedurePaymentRequestPage from '../../pages/ProcedurePaymentRequestPage';
import Error404Page from '../../pages/Error404Page';
import {
    DENTIST,
    PATIENT,
    HOST,
    MY_INSURANCE,
    MY_PROFILE,
    MY_APPOINTMENTS,
    MY_LISTINGS,
    PAYMENTS,
    BALANCE,
    PUBLIC_PROFILE,
    DENTIST_PROFILE,
    MY_BOOKINGS,
    NEW_APPOINTMENT,
    MY_PATIENTS,
    PAYMENT_REQUEST,
    MY_ACCOUNT_MENU,
    MY_INSURANCE_MENU,
    MY_PROFILE_MENU,
    MY_APPOINTMENTS_MENU,
    PAYMENT_HISTORY_MENU,
    LAGURO_BALANCE_MENU,
    PREVIEW_PUBLIC_PROFILE_MENU,
    MY_LISTINGS_MENU,
    MY_BOOKINGS_MENU,
    NEW_APPOINTMENT_MENU,
    MY_PATIENTS_MENU,
    PAYMENT_REQUEST_MENU,
} from '../../util/strings';
import {
    DENTIST_ONBOARDING_PROFILE_URL,
    PATIENT_ONBOARDING_INSURANCE_FORM,
} from '../../util/urls';
import history, { redirect } from '../../history';

const { TabletMobile, Desktop } = Responsive;

const contentWidth = Math.min(window.innerWidth * 0.8, 1050);
const menuColumnWidth = contentWidth * 0.28;
const contentColumnWidth = contentWidth * 0.6;

const Grid = styled(Box)`
    display: grid;
    grid-template-columns: ${menuColumnWidth}px ${contentColumnWidth}px;
    grid-column-gap: 70px;
`;

const StyledMenuItem = styled(Menu.Item)`
    &&.ant-menu-item-selected {
        border-right: 4px solid;
        border-color: ${props => props.theme.colors.divider.blue};
    }
`;

const MenuTitle = styled(Menu.SubMenu)`
    ${`.ant-menu`} & {
        position: relative;
    }

    && {
        position: relative;
        left: -15px;

        div {
            cursor: default;
            font-size: 20px;
        }

        i {
            display: none;
        }

        .ant-menu-submenu-title:hover {
            color: inherit;
        }
    }
`;

const StyledPreviewMenuItem = styled(Menu.Item)`
    @media (min-width: 992px) {
        ${`.ant-menu`} & {
            position: relative;
        }
        && {
            position: relative;
            left: -15px;

            div {
                font-size: 20px;
            }

            i {
                display: none;
            }
        }
    }
`;

class ProfileView extends Component {
    constructor(props) {
        super(props);

        const params = queryString.parse(window.location.search);

        this.state = {
            panel: params.selectedTab || MY_PROFILE,
        };

        this.keyTextMap = {
            [MY_PROFILE]: MY_ACCOUNT_MENU,
            [DENTIST_PROFILE]: MY_PROFILE_MENU,
            [MY_PATIENTS]: MY_PATIENTS_MENU,
            [MY_INSURANCE]: MY_INSURANCE_MENU,
            [MY_APPOINTMENTS]: MY_APPOINTMENTS_MENU,
            [MY_LISTINGS]: MY_LISTINGS_MENU,
            [MY_BOOKINGS]: MY_BOOKINGS_MENU,
            [NEW_APPOINTMENT]: NEW_APPOINTMENT_MENU,
            [PAYMENTS]: PAYMENT_HISTORY_MENU,
            [BALANCE]: LAGURO_BALANCE_MENU,
            [PUBLIC_PROFILE]: PREVIEW_PUBLIC_PROFILE_MENU,
            [PAYMENT_REQUEST]: PAYMENT_REQUEST_MENU,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const params = queryString.parse(window.location.search);
        if (params.selectedTab !== prevState.panel) {
            this.setState({ panel: params.selectedTab });
        }
    }

    handleClick = ({ key }) => {
        const params = queryString.parse(window.location.search);
        const newParams = queryString.stringify({
            ...params,
            selectedTab: key,
        });
        history.push(`/profile?${newParams}`);
        this.setState({ panel: key });
    };

    renderPanel = key => {
        const { isHost, isDentist, dentistId, userId, dentist } = this.props;

        let persona = PATIENT;
        if (isHost) {
            persona = HOST;
        } else if (isDentist) {
            persona = DENTIST;
        }

        switch (key) {
            case MY_PROFILE:
                return <UpdateProfileForm />;
            case MY_INSURANCE:
                return redirect({
                    url: PATIENT_ONBOARDING_INSURANCE_FORM,
                    includeNewRedirectTo: true,
                    newSearchParamKey: 'referer',
                    newSearchParamValue: 'ProfilePage',
                });
            case MY_APPOINTMENTS:
                return <PatientAppointments />;
            case MY_LISTINGS:
                return <HostListings />;
            case MY_BOOKINGS:
                return <DentistAppointments />;
            case NEW_APPOINTMENT:
                return <NewAppointment />;
            case PAYMENTS:
                return <PaymentHistory userId={userId} />;
            case BALANCE:
                return <BalanceHistory userId={userId} persona={persona} />;
            case MY_PATIENTS:
                return <PatientsList />;
            case DENTIST_PROFILE:
                return redirect({
                    url: DENTIST_ONBOARDING_PROFILE_URL,
                    includeNewRedirectTo: true,
                    newSearchParamKey: 'referer',
                    newSearchParamValue: 'ProfilePage',
                });
            case PUBLIC_PROFILE:
                return (
                    <Container px={[25, '', 0]}>
                        <DentistDetails dentist={dentist} viewOnly={true} />
                        <ReviewContainer
                            type={DENTIST}
                            id={dentistId}
                            viewOnly={true}
                        />
                    </Container>
                );
            case PAYMENT_REQUEST:
                return <ProcedurePaymentRequestPage />;
            default:
        }

        return '';
    };

    renderMenu = () => {
        const { isDentist, isHost } = this.props;
        const { panel } = this.state;
        return (
            <Menu
                selectedKeys={[panel]}
                defaultSelectedKeys={[panel]}
                onClick={this.handleClick}
            >
                <Desktop>
                    <MenuTitle title="My Page" />
                </Desktop>

                <StyledMenuItem key={MY_PROFILE}>
                    <Text
                        fontSize={[1, '', 4]}
                        color="inherit"
                        lineHeight={['48px', '', '40px']}
                    >
                        {this.keyTextMap[MY_PROFILE]}
                    </Text>
                </StyledMenuItem>
                {(isDentist || isHost) && (
                    <StyledMenuItem key={DENTIST_PROFILE}>
                        <Text
                            fontSize={[1, '', 4]}
                            color="inherit"
                            lineHeight={['48px', '', '40px']}
                        >
                            {this.keyTextMap[DENTIST_PROFILE]}
                        </Text>
                    </StyledMenuItem>
                )}
                {isDentist && (
                    <StyledMenuItem key={MY_PATIENTS}>
                        <Text
                            fontSize={[1, '', 4]}
                            color="inherit"
                            lineHeight={['48px', '', '40px']}
                        >
                            {this.keyTextMap[MY_PATIENTS]}
                        </Text>
                    </StyledMenuItem>
                )}
                {!isHost && !isDentist && (
                    <StyledMenuItem key={MY_INSURANCE}>
                        <Text
                            fontSize={[1, '', 4]}
                            color="inherit"
                            lineHeight={['48px', '', '40px']}
                        >
                            {this.keyTextMap[MY_INSURANCE]}
                        </Text>
                    </StyledMenuItem>
                )}
                <StyledMenuItem key={MY_APPOINTMENTS}>
                    <Text
                        fontSize={[1, '', 4]}
                        color="inherit"
                        lineHeight={['48px', '', '40px']}
                    >
                        {this.keyTextMap[MY_APPOINTMENTS]}
                    </Text>
                </StyledMenuItem>

                {isHost && (
                    <StyledMenuItem key={MY_LISTINGS}>
                        <Text
                            fontSize={[1, '', 4]}
                            color="inherit"
                            lineHeight={['48px', '', '40px']}
                        >
                            {this.keyTextMap[MY_LISTINGS]}
                        </Text>
                    </StyledMenuItem>
                )}
                {isDentist && (
                    <StyledMenuItem key={MY_BOOKINGS}>
                        <Text
                            fontSize={[1, '', 4]}
                            color="inherit"
                            lineHeight={['48px', '', '40px']}
                        >
                            {this.keyTextMap[MY_BOOKINGS]}
                        </Text>
                    </StyledMenuItem>
                )}
                {isDentist && (
                    <StyledMenuItem key={NEW_APPOINTMENT}>
                        <Text
                            fontSize={[1, '', 4]}
                            color="inherit"
                            lineHeight={['48px', '', '40px']}
                        >
                            {this.keyTextMap[NEW_APPOINTMENT]}
                        </Text>
                    </StyledMenuItem>
                )}
                <Desktop>
                    <Box mt={40} />
                </Desktop>
                <StyledMenuItem key={PAYMENTS}>
                    <Text
                        fontSize={[1, '', 4]}
                        color="inherit"
                        lineHeight={['48px', '', '40px']}
                    >
                        {this.keyTextMap[PAYMENTS]}
                    </Text>
                </StyledMenuItem>

                {(isHost || isDentist) && (
                    <StyledMenuItem key={BALANCE}>
                        <Text
                            fontSize={[1, '', 4]}
                            color="inherit"
                            lineHeight={['48px', '', '40px']}
                        >
                            {this.keyTextMap[BALANCE]}
                        </Text>
                    </StyledMenuItem>
                )}
                <Desktop>
                    <Box mt={40} />
                </Desktop>
                {isDentist && !isHost && (
                    <StyledPreviewMenuItem key={PUBLIC_PROFILE}>
                        <Text
                            fontSize={[1, '', 4]}
                            color="inherit"
                            lineHeight={['48px', '', '40px']}
                        >
                            {this.keyTextMap[PUBLIC_PROFILE]}
                        </Text>
                    </StyledPreviewMenuItem>
                )}
                <Desktop>
                    <Box mt={40} />
                </Desktop>
                <StyledMenuItem key={PAYMENT_REQUEST}>
                    <Text
                        fontSize={[1, '', 4]}
                        color="inherit"
                        lineHeight={['48px', '', '40px']}
                    >
                        {this.keyTextMap[PAYMENT_REQUEST]}
                    </Text>
                </StyledMenuItem>
            </Menu>
        );
    };

    render() {
        const { panel } = this.state;

        if (!this.keyTextMap[this.state.panel]) return <Error404Page />;

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
                            {this.keyTextMap[this.state.panel]}
                        </Text>
                    </Container>
                    <Box pb={50}>{this.renderPanel(panel)}</Box>
                </TabletMobile>
                <Desktop>
                    <Container maxWidth="1050px">
                        <Grid mt={70} pb={50}>
                            {this.renderMenu()}
                            {this.renderPanel(panel)}
                        </Grid>
                    </Container>
                </Desktop>
            </Fragment>
        );
    }
}
export default ProfileView;
