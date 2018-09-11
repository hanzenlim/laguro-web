import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import get from 'lodash/get';

import UpdateProfileFormView from './view';
import { Loading } from '../../../../components';
import { getIdQueryClient, getUserQuery, updateUserMutation } from './queries';

class UpdateProfileContainer extends PureComponent {
    state = {
        isUpdated: false,
        newProfileImage: null,
    };

    setNewProfileImage = result => {
        const upload = result.filesUploaded[0];
        this.setState({ newProfileImage: upload.url });
    };

    render() {
        return (
            <Query query={getIdQueryClient}>
                {({ data }) => (
                    <Query
                        query={getUserQuery}
                        variables={{ id: data.activeUser.id }}
                    >
                        {({ loading, error, data: userData }) => {
                            if (error) return <div>Error</div>;
                            if (loading) return <Loading />;

                            return (
                                <Mutation mutation={updateUserMutation}>
                                    {(
                                        updateUser,
                                        {
                                            data: updateUserData,
                                            loading: updateUserLoading,
                                            error: updateUserError,
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
                                            phoneNumber,
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
                                                phoneNumber: values.phoneNumber,
                                                notificationSettings: {
                                                    general: {
                                                        sms:
                                                            values.smsNotification,
                                                        email:
                                                            values.emailNotification,
                                                    },
                                                },
                                            };
                                            await updateUser({
                                                variables: { input },
                                            });
                                            window.scrollTo(0, 0);
                                            this.setState({ isUpdated: true });
                                        };

                                        return (
                                            <UpdateProfileFormView
                                                data={mappedData}
                                                loading={updateUserLoading}
                                                error={
                                                    updateUserError &&
                                                    'Something went wrong. Please try again later.'
                                                }
                                                onSuccess={onSuccess}
                                                setNewProfileImage={
                                                    this.setNewProfileImage
                                                }
                                                newProfileImage={
                                                    this.state.newProfileImage
                                                }
                                                isUpdated={this.state.isUpdated}
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
