import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import queryString from 'query-string';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from 'react-places-autocomplete';
import styled from 'styled-components';
import history from '../../history';
import { Input, Grid, Button } from './../common';
import { Padding } from './../common/Spacing';

import * as actions from '../../actions';

const SearchContainer = styled.div`
    position: relative;
`;

const SearchInput = styled(Input)``;

const SearchResultsConainer = styled.div`
    position: absolute;
    width: 100%;
    z-index: 960;
    background-color: #fafafa;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
`;

const ResultsItem = styled.div`
    padding: 12px 16px;
    background-color: white;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;

class LocationFilter extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);

        this.state = {
            location: this.urlParams.query || this.props.searchLocation || ''
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
    };

    // replace updateFilters with searchOffices
    onSubmit() {
        const { reset } = this.props;
        this.props.updateFilters({ location: this.state.location });

        history.push({
            pathname: '/office/search',
            search: `?query=${this.state.location}`
        });
        reset();
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Grid container>
                    <Grid item xs>
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
                                <SearchContainer>
                                    <label>Search places:</label>
                                    <SearchInput
                                        fullWidth
                                        {...getInputProps({})}
                                    />

                                    {suggestions.length ? (
                                        <SearchResultsConainer>
                                            {suggestions.map(suggestion => {
                                                return (
                                                    <ResultsItem
                                                        active={
                                                            suggestion.active
                                                        }
                                                        {...getSuggestionItemProps(
                                                            suggestion
                                                        )}
                                                    >
                                                        <span>
                                                            {
                                                                suggestion.description
                                                            }
                                                        </span>
                                                    </ResultsItem>
                                                );
                                            })}
                                        </SearchResultsConainer>
                                    ) : null}
                                </SearchContainer>
                            )}
                        </PlacesAutocomplete>
                    </Grid>
                    <Grid item>
                        <Padding left={7}>
                            <Button
                                variant="raised"
                                color="secondary"
                                type="submit"
                            >
                                Search
                            </Button>
                        </Padding>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default reduxForm({
    form: 'locationFilter'
})(connect(null, actions)(LocationFilter));
