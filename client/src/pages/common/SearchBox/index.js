import React, { PureComponent } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import _get from 'lodash/get';
import SearchBoxView from './view';
import history from '../../../history';

const OFFICE_PATH = '/office/search';
const DENTIST_PATH = '/dentist/search';

class SearchBox extends PureComponent {
    constructor(props) {
        super(props);

        const urlParams = queryString.parse(history.location.search);

        this.state = {
            location: '',
            date: '',
            text: '',
            urlParams,
        };

        history.listen(location => {
            const nextParams = queryString.parse(location.search);
            if (nextParams.location) {
                nextParams.location = nextParams.location.replace(/_/g, ' ');
            }

            if (this.state.location !== nextParams.location) {
                this.setState({
                    urlParams: nextParams,
                });
            }
        });

        if (urlParams.startTime) {
            urlParams.startTime = moment(urlParams.startTime).format(
                'ddd MM/DD'
            );
        }
    }

    handleTextChange = text => {
        this.setState({ text, location: '' });
    };

    handleLocationFilterChange = location => {
        this.setState({ location, text: '' });
    };

    handleDateFilterChange = date => {
        this.setState({ date });
    };

    handleSubmit = () => {
        const { date, location: locationFromState, text } = this.state;
        const urlParams = {};
        const location = locationFromState || {
            name: 'San Francisco, California, United States',
            lat: 37.7648,
            long: -122.463,
        };

        if (text) {
            urlParams.text = text;
        } else {
            urlParams.location = location.name;
            urlParams.lat = location.lat;
            urlParams.long = location.long;
        }

        if (date) {
            const startTime = moment(date)
                .startOf('day')
                .utc();
            const endTime = moment(date)
                .endOf('day')
                .utc();

            urlParams.startTime = startTime.format();
            urlParams.endTime = endTime.format();
        }

        const currentPath = _get(history, 'location.pathname') || DENTIST_PATH;
        const path = currentPath.startsWith('/office')
            ? OFFICE_PATH
            : DENTIST_PATH;

        history.push(`${path}?${queryString.stringify(urlParams)}`);
    };

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    };

    render() {
        return (
            <SearchBoxView
                initialLocationFilterValue={
                    this.state.urlParams.location || this.state.urlParams.text
                }
                initialDateFilterValue={this.state.urlParams.startTime}
                onLocationFilterChange={this.handleLocationFilterChange}
                onTextChange={this.handleTextChange}
                onDateFilterChange={this.handleDateFilterChange}
                onSubmit={this.handleSubmit}
                size={this.props.size}
                locationPlaceholder={this.props.placeholder}
                onKeyPress={this.handleKeyPress}
            />
        );
    }
}

export default SearchBox;
