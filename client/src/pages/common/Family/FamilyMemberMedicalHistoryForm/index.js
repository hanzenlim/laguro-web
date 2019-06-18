import React, { PureComponent } from 'react';
import KioskMedicalHistoryFormPage from '../../../KioskMedicalHistoryFormPage';

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
                fromPatientDashboard={true}
                withoutProgressBar={true}
                cannotSkip={true}
            />
        );
    }
}

export default FamilyMemberInsuranceForm;
