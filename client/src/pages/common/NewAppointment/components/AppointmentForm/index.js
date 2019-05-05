import React, { PureComponent } from 'react';
import moment from 'moment';
import AppointmentFormView from './view';

class AppointmentForm extends PureComponent {
    onSubmit = values => {
        const selectedPatient = this.props.patientsName.filter(
            value => value.fullName === values.patientName
        );

        const { dentalOfficeId } = values;

        this.props.onSubmit({
            selectedPatientId: selectedPatient[0].key,
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
        const { preferredLocations } = this.props;
        return (
            <AppointmentFormView
                onDateChange={this.onDateChange}
                preferredLocations={preferredLocations}
                onSelectLocation={this.handleSelectLocation}
                validate={this.validateForm}
                patientsName={this.props.patientsName}
                onSubmit={this.onSubmit}
                onClose={this.props.onClose}
            />
        );
    }
}
export default AppointmentForm;
