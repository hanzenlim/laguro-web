import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SelectEquipmentView from './view';

class SelectEquipment extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };
        const { officeEquipment = [] } = this.props;

        this.list = officeEquipment.map(value => ({
            name: value.name,
            price: value.price,
        }));
    }

    handleSelect = event => {
        const { key } = event.currentTarget.dataset;

        let selected = [];

        // If equipment is already selected, remove it from the list.
        if (this.state.selected.includes(this.list[key])) {
            selected = this.state.selected.filter(
                item => item !== this.list[key]
            );
        } else {
            selected = [...this.state.selected, this.list[key]];
        }

        this.setState({ selected }, () => {
            this.props.onSelectEquipment(selected);
        });
    };

    render() {
        return (
            <SelectEquipmentView
                list={this.list}
                selected={this.state.selected}
                onSelect={this.handleSelect}
            />
        );
    }
}

SelectEquipment.defaultProps = {
    onSelectEquipment: () => {},
};

SelectEquipment.PropTypes = {
    onSelectEquipment: PropTypes.func.isRequired,
};
export default SelectEquipment;
