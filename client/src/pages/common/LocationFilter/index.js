import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { useDebounce } from 'use-debounce';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { formatAddress } from '../../../util/styleUtil';
import LocationFilterView from './view';
import esClient from '../../../util/esClient';
import { DENTISTS, DENTIST, LOCATION } from '../../../util/strings';
import history from '../../../history';

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

const LocationFilter = props => {
    const [queryString, setQueryString] = useState(props.initialValue || '');
    const [dentistResults, setDentistResults] = useState([]);
    const initialRender = React.useRef(false);
    const [debouncedSearchTerm] = useDebounce(queryString, 700);

    useEffect(() => {
        setQueryString(props.initialValue);
    }, [props.initialValue]);

    useEffect(() => {
        if (initialRender.current === false) {
            initialRender.current = true;
            return;
        }

        if (props.onTextChange) {
            props.onTextChange(debouncedSearchTerm);
        }

        if (debouncedSearchTerm && debouncedSearchTerm.length > 2) {
            if (props.withDentists) {
                fetchDentistsFromES(debouncedSearchTerm)
                    .then(async results => {
                        const formattedESResults = results
                            ? results.hits.hits.slice(0, 2).map(dentist => ({
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

                        setDentistResults(formattedESResults);

                        return null;
                    })
                    .catch(err => {
                        setDentistResults([]);
                        // eslint-disable-next-line
                        console.warn(err);
                    });
            }
        } else {
            setDentistResults([]);
        }
    }, [debouncedSearchTerm]);

    const handleChange = value => {
        setQueryString(value);
    };

    const handleSuggestionSelect = async (value, option) => {
        if (option.props.data.type === 'STRING') {
            props.onQueryString(option.props.data.string);
        }
        if (option.props.data.type === LOCATION) {
            setQueryString(option.props.data.location.description);
            const response = await geocodeByAddress(
                option.props.data.location.description
            );
            const latLng = await getLatLng(response[0]);
            props.onLocationChange({
                id: option.props.data.location.placeId,
                name: option.props.data.location.description,
                lat: latLng.lat,
                long: latLng.lng,
            });
            setDentistResults([]);
        } else if (option.props.data.type === DENTIST) {
            history.push(`/dentist/${option.props.data.id}`);
        }
    };

    const getSuggestions = suggestions => {
        let predictions = [];
        if (props.locationType !== 'address') {
            suggestions.forEach(prediction => {
                const descriptionElements = prediction.description.split(',');
                // Remove country from array of descriptions
                descriptionElements.pop();
                const newDescription = descriptionElements.join(',');
                predictions.push({
                    ...prediction,
                    description: newDescription,
                });
            });
        } else {
            predictions = suggestions;
        }
        if (props.onSearch) {
            onSearch(
                suggestions.map(location => ({
                    id: location.place_id,
                    description: location.description,
                }))
            );
        }
        return predictions;
    };

    const searchOptions = {
        types: props.locationType ? [props.locationType] : ['(regions)'],
        componentRestrictions: { country: 'us' },
    };

    const { onSearch, ...rest } = props;

    return (
        <PlacesAutocomplete
            value={queryString}
            onChange={handleChange}
            searchOptions={searchOptions}
            debounce={700}
        >
            {({ getInputProps, suggestions }) => {
                const parsedSuggestions = getSuggestions(suggestions);
                return (
                    <LocationFilterView
                        queryString={queryString}
                        locationResults={parsedSuggestions}
                        dentistResults={dentistResults}
                        handleChange={value =>
                            getInputProps().onChange({
                                target: {
                                    value,
                                },
                            })
                        }
                        handleSuggestionSelect={handleSuggestionSelect}
                        {...rest}
                    />
                );
            }}
        </PlacesAutocomplete>
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
