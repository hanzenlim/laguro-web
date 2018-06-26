import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styled from 'styled-components';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import 'react-datepicker/dist/react-datepicker.css';

import { Grid } from './common';

import mapPin from './icons/map-pin.svg';
import calendar from './icons/calendar.svg';

import './css/Search.css';
import * as actions from '../actions';

const Form = styled.form`
    @media screen and (min-width: 541px) {
        padding: 25px 20px 29px 20px;
    }
`;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            enableSearch: false
        };
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    onLocationChange(location) {
        const { input } = this.props;
        const { onChange } = input;
        this.setState({ location });
        onChange(location);
    }

    handleChange = location => {
        this.setState({ location });
    };

    handleSelect = location => {
        geocodeByAddress(location).then(results => getLatLng(results[0]));
        this.setState({
            location,
            enableSearch: true
        });
    };

    onSubmit(values) {
        const { reset } = this.props;
        if (this.props.search === 'office') {
            this.props.searchOffices({ values, location: this.state.location });
        } else {
            this.props.searchDentists({
                values,
                location: this.state.location
            });
        }
        reset();
    }

    renderDatePicker = ({ input, label, meta: { touched, error } }) => {
        return (
            <Grid container spacing={16}>
                <Grid item xs={1} lg={1}>
                    <img
                        id="calendar-office-search"
                        src={calendar}
                        alt="calendar"
                    />
                </Grid>
                <Grid item xs={11} lg={11}>
                    <label>{label}</label>
                    <DatePicker
                        {...input}
                        selected={
                            input.value
                                ? moment(input.value, 'MMM DD, YYYY')
                                : null
                        }
                        dateFormat="MMM DD, YYYY"
                        minDate={moment()}
                        placeholderText="When"
                    />
                    {touched && error && <span>{error}</span>}
                </Grid>
            </Grid>
        );
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Grid container spacing={24}>
                    <Grid item xs={12} lg={5}>
                        <Grid container spacing={16}>
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
                                    <Grid container spacing={16}>
                                        <Grid item xs={1} lg={1}>
                                            <img
                                                id="map-pin-office-search"
                                                src={mapPin}
                                                alt="map-pin"
                                            />
                                        </Grid>
                                        <Grid item xs={11} lg={11}>
                                            <div>
                                                <input
                                                    name="location"
                                                    component="input"
                                                    type="text"
                                                    {...getInputProps({
                                                        placeholder: 'Where',
                                                        className:
                                                            'location-search-input'
                                                    })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                    {suggestions.map(
                                                        suggestion => {
                                                            const className = suggestion.active
                                                                ? 'suggestion-item--active'
                                                                : 'suggestion-item';
                                                            // inline style for demonstration purpose
                                                            const style = suggestion.active
                                                                ? {
                                                                      backgroundColor:
                                                                          '#fafafa',
                                                                      cursor:
                                                                          'pointer'
                                                                  }
                                                                : {
                                                                      backgroundColor:
                                                                          '#ffffff',
                                                                      cursor:
                                                                          'pointer'
                                                                  };
                                                            return (
                                                                <div
                                                                    {...getSuggestionItemProps(
                                                                        suggestion,
                                                                        {
                                                                            className,
                                                                            style
                                                                        }
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {
                                                                            suggestion.description
                                                                        }
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                )}
                            </PlacesAutocomplete>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                        <Grid container spacing={16}>
                            <Field
                                name="date"
                                component={this.renderDatePicker}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={1}>
                        <Grid container spacing={16}>
                            <div className="form-buttons">
                                <button
                                    className="waves-effect btn lighten-2"
                                    type="submit"
                                    disabled={!this.state.enableSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Form>
        );
    }
}

export default reduxForm({
    form: 'Search'
})(
    connect(
        null,
        actions
    )(Search)
);
