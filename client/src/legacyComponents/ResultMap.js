import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import fetch from 'unfetch';
import styled from 'styled-components';
import 'mapbox-gl/dist/mapbox-gl.css';
import history from '../history';
import { mapBoxApiKey } from '../config/keys';
import { isMobile } from '../util/uiUtil';
import MapPin from './MapPin';
import { defaultProfilePhoto } from './Profile';

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
                zoom: 8
            }
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
                width:
                    isMobile()
                        ? window.innerWidth - 16
                        : window.innerWidth / 2 - 12,
                height:
                    isMobile()
                        ? window.innerHeight - 250
                        : window.innerHeight - 67
            }
        });
    };

    // NOTE: THIS METHOD WILL BE REMOVED ONCE WE SAVE LOCATION COORDINATES TO DB
    geocodeLocationList = () => {
        this.props.locations.map(query => {
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
                        latitude
                    ] = responseData.features[0].center;

                    const newMarker = {
                        latitude,
                        longitude,
                        ...query
                    };

                    const markerData = [...this.state.markerData, newMarker];

                    this.setState({
                        markerData,
                        viewport: {
                            ...this.state.viewport,
                            latitude,
                            longitude
                        }
                    });
                });

            return null;
        });
    };

    goToListingPage = event => {
        const selectedListingId = event.currentTarget.getAttribute('data-id');

        history.push(`${selectedListingId}`);
    };

    renderPopup = () => {
        const activeListing = this.state.markerData.filter(
            item => item.id + item.location === this.props.activeListingId
        )[0];

        const popupInfo = this.state.popupInfo || activeListing;

        const imageSrc = popupInfo
            ? popupInfo.user
                ? popupInfo.user.imageUrl || defaultProfilePhoto
                : popupInfo.imageUrls[0]
            : '';

        const name = popupInfo
            ? popupInfo.user
                ? `${popupInfo.user.firstName} ${popupInfo.user.lastName}`
                : popupInfo.name
            : '';

        return (
            popupInfo && (
                <StyledPopup
                    anchor="top"
                    dynamicPosition
                    closeButton={true}
                    onClose={this.hidePopup}
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                >
                    <div data-id={popupInfo.id} onClick={this.goToListingPage} style={{width: '185px'}}>
                        {imageSrc && (
                            <img src={imageSrc} alt="office" width="175px" />
                        )}
                        <div>{name}</div>
                        <div>{popupInfo.location}</div>
                    </div>
                </StyledPopup>
            )
        );
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
    }

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
