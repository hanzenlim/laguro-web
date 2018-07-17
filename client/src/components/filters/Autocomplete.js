import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import 'react-datepicker/dist/react-datepicker.css';
import { addTooltip } from '../forms/sharedComponents';
import * as actions from '../../actions';
import { Input } from '../common';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = { location: props.location || '' };
        if (props.location) {
            this.handleSelect(props.location);
        }
        this.onLocationChange = this.onLocationChange.bind(this);
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
        const { onChange } = this.props;
        if (onChange) {
            this.props.onChange(location);
        }
        this.onLocationChange(location);
    };

    handleSelect = location => {
        const { onAutocomplete } = this.props;

        if (onAutocomplete) {
            onAutocomplete(location);
        }

        this.setState({ location });
        geocodeByAddress(location).then(results => getLatLng(results[0]));
    };

    onSubmit(values) {
        const { reset } = this.props;
        this.props.searchOffices({ values, location: this.state.location });
        reset();
    }

    render() {
        const { tooltip } = this.props;
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
            </div>
        );
    }
}

export default reduxForm({
    form: 'Autocomplete'
})(connect(null, actions)(Autocomplete));
