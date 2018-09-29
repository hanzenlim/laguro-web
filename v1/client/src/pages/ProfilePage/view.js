import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import history from '../../history';

import { Box, Container, Text } from '../../components/';
import UpdateProfileForm from '../../pages/common/Forms/UpdateProfileForm';
import Menu from '../common/Menu';
import DentistDetails from '../common/DentistDetails';
import UpdateDentistProfileForm from '../../pages/common/Forms/UpdateDentistProfileForm';
import OfficeDetails from '../common/OfficeDetails';
import ReviewContainer from '../common/ReviewContainer';
import HostListings from '../common/HostListings';
import PaymentHistory from '../common/PaymentHistory';
import BalanceHistory from '../common/BalanceHistory';
import DentistAppointments from '../common/DentistAppointments';
import PatientAppointments from '../common/PatientAppointments';
import UserVerification from '../common/UserVerification';
import {
    DENTIST,
    PATIENT,
    HOST,
    OFFICE,
    MY_DOCUMENTS,
    MY_PROFILE,
    MY_APPOINTMENTS,
    MY_LISTINGS,
    PAYMENTS,
    BALANCE,
    PUBLIC_PROFILE,
    DENTIST_PROFILE,
    MY_BOOKINGS,
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

class ProfileView extends Component {
    constructor(props) {
        super(props);

        const params = queryString.parse(window.location.search);
        const panelName = params.selectedTab;

        this.state = {
            panelName,
            panel: this.renderPanel(panelName || MY_PROFILE),
        };
    }

    handleClick = ({ key }) => {
        const params = queryString.parse(window.location.search);
        const newParams = queryString.stringify({
            ...params,
            selectedTab: key,
        });
        history.push(`/profile?${newParams}`);
        this.setState({ panel: this.renderPanel(key) });
    };

    renderPanel = key => {
        const { isHost, isDentist, dentistId, offices, userId } = this.props;

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
            case DENTIST_PROFILE:
                return (
                    <Box>
                        <UpdateDentistProfileForm />
                    </Box>
                );

            case PUBLIC_PROFILE:
                return isHost === true ? (
                    <Box width="732px" mt={30} mr={34}>
                        <OfficeDetails id={offices[0].id} viewOnly={true} />
                        <ReviewContainer
                            type={OFFICE}
                            id={offices[0].id}
                            viewOnly={true}
                        />
                    </Box>
                ) : (
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
        const { panel, panelName = MY_PROFILE } = this.state;
        const { isDentist, isHost } = this.props;

        return (
            <Container maxWidth="1050px">
                <Grid mt={70}>
                    <Box>
                        <Menu
                            defaultSelectedKeys={[panelName]}
                            onClick={this.handleClick}
                        >
                            <Text
                                fontSize={4}
                                color="text.blue"
                                mr={200}
                                mb={30}
                                fontWeight="bold"
                            >
                                my page
                            </Text>
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
                            {(isDentist || isHost) && (
                                <Fragment>
                                    <Box mt={40} />
                                    <StyledMenuItem key={PUBLIC_PROFILE}>
                                        <Text
                                            fontSize={4}
                                            color="inherit"
                                            lineHeight="40px"
                                        >
                                            Preview Public Profile
                                        </Text>
                                    </StyledMenuItem>
                                </Fragment>
                            )}
                        </Menu>
                    </Box>
                    {panel}
                </Grid>
            </Container>
        );
    }
}
export default ProfileView;
