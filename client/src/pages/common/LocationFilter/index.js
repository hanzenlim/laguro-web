import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetch from 'unfetch';
import _get from 'lodash/get';
import { useDebounce } from 'use-debounce';

import { formatAddress } from '../../../util/styleUtil';
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
                bool: {
                    must: [
                        {
                            term: {
                                isVerified: {
                                    value: true,
                                },
                            },
                        },
                        {
                            match_phrase_prefix: {
                                name: queryString,
                            },
                        },
                    ],
                },
            },
        },
    });

    return res;
};

const fetchLocationsFromMapbox = async (queryString, locationType) => {
    const header = { 'Content-Type': 'application/json' };
    const locationTypeFilter = locationType ? `&types=${locationType}` : '';
    const path = `https://api.mapbox.com/geocoding/v5/mapbox.places/${queryString}.json?access_token=${mapBoxApiKey}&country=us${locationTypeFilter}`;

    const result = await fetch(path, {
        headers: header,
    });

    return result.json();
};

const LocationFilter = props => {
    const initialRender = React.useRef(false);
    const [queryString, setQueryString] = useState(props.initialValue || '');
    const [locationResults, setLocationResults] = useState([]);
    const [dentistResults, setDentistResults] = useState([]);
    const [debouncedSearchTerm] = useDebounce(queryString, 300);

    useEffect(() => {
        setQueryString(props.initialValue);
    }, [props.initialValue]);

    useEffect(() => {
        if (initialRender.current === false) {
            initialRender.current = true;
            return;
        }

        const value = debouncedSearchTerm;
        const { onTextChange, onSearch, locationType } = props;

        if (onTextChange) onTextChange(value);
        if (value && value.length > 2) {
            Promise.all(
                props.withDentists
                    ? [
                          fetchLocationsFromMapbox(value, locationType),
                          fetchDentistsFromES(value),
                      ]
                    : [fetchLocationsFromMapbox(value, locationType)]
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
                              location: formatAddress(
                                  _get(
                                      dentist,
                                      '_source.reservations[0].address',
                                      ''
                                  ),
                                  _get(
                                      dentist,
                                      '_source.reservations[0].addressDetails',
                                      ''
                                  )
                              ),
                          }))
                        : [];

                    setLocationResults(formattedMapboxResults);
                    setDentistResults(formattedESResults);
                    if (onSearch) onSearch(formattedMapboxResults);
                    return null;
                })
                .catch(err => {
                    setLocationResults([]);
                    setDentistResults([]);
                    // eslint-disable-next-line
                    console.warn(err);
                });
        } else {
            setLocationResults([]);
            setDentistResults([]);
        }
    }, [debouncedSearchTerm]);

    const handleChange = async value => {
        setQueryString(value);
    };

    const handleSuggestionSelect = async (value, option) => {
        if (option.props.data.type === 'STRING') {
            props.onQueryString(option.props.data.string);
        }
        if (option.props.data.type === LOCATION) {
            props.onLocationChange(option.props.data.location);
            setQueryString(value);
            setLocationResults([]);
            setDentistResults([]);
        } else if (option.props.data.type === DENTIST) {
            history.push(`/dentist/${option.props.data.id}`);
        }
    };

    const { onSearch, ...rest } = props;

    return (
        <LocationFilterView
            queryString={queryString}
            locationResults={locationResults}
            dentistResults={dentistResults}
            handleChange={handleChange}
            handleSuggestionSelect={handleSuggestionSelect}
            {...rest}
        />
    );
};

LocationFilter.defaultProps = {
    onLocationChange: null,
    withDentists: false,
};

LocationFilter.propTypes = {
    onLocationChange: PropTypes.func,
    withDentists: PropTypes.bool,
};

export default LocationFilter;
