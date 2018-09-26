import React, { PureComponent } from 'react';
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

    render() {
        return (
            <FindAppointmentView
                onSubmit={this.onSubmit}
                onDateChange={this.onDateChange}
                disableButton={this.state.disableButton}
            />
        );
    }
}

FindAppointment.propTypes = {
    findAvailabilityHandler: PropTypes.func.isRequired,
};
export default FindAppointment;
