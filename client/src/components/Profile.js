import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReviewContainer from './ReviewContainer';
import PatientAppointments from './PatientAppointments';
import UserOfficeIndex from './UserOfficeIndex';
import UserReservationIndex from './UserReservationIndex';
import ProfileActions from './ProfileActions';
import * as actions from '../actions';
import { dentistProfilePageFragment } from '../util/fragments';

const loadDentistProfileQuery = `
    query ($id: String!) {
        getDentist(id: $id) {
            ${dentistProfilePageFragment}
        }
    }
`;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false
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

    renderProfileDetails() {
        const { auth, dentist } = this.props;
        const firstName = auth && auth.firstName;
        const lastName = auth && auth.lastName;

        return (
            <div>
                <h4>{`Welcome back ${firstName} ${lastName}!`}</h4>
                <p>
                    {`${
                        dentist && dentist.location
                            ? `${dentist.location} - `
                            : ''
                    }Member since ${moment(auth.date_created).format(
                        'MMMM `YY'
                    )}`}
                </p>
            </div>
        );
    }

    render() {
        const { auth, dentist } = this.props;
        const { isFetching } = this.state;
        if (isFetching) return <div className="stretch_height" />;
        const imageUrl = auth && auth.imageUrl ? auth.imageUrl : null;
        const userIsDentist = auth && auth.dentistId;

        return (
            <div className="profile_container stretch_height">
                <div className="sidebar">
                    <img className="profile_img" src={imageUrl} alt="user" />
                    <ProfileActions auth={auth} dentist={dentist} />
                </div>
                <div className="main">
                    {this.renderProfileDetails()}
                    {userIsDentist && (
                        <div>
                            <h5>Your Offices</h5>
                            <UserOfficeIndex id="test"/>
                        </div>
                    )}
                    {userIsDentist && (
                        <div>
                            <h5>Upcoming Reservations</h5>
                            <UserReservationIndex />
                        </div>
                    )}
                    <div>
                        <h5>Upcoming Appointments</h5>
                        <PatientAppointments patientId={auth.id} />
                    </div>
                    {userIsDentist &&
                        dentist &&
                        dentist.reviews &&
                        dentist.reviews.length > 0 && (
                            <div className="reviews profile-section">
                                <h5>{`Reviews for ${auth.name}`}</h5>
                                <ReviewContainer
                                    revieweeId={dentist.id}
                                    revieweeName={auth.name}
                                    reviews={dentist.reviews}
                                />
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentist: state.dentists.selectedDentist
    };
}
export { Profile };
export default connect(
    mapStateToProps,
    actions
)(Profile);
