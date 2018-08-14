import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';

import EditUser from './forms/EditUser';
import NewDentist from './forms/NewDentist';
import EditDentist from './forms/EditDentist';
import UploadDocumentsModal from './UploadDocuments';
import { Link, Button } from './common';
import { filestackKey } from '../config/keys';
import { profileImageRatio } from '../util/uiUtil';
import { DENTIST, PATIENT } from '../util/strings';
import * as actions from '../actions';
import Provider from '../models/provider';

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
        this.setState({ visibleModal: event.currentTarget.dataset.modal_name });
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

    resetPassword = async () => {
        if (
            // eslint-disable-next-line
            confirm(
                'Are you sure you want to reset your Open Dental password? A new password will be emailed to you.'
            )
        ) {
            try {
                await Provider.resetPassword(this.props.auth.dentistId);
                alert('Check email for you new Open Dental credentials.');
            } catch (err) {
                alert('Something went wrong. Please try again later.');
            }
        }
    };

    render() {
        const { auth, dentist } = this.props;
        const dentistProfileExists = !!auth.dentistId;
        return (
            <div>
                <ul className="collection">
                    {dentistProfileExists && (
                        <Button
                            link
                            border
                            data-modal_name="verifyDentistProfile"
                            onClick={this.openModal}
                        >
                            Verify Dentist Profile
                        </Button>
                    )}

                    <Button
                        link
                        border
                        data-modal_name="verifyPatientProfile"
                        onClick={this.openModal}
                    >
                        Verify Patient Profile
                    </Button>

                    <div>
                        <Button
                            link
                            border
                            data-modal_name="editUser"
                            onClick={this.openModal}
                        >
                            Edit User Profile
                        </Button>
                    </div>

                    {/* Display Create if no dentist profile or Edit if profile exists */}
                    {dentistProfileExists ? (
                        <Button
                            link
                            border
                            data-modal_name="editDentist"
                            onClick={this.openModal}
                        >
                            Edit Dentist Profile
                        </Button>
                    ) : (
                        <Button
                            link
                            border
                            data-modal_name="newDentist"
                            onClick={this.openModal}
                        >
                            Create Dentist Profile
                        </Button>
                    )}

                    {dentistProfileExists && (
                        <Button
                            link
                            border
                            data-name="resetProviderPassword"
                            onClick={this.resetPassword}
                        >
                            Reset Open Dental Password
                        </Button>
                    )}

                    <ReactFilestack
                        apikey={filestackKey}
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
                            transformations: {
                                crop: {
                                    aspectRatio: profileImageRatio,
                                    force: true
                                }
                            },
                            storeTo: { container: 'user-photos' }
                        }}
                        onSuccess={result => this.setNewProfileImage(result)}
                        render={({ onPick }) => (
                            <Button onClick={onPick} link border>
                                Upload New Image
                            </Button>
                        )}
                    />

                    {!auth.googleId && (
                        <Link to={'/edit-password'}>
                            <Button link border>
                                Update Password
                            </Button>
                        </Link>
                    )}

                    {dentistProfileExists && (
                        <Link
                            to={`/dentist/${auth.dentistId}?referrer=profile`}
                        >
                            <Button link border>
                                View Public Profile
                            </Button>
                        </Link>
                    )}

                    <Link to={'/payment-history'}>
                        <Button link border>
                            View Payment History
                        </Button>
                    </Link>

                    {dentistProfileExists && (
                        <Link
                            to={'/payout'}
                        >
                            <Button link border>
                                View Laguro Balance
                            </Button>
                        </Link>
                    )}

                    {dentistProfileExists ? (
                        <Link to={'/office/search'}>
                            <Button link>
                                Browse Listings
                            </Button>
                        </Link>
                    ) : (
                        <Link to={'/dentist/search'}>
                            <Button link>
                                Browse Dentists
                            </Button>
                        </Link>
                    )}
                </ul>

                <UploadDocumentsModal
                    closeModal={this.closeModal}
                    open={this.state.visibleModal === 'verifyDentistProfile'}
                    userType={DENTIST}
                />

                <UploadDocumentsModal
                    closeModal={this.closeModal}
                    open={this.state.visibleModal === 'verifyPatientProfile'}
                    userType={PATIENT}
                />

                <EditUser
                    closeModal={this.closeModal}
                    open={this.state.visibleModal === 'editUser'}
                />
                <NewDentist
                    closeModal={this.closeModal}
                    closable={true}
                    onSuccess={this.closeModal}
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

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { ProfileActions as NoReduxProfileActions };
export default connect(
    null,
    actions
)(ProfileActions);
