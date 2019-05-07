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
            location: urlParams.location
                ? {
                      name: urlParams.location,
                      lat: urlParams.lat,
                      long: urlParams.long,
                  }
                : '',
            date: '',
            text: urlParams.text || '',
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

    handleLocationFilterChange = async location => {
        await this.setState({ location, text: '' });
        this.handleSubmit();
    };

    handleQueryString = async string => {
        await this.setState({ text: string });
        this.handleSubmit();
    };

    handleSubmit = () => {
        const { location, text } = this.state;
        const urlParams = {};

        if (text) {
            urlParams.text = text;
        } else {
            urlParams.location = location.name;
            urlParams.lat = location.lat;
            urlParams.long = location.long;
        }

        const currentPath = _get(history, 'location.pathname') || DENTIST_PATH;

        // We show the office search bar on office search page and host dashboard page.
        const path =
            currentPath.startsWith('/office') ||
            currentPath.includes('dashboard/host') ||
            currentPath.includes('/add-office')
                ? OFFICE_PATH
                : DENTIST_PATH;

        history.push(`${path}?${queryString.stringify(urlParams)}`);
    };

    toggleFilter = () => {
        if (this.props.toggleFilter) {
            this.props.toggleFilter();
        }
    };

    render() {
        return (
            <SearchBoxView
                initialLocationFilterValue={
                    !_isEmpty(this.state.urlParams.defaultSearch) &&
                    JSON.parse(this.state.urlParams.defaultSearch)
                        ? ''
                        : this.state.urlParams.location ||
                          this.state.urlParams.text
                } // if defaultSearch, don't display text in search box, if not, display text
                initialDateFilterValue={this.state.urlParams.startTime}
                onLocationFilterChange={this.handleLocationFilterChange}
                onQueryString={this.handleQueryString}
                onTextChange={this.handleTextChange}
                size={this.props.size}
                locationPlaceholder={this.props.placeholder}
                toggleFilter={this.toggleFilter}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default SearchBox;
