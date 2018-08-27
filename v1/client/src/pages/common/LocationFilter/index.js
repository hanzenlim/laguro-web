import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import fetch from 'unfetch';
import Autocomplete from '../../../components/Autocomplete';

const mapBoxApiKey =
    'pk.eyJ1IjoibGFndXJvLWFkbWluIiwiYSI6ImNqaWc3enk2bDE0dDAzd3Blb2dyOXRvc2oifQ.Ketzla96PFhKDE8-VwAI5g';

class LocationFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            queryString: '',
            queryResults: [],
        };
    }

    handleChange = async value => {
        await this.setState({ queryString: value });

        const header = { 'Content-Type': 'application/json' };
        const path = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            this.state.queryString
        }.json?access_token=${mapBoxApiKey}&country=us`;

        if (this.state.queryString.length > 2) {
            return fetch(path, {
                headers: header,
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(json => {
                    this.setState({
                        error: false,
                        queryResults: json.features,
                    });

                    return null;
                })
                .catch(err => {
                    this.setState({
                        error: true,
                        errorMsg:
                            'There was a problem retrieving data from mapbox',
                        queryResults: [],
                    });

                    // eslint-disable-next-line
                    console.warn(err);
                });
        }

        this.setState({
            error: false,
            queryResults: [],
        });

        return null;
    };

    handleSuggestionSelect = data => {
        this.setState({ queryString: data.place_name, queryResults: [] });

        if (this.props.onChange) {
            this.props.onChange(data.place_name);
        }
    };

    render() {
        return (
            <Autocomplete
                query={this.state.queryString}
                suggestions={this.state.queryResults}
                onChange={this.handleChange}
                onSuggestionSelect={this.handleSuggestionSelect}
            />
        );
    }
}

LocationFilter.defaultProps = {
    onChange: null,
};

LocationFilter.propTypes = {
    onChange: PropTypes.func,
};

export default LocationFilter;
