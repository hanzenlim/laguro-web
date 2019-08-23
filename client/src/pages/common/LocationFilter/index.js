import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { useDebounce } from 'use-debounce';
import useGoogleAutocomplete from '@laguro/use-google-autocomplete';

import { formatAddress } from '../../../util/styleUtil';
import LocationFilterView from './view';
import esClient from '../../../util/esClient';
import { DENTISTS, DENTIST, LOCATION } from '../../../util/strings';
import history from '../../../history';
import { googlePlacesApiKey } from '../../../config/keys';

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
    const [locationResults, setLocationResults] = useState([]);
    const [dentistResults, setDentistResults] = useState([]);

    const initialRender = React.useRef(false);
    const [debouncedSearchTerm] = useDebounce(queryString, 700);
    const { results, getPlaceDetails } = useGoogleAutocomplete({
        apiKey: googlePlacesApiKey,
        query: debouncedSearchTerm || '',
        options: {
            types: props.locationType || '(regions)',
            components: 'country:us',
        },
    });

    useEffect(() => {
        setQueryString(props.initialValue);
    }, [props.initialValue]);

    useEffect(() => {
        let predictions = [];
        if (props.locationType !== 'address') {
            results.predictions.forEach(prediction => {
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
            predictions = results.predictions;
        }
        setLocationResults(predictions);
        if (props.onSearch) {
            onSearch(
                results.predictions.map(location => ({
                    id: location.place_id,
                    description: location.description,
                }))
            );
        }
    }, [results]);

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
            setLocationResults([]);
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
            const response = await getPlaceDetails(
                option.props.data.location.place_id,
                {
                    fields: ['geometry'],
                }
            );
            const location = _get(response, 'result.geometry.location', {});
            props.onLocationChange({
                id: option.props.data.location.place_id,
                name: option.props.data.location.description,
                lat: location.lat,
                long: location.lng,
            });

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
