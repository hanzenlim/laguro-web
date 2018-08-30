import React, { PureComponent } from 'react';
import SelectAppointmentView from './view';

// FOR UI DEMO
const list = ['3:00PM', '4:00PM', '5:00PM', '8:00PM'];

class SelectAppointmentContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
        };
    }

    handleSelect = event => {
        const { key } = event.currentTarget.dataset;

        this.setState({ selected: list[key] });
    };

    render() {
        return (
            <SelectAppointmentView
                list={list}
                selected={this.state.selected}
                onSelect={this.handleSelect}
            />
        );
    }
}

export default SelectAppointmentContainer;
