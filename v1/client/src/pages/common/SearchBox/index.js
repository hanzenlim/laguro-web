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
        const defaultLocation = {
            name: 'San Francisco, California, United States',
            lat: 37.7648,
            long: -123.463,
        };

        const locationName = location ? location.name : defaultLocation.name;
        const locationLat = location ? location.lat : defaultLocation.lat;
        const locationLong = location ? location.long : defaultLocation.long;
        const startTime = date
            ? moment(date).startOf('day')
            : moment().startOf('day');
        const endTime = date
            ? moment(date).endOf('day')
            : moment().endOf('day');

        const urlParams = {};
        urlParams.startTime = startTime.format();
        urlParams.endTime = endTime.format();
        urlParams.location = locationName;
        urlParams.lat = locationLat;
        urlParams.long = locationLong;

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
