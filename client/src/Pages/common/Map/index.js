import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import fetch from 'unfetch';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { mapBoxApiKey } from '../../../config/keys';

import MapPin from '../MapPin';
import MapInfoWindow from '../MapInfoWindow';

import {
    StyledPopup,
    StyledMarkerContainer,
    StyledMarkerOverlay,
    StyledNavigationControl,
} from './styles';

const mapBoxApiKey =
    'pk.eyJ1IjoibGFndXJvLWFkbWluIiwiYSI6ImNqaWc3enk2bDE0dDAzd3Blb2dyOXRvc2oifQ.Ketzla96PFhKDE8-VwAI5g';

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v9';

class ResultMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markerData: [],
            popupInfo: null,
            viewport: {
                width: 0,
                height: 0,
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 8,
            },
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: 623,
                height: window.innerHeight,
            },
        });
    };

    // NOTE: THIS METHOD WILL BE REMOVED ONCE WE SAVE LOCATION COORDINATES TO DB
    geocodeLocationList = () => {
        const locations = ['San Mateo'];

        locations.map(query => {
            fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${
                    query.location
                }.json?country=us&types=address%2Cplace&access_token=${mapBoxApiKey}`
            )
                .then(response => response.json())
                .then(responseData => {
                    if (!responseData.features.length) return null;

                    const [
                        longitude,
                        latitude,
                    ] = responseData.features[0].center;

                    const newMarker = {
                        latitude,
                        longitude,
                        ...query,
                    };

                    const markerData = [...this.state.markerData, newMarker];

                    this.setState({
                        markerData,
                        viewport: {
                            ...this.state.viewport,
                            latitude,
                            longitude,
                        },
                    });
                });

            return null;
        });
    };

    renderPopup = () => {
        const activeListing = this.state.markerData.filter(
            item => item.id + item.location === this.props.activeListingId
        )[0];

        const popupInfo = this.state.popupInfo || activeListing;

        return (
            popupInfo && (
                <MapInfoWindow
                    onClose={this.hidePopup}
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                />
            )
        );
    };

    updateViewport = viewport => {
        this.setState({ viewport });
    };

    showPopup = event => {
        const { currentTarget } = event;
        const popupInfo = JSON.parse(currentTarget.getAttribute('data-marker'));

        console.log(1111);

        this.setState({ popupInfo });
    };

    hidePopup = () => {
        this.setState({ popupInfo: null });
    };

    renderMapMarker = () => {
        return this.state.markerData.map((marker, index) => {
            const { longitude, latitude } = marker;

            return (
                <StyledMarkerContainer
                    key={index}
                    latitude={latitude}
                    longitude={longitude}
                >
                    <StyledMarkerOverlay
                        data-marker={JSON.stringify(marker)}
                        onClick={this.showPopup}
                    />
                    <MapPin size={30} />
                </StyledMarkerContainer>
            );
        });
    };

    render() {
        return (
            <ReactMapGL
                {...this.state.viewport}
                reuseMap
                mapStyle={MAP_STYLE}
                mapboxApiAccessToken={mapBoxApiKey}
                onViewportChange={this.updateViewport}
                onLoad={this.geocodeLocationList}
            >
                {this.renderPopup()}
                {this.renderMapMarker()}
                <StyledNavigationControl
                    onViewportChange={this.updateViewport}
                />
            </ReactMapGL>
        );
    }
}
export default ResultMap;
