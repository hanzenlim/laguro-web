import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../actions';

class DentistSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { location: '' };
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    onLocationChange(location) {
        this.setState({ location });
    }

    handleChange = (location) => {
        //this.setState({ location });
        this.onLocationChange(location)
    }

    handleSelect = (location) => {
        geocodeByAddress(location)
            .then(results => getLatLng(results[0]));
    }

    onSubmit(values) {
        const { reset } = this.props;
        // hardcoded the location
        this.props.searchDentists({ values, location: 'San Leandro' });
        reset();
    }


    renderField = ({
        input, label, placeholder, meta: { touched, error },
    }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={placeholder} />
            </div>
            {touched && error && <span>{error}</span>}
        </div>
    );

    renderDatePicker = ({ input, label, meta: { touched, error } }) => (
        <div>
            <label>{label}</label>
            <DatePicker
                {...input}
                selected={input.value ? moment(input.value, 'MMM DD, YYYY') : null}
                dateFormat="MMM DD, YYYY"
                minDate={moment()}
                placeholderText={moment().format('MMM DD, YYYY')}
            />
            {touched && error && <span>{error}</span>}
        </div>
    );

    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        return (
            <form
                className="searchModule toggle"
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
            >
                <PlacesAutocomplete
                    value={this.state.location}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {suggestions.map((suggestion) => {
                                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <Field name="date" label="When" component={this.renderDatePicker} />
                <div className="form-buttons">
                    <button
                        className="waves-effect btn green lighten-2"
                        type="submit"
                        disabled={pristine || submitting}
                    >
  					Search
                    </button>
                </div>
            </form>

        );
    }
}


export default reduxForm({
    form: 'dentistSearch',
})(connect(null, actions)(DentistSearch));
