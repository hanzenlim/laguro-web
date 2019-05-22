import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import AvailableLocationsView from './view';
import history from '../../../../history';

class AvailableLocations extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedLocation: _get(props, 'locationList[0]'),
            showMap: false,
        };
    }

    componentDidMount() {
        const { locationList } = this.props;
        if (!_isEmpty(locationList)) {
            const urlParams = queryString.parse(history.location.search);
            if (urlParams.officeId) {
                const location = locationList.filter(
                    item => item.id === urlParams.officeId
                )[0];
                this.handleSelectLocation(location);
            } else {
                const location = locationList[0];
                this.handleSelectLocation(location);
            }
        }
    }

    handleSelectLocation = location => {
        this.setState({ selectedLocation: location });
        const urlParams = queryString.parse(history.location.search);
        urlParams.officeId = location.id;
        history.push({
            search: queryString.stringify(urlParams),
        });
    };

    handleToggleMap = () => {
        this.setState({ showMap: !this.state.showMap });
    };

    render() {
        const { locationList } = this.props;
        const { selectedLocation, showMap } = this.state;

        return (
            <AvailableLocationsView
                locationList={locationList}
                selectedLocation={selectedLocation}
                showMap={showMap}
                onSelectLocation={this.handleSelectLocation}
                onToggleMap={this.handleToggleMap}
            />
        );
    }
}

AvailableLocations.propTypes = {};

export default AvailableLocations;
