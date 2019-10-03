import React, { PureComponent } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { withRouter } from 'next/router';

import SearchBoxView from './view';
import { trackSearch } from '~/util/trackingUtils';

const OFFICE_PATH = '/office/search';
const DENTIST_PATH = '/dentist/search';

class SearchBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
            date: '',
            text: '',
            urlParams: {},
        };

        // Router.events.on('routeChangeStart', url => {
        //     // todo
        // });
    }

    componentDidMount() {
        const urlParams = this.props.router.query;

        this.setState({
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

        const currentPath = _get(this.props.router, 'asPath') || DENTIST_PATH;

        // We show the office search bar on office search page and host dashboard page.
        const path =
            currentPath.includes('dashboard/host') ||
            currentPath.includes('/add-office') ||
            currentPath.includes('/office/search')
                ? OFFICE_PATH
                : DENTIST_PATH;

        if (trackSearch) {
            trackSearch({
                eventLabel: text,
                internalPage: currentPath === '/' ? 'Home' : 'Header',
            });
        }

        this.props.router.push(`${path}?${queryString.stringify(urlParams)}`);
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
                hasFilter={this.props.hasFilter}
            />
        );
    }
}

export default withRouter(SearchBox);
