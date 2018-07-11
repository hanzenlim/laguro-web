import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';

import EditUser from './forms/EditUser';
import NewDentist from './forms/NewDentist';
import EditDentist from './forms/EditDentist';

import { Link } from './common';
import { filestackKey } from '../config/keys';
import * as actions from '../actions';

class ProfileActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: null
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal = event => {
        this.setState({ visibleModal: event.target.dataset.modal_name });
    };

    closeModal = () => {
        this.setState({ visibleModal: null });
    };

    setNewProfileImage(result) {
        // check to make sure upload was successful
        const upload = result.filesUploaded[0];
        const userId = this.props.auth.id;
        if (upload) {
            this.props.updateUserProfile(userId, { imageUrl: upload.url });
        }
    }

    render() {
        const { auth, dentist } = this.props;
        const dentistProfileExists = !!auth.dentistId;
        return (
            <div>
                <ul className="collection">
                    <div>
                        <a
                            className="link"
                            data-modal_name="editUser"
                            onClick={this.openModal}
                        >
                            Edit User Profile
                        </a>
                    </div>

                    {/* Display Create if no dentist profile or Edit if profile exists */}
                    {dentistProfileExists ? (
                        <a
                            className="link"
                            data-modal_name="editDentist"
                            onClick={this.openModal}
                        >
                            Edit Dentist Profile
                        </a>
                    ) : (
                        <a
                            className="link red-text"
                            data-modal_name="newDentist"
                            onClick={this.openModal}
                        >
                            Create Dentist Profile
                        </a>
                    )}

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
                        <Link
                            className="link"
                            to={`/dentist/${auth.dentistId}?referrer=profile`}
                        >
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

                <EditUser
                    closeModal={this.closeModal}
                    open={this.state.visibleModal === 'editUser'}
                />
                <NewDentist
                    closeModal={this.closeModal}
                    open={this.state.visibleModal === 'newDentist'}
                    auth={auth}
                />
                <EditDentist
                    closeModal={this.closeModal}
                    open={this.state.visibleModal === 'editDentist'}
                    dentist={dentist}
                    auth={auth}
                />
            </div>
        );
    }
}

export default connect(null, actions)(ProfileActions);
