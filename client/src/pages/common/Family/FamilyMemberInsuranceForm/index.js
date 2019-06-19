import _get from 'lodash/get';
import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import _isEmpty from 'lodash/isEmpty';
import { Mutation, Query } from 'react-apollo';
import { Loading } from '../../../../components';
import { getUser } from '../../../../util/authUtils';
import {
    updateInsuranceInfoMutation,
    getFamilyQuery,
    addInsuranceDependentMutation,
    CHECK_ELIGIBILITY_QUERY,
} from './queries';
import { execute } from '../../../../util/gqlUtils';
import FamilyMemberInsuranceFormView from './view';
import { insuranceClient } from '../../../../util/apolloClients';

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

        if (primaryUser.id === policyHolderUserId) {
            isUnderPrimaryUserInsurance = 'yes';
        } else if (!_isEmpty(policyHolderUserId)) {
            isUnderPrimaryUserInsurance = 'no';
        }

        return {
            hasInsurance: _get(user, 'insuranceInfo.policyHolderUserId')
                ? 'yes'
                : 'no',
            isUnderPrimaryUserInsurance,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            birthMonth: user.dob && user.dob.split('/')[0],
            birthDate: user.dob && user.dob.split('/')[1],
            birthYear: user.dob && user.dob.split('/')[2],
            insuranceProvider:
                _get(user, 'insuranceInfo.insuranceProvider') || '',
            insuranceProviderId:
                _get(user, 'insuranceInfo.insuranceProviderId') || '',
            insuranceNumber: _get(user, 'insuranceInfo.policyHolderId') || '',
            planOrGroupNumber:
                _get(user, 'insuranceInfo.planOrGroupNumber') || '',
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
        const { userId = '', onSuccess = () => {} } = this.props;
        const insuranceInfo = {
            insuranceProvider: values.insuranceProvider,
            insuranceProviderId: values.insuranceProviderId,
            policyHolderId: values.insuranceNumber,
            ...(!_isEmpty(values.planOrGroupNumber) && {
                planOrGroupNumber: values.planOrGroupNumber,
            }),
        };

        const updateInsuranceInfoInput = {
            userId,
            insuranceInfo,
        };

        const checkEligibilityInput = {
            patientId: userId,
            firstName: values.firstName,
            lastName: values.lastName,
            dob: `${values.birthMonth}/${values.birthDate}/${values.birthYear}`,
            insuranceInfo,
        };

        let isEligible = false;

        await execute({
            reportGqlErrorOnly: true,
            action: async () => {
                const response = await insuranceClient.query({
                    query: CHECK_ELIGIBILITY_QUERY,
                    variables: {
                        input: checkEligibilityInput,
                    },
                    fetchPolicy: 'network-only',
                });
                isEligible = _get(response, 'data.checkEligibility.isEligible');
            },
        });

        if (!isEligible) {
            return null;
        }

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

    handleSubmit = async values => {
        if (
            values.hasInsurance === 'yes' &&
            values.isUnderPrimaryUserInsurance === 'yes'
        ) {
            await this.handleAddInsuranceDependent({ values });
        }

        if (
            values.hasInsurance === 'yes' &&
            values.isUnderPrimaryUserInsurance === 'no'
        ) {
            await this.handleUpdateInsuranceInfo({ values });
        }

        if (values.hasInsurance === 'no') {
            await this.handleRemoveInsurance();
        }
    };

    render() {
        const { userId = '' } = this.props;
        return (
            <Composed userId={userId}>
                {({ getUser, updateInsuranceInfo, addInsuranceDependent }) => {
                    this.user = _get(getUser, 'data.getUser');
                    this.updateInsuranceInfo = updateInsuranceInfo;
                    this.addInsuranceDependent = addInsuranceDependent;

                    const initialValues = this.getInitialValues({
                        user: this.user,
                    });

                    if (_get(getUser, 'loading')) return <Loading />;

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
