import _get from 'lodash/get';
import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import _isEmpty from 'lodash/isEmpty';
import { Mutation, Query } from 'react-apollo';
import { Loading } from '~/components';
import { getUser } from '~/util/authUtils';
import {
    updateInsuranceInfoMutation,
    getFamilyQuery,
    addInsuranceDependentMutation,
} from './queries';
import { execute } from '~/util/gqlUtils';
import FamilyMemberInsuranceFormView from './view';

const Composed = adopt({
    updateInsuranceInfo: ({ render }) => (
        <Mutation mutation={updateInsuranceInfoMutation}>{render}</Mutation>
    ),
    addInsuranceDependent: ({ render }) => (
        <Mutation mutation={addInsuranceDependentMutation}>{render}</Mutation>
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

class FamilyMemberInsuranceForm extends PureComponent {
    getInitialValues = ({ user = {} }) => {
        const primaryUser = getUser();

        // this variable will remain undefined if no insurance info has been provided for this user
        let isUnderPrimaryUserInsurance;
        const policyHolderUserId = _get(
            user,
            'insuranceInfo.policyHolderUserId'
        );
        const policyHolderUser = _get(user, 'insuranceInfo.policyHolderUser');

        if (primaryUser.id === policyHolderUserId) {
            isUnderPrimaryUserInsurance = 'yes';
        } else if (!_isEmpty(policyHolderUser)) {
            isUnderPrimaryUserInsurance = 'no';
        }

        return {
            firstName: _get(user, 'firstName'),
            lastName: _get(user, 'lastName'),
            birthMonth: user.dob && user.dob.split('/')[0],
            birthDate: user.dob && user.dob.split('/')[1],
            birthYear: user.dob && user.dob.split('/')[2],
            hasInsurance: _get(user, 'insuranceInfo') ? 'yes' : 'no',
            hasOwnInsurance:
                _get(user, 'id', null) ===
                _get(user, 'insuranceInfo.policyHolderUserId', null)
                    ? 'yes'
                    : 'no',
            isUnderPrimaryUserInsurance,
            issueDate:
                _get(user, 'insuranceInfo.issueDate') || '',
            insuranceProvider:
                _get(user, 'insuranceInfo.insuranceProvider') || '',
            insuranceProviderId:
                _get(user, 'insuranceInfo.insuranceProviderId') || '',
            insuranceNumber: _get(user, 'insuranceInfo.policyHolderId') || '',
            planOrGroupNumber:
                _get(user, 'insuranceInfo.planOrGroupNumber') || '',
            policyHolderUser: !_get(user, 'insuranceInfo.policyHolderUser')
                ? null
                : {
                      firstName: _get(policyHolderUser, 'firstName'),
                      lastName: _get(policyHolderUser, 'lastName'),
                      birthMonth:
                          policyHolderUser.dob &&
                          policyHolderUser.dob.split('/')[0],
                      birthDate:
                          policyHolderUser.dob &&
                          policyHolderUser.dob.split('/')[1],
                      birthYear:
                          policyHolderUser.dob &&
                          policyHolderUser.dob.split('/')[2],
                      gender: policyHolderUser.gender || 'unknown',
                      address1: _get(
                          policyHolderUser,
                          'address.streetAddress',
                          ''
                      ),
                      address2: _get(
                          policyHolderUser,
                          'address.addressDetails',
                          ''
                      ),
                      city: _get(policyHolderUser, 'address.city', ''),
                      zipCode: _get(policyHolderUser, 'address.zipCode', ''),
                      state: _get(policyHolderUser, 'address.state', ''),
                  },
        };
    };

    handleAddInsuranceDependent = async () => {
        const { userId = '', onSuccess = () => {} } = this.props;
        const primaryUser = getUser();
        const input = {
            policyHolderUserId: primaryUser.id,
            dependentUserId: userId,
        };
        await execute({
            action: async () => {
                const result = await this.addInsuranceDependent({
                    variables: {
                        input,
                    },
                });
                if (result) {
                    await onSuccess();
                }
            },
        });
    };

    handleUpdateInsuranceInfo = async ({ values }) => {
        const {
            userId = '',
            onSuccess = () => {},
        } = this.props;
        const { policyHolderUser } = values;

        const insuranceInfo = {
            issueDate: values.issueDate,
            insuranceProvider: values.insuranceProvider,
            insuranceProviderId: values.insuranceProviderId,
            policyHolderId: values.insuranceNumber,
            ...(!_isEmpty(values.planOrGroupNumber) && {
                planOrGroupNumber: values.planOrGroupNumber,
            }),
        };

        const updateInsuranceInfoInput = {
            userId,
            ...{
                insuranceInfo: {
                    ...insuranceInfo,
                    policyHolderUser:
                        values.hasOwnInsurance === 'no' &&
                        values.isUnderPrimaryUserInsurance === 'no'
                            ? {
                                  firstName: policyHolderUser.firstName,
                                  lastName: policyHolderUser.lastName,
                                  dob: `${policyHolderUser.birthMonth}/${policyHolderUser.birthDate}/${policyHolderUser.birthYear}`,
                                  gender:
                                      policyHolderUser.gender === 'unknown'
                                          ? null
                                          : policyHolderUser.gender,
                                  address: {
                                      streetAddress: policyHolderUser.address1,
                                      addressDetails:
                                          policyHolderUser.address2 || null,
                                      city: policyHolderUser.city,
                                      zipCode: policyHolderUser.zipCode,
                                      state: policyHolderUser.state,
                                  },
                              }
                            : null,
                },
            },
        };

        const result = await execute({
            action: async () => {
                await this.updateInsuranceInfo({
                    variables: {
                        input: updateInsuranceInfoInput,
                    },
                });
            },
        });

        if (result) {
            await onSuccess();
        }
    };

    handleRemoveInsurance = async () => {
        const { userId = '', onSuccess = () => {} } = this.props;
        const input = {
            userId,
            insuranceInfo: null,
        };
        const result = await this.updateInsuranceInfo({
            variables: {
                input,
            },
        });
        if (result) {
            onSuccess();
        }
    };

    handleSubmit = values => {
        if (values.hasInsurance === 'no') {
            return this.handleRemoveInsurance();
        }

        if (
            values.hasOwnInsurance === 'no' &&
            values.isUnderPrimaryUserInsurance === 'yes'
        ) {
            return this.handleAddInsuranceDependent({ values });
        }

        return this.handleUpdateInsuranceInfo({ values });
    };

    render() {
        const { userId = '' } = this.props;
        return (
            <Composed userId={userId}>
                {({ getUser, updateInsuranceInfo, addInsuranceDependent }) => {
                    this.user = _get(getUser, 'data.getUser');
                    this.updateInsuranceInfo = updateInsuranceInfo;
                    this.addInsuranceDependent = addInsuranceDependent;

                    if (_get(getUser, 'loading')) return <Loading />;
                    const initialValues = this.getInitialValues({
                        user: this.user,
                    });

                    return (
                        <FamilyMemberInsuranceFormView
                            initialValues={initialValues}
                            onSubmit={this.handleSubmit}
                            onRemoveFamilyMember={this.handleRemoveFamilyMember}
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default FamilyMemberInsuranceForm;
