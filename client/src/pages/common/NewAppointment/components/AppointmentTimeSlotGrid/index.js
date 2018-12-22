import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import AppointmentTimeSlotGridView from './view';

class AppointmentTimeSlotGrid extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: {},
        };
    }

    handleSelect = event => {
        const { key } = event.currentTarget.dataset;
        const selected = get(this, `props.appointments[${key}]`);

        this.setState({ selected });

        if (this.props.onSelect) {
            this.props.onSelect(selected);
        }

        return null;
    };

    render() {
        const { appointments, selected } = this.props;

        return (
            <AppointmentTimeSlotGridView
                appointments={appointments}
                onSelect={this.handleSelect}
                selected={isEmpty(selected) ? this.state.selected : selected}
            />
        );
    }
}

AppointmentTimeSlotGrid.propTypes = {
    appointments: PropTypes.array,
    onSelect: PropTypes.func,
    selected: PropTypes.string,
};

export default AppointmentTimeSlotGrid;
