// @ts-check

import _isEmpty from 'lodash/isEmpty';

/**
 * @typedef {Object} Insurance
 * @property {string} insuranceProvider - The insurance provider
 * @property {string} insuranceProviderId - The insurance provider id
 * @property {string} policyHolderId - The policy holder id
 * @property {string=} planOrGroupNumber - The optional plan or group number
 */
/**
 * @typedef {Object} PolicyHolder
 * @property {string} firstName - The first name of the policy holder
 * @property {string} lastName - The last name of the policy holder
 * @property {string} dob - The date of birth of the policy holder
 */
/**
 * @typedef {Object} Dependent
 * @property {string} firstName - The first name of the dependent
 * @property {string} lastName - The last name of the dependent
 * @property {string} dob - The date of birth of the dependent
 */

/**
 * Returns the input for checking the eligibility of a patient as a dependent of a policy holder
 * @param {Object} props
 * @param {string} props.id = The id of the laguro patient
 * @param {PolicyHolder} props.policyHolder - The policy holder
 * @param {Dependent=} props.dependent - The optional dependent
 * @param {Insurance} props.insurance - The insurance information
 */
export const getCheckEligibilityInput = props => {
    const { id, policyHolder, dependent, insurance } = props;

    return {
        patientId: id,
        firstName: policyHolder.firstName,
        lastName: policyHolder.lastName,
        dob: policyHolder.dob,
        insuranceInfo: {
            insuranceProvider: insurance.insuranceProvider,
            insuranceProviderId: insurance.insuranceProviderId,
            policyHolderId: insurance.policyHolderId,
            ...(!_isEmpty(insurance.planOrGroupNumber) && {
                planOrGroupNumber: insurance.planOrGroupNumber,
            }),
        },
        ...(!_isEmpty(dependent) && {
            dependentFirstName: dependent.firstName,
            dependentLastName: dependent.lastName,
            dependentDob: dependent.dob,
        }),
    };
};
