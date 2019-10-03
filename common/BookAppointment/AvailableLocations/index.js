import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';
import queryString from 'query-string';
import { withRouter } from 'next/router';

import AvailableLocationsView from './view';

class AvailableLocations extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedLocation: _get(props, 'locationList[0]'),
            showMap: false,
        };
    }

    componentDidMount() {
        const { locationList, router } = this.props;
        if (!_isEmpty(locationList)) {
            const urlParams = router.query;
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

    handleSelectLocation = async location => {
        const { router, setOfficeId } = this.props;
        this.setState({ selectedLocation: location });
        const urlParams = router.query;
        urlParams.officeId = location.id;

        window.history.pushState(
            '',
            '',
            `?${queryString.stringify(_omit(urlParams, ['id']))}`
        );

        setOfficeId(location.id);
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

export default withRouter(AvailableLocations);
