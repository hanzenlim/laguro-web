import React, { PureComponent } from 'react';
import SelectEquipmentView from './view';

const list = [
    {
        name: 'Digital X-Ray',
        price: '$20.00',
    },
    {
        name: 'Mobile Cabinets',
        price: '$20.00',
    },
    {
        name: 'Delivery Units',
        price: '$20.00',
    },
    {
        name: 'Clean Water Systems',
        price: '$20.00',
    },
    {
        name: 'Excavators',
        price: '$20.00',
    },
    {
        name: 'Probes',
        price: '$20.00',
    },
];

class SelectEquipment extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
        };
    }

    handleSelect = event => {
        const { key } = event.currentTarget.dataset;

        let selected = [];
        if (this.state.selected.includes(list[key])) {
            selected = this.state.selected.filter(item => item !== list[key]);
        } else {
            selected = [...this.state.selected, list[key]];
        }

        this.setState({ selected });
    };

    render() {
        return (
            <SelectEquipmentView
                list={list}
                selected={this.state.selected}
                onSelect={this.handleSelect}
            />
        );
    }
}

export default SelectEquipment;
