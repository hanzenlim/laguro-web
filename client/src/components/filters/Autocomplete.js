import React, { Component } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import 'react-datepicker/dist/react-datepicker.css';
import { addTooltip } from '../forms/sharedComponents';
import { Input, Typography } from '../common';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        const initialLocation = this.props.input.value || '';
        this.state = {
            location: initialLocation
        };
        if (initialLocation) {
            this.handleSelect(props.location);
        }
        this.onLocationChange = this.onLocationChange.bind(this);
        this.props.input.onChange(initialLocation);
    }

    onLocationChange(location) {
        this.setState({ location });
    }

    handleBlur = location => {
        const { onBlur } = this.props;
        if (onBlur) {
            this.props.onBlur(location);
        }
    };

    handleChange = location => {
        const { onChange } = this.props.input;
        if (onChange) {
            onChange('');
        }
        this.onLocationChange(location);
    };

    handleSelect = location => {
        const { onChange } = this.props.input;

        if (onChange) {
            onChange(location);
        }

        this.setState({ location });
        geocodeByAddress(location).then(results => getLatLng(results[0]));
    };

    render() {
        const { tooltip } = this.props;
        const { touched, error } = this.props.meta;
        return (
            <div className="searchModule toggle">
                <label>
                    {'Location '}
                    {tooltip && addTooltip(tooltip)}
                </label>
                <PlacesAutocomplete
                    value={this.state.location}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps
                    }) => (
                        <div>
                            <Input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input'
                                })}
                                onBlur={this.handleBlur}
                            />
                            <div className="autocomplete-dropdown-container">
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    const style = suggestion.active
                                        ? {
                                            backgroundColor: '#fafafa',
                                            cursor: 'pointer'
                                        }
                                        : {
                                            backgroundColor: '#ffffff',
                                            cursor: 'pointer'
                                        };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(
                                                suggestion,
                                                { className, style }
                                            )}
                                        >
                                            <span>
                                                {suggestion.description}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                {touched &&
                    error && <Typography color="red">{error}</Typography>}
            </div>
        );
    }
}

export default Autocomplete;
