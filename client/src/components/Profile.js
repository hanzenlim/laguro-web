import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import moment from 'moment';
import { Modal } from './common';
import ReviewContainer from './ReviewContainer';
import PatientAppointments from './PatientAppointments';
import UserOfficeIndex from './UserOfficeIndex';
import UserReservationIndex from './UserReservationIndex';
import CreateDentistProfile from './forms/CreateDentistProfile';
import { filestackKey } from '../config/keys';
import * as actions from '../actions';

import {
    dentistFragment,
    officeFragment,
    reservationFragment,
    listingFragment,
    appointmentFragment,
    reviewerFragment,
    filterActive
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
            isLoading: false,
            isModalOpen: false,
            isFetching: false
        };

        this.handleCreateDentist = this.handleCreateDentist.bind(this);
    }

    componentWillMount() {
        this.loadDentistProfile();
    }

    async loadDentistProfile() {
        const { auth } = this.props;
        this.setState({ isFetching: true });
        if (auth.dentistId) {
            await this.props.loadDentistProfile(dentistQuery, auth.dentistId);
        }
        this.setState({ isFetching: false });
    }

    handleCreateDentist() {
        this.setState({ isModalOpen: true });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    renderProfileDetails() {
        const { auth, dentist } = this.props;

        return (
            <div>
                <h4>Welcome back {auth.name}!</h4>
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

    renderActions() {
        const { auth } = this.props;
        const dentistProfileExists = !!auth.dentistId;

        return (
            <ul className="collection">
                {/* Display Create if no dentist profile or Edit if profile exists */}
                {dentistProfileExists ? (
                    <Link className="link" to={'/dentist/edit'}>
                        Edit Dentist Profile
                    </Link>
                ) : (
                    <a
                        className="link red-text"
                        onClick={this.handleCreateDentist}
                    >
                        Create Dentist Profile
                    </a>
                )}

                <Modal
                    closable
                    open={this.state.isModalOpen}
                    onClose={this.closeModal}
                >
                    <CreateDentistProfile
                        handleSubmission={this.closeModal.bind(this)}
                    />
                </Modal>

                <ReactFilestack
                    apikey={filestackKey}
                    buttonText="Upload New Image"
                    buttonClass="link blue-text text-lighten-1"
                    options={{
                        accept: ['image/*'],
                        imageMin: [300, 300],
                        fromSources: [
                            'local_file_system',
                            'url',
                            'imagesearch',
                            'facebook',
                            'instagram'
                        ],
                        storeTo: { container: 'user-photos' }
                    }}
                    onSuccess={result => this.setNewProfileImage(result)}
                />

                {dentistProfileExists ? (
                    <Link className="link" to={`/dentist/${auth.dentistId}`}>
                        View public profile
                    </Link>
                ) : (
                    ''
                )}

                <Link className="link" to={`/payment-history`}>
                    View payment history
                </Link>

                {dentistProfileExists ? (
                    <Link className="link" to={'/office/search'}>
                        Browse listings
                    </Link>
                ) : (
                    <Link className="link" to={'/dentist/search'}>
                        Browse dentists
                    </Link>
                )}
            </ul>
        );
    }

    setNewProfileImage(result) {
        // check to make sure upload was successful
        const upload = result.filesUploaded[0];
        const userId = this.props.auth.id;
        if (upload) {
            this.props.updateProfileImage(userId, upload.url);
        }
    }

    render() {
        const { auth, dentist } = this.props;
        const { isFetching } = this.state;
        if (isFetching) return <div className="stretch_height" />;

        return (
            <div className="profile_container stretch_height">
                <div className="sidebar">
                    <img
                        className="profile_img"
                        src={auth.imageUrl}
                        alt="user"
                    />
                    {this.renderActions()}
                </div>
                <div className="main">
                    {this.renderProfileDetails()}
                    {auth.dentistId ? (
                        <div className="offices profile-section">
                            <h5>Your Offices</h5>
                            <UserOfficeIndex />
                        </div>
                    ) : (
                        ''
                    )}
                    {auth.dentistId ? (
                        <div className="offices profile-section">
                            <h5>Upcoming Reservations</h5>
                            <UserReservationIndex />
                        </div>
                    ) : (
                        ''
                    )}
                    {!auth.dentistId && (
                        <PatientAppointments patientId={auth.id} />
                    )}
                    {auth.dentistId &&
                        !!dentist.reviews.length && (
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
export default connect(mapStateToProps, actions)(Profile);
