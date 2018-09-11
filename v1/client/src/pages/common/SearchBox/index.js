import React, { PureComponent } from 'react';
import queryString from 'query-string';
import moment from 'moment';

import SearchBoxView from './view';
import history from '../../../history';

class SearchBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            date: '',
        };

        this.urlParams = queryString.parse(history.location.search);

        if (this.urlParams.startTime) {
            this.urlParams.startTime = moment(this.urlParams.startTime).format(
                'ddd MM/DD'
            );
        }
    }

    handleLocationFilterChange = location => {
        this.setState({ location });
    };

    handleDateFilterChange = date => {
        this.setState({ date });
    };

    handleSubmit = () => {
        const { date, location } = this.state;

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

        history.push(`/dentist/search?${queryString.stringify(urlParams)}`);
    };

    render() {
        return (
            <SearchBoxView
                initialLocationFilterValue={this.urlParams.location}
                initialDateFilterValue={this.urlParams.startTime}
                onLocationFilterChange={this.handleLocationFilterChange}
                onDateFilterChange={this.handleDateFilterChange}
                onSubmit={this.handleSubmit}
                size={this.props.size}
            />
        );
    }
}

export default SearchBox;
