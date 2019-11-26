import React, { PureComponent } from 'react';
import moment from 'moment';
import AppointmentFormView from './view';

class AppointmentForm extends PureComponent {
    onSubmit = values => {
        const { onSubmit } = this.props;

        const { dentalOfficeId } = values;

        onSubmit({
            selectedPatientId: values.patientName,
            dentalOfficeId,
            selectedDate: values.selectedDate,
            selectedStartTime: values.selectedStartTime,
            selectedEndTime: values.selectedEndTime,
        });
    };

    validateForm = values => {
        const errors = {};

        if (!values.patientName) {
            errors.patientName = 'Please select a patient';
        }

        if (!values.selectedDate) {
            errors.selectedTime = 'Please select a date';
        }

        if (!values.dentalOfficeId) {
            errors.dentalOfficeId = 'Please select a location';
        }

        if (!values.selectedStartTime) {
            errors.selectedStartTime = 'Please select a start time';
        }

        if (!values.selectedEndTime) {
            errors.selectedEndTime = 'Please select a end time';
        }

        if (
            values.selectedStartTime &&
            values.selectedEndTime &&
            moment(values.selectedEndTime).isBefore(
                moment(values.selectedStartTime)
            )
        ) {
            errors.startTimeEndTime =
                'End time cannot be before the start time';
        }

        return errors;
    };

    render() {
        const {
            preferredLocations,
            mutationLoading,
            patientsName,
            onClose,
            patients,
        } = this.props;
        return (
            <AppointmentFormView
                onDateChange={this.onDateChange}
                preferredLocations={preferredLocations}
                onSelectLocation={this.handleSelectLocation}
                validate={this.validateForm}
                patientsName={patientsName}
                patients={patients}
                onSubmit={this.onSubmit}
                onClose={onClose}
                mutationLoading={mutationLoading}
            />
        );
    }
}
export default AppointmentForm;
