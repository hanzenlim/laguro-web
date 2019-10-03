import React, { PureComponent } from 'react';
import KioskMedicalHistoryFormPage from '~/common/KioskMedicalHistoryFormPage';

class FamilyMemberInsuranceForm extends PureComponent {
    handleFinish = test => {
        const { onSuccess = () => {} } = this.props;
        onSuccess();
    };

    render() {
        const { userId = '' } = this.props;

        return (
            <KioskMedicalHistoryFormPage
                userId={userId}
                onFinish={this.handleFinish}
                fromPatientDashboard
                withoutProgressBar
                cannotSkip
            />
        );
    }
}

export default FamilyMemberInsuranceForm;
