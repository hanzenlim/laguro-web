import * as React from 'react';
import KioskInsuranceView from './view';
import _get from 'lodash/get';

class KioskInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <KioskInsuranceView {...this.props} />;
    }

    static defaultProps = {
        onSkip: () => {},
    };
}

KioskInsurance['HAS_NO_INSURANCE'] = KioskInsuranceView['HAS_NO_INSURANCE'];

export const getKioskInsuranceInitialValues = user => {
    return {
        issueDate:
            _get(user, 'insuranceInfo.issueDate') || undefined,
        patientInsuranceNum:
            _get(user, 'insuranceInfo.policyHolderId') || undefined,
        insuranceProvider:
            _get(user, 'insuranceInfo.insuranceProvider') || undefined,
        insuranceProviderId: _get(
            user,
            'insuranceInfo.insuranceProviderId' || undefined
        ),
        planOrGroupNumber:
            _get(user, 'insuranceInfo.planOrGroupNumber') || undefined,
        hasNoInsurance: 'false',
        isPrimaryHolder: !_get(user, 'insuranceInfo')
            ? undefined
            : _get(user, 'insuranceInfo.policyHolderUserId')
            ? 'yes'
            : 'no',
        policyHolderUser: !_get(user, 'insuranceInfo.policyHolderUserId')
            ? {
                  firstName:
                      _get(user, 'insuranceInfo.policyHolderUser.firstName') ||
                      undefined,
                  lastName:
                      _get(user, 'insuranceInfo.policyHolderUser.lastName') ||
                      undefined,
                  gender: !_get(user, 'insuranceInfo.policyHolderUser.gender')
                      ? 'unknown'
                      : _get(user, 'insuranceInfo.policyHolderUser.gender'),
                  birthMonth:
                      _get(user, 'insuranceInfo.policyHolderUser.dob') &&
                      _get(user, 'insuranceInfo.policyHolderUser.dob').split(
                          '/'
                      )[0],
                  birthDate:
                      _get(user, 'insuranceInfo.policyHolderUser.dob') &&
                      _get(user, 'insuranceInfo.policyHolderUser.dob').split(
                          '/'
                      )[1],
                  birthYear:
                      _get(user, 'insuranceInfo.policyHolderUser.dob') &&
                      _get(user, 'insuranceInfo.policyHolderUser.dob').split(
                          '/'
                      )[2],
                  address1:
                      _get(
                          user,
                          'insuranceInfo.policyHolderUser.address.streetAddress'
                      ) || undefined,
                  address2:
                      _get(
                          user,
                          'insuranceInfo.policyHolderUser.address.addressDetails'
                      ) || undefined,
                  city:
                      _get(
                          user,
                          'insuranceInfo.policyHolderUser.address.city'
                      ) || undefined,
                  state:
                      _get(
                          user,
                          'insuranceInfo.policyHolderUser.address.state'
                      ) || undefined,
                  zipCode:
                      _get(
                          user,
                          'insuranceInfo.policyHolderUser.address.zipCode'
                      ) || undefined,
              }
            : {
                  firstName: undefined,
                  lastName: undefined,
                  gender: undefined,
                  birthMonth: undefined,
                  birthDate: undefined,
                  birthYear: undefined,
                  address1: undefined,
                  address2: undefined,
                  city: undefined,
                  state: undefined,
                  zipCode: undefined,
              },
    };
};

export { KioskInsurance };
