import React, { PureComponent } from 'react';
import SelectHoursView from './view';

const list = [
    '9AM',
    '10AM',
    '11AM',
    '12AM',
    '1PM',
    '2PM',
    '3PM',
    '4PM',
    '5PM',
    '6PM',
    '7PM',
];
class SelectHours extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            isOpen: true,
            isAllSelected: false,
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

    handleToggleSelectAll = () => {
        if (!this.state.isAllSelected) {
            this.setState({ isAllSelected: true, selected: list });
        } else {
            this.setState({ isAllSelected: false, selected: [] });
        }
    };

    handleToggleContent = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        return (
            <SelectHoursView
                list={list}
                isOpen={this.state.isOpen}
                selected={this.state.selected}
                isAllSelected={this.state.isAllSelected}
                onSelect={this.handleSelect}
                onToggleContent={this.handleToggleContent}
                onToggleSelectAll={this.handleToggleSelectAll}
            />
        );
    }
}

export default SelectHours;
