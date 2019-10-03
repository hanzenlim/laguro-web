import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _capitalize from 'lodash/capitalize';
import { message } from 'antd';
import UpdateProfileFormView from './view';
import { Loading } from '~/components';
import { RedirectErrorPage } from '~/routes/GeneralErrorPage';
import { getUserQuery, updateUserMutation } from './queries';
import { getUser, setUser } from '~/util/authUtils';
import { execute } from '~/util/gqlUtils';
import { ENGLISH } from '~/util/strings';

class UpdateProfileContainer extends PureComponent {
    state = { newProfileImage: null };

    setNewProfileImage = result => {
        const upload = result.filesUploaded[0];
        this.setState({
            newProfileImage: upload.url,
            hasRemovedProfileImage: false,
        });
        setUser({ imageUrl: upload.url });
    };

    getNotificationSettings = notificationSettings => {
        const { sms, email } = notificationSettings.general;

        if (sms && email) return 'both';
        if (sms) return 'sms';
        if (email) return 'email';

        return null;
    };

    getNotificationSettingsInput = notificationSettings => {
        const general = {};
        if (notificationSettings === 'both') {
            general.sms = true;
            general.email = true;
        }

        if (notificationSettings === 'sms') {
            general.sms = true;
        }

        if (notificationSettings === 'email') {
            general.email = true;
        }
        return {
            general,
        };
    };

    getMappedUserData = userData => {
        const {
            id,
            imageUrl,
            firstName,
            middleName,
            lastName,
            phoneNumber,
            notificationSettings,
            dob,
            gender,
            email,
            languages,
        } = userData;

        return {
            id,
            imageUrl,
            firstName,
            middleName,
            lastName,
            languages: !_isEmpty(languages) ? languages : [ENGLISH],
            birthMonth: dob && dob.split('/')[0],
            birthDate: dob && dob.split('/')[1],
            birthYear: dob && dob.split('/')[2],
            gender: id && !gender ? 'unknown' : gender,
            email: email || '',
            phoneNumber: phoneNumber ? phoneNumber.split('+1')[1] : '',
            notificationSettings: this.getNotificationSettings(
                notificationSettings
            ),
        };
    };
    removeProfileImage = () => {
        this.setState({ newProfileImage: null, hasRemovedProfileImage: true });
    };

    render() {
        const user = getUser();

        return (
            <Query query={getUserQuery} variables={{ id: get(user, 'id') }}>
                {({ loading, error, data: userData, refetch }) => {
                    if (error) return <RedirectErrorPage />;
                    if (loading) return <Loading />;

                    return (
                        <Mutation mutation={updateUserMutation}>
                            {(updateUser, { data: updateUserData }) => {
                                const data =
                                    get(updateUserData, 'updateUser') ||
                                    get(userData, 'getUser');
                                const mappedData = this.getMappedUserData(data);

                                const onSuccess = async values => {
                                    // Show error message if user tries to remove their
                                    // existing email address
                                    if (mappedData.email && !values.email) {
                                        message.error('Email cannot be blank');
                                        return false;
                                    }

                                    const { newProfileImage } = this.state;

                                    const input = {
                                        id: mappedData.id,
                                        imageUrl: this.state
                                            .hasRemovedProfileImage
                                            ? null
                                            : newProfileImage ||
                                              mappedData.imageUrl,
                                        firstName: _capitalize(
                                            values.firstName
                                        ),
                                        middleName: values.middleName
                                            ? _capitalize(values.middleName)
                                            : null,
                                        lastName: _capitalize(values.lastName),
                                        dob:
                                            values.birthMonth &&
                                            values.birthDate &&
                                            values.birthYear
                                                ? `${values.birthMonth}/${values.birthDate}/${values.birthYear}`
                                                : null,
                                        gender:
                                            values.gender === 'unknown'
                                                ? null
                                                : values.gender,
                                        languages: values.languages,
                                        phoneNumber: values.phoneNumber
                                            ? `+1${values.phoneNumber}`
                                            : null,
                                        notificationSettings: this.getNotificationSettingsInput(
                                            values.notificationSettings
                                        ),
                                        ...(values.email
                                            ? { email: values.email }
                                            : {}),
                                    };

                                    const result = await execute({
                                        action: async () => {
                                            const {
                                                data: _updateUserData,
                                            } = await updateUser({
                                                variables: { input },
                                            });

                                            if (_updateUserData) {
                                                setUser({
                                                    ..._updateUserData.updateUser,
                                                });
                                            }

                                            await refetch();
                                        },
                                    });

                                    return result;
                                };

                                const {
                                    newProfileImage,
                                    hasRemovedProfileImage,
                                } = this.state;

                                return (
                                    <UpdateProfileFormView
                                        data={mappedData}
                                        onSuccess={onSuccess}
                                        newProfileImage={newProfileImage}
                                        setNewProfileImage={
                                            this.setNewProfileImage
                                        }
                                        removeProfileImage={
                                            this.removeProfileImage
                                        }
                                        hasRemovedProfileImage={
                                            hasRemovedProfileImage
                                        }
                                    />
                                );
                            }}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default UpdateProfileContainer;
