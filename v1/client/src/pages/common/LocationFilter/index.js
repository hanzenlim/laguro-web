import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import fetch from 'unfetch';

import LocationFilterView from './view';
import esClient from '../../../util/esClient';
import { DENTISTS, DENTIST, LOCATION } from '../../../util/strings';
import history from '../../../history';
import { mapBoxApiKey } from '../../../config/keys';

const fetchDentistsFromES = async queryString => {
    const res = await esClient.search({
        index: DENTISTS,
        body: {
            query: {
                match_phrase_prefix: {
                    name: queryString,
                },
            },
        },
    });

    return res;
};

const fetchLocationsFromMapbox = async queryString => {
    const header = { 'Content-Type': 'application/json' };
    const path = `https://api.mapbox.com/geocoding/v5/mapbox.places/${queryString}.json?access_token=${mapBoxApiKey}&country=us`;

    const result = await fetch(path, {
        headers: header,
    });

    return result.json();
};

class LocationFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            queryString: props.initialValue || '',
            locationResults: [],
            dentistResults: [],
        };
    }

    handleChange = async value => {
        await this.setState({ queryString: value });
        const { onSearch } = this.props;

        if (value.length > 2) {
            Promise.all(
                this.props.withDentists
                    ? [
                          fetchLocationsFromMapbox(value),
                          fetchDentistsFromES(value),
                      ]
                    : [fetchLocationsFromMapbox(value)]
            )
                .then(async results => {
                    const formattedMapboxResults = results[0].features.map(
                        place => ({
                            value: {
                                name: place.place_name,
                                lat: place.center[1],
                                long: place.center[0],
                            },
                            text: place.place_name,
                        })
                    );
                    const formattedESResults = results[1]
                        ? results[1].hits.hits.slice(0, 2).map(dentist => ({
                              name: dentist._source.name,
                              dentistId: dentist._id,
                              specialty: dentist._source.specialty,
                              location: dentist._source.location.name,
                          }))
                        : [];

                    this.setState({
                        error: false,
                        locationResults: formattedMapboxResults,
                        dentistResults: formattedESResults,
                    });

                    if (onSearch) onSearch(formattedMapboxResults);

                    return null;
                })
                .catch(err => {
                    this.setState({
                        error: true,
                        errorMsg: 'There was a problem retrieving data',
                        locationResults: [],
                        dentistResults: [],
                    });

                    // eslint-disable-next-line
                    console.warn(err);
                });
        }

        this.setState({
            error: false,
            locationResults: [],
            dentistResults: [],
        });

        return null;
    };

    handleSuggestionSelect = async (value, option) => {
        if (option.props.data.type === LOCATION) {
            this.props.onLocationChange(option.props.data.location);
            await this.setState({
                queryString: value,
                locationResults: [],
                dentistResults: [],
            });
        } else if (option.props.data.type === DENTIST) {
            history.push(`/dentist/${option.props.data.id}`);
        }
    };

    render() {
        const { queryString, locationResults, dentistResults } = this.state;
        const { onSearch, ...rest } = this.props;
        return (
            <LocationFilterView
                queryString={queryString}
                locationResults={locationResults}
                dentistResults={dentistResults}
                handleChange={this.handleChange}
                handleSuggestionSelect={this.handleSuggestionSelect}
                {...rest}
            />
        );
    }
}

LocationFilter.defaultProps = {
    onLocationChange: null,
    withDentists: false,
};

LocationFilter.propTypes = {
    onLocationChange: PropTypes.func,
    withDentists: PropTypes.bool,
};

export default LocationFilter;
