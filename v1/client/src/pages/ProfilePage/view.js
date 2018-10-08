import React, { Component } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import history from '../../history';

import { Box, Container, Text } from '../../components/';
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
} from '../../util/strings';

const Grid = styled(Box)`
    display: grid;
    grid-template-columns: 290px 632px;
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
`;

const StyledPreviewMenuItem = styled(Menu.Item)`
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
`;

class ProfileView extends Component {
    constructor(props) {
        super(props);

        const params = queryString.parse(window.location.search);

        this.state = {
            panel: params.selectedTab || MY_PROFILE,
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
        const { isHost, isDentist, dentistId, userId } = this.props;

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
                return <BalanceHistory userId={userId} />;
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
                        <DentistDetails id={dentistId} viewOnly={true} />
                        <ReviewContainer
                            type={DENTIST}
                            id={dentistId}
                            viewOnly={true}
                        />
                    </Box>
                );
            default:
        }

        return '';
    };

    render() {
        const { panel } = this.state;
        const { isDentist, isHost } = this.props;

        return (
            <Container maxWidth="1050px">
                <Grid mt={70} pb={50}>
                    <Box>
                        <Menu
                            selectedKeys={[panel]}
                            defaultSelectedKeys={[panel]}
                            onClick={this.handleClick}
                        >
                            <MenuTitle title="My Page" />

                            <StyledMenuItem key={MY_PROFILE}>
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    My Account
                                </Text>
                            </StyledMenuItem>
                            {(isDentist || isHost) && (
                                <StyledMenuItem key={DENTIST_PROFILE}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        My Profile
                                    </Text>
                                </StyledMenuItem>
                            )}
                            {isDentist && (
                                <StyledMenuItem key={MY_PATIENTS}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        My Patients
                                    </Text>
                                </StyledMenuItem>
                            )}
                            <StyledMenuItem key={MY_DOCUMENTS}>
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    My Documents
                                </Text>
                            </StyledMenuItem>
                            {!isDentist &&
                                !isHost && (
                                    <StyledMenuItem key={MY_APPOINTMENTS}>
                                        <Text
                                            fontSize={4}
                                            color="inherit"
                                            lineHeight="40px"
                                        >
                                            My Appointments
                                        </Text>
                                    </StyledMenuItem>
                                )}
                            {isHost && (
                                <StyledMenuItem key={MY_LISTINGS}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        My Listings
                                    </Text>
                                </StyledMenuItem>
                            )}
                            {isDentist && (
                                <StyledMenuItem key={MY_BOOKINGS}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        Bookings & Appointments
                                    </Text>
                                </StyledMenuItem>
                            )}
                            <Box mt={40} />
                            <StyledMenuItem key={PAYMENTS}>
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    Payment History
                                </Text>
                            </StyledMenuItem>

                            {(isHost || isDentist) && (
                                <StyledMenuItem key={BALANCE}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        Laguro Balance
                                    </Text>
                                </StyledMenuItem>
                            )}
                            <Box mt={40} />
                            {isDentist &&
                                !isHost && (
                                    <StyledPreviewMenuItem key={PUBLIC_PROFILE}>
                                        <Text
                                            fontSize={4}
                                            color="inherit"
                                            lineHeight="40px"
                                        >
                                            Preview Public Profile
                                        </Text>
                                    </StyledPreviewMenuItem>
                                )}
                        </Menu>
                    </Box>
                    {this.renderPanel(panel)}
                </Grid>
            </Container>
        );
    }
}
export default ProfileView;
