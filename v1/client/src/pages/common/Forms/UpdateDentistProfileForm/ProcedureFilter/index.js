import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ProcedureFilterView from './view';
import esClient from '../../../../../util/esClient';
import { PROCEDURES } from '../../../../../util/strings';

const fetchFromES = async queryString => {
    const res = await esClient.search({
        index: PROCEDURES,
        body: {
            query: {
                multi_match: {
                    query: queryString,
                    fields: ['code', 'name', 'group'],
                },
            },
        },
    });

    return res;
};

class ProcedureFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            queryString: '',
            results: [],
        };
    }

    handleChange = async value => {
        await this.setState({ queryString: value });

        if (value.length > 2) {
            Promise.all([fetchFromES(value)])
                .then(async results => {
                    let formattedESResults = [];
                    if (results[0].hits.total > 0) {
                        formattedESResults = results[0].hits.hits.map(p => ({
                            code: p._source.code,
                            name: p._source.name,
                            group: p._source.group,
                            duration: p._source.duration,
                        }));
                    }
                    this.setState({
                        error: false,
                        results: formattedESResults,
                    });

                    return null;
                })
                .catch(err => {
                    this.setState({
                        error: true,
                        errorMsg: 'There was a problem retrieving data',
                        results: [],
                    });

                    // eslint-disable-next-line
                    console.warn(err);
                });
        }

        this.setState({
            error: false,
            results: [],
        });

        return null;
    };

    render() {
        const { queryString, results } = this.state;

        return (
            <ProcedureFilterView
                queryString={queryString}
                results={results}
                handleChange={this.handleChange}
                handleSuggestionSelect={this.props.handleSuggestionSelect}
                {...this.props}
            />
        );
    }
}

ProcedureFilter.defaultProps = {
    onLocationChange: null,
};

ProcedureFilter.propTypes = {
    onLocationChange: PropTypes.func,
};

export default ProcedureFilter;
