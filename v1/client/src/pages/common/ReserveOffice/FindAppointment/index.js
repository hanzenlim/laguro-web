import React, { PureComponent } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import FindAppointmentView from './view';

class FindAppointment extends PureComponent {
    state = {
        datesSelected: [],
        disableButton: true,
    };

    onDateChange = values => {
        this.setState({
            datesSelected: values,
            disableButton: false,
        });
    };

    onSubmit = () => {
        const { findAvailabilityHandler } = this.props;

        let [selectedStartDate, selectedEndDate] = this.state.datesSelected;

        selectedStartDate = selectedStartDate.startOf('day');
        selectedEndDate = selectedEndDate.endOf('day');

        findAvailabilityHandler([selectedStartDate, selectedEndDate]);
    };

    // This function is used by antd datepicker to determin which days are disabled.
    disabledDate = currentDate => {
        const today = moment()
            .startOf('day')
            .startOf('hour');
        return currentDate.isBefore(today);
    };

    render() {
        return (
            <FindAppointmentView
                onSubmit={this.onSubmit}
                onDateChange={this.onDateChange}
                disableButton={this.state.disableButton}
                disabledDate={this.disabledDate}
            />
        );
    }
}

FindAppointment.propTypes = {
    findAvailabilityHandler: PropTypes.func.isRequired,
};
export default FindAppointment;
