import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReviewContainer from './ReviewContainer';
import PatientAppointments from './PatientAppointments';
import UserOfficeIndex from './UserOfficeIndex';
import UserReservationIndex from './UserReservationIndex';
import ProfileActions from './ProfileActions';
import * as actions from '../actions';

import {
    dentistFragment,
    officeFragment,
    reservationFragment,
    listingFragment,
    appointmentFragment,
    reviewerFragment,
    filterActive,
} from '../util/fragments';

const dentistQuery = `
    query ($id: String!) {
        getDentist(id: $id) {
            ${dentistFragment}
            offices {
                ${officeFragment}
                listings(${filterActive}) {
                    ${listingFragment}
                    reservations(${filterActive}) {
                        ${reservationFragment}
                        reservedBy {
                            ${dentistFragment}
                        }
                    }
                }
            }
            reservations(${filterActive}) {
                ${reservationFragment}
                appointments(${filterActive}) {
                    ${appointmentFragment}
                }
                office {
                    ${officeFragment}
                }
                hostId
                reservedBy {
                    id
                }
            }
            reviews {
                ${reviewerFragment}
            }
        }
    }
`;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreateProfileModalOpen: false,
            isEditUserProfileOpen: false,
            isFetching: false,
        };
    }

    componentWillMount() {
        this.loadDentistProfile();
    }

    toggleCreateProfileModal = () => {
        this.setState({
            isCreateProfileModalOpen: !this.state.isCreateProfileModalOpen,
        });
    };

    async loadDentistProfile() {
        const { auth } = this.props;
        this.setState({ isFetching: true });
        if (auth.dentistId) {
            await this.props.loadDentistProfile(dentistQuery, auth.dentistId);
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
        const dentistId = auth && auth.dentistId ? auth.dentistId : null;

        return (
            <div className="profile_container stretch_height">
                <div className="sidebar">
                    <img className="profile_img" src={imageUrl} alt="user" />
                    <ProfileActions auth={auth} dentist={dentist} />
                </div>
                <div className="main">
                    {this.renderProfileDetails()}
                    {dentistId ? (
                        <div className="offices profile-section">
                            <h5>Your Offices</h5>
                            <UserOfficeIndex />
                        </div>
                    ) : (
                        ''
                    )}
                    {dentistId ? (
                        <div className="offices profile-section">
                            <h5>Upcoming Reservations</h5>
                            <UserReservationIndex />
                        </div>
                    ) : (
                        ''
                    )}
                    {!dentistId && <PatientAppointments patientId={auth.id} />}
                    {dentistId &&
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
                <EditUser
                    open={this.state.isEditUserProfileOpen}
                    onClose={this.toggleEditUserProfileModal}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentist: state.dentists.selectedDentist,
    };
}
export default connect(
    mapStateToProps,
    actions
)(Profile);
