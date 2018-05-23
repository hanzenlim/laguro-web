import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

import mapPin from './icons/map-pin.svg';
import calendar from './icons/calendar.svg';

import "./css/Search.css";
import * as actions from '../actions';

const InputDiv = styled.div`
    @media screen and (min-width: 541px) {
        float: left;
        width: 37%;
        margin-left: 1%;
        margin-bottom: 1%;
    }
    @media screen and (max-width: 540px) {
        float: left;
        width: 88%;
        margin-left: 4%;
    }
`;

const SubmitButton = styled.button`
    @media screen and (min-width : 541px) {
        background-color: #F25F14;
        color: #FFF;
        height: auto;
        width: 100%;
    }

    @media screen and (max-width : 540px) {
        margin-top: 7%;
        width: 33%;
    }
`;

const Form = styled.form`
    @media screen and (min-width : 541px) {
        padding: 25px 20px 29px 20px;
    }
`;

const FormButtonsDiv = styled.div`
    @media screen and (min-width : 541px) {
        height: 45px;
        width: 16.4%;
    }
`;


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { location: '' };
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
    };

    onSubmit(values) {
        const { reset } = this.props;
        if (this.props.search === "office") {
            this.props.searchOffices({ values, location: this.state.location });
        } else {
            this.props.searchDentists({ values, location: 'San Leandro' });
        }
        reset();
    }

    renderDatePicker = ({ input, label, meta: { touched, error } }) => (
        <div>
            <img id="calendar-office-search" src={calendar} alt="calendar" />
            <InputDiv>
                <label>{label}</label>
                <DatePicker
                    {...input}
                    selected={input.value ? moment(input.value, 'MMM DD, YYYY') : null}
                    dateFormat="MMM DD, YYYY"
                    minDate={moment()}
                    placeholderText="When"
                />
            </InputDiv>
            {touched && error && <span>{error}</span>}
        </div>
    );

    render() {
        const { handleSubmit, pristine, submitting } = this.props;



	    return (
	        <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	            <PlacesAutocomplete
	                value={this.state.location}
	                onChange={this.handleChange}
	                onSelect={this.handleSelect}
	            >
	                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
	                    <div className="container-search">
	                        <img id="map-pin-office-search" src={mapPin} alt="map-pin" />
                            <InputDiv>
	                            <input
	                                {...getInputProps({
	                                    placeholder: 'Where',
	                                    className: 'location-search-input',
	                                })}
	                            />
                            </InputDiv>
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
	            <div className="container-search-date">
	                <Field name="date" component={this.renderDatePicker} />
	            </div>
	            <FormButtonsDiv className="form-buttons">
	                <SubmitButton
	                    className="waves-effect btn lighten-2"
	                    type="submit"
	                    disabled={ pristine || submitting }
	                >
                    Search
	                </SubmitButton>
	            </FormButtonsDiv>
	        </Form>

	    );
    }
}

export default reduxForm({
    form: "Search"
})(connect(null, actions)(Search));
