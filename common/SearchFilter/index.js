import React, { useContext } from 'react';
import _startCase from 'lodash/startCase';

import SearchFilterView from './view';
import { trackSearchFilter } from '~/util/trackingUtils';
import { DentistSearchFilterContext } from '../../pages/dentist-search';

const SearchFilter = () => {
    const { urlParams, setUrlParams } = useContext(DentistSearchFilterContext);

    const handleSelect = (name, value) => {
        const updatedUrlParams = { ...urlParams, [name]: value };
        setUrlParams(updatedUrlParams);

        if (trackSearchFilter) {
            trackSearchFilter({
                eventLabel: `${_startCase(name)} - ${value}`,
            });
        }
    };

    return <SearchFilterView data={urlParams} onSelect={handleSelect} />;
};

export default SearchFilter;
