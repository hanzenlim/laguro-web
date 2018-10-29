import React, { Component } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { Dropdown } from 'antd';
import history from '../../history';
import { Box, Container, Icon, Text, Responsive } from '../../components/';
import { ContainerPaddingInPixels } from '../../components/Container';
import UpdateProfileForm from '../../pages/common/Forms/UpdateProfileForm';
import Menu from '../common/Menu';
import DentistDetails from '../common/DentistDetails';
import UpdateDentistProfileForm from '../../pages/common/Forms/UpdateDentistProfileForm';
import ReviewContainer from '../common/ReviewContainer';
import HostListings from '../common/HostListings';
import PaymentHistory from '../common/PaymentHistory';
import BalanceHistory from '../common/BalanceHistory';
import DentistAppointments from '../common/DentistAppointments';
import PatientAppointments from '../common/PatientAppointments';
import UserVerification from '../common/UserVerification';
import PatientsList from '../common/PatientsList';
import ConsentAndPayment from '../../pages/ConsentAndPaymentPage';
import {
    DENTIST,
    PATIENT,
    HOST,
    MY_DOCUMENTS,
    MY_PROFILE,
    MY_APPOINTMENTS,
    MY_LISTINGS,
    PAYMENTS,
    BALANCE,
    PUBLIC_PROFILE,
    DENTIST_PROFILE,
    MY_BOOKINGS,
    MY_PATIENTS,
    PROCEDURES_CONSENT,
} from '../../util/strings';
import theme from '../../components/theme';
import { HEADER_HEIGHT } from '../common/Header/view';

const { TabletMobile, Desktop } = Responsive;

const contentWidth = Math.min(window.innerWidth * 0.8, 1050);
const menuColumnWidth = contentWidth * 0.28;
const contentColumnWidth = contentWidth * 0.6;
const DROPDOWN_TRIGGER_HEIGHT = 50;
const DROPDOWN_MENU_STARTING_POINT = DROPDOWN_TRIGGER_HEIGHT + HEADER_HEIGHT;

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

const StyledDropContainer = styled.div`
    @media (max-width: 991px) {
        .ant-dropdown {
            height: calc(100vh - ${DROPDOWN_MENU_STARTING_POINT}px);
            overflow-y: auto;
            background-color: ${theme.colors.background.lightGray};
            top: ${DROPDOWN_MENU_STARTING_POINT}px !important;
            left: 0 !important;
            right: 0 !important;
        }

        & .ant-dropdown-menu {
            padding: 0;
        }

        && .ant-dropdown-menu-item {
            padding: 0 ${ContainerPaddingInPixels}px;
            border-top: solid 1px #e5e5e5;
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
            [MY_PROFILE]: 'My Account',
            [DENTIST_PROFILE]: 'My Profile',
            [MY_PATIENTS]: 'My Patients',
            [MY_DOCUMENTS]: 'My Documents',
            [MY_APPOINTMENTS]: 'My Appointments',
            [MY_LISTINGS]: 'My Listings',
            [MY_BOOKINGS]: 'My Bookings',
            [PAYMENTS]: 'Payment History',
            [BALANCE]: 'Laguro Balance',
            [PUBLIC_PROFILE]: 'Preview Public Profile',
            [PROCEDURES_CONSENT]: 'Procedure Consent',
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
            case MY_DOCUMENTS:
                return <UserVerification persona={persona} />;
            case MY_APPOINTMENTS:
                return <PatientAppointments />;
            case MY_LISTINGS:
                return <HostListings />;
            case MY_BOOKINGS:
                return <DentistAppointments />;
            case PAYMENTS:
                return <PaymentHistory userId={userId} />;
            case BALANCE:
                return <BalanceHistory userId={userId} persona={persona} />;
            case MY_PATIENTS:
                return <PatientsList />;
            case DENTIST_PROFILE:
                return (
                    <Box>
                        <UpdateDentistProfileForm />
                    </Box>
                );
            case PUBLIC_PROFILE:
                return (
                    <Box>
                        <DentistDetails dentist={dentist} viewOnly={true} />
                        <ReviewContainer
                            type={DENTIST}
                            id={dentistId}
                            viewOnly={true}
                        />
                    </Box>
                );
            case PROCEDURES_CONSENT:
                return <ConsentAndPayment />;
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
                <StyledMenuItem key={MY_DOCUMENTS}>
                    <Text
                        fontSize={[1, '', 4]}
                        color="inherit"
                        lineHeight={['48px', '', '40px']}
                    >
                        {this.keyTextMap[MY_DOCUMENTS]}
                    </Text>
                </StyledMenuItem>

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
                {isDentist &&
                    !isHost && (
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
                <StyledMenuItem key={PROCEDURES_CONSENT}>
                    <Text
                        fontSize={[1, '', 4]}
                        color="inherit"
                        lineHeight={['48px', '', '40px']}
                    >
                        {this.keyTextMap[PROCEDURES_CONSENT]}
                    </Text>
                </StyledMenuItem>
            </Menu>
        );
    };

    render() {
        const { panel } = this.state;

        return (
            <Container maxWidth="1050px">
                <TabletMobile>
                    <Dropdown
                        overlay={this.renderMenu()}
                        placement={'bottomRight'}
                        trigger={['click']}
                        getPopupContainer={() =>
                            document.getElementById('profileDropdownContainer')
                        }
                    >
                        <a className="ant-dropdown-link" href="#">
                            <Text
                                is="span"
                                fontSize={1}
                                mr={6}
                                fontWeight="medium"
                                lineHeight="50px"
                                color="text.blue"
                            >
                                {this.keyTextMap[panel]}
                            </Text>
                            <Icon color="text.blue" type="down" />
                        </a>
                    </Dropdown>
                    <StyledDropContainer id="profileDropdownContainer" />
                    {this.renderPanel(panel)}
                </TabletMobile>
                <Desktop>
                    <Grid mt={70} pb={50}>
                        {this.renderMenu()}
                        {this.renderPanel(panel)}
                    </Grid>
                </Desktop>
            </Container>
        );
    }
}
export default ProfileView;
