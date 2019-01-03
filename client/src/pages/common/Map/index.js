import React, { PureComponent } from 'react';
import get from 'lodash/get';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import isEqual from 'lodash/isEqual';

import { Box, Icon } from '../../../components';
import MapInfoWindow from '../MapInfoWindow';

const StyledMarkerContainer = styled(Marker)`
    width: 0;
    height: 0;
`;

const StyledNavigationControl = styled(NavigationControl)`
    position: absolute;
    top: 10px;
    left: 10px;
`;

const mapBoxApiKey =
    'pk.eyJ1IjoibGFndXJvLWFkbWluIiwiYSI6ImNqaWc3enk2bDE0dDAzd3Blb2dyOXRvc2oifQ.Ketzla96PFhKDE8-VwAI5g';

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v9';

class Map extends PureComponent {
    constructor(props) {
        super(props);

        const { urlParams } = props;

        this.currentPosition =
            this.getPosition(urlParams) || this.props.defaultPosition;

        this.state = {
            popupInfo: null,
            viewport: {
                width: 440,
                height: 662,
                latitude:
                    get(this.currentPosition, 'lat') ||
                    get(props, 'data[0].latitude'),
                longitude:
                    get(this.currentPosition, 'lon') ||
                    get(props, 'data[0].longitude'),
                zoom: props.zoom,
            },
        };
    }

    getPosition(urlParams) {
        if (!urlParams) {
            return null;
        }

        const lat = parseFloat(urlParams.lat);
        const lon = parseFloat(urlParams.long);
        // eslint-disable-next-line
        if (!isNaN(lat) && !isNaN(lon)) {
            return { lat, lon };
        }

        return null;
    }

    componentDidMount = async () => {
        window.addEventListener('resize', this.resize);

        if (this.props.data.length > 1) {
            const fitBounds = this.getFitBounds(this.props.data);

            if (!isEqual(fitBounds[0], fitBounds[1])) {
                const { longitude, latitude, zoom } = new WebMercatorViewport(
                    this.state.viewport
                ).fitBounds(fitBounds, {
                    padding: 30,
                    offset: [0, 0],
                });

                await this.setState({
                    viewport: {
                        ...this.state.viewport,
                        longitude,
                        latitude,
                        zoom,
                    },
                });
            }
        }

        this.resize();
    };

    getFitBounds = coordinates => {
        const latitudeList = coordinates.map(item => item.latitude);
        const longitudeList = coordinates.map(item => item.longitude);

        const minCoordinates = [
            Math.min.apply(null, longitudeList),
            Math.min.apply(null, latitudeList),
        ];

        const maxCooridnates = [
            Math.max.apply(null, longitudeList),
            Math.max.apply(null, latitudeList),
        ];

        return [minCoordinates, maxCooridnates];
    };

    componentDidUpdate(prevProps) {
        const currentIds = this.props.data.map(e => e.id);
        const prevIds = prevProps.data.map(e => e.id);
        currentIds.sort();
        prevIds.sort();

        if (
            !isEqual(this.props.urlParams, prevProps.urlParams) ||
            !isEqual(currentIds, prevIds)
        ) {
            const { urlParams } = this.props;
            this.currentPosition =
                this.getPosition({
                    lat: get(this.props, 'data[0].latitude'),
                    lon: get(this.props, 'data[0].longitude'),
                }) || this.getPosition(urlParams);
            this.currentPosition =
                this.currentPosition || this.props.defaultPosition;

            this.setState({
                viewport: {
                    ...this.state.viewport,
                    latitude: this.currentPosition.lat,
                    longitude: this.currentPosition.lon,
                },
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: this.props.width || 623,
                height: this.props.height || 932,
            },
        });
    };

    updateViewport = viewport => {
        this.setState({ viewport });
    };

    showPopup = event => {
        const { currentTarget } = event;
        const popupInfo = JSON.parse(currentTarget.getAttribute('data-marker'));

        this.setState({ popupInfo });
    };

    hidePopup = () => {
        this.setState({ popupInfo: null });
    };

    render() {
        const { data } = this.props;

        return (
            <ReactMapGL
                {...this.state.viewport}
                reuseMap
                mapStyle={MAP_STYLE}
                mapboxApiAccessToken={mapBoxApiKey}
                onViewportChange={this.updateViewport}
                style={{
                    top: '0',
                    bottom: '0',
                }}
            >
                {this.state.popupInfo && (
                    <MapInfoWindow
                        title={this.state.popupInfo.title || ''}
                        subtitle={this.state.popupInfo.subtitle || ''}
                        body={this.state.popupInfo.address}
                        onClose={this.hidePopup}
                        longitude={this.state.popupInfo.longitude}
                        latitude={this.state.popupInfo.latitude}
                        image={this.state.popupInfo.image || ''}
                        url={this.state.popupInfo.url || ''}
                    />
                )}
                {data.map(
                    (marker, index) =>
                        marker.address && (
                            <StyledMarkerContainer
                                key={index}
                                latitude={marker.latitude}
                                longitude={marker.longitude}
                            >
                                <Box
                                    height="50px"
                                    width="50px"
                                    top="-40px"
                                    left="-40px"
                                    bg="transparent"
                                    position="absolute"
                                    zIndex="1000"
                                    data-marker={JSON.stringify(marker)}
                                    onClick={this.showPopup}
                                />
                                <Icon
                                    type="locationPinWithBackground"
                                    width="50px"
                                    height="50px"
                                />
                            </StyledMarkerContainer>
                        )
                )}
                <StyledNavigationControl
                    onViewportChange={this.updateViewport}
                />
            </ReactMapGL>
        );
    }
}

Map.defaultProps = {
    data: [],
    zoom: 8,
};

export default Map;
