import { Modal } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { Mutation, Query } from 'react-apollo';
import { Loading } from '../../../../components';
import { getUser, setAuthToken } from '../../../../util/authUtils';
import {
    addMemberToFamilyMutation,
    getFamilyQuery,
    refreshAuthTokenMutation,
    removeMemberFromFamilyMutation,
    updateUserMutation,
} from './queries';
import AddFamilyMemberFormView from './view';
import { execute } from '../../../../util/gqlUtils';

const Composed = adopt({
    addMemberToFamily: ({ render }) => (
        <Mutation mutation={addMemberToFamilyMutation}>{render}</Mutation>
    ),
    removeMemberFromFamily: ({ render }) => (
        <Mutation mutation={removeMemberFromFamilyMutation}>{render}</Mutation>
    ),
    updateUser: ({ render }) => (
        <Mutation mutation={updateUserMutation}>{render}</Mutation>
    ),
    refreshAuthToken: ({ render }) => (
        <Mutation mutation={refreshAuthTokenMutation}>{render}</Mutation>
    ),
    getUser: ({ render, userId }) => (
        <Query
            skip={!userId}
            fetchPolicy="network-only"
            variables={{ id: userId }}
            query={getFamilyQuery}
        >
            {render}
        </Query>
    ),
});

class AddFamilyMemberForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            newProfileImage: null,
            hasRemovedProfileImage: false,
        };
    }

    removeProfileImage = () => {
        this.setState({ newProfileImage: null, hasRemovedProfileImage: true });
    };

    setNewProfileImage = result => {
        const upload = result.filesUploaded[0];
        this.setState({
            newProfileImage: upload.url,
            hasRemovedProfileImage: false,
        });
    };

    handleRefreshAuthToken = async () => {
        const authToken = await this.refreshAuthToken();
        setAuthToken(_get(authToken, 'data.refreshAuthToken'));
    };

    getInputFromForm = ({ values }) => {
        const { newProfileImage } = this.state;
        const mappedData = {};
        const user = getUser();
        const input = {
            primaryUserId: user && user.id,
            firstName: values.firstName,
            middleName: values.middleName || null,
            lastName: values.lastName,
            relationshipToPrimary: values.relationship,
            imageUrl: this.state.hasRemovedProfileImage
                ? null
                : newProfileImage || mappedData.imageUrl,
            phoneNumber:
                values.hasDifferentContactInformation && values.phoneNumber
                    ? `+1${values.phoneNumber}`
                    : null,
            ...(values.hasDifferentContactInformation && values.email
                ? { email: values.email }
                : {}),
            dob:
                values.birthMonth && values.birthDate && values.birthYear
                    ? `${values.birthMonth}/${values.birthDate}/${
                          values.birthYear
                      }`
                    : null,
            gender: values.gender === 'unknown' ? null : values.gender,
            address: values.hasDifferentAddress
                ? {
                      streetAddress: values.address1,
                      addressDetails: values.address2 || null,
                      city: values.city,
                      zipCode: values.zipCode,
                      state: values.state,
                  }
                : null,
        };

        return input;
    };

    getInitialValues = ({ user = {} }) => ({
        imageUrl: user.imageUrl || '',
        firstName: user.firstName || '',
        middleName: user.middleName || '',
        lastName: user.lastName || '',
        relationship: user.relationshipToPrimary || '',
        birthMonth: user.dob && user.dob.split('/')[0],
        birthDate: user.dob && user.dob.split('/')[1],
        birthYear: user.dob && user.dob.split('/')[2],
        gender: user.id && !user.gender ? 'unknown' : user.gender,
        address1: (user.address && user.address.streetAddress) || '',
        address2: (user.address && user.address.addressDetails) || '',
        city: (user.address && user.address.city) || '',
        zipCode: (user.address && user.address.zipCode) || '',
        state: (user.address && user.address.state) || '',
        phoneNumber: user.phoneNumber ? user.phoneNumber.split('+1')[1] : '',
        email: user.email || '',
        hasDifferentAddress: !_isEmpty(user.address),
        hasDifferentContactInformation: !_isEmpty(user.phoneNumber),
    });

    handleRemoveFamilyMember = () => {
        const { userId = '', onSuccess = () => {} } = this.props;
        Modal.confirm({
            title: 'Are you sure you want to remove this family member?',
            onOk: async () => {
                await execute({
                    action: async () => {
                        await this.removeMemberFromFamily({
                            variables: {
                                input: {
                                    userId,
                                },
                            },
                        });
                        await this.handleRefreshAuthToken();
                        onSuccess();
                    },
                });
            },
            onCancel: () => {},
        });
    };

    handleAddMemberToFamily = async ({ values }) => {
        const { onSuccess = () => {} } = this.props;
        const input = this.getInputFromForm({ values });
        await execute({
            action: async () => {
                const result = await this.addMemberToFamily({
                    variables: {
                        input,
                    },
                });
                if (result) {
                    await this.handleRefreshAuthToken();
                    await onSuccess();
                }
            },
        });
    };

    handleUpdateUser = async ({ values }) => {
        const { userId = '', onSuccess = () => {} } = this.props;
        const input = this.getInputFromForm({ values });
        delete input.primaryUserId;
        input.id = userId;
        const result = await this.updateUser({
            variables: {
                input,
            },
        });
        if (result) {
            onSuccess();
        }
    };

    handleSubmit = async values => {
        const { userId = '' } = this.props;
        if (userId) {
            await this.handleUpdateUser({
                values,
            });
        } else {
            await this.handleAddMemberToFamily({
                values,
            });
        }
    };

    render() {
        const { userId = '' } = this.props;
        const {
            hasRemovedProfileImage = false,
            newProfileImage = null,
        } = this.state;

        return (
            <Composed userId={userId}>
                {({
                    getUser,
                    addMemberToFamily,
                    updateUser,
                    refreshAuthToken,
                    removeMemberFromFamily,
                }) => {
                    this.refreshAuthToken = refreshAuthToken;
                    this.removeMemberFromFamily = removeMemberFromFamily;
                    this.addMemberToFamily = addMemberToFamily;
                    this.updateUser = updateUser;

                    const user = _get(getUser, 'data.getUser');
                    const initialValues = this.getInitialValues({ user });

                    if (_get(getUser, 'loading')) return <Loading />;

                    return (
                        <AddFamilyMemberFormView
                            isEditting={!!userId}
                            initialValues={initialValues}
                            onSubmit={this.handleSubmit}
                            newProfileImage={newProfileImage}
                            removeProfileImage={this.removeProfileImage}
                            setNewProfileImage={this.setNewProfileImage}
                            hasRemovedProfileImage={hasRemovedProfileImage}
                            onRemoveFamilyMember={this.handleRemoveFamilyMember}
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default AddFamilyMemberForm;
