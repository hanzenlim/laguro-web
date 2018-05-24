import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import 'react-datepicker/dist/react-datepicker.css';
import * as actions from '../../actions';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = { location: props.location || '' };
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    onLocationChange(location) {
        //const { onChange } = input;
        this.setState({ location });
        //onChange(location);
    }

    handleChange = location => {
        this.onLocationChange(location);
    };

    handleSelect = location => {
        const { onAutocomplete } = this.props;
        onAutocomplete(location);
        geocodeByAddress(location).then(results => getLatLng(results[0]));
    };

    onSubmit(values) {
        const { reset } = this.props;
        this.props.searchOffices({ values, location: this.state.location });
        reset();
    }

    render() {
        return (
            <div className="searchModule toggle active">
                <span className="location-field">Location:</span>
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
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input'
                                })}
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
