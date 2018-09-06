import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';
import ReviewContainer from './ReviewContainer';
import PatientAppointments from './PatientAppointments';
import UserOfficeIndex from './UserOfficeIndex';
import UserReservationIndex from './UserReservationIndex';
import ProfileActions from './ProfileActions';
import * as actions from '../actions';
import { dentistProfilePageFragment } from '../util/fragments';
import { Flex, Box, Typography } from './common';

const loadDentistProfileQuery = `
    query ($id: String!) {
        getDentist(id: $id) {
            ${dentistProfilePageFragment}
        }
    }
`;

const StyledContainer = styled(Flex)`
    width: 90%;
    margin: 3em auto;
    max-width: 850px;
    flex-direction: row;

    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`;

const StyledSidebar = styled(Box)`
    width: calc(100% * 1 / 3);

    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

const StyledMain = styled(Box)`
    width: calc(100% * 2 / 3);

    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

const StyledDesktopHeader = styled(Box)`
    display: block;

    @media screen and (max-width: 700px) {
        display: none;
    }
`;

const StyledMobileHeader = styled(Box)`
    display: none;

    @media screen and (max-width: 700px) {
        display: block;
    }
`;

const StyledProfileImage = styled.img`
    @media screen and (max-width: 700px) {
        border-radius: 100%;
        display: block;
        width: 200px;
        height: 200px;
        margin: 0 auto;
        margin-bottom: 20px;
    }
`;

const ProfileHeader = ({ auth, dentist }) => {
    const firstName = auth && auth.firstName;
    const lastName = auth && auth.lastName;

    return (
        <Flex flexDirection="column" mb={4}>
            <Typography
                fontSize={5}
            >{`Welcome back ${firstName} ${lastName}!`}</Typography>
            <Typography fontSize={3}>
                {`${
                    dentist && dentist.location
                        ? `${dentist.location.name} - `
                        : ''
                }Member since ${moment(auth.date_created).format('MMMM `YY')}`}
            </Typography>
        </Flex>
    );
};

export const defaultProfilePhoto =
    'http://lh5.googleusercontent.com/-pJtmF-TTUxk/AAAAAAAAAAI/AAAAAAAAAAA/6ULkoHqUkSo/photo.jpg?sz=300';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        };
    }

    componentWillMount() {
        this.loadDentistProfile();
    }

    async loadDentistProfile() {
        const { auth } = this.props;
        this.setState({ isFetching: true });
        if (auth.dentistId) {
            await this.props.loadDentistProfile(
                loadDentistProfileQuery,
                auth.dentistId
            );
        }
        this.setState({ isFetching: false });
    }

    render() {
        const { auth, dentist } = this.props;
        const { isFetching } = this.state;
        if (isFetching) return <div className="stretch_height" />;
        const imageUrl =
            auth && auth.imageUrl ? auth.imageUrl : defaultProfilePhoto;
        const dentistId = auth && auth.dentistId ? auth.dentistId : null;

        return (
            <StyledContainer className="stretch_height">
                <StyledSidebar mr={4}>
                    <StyledMobileHeader>
                        <ProfileHeader auth={auth} dentist={dentist} />
                    </StyledMobileHeader>
                    <StyledProfileImage
                        data-name="profile-image"
                        src={imageUrl}
                        alt="user"
                    />
                    <ProfileActions auth={auth} dentist={dentist} />
                </StyledSidebar>
                <StyledMain>
                    <StyledDesktopHeader>
                        <ProfileHeader auth={auth} dentist={dentist} />
                    </StyledDesktopHeader>
                    {dentistId && (
                        <Box mb={4}>
                            <h5>Your Offices</h5>
                            <UserOfficeIndex />
                        </Box>
                    )}
                    {dentistId && (
                        <Box mb={4}>
                            <h5>Upcoming Reservations</h5>
                            <UserReservationIndex />
                        </Box>
                    )}
                    <Box mb={4}>
                        <h5>Upcoming Appointments</h5>
                        <PatientAppointments patientId={auth.id} />
                    </Box>
                    {dentistId &&
                        dentist &&
                        dentist.reviews &&
                        dentist.reviews.length > 0 && (
                            <Box className="reviews profile-section">
                                <h5>{`Reviews for ${auth.name}`}</h5>
                                <ReviewContainer
                                    revieweeId={dentist.id}
                                    revieweeName={auth.name}
                                    reviews={dentist.reviews}
                                />
                            </Box>
                        )}
                </StyledMain>
            </StyledContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentist: state.dentists.selectedDentist,
    };
}

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { Profile as NoReduxProfile };
export default connect(
    mapStateToProps,
    actions
)(Profile);
