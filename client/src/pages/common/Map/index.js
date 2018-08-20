import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import styled from 'styled-components';
import fetch from 'unfetch';
import 'mapbox-gl/dist/mapbox-gl.css';
// import { mapBoxApiKey } from '../../../config/keys';

import { Box } from '../../../components';

import MapPin from '../MapPin';
import MapInfoWindow from '../MapInfoWindow';

const StyledContainer = styled.div`
    width: 100%;
    height: 900px;
    background-color: red;

    @media screen and (min-width: 1200px) {
        width: 623px;
    }
`;

const StyledPopup = styled(Popup)`
    z-index: ${props => props.theme.zIndex.overlay};
`;

const StyledMarkerContainer = styled(Marker)`
    width: 0;
    height: 0;
`;

const StyledMarkerOverlay = styled.div`
    height: 50px;
    width: 50px;
    top: -40px;
    left: -25px;
    background: transparent;
    position: absolute;
    /* TODO: Add z index list to theme file */
    z-index: 1000;
`;

const StyledNavigationControl = styled(NavigationControl)`
    position: absolute;
    top: 10px;
    left: 10px;
`;

const mapBoxApiKey =
    'pk.eyJ1IjoibGFndXJvLWFkbWluIiwiYSI6ImNqaWc3enk2bDE0dDAzd3Blb2dyOXRvc2oifQ.Ketzla96PFhKDE8-VwAI5g';

const MAP_STYLE = 'mapbox://styles/mapbox/streets-v9';

class Map extends Component {
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
                height: 932,
            },
        });
    };

    // NOTE: THIS METHOD WILL BE REMOVED ONCE WE SAVE LOCATION COORDINATES TO DB
    geocodeLocationList = () => {
        const locations = ['San Mateo'];

        this.props.data.map(query => {
            fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${
                    query.address
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
                    title={popupInfo.title}
                    subtitle={popupInfo.subtitle}
                    body={popupInfo.address}
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
                style={{
                    top: '0',
                    bottom: '0',
                }}
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
export default Map;
