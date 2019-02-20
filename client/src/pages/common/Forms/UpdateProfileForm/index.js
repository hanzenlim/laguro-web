import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import get from 'lodash/get';
import cookies from 'browser-cookies';

import {
    serializePhoneNumber,
    deserializedPhoneNumber,
} from '../../../../util/phoneNumberUtil';
import UpdateProfileFormView from './view';
import { Loading } from '../../../../components';
import { RedirectErrorPage } from '../../../../pages/GeneralErrorPage';
import { getIdQueryClient, getUserQuery, updateUserMutation } from './queries';
import { ACTIVE_USER } from '../../../../util/strings';

const HANDLED_ERRORS = {
    'Phone number has already been registered':
        'Phone number has already been registered',
};

class UpdateProfileContainer extends PureComponent {
    state = {
        isUpdated: false,
        newProfileImage: null,

        smsNotificationStatus: null,
    };

    getErrorMessage = updateUserError => {
        if (!updateUserError) {
            return null;
        }

        const errorMessage = get(updateUserError, 'graphQLErrors[0].message');

        return (
            HANDLED_ERRORS[errorMessage] ||
            'Something went wrong. Please try again later.'
        );
    };

    setNewProfileImage = result => {
        const upload = result.filesUploaded[0];
        this.setState({ newProfileImage: upload.url });
    };

    handleSMSNotificationChange = e => {
        this.setState({ smsNotificationStatus: e.target.checked }, () => {
            this.formRef.props.form.validateFields(['phoneNumber'], {
                force: true,
            });
        });
    };

    onCompleted = ({ getUser, updateUser }) => {
        const { notificationSettings } = getUser || updateUser;

        this.setState({
            smsNotificationStatus: notificationSettings.general.sms,
        });
    };

    handleFormRef = ref => {
        this.formRef = ref;
    };

    render() {
        return (
            <Query query={getIdQueryClient}>
                {({ data }) => (
                    <Query
                        query={getUserQuery}
                        variables={{ id: data.activeUser.id }}
                        onCompleted={this.onCompleted}
                    >
                        {({ loading, error, data: userData }) => {
                            if (error) return <RedirectErrorPage />;
                            if (loading) return <Loading />;

                            return (
                                <Mutation
                                    mutation={updateUserMutation}
                                    onCompleted={this.onCompleted}
                                >
                                    {(
                                        updateUser,
                                        {
                                            data: updateUserData,
                                            loading: updateUserLoading,
                                            error: updateUserError,
                                            client,
                                        }
                                    ) => {
                                        const {
                                            imageUrl,
                                            firstName,
                                            middleName,
                                            lastName,
                                            phoneNumber,
                                            notificationSettings,
                                        } =
                                            get(updateUserData, 'updateUser') ||
                                            get(userData, 'getUser');

                                        const mappedData = {
                                            id: data.activeUser.id,
                                            imageUrl,
                                            firstName,
                                            middleName,
                                            lastName,
                                            phoneNumber: deserializedPhoneNumber(
                                                phoneNumber
                                            ),
                                            smsNotification:
                                                notificationSettings.general
                                                    .sms,
                                            emailNotification:
                                                notificationSettings.general
                                                    .email,
                                        };

                                        const onSuccess = async values => {
                                            const {
                                                newProfileImage,
                                            } = this.state;

                                            const input = {
                                                id: mappedData.id,
                                                imageUrl:
                                                    newProfileImage ||
                                                    mappedData.imageUrl,
                                                firstName: values.firstName,
                                                middleName: values.middleName,
                                                lastName: values.lastName,
                                                phoneNumber: serializePhoneNumber(
                                                    values.phoneNumber
                                                ),
                                                notificationSettings: {
                                                    general: {
                                                        sms:
                                                            values.smsNotification,
                                                        email:
                                                            values.emailNotification,
                                                    },
                                                },
                                            };

                                            const {
                                                data: _updateUserData,
                                            } = await updateUser({
                                                variables: { input },
                                            });

                                            // preferably we should have the server assume the logged-in user based
                                            // on request authentication details and not set activeUser based on
                                            // events (login, update, ...)
                                            if (_updateUserData) {
                                                cookies.set(
                                                    'user',
                                                    JSON.stringify(
                                                        _updateUserData.updateUser
                                                    )
                                                );

                                                client.writeData({
                                                    data: {
                                                        activeUser: {
                                                            ..._updateUserData.updateUser,
                                                            __typename: ACTIVE_USER,
                                                        },
                                                    },
                                                });
                                            }

                                            window.scrollTo(0, 0);
                                            this.setState({ isUpdated: true });
                                        };

                                        const {
                                            newProfileImage,
                                            isUpdated,
                                            smsNotificationStatus,
                                        } = this.state;

                                        return (
                                            <UpdateProfileFormView
                                                data={mappedData}
                                                loading={updateUserLoading}
                                                error={this.getErrorMessage(
                                                    updateUserError
                                                )}
                                                onSuccess={onSuccess}
                                                setNewProfileImage={
                                                    this.setNewProfileImage
                                                }
                                                newProfileImage={
                                                    newProfileImage
                                                }
                                                isUpdated={isUpdated}
                                                onSMSNotificationChange={
                                                    this
                                                        .handleSMSNotificationChange
                                                }
                                                smsNotificationStatus={
                                                    smsNotificationStatus
                                                }
                                                onFormRef={this.handleFormRef}
                                            />
                                        );
                                    }}
                                </Mutation>
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

export default UpdateProfileContainer;
