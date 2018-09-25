import React, { Component } from 'react';
import styled from 'styled-components';

import { Box, Container, Text } from '../../components/';
import UpdateProfileForm from '../../pages/common/Forms/UpdateProfileForm';
import Menu from '../common/Menu';
import DentistDetails from '../common/DentistDetails';
import OfficeDetails from '../common/OfficeDetails';
import ReviewContainer from '../common/ReviewContainer';
import HostListings from '../common/HostListings';
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
        this.state = { panel: this.renderPanel(MY_PROFILE) };
    }

    handleClick = ({ key }) => {
        this.setState({ panel: this.renderPanel(key) });
    };

    renderPanel = key => {
        const { persona, dentistId, offices } = this.props;
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
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        Payment
                    </Text>
                );
            case BALANCE:
                return (
                    <Text fontSize={4} color="inherit" lineHeight="40px">
                        Balance
                    </Text>
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
        const { panel } = this.state;
        const { persona } = this.props;

        return (
            <Container maxWidth="1050px">
                <Grid mt={70}>
                    <Box>
                        <Menu
                            defaultSelectedKeys={[MY_PROFILE]}
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
                            {(persona === HOST || persona === DENTIST) && (
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
