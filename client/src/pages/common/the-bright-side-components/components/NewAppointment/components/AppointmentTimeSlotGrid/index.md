import React, { PureComponent } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import AppointmentTimeSlotGridView from './view';

type State = {
    selected: object;
};

type Props = {
    appointments: Array<any>;
    selected: object;
    onSelect(data: any): void;
};

class AppointmentTimeSlotGrid extends PureComponent<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            selected: {}
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

export default AppointmentTimeSlotGrid;
