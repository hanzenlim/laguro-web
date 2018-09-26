import React, { Component } from 'react';
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
import {
    DENTIST,
    OFFICE,
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
} from '../../util/strings';

const Grid = styled(Box)`
    display: grid;
    grid-template-columns: 280px 632px;
    grid-column-gap: 70px;
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
        const { persona, dentistId, offices, userId } = this.props;

        switch (key) {
            case MY_PROFILE:
                return <UpdateProfileForm />;
            case MY_DOCUMENTS:
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        My documents
                    </Text>
                );
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
                return persona === DENTIST ? (
                    <Box>
                        <DentistDetails id={dentistId} viewOnly={true} />
                        <ReviewContainer
                            type={DENTIST}
                            id={dentistId}
                            viewOnly={true}
                        />
                    </Box>
                ) : (
                    <Box width="732px" mt={30} mr={34}>
                        <OfficeDetails id={offices[0].id} viewOnly={true} />
                        <ReviewContainer
                            type={OFFICE}
                            id={offices[0].id}
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
        const { persona } = this.props;

        return (
            <Container maxWidth="1050px">
                <Grid mt={70}>
                    <Box>
                        <Menu
                            defaultSelectedKeys={[panelName]}
                            onClick={this.handleClick}
                        >
                            <Menu.Item key={MY_PROFILE}>
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    my profile
                                </Text>
                            </Menu.Item>
                            {(persona === HOST || persona === DENTIST) && (
                                <Menu.Item key={DENTIST_PROFILE}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        dentist profile
                                    </Text>
                                </Menu.Item>
                            )}
                            <Menu.Item key={MY_DOCUMENTS}>
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    my documents
                                </Text>
                            </Menu.Item>
                            <Menu.Item key={MY_APPOINTMENTS}>
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    my appointments
                                </Text>
                            </Menu.Item>
                            {persona === HOST && (
                                <Menu.Item key={MY_LISTINGS}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        my listings
                                    </Text>
                                </Menu.Item>
                            )}
                            {persona === DENTIST && (
                                <Menu.Item key={MY_BOOKINGS}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        my bookings
                                    </Text>
                                </Menu.Item>
                            )}
                            <Menu.Item key={PAYMENTS}>
                                <Text
                                    fontSize={4}
                                    color="inherit"
                                    lineHeight="40px"
                                >
                                    payments
                                </Text>
                            </Menu.Item>
                            {(persona === HOST || persona === DENTIST) && (
                                <Menu.Item key={BALANCE}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        balance
                                    </Text>
                                </Menu.Item>
                            )}
                            {persona === DENTIST && (
                                <Menu.Item key={PUBLIC_PROFILE}>
                                    <Text
                                        fontSize={4}
                                        color="inherit"
                                        lineHeight="40px"
                                    >
                                        public profile
                                    </Text>
                                </Menu.Item>
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
