import React, { PureComponent } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
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
        const { date, location, text } = this.state;

        // location search requires date, text search doesn't
        const locationSearch = !_isEmpty(location) && !_isEmpty(date);
        const textSearch = !_isEmpty(text);

        // if current data doesn't support either search, stop search
        if (!locationSearch && !textSearch) {
            return;
        }

        const urlParams = {};
        if (location) {
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

        if (text) {
            urlParams.text = text;
        }

        const currentPath = _get(history, 'location.pathname') || DENTIST_PATH;
        const path = currentPath.startsWith('/office')
            ? OFFICE_PATH
            : DENTIST_PATH;

        history.push(`${path}?${queryString.stringify(urlParams)}`);
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
            />
        );
    }
}

export default SearchBox;
