import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import _startCase from 'lodash/startCase';

import history from '../../../history';
import SearchFilterView from './view';
import { trackSearchFilter } from '../../../util/trackingUtils';

const SearchFilter = () => {
    const [urlParams, setUrlParams] = useState(
        queryString.parse(history.location.search) || {}
    );

    useEffect(() => {
        if (window && window.localStorage) {
            const answers = window.localStorage.getItem('homepageSurvey');
            const parsedAnswers = JSON.parse(answers);
            setUrlParams(parsedAnswers);
            history.push({
                search: `?${queryString.stringify(parsedAnswers)}`,
            });
        }
    }, []);

    const handleSelect = (name, value) => {
        const updatedUrlParams = queryString.parse(history.location.search);
        updatedUrlParams[name] = value;
        setUrlParams(updatedUrlParams);
        history.push({ search: `?${queryString.stringify(updatedUrlParams)}` });

        if (trackSearchFilter) {
            trackSearchFilter({
                eventLabel: `${_startCase(name)} - ${value}`,
            });
        }
    };

    return <SearchFilterView data={urlParams} onSelect={handleSelect} />;
};

export default SearchFilter;
