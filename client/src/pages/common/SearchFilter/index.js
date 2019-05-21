import React, { PureComponent } from 'react';
import queryString from 'query-string';
import _startCase from 'lodash/startCase';

import history from '../../../history';
import SearchFilterView from './view';
import { trackSearchFilter } from '../../../util/trackingUtils';

class SearchFilter extends PureComponent {
    constructor(props) {
        super(props);

        const urlParams = queryString.parse(history.location.search);

        this.state = {
            urlParams: urlParams || {},
        };
    }

    handleSelect = (name, value) => {
        const urlParams = queryString.parse(history.location.search);
        urlParams[name] = value;
        history.push({ search: `?${queryString.stringify(urlParams)}` });

        if (trackSearchFilter) {
            trackSearchFilter({
                eventLabel: `${_startCase(name)} - ${value}`,
            });
        }
    };

    render() {
        return (
            <SearchFilterView
                data={this.state.urlParams}
                onSelect={this.handleSelect}
            />
        );
    }
}

export default SearchFilter;
