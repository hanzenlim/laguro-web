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

        this.state = {
            location: '',
            date: '',
            text: '',
        };

        this.urlParams = queryString.parse(history.location.search);

        if (this.urlParams.startTime) {
            this.urlParams.startTime = moment(this.urlParams.startTime).format(
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
        const { date, location, text } = this.state;

        const urlParams = {};
        if (location) {
            urlParams.location = location.name;
            urlParams.lat = location.lat;
            urlParams.long = location.long;
        }

        if (date) {
            const startTime = moment(date).startOf('day');
            const endTime = moment(date).endOf('day');

            urlParams.startTime = startTime.format();
            urlParams.endTime = endTime.format();
        }

        if (text) {
            urlParams.text = text;
        }

        const currentPath = _get(history, 'location.pathname') || DENTIST_PATH;
        const path = currentPath.includes(OFFICE_PATH)
            ? OFFICE_PATH
            : DENTIST_PATH;

        history.push(`${path}?${queryString.stringify(urlParams)}`);
    };

    render() {
        return (
            <SearchBoxView
                initialLocationFilterValue={
                    this.urlParams.location || this.urlParams.text
                }
                initialDateFilterValue={this.urlParams.startTime}
                onLocationFilterChange={this.handleLocationFilterChange}
                onTextChange={this.handleTextChange}
                onDateFilterChange={this.handleDateFilterChange}
                onSubmit={this.handleSubmit}
                size={this.props.size}
                locationPlaceholder={this.props.placeholder}
            />
        );
    }
}

export default SearchBox;
