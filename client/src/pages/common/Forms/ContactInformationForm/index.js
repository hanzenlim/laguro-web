import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import get from 'lodash/get';

import ContactInformationFormView from './view';
import { Loading } from '../../../../components';
import { RedirectErrorPage } from '../../../../pages/GeneralErrorPage';
import { getUserQuery, updateUserMutation } from './queries';
import { getUser, setUser } from '../../../../util/authUtils';
import { execute } from '../../../../util/gqlUtils';

class ContactInformationForm extends PureComponent {
    state = { newProfileImage: null };

    setNewProfileImage = result => {
        const upload = result.filesUploaded[0];
        this.setState({
            newProfileImage: upload.url,
            hasRemovedProfileImage: false,
        });
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
        const { id, emergencyContact, address } = userData;

        return {
            id,
            emergencyContact: {
                firstName:
                    (emergencyContact && emergencyContact.firstName) || '',
                lastName: (emergencyContact && emergencyContact.lastName) || '',
                relationship:
                    (emergencyContact && emergencyContact.relationship) || '',
                phoneNumber:
                    (emergencyContact &&
                        emergencyContact.phoneNumber &&
                        emergencyContact.phoneNumber.split('+1')[1]) ||
                    '',
            },
            address: {
                streetAddress: (address && address.streetAddress) || '',
                addressDetails: (address && address.addressDetails) || '',
                city: (address && address.city) || '',
                zipCode: (address && address.zipCode) || '',
                state: (address && address.state) || '',
            },
        };
    };

    render() {
        const user = getUser();

        return (
            <Query query={getUserQuery} variables={{ id: get(user, 'id') }}>
                {({ loading, error, data: userData }) => {
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
                                    const {
                                        emergencyContact,
                                        address,
                                    } = values;

                                    const input = {
                                        id: mappedData.id,
                                        emergencyContact: {
                                            firstName:
                                                emergencyContact.firstName,
                                            lastName: emergencyContact.lastName,
                                            relationship:
                                                emergencyContact.relationship,
                                            phoneNumber: emergencyContact.phoneNumber
                                                ? `+1${
                                                      emergencyContact.phoneNumber
                                                  }`
                                                : null,
                                        },
                                        address: {
                                            streetAddress:
                                                address.streetAddress,
                                            addressDetails:
                                                address.addressDetails || null,
                                            city: address.city,
                                            zipCode: address.zipCode,
                                            state: address.state,
                                        },
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
                                        },
                                    });

                                    return result;
                                };

                                return (
                                    <ContactInformationFormView
                                        data={mappedData}
                                        onSuccess={onSuccess}
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

export default ContactInformationForm;
