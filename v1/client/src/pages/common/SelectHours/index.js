import React, { PureComponent } from 'react';
import _indexOf from 'lodash/indexOf';
import _clone from 'lodash/clone';
import PropTypes from 'prop-types';
import SelectHoursView from './view';

class SelectHours extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            selectedPrice: [],
            selectedCleaningFee: [],
            selectedListingId: [],
            isOpen: true,
            isAllSelected: false,
        };
    }

    handleSelect = event => {
        const { key } = event.currentTarget.dataset;
        const { hourList, selectedHoursHandler } = this.props;

        let selected = _clone(this.state.selected);
        let selectedPrice = _clone(this.state.selectedPrice);
        let selectedCleaningFee = _clone(this.state.selectedCleaningFee);
        let selectedListingId = _clone(this.state.selectedListingId);

        if (this.state.selected.includes(hourList[key].time)) {
            selected = selected.filter(item => item !== hourList[key].time);

            const selectedTimeIndex = _indexOf(
                this.state.selected,
                hourList[key].time
            );
            selectedPrice.splice(selectedTimeIndex, 1);
            selectedCleaningFee.splice(selectedTimeIndex, 1);
            selectedListingId.splice(selectedListingId, 1);
        } else {
            selected = [...this.state.selected, hourList[key].time];
            selectedPrice = [...this.state.selectedPrice, hourList[key].price];
            selectedCleaningFee = [
                ...this.state.selectedCleaningFee,
                hourList[key].cleaningFee,
            ];
            selectedListingId = [
                ...this.state.selectedListingId,
                hourList[key].listingId,
            ];
        }

        this.setState(
            { selected, selectedPrice, selectedCleaningFee, selectedListingId },
            () => {
                selectedHoursHandler(
                    this.state.selected,
                    this.state.selectedPrice,
                    this.state.selectedCleaningFee,
                    this.state.selectedListingId
                );
            }
        );
    };

    handleToggleSelectAll = () => {
        const { hourList, selectedHoursHandler } = this.props;
        // if isAllSelected is false that means the field was toggled to true.
        if (!this.state.isAllSelected) {
            this.setState(
                {
                    isAllSelected: true,
                    selected: hourList.map(value => value.time),
                    selectedPrice: hourList.map(value => value.price),
                    selectedCleaningFee: hourList.map(
                        value => value.cleaningFee
                    ),
                    selectedListingId: hourList.map(value => value.listingId),
                },
                () => {
                    selectedHoursHandler(
                        this.state.selected,
                        this.state.selectedPrice,
                        this.state.selectedCleaningFee,
                        this.state.selectedListingId
                    );
                }
            );
        } else {
            this.setState(
                {
                    isAllSelected: false,
                    selected: [],
                    selectedPrice: [],
                    selectedCleaningFee: [],
                    selectedListingId: [],
                },
                () => {
                    selectedHoursHandler(
                        this.state.selected,
                        this.state.selectedPrice,
                        this.state.selectedCleaningFee,
                        this.state.selectedListingId
                    );
                }
            );
        }
    };

    handleToggleContent = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        const { formattedDateText, hourList, priceRangeLength } = this.props;
        return (
            <SelectHoursView
                priceRangeLength={priceRangeLength}
                list={hourList}
                isOpen={this.state.isOpen}
                selected={this.state.selected}
                isAllSelected={this.state.isAllSelected}
                onSelect={this.handleSelect}
                onToggleContent={this.handleToggleContent}
                onToggleSelectAll={this.handleToggleSelectAll}
                formattedDateText={formattedDateText}
            />
        );
    }
}
SelectHours.PropTypes = {
    priceRangeLength: PropTypes.string.isRequired,
    hourList: PropTypes.array.isRequired,
    formattedDateText: PropTypes.string.isRequired,
    selectedHoursHandler: PropTypes.func.isRequired,
};
export default SelectHours;
