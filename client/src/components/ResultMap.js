import React, { Component } from 'react';
import { Map, InfoWindow, Marker } from 'google-maps-react';

class ResultMap extends Component {
    constructor(props) {
        super(props);
        this.map = null;
    }
    state = {
        markerData: [],
        activeMarker: {},
        activeMarkerIndex: false,
        selectedPlace: {},
        showingInfoWindow: false,
        markerIsClicked: false
    };
    //replace onMarkerClick with onMarkerMouseOver for hovering feature
    onMarkerMouseOver = (index, props, marker) =>
        this.setState({
            activeMarker: marker,
            activeMarkerIndex: index,
            selectedPlace: props,
            showingInfoWindow: true
        });

    onMarkerMouseOut = () => {
        if (this.state.markerIsClicked) {
            return;
        }
        this.setState({
            showingInfoWindow: false
        });
    };
    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    onMouseoverMarker = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
    onMarkerClick = href => {
        // eslint-disable-next-line
        debugger;
        this.setState({
            activeMarker: null,
            showingInfoWindow: false,
            markerIsClicked: true
        });

        window.location.href = href;
    };
    onMapHover = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };
    initMap = (mapProps, map) => {
        const { locations, searchLocation } = mapProps.props;
        const { google } = mapProps;
        var geocoder = new google.maps.Geocoder();
        var bounds = new google.maps.LatLngBounds();
        var allAddresses = locations.map(loc => {
            return { ...loc, type: 'office' };
        });
        if (searchLocation) {
            var addressesWithSearchMarker = [
                ...allAddresses,
                { location: searchLocation }
            ];
        }
        //return the result for either the addresss with search marker or allAddresses
        const geocodeResults = addresses => {
            addresses.forEach((addr, index) => {
                geocoder.geocode(
                    { address: addr.location },
                    (results, status) => {
                        if (!results) {
                            return;
                        }
                        let position = results[0].geometry.location;
                        if (status !== 'OK') {
                            alert('Geocode failed: ' + status);
                        } else {
                            map.fitBounds(bounds.extend(position));
                            if (addr.type === 'office') {
                                const label = (index + 1).toString();
                                const newMarker = {
                                    position,
                                    label,
                                    map,
                                    id: addr.id
                                };
                                let markerData = [
                                    ...this.state.markerData,
                                    newMarker
                                ];
                                this.setState({
                                    markerData
                                });
                                map.setZoom(10);
                            } else {
                                addSearchMarker(position);
                                map.setCenter(position);
                                map.setZoom(11);
                            }
                        }
                    }
                );
            });
        };
        geocodeResults(addressesWithSearchMarker || allAddresses);
        function addSearchMarker(location) {
            new google.maps.Marker({
                position: location,
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 7.5,
                    fillColor: 'red',
                    fillOpacity: 1,
                    strokeWeight: 2
                },
                map: map
            });
        }
    };
    render() {
        const { activeMarkerIndex } = this.state;
        const { locations } = this.props;
        const activeLocation =
            activeMarkerIndex || activeMarkerIndex === 0
                ? locations[activeMarkerIndex]
                : false;
        // making the component dynamic for both dentist and offices
        let img_url = '';
        const isDentistPage = window.location.pathname.indexOf('dentists') > -1;
        const isOfficePage = window.location.pathname.indexOf('offices') > -1;
        if (isDentistPage) {
            img_url = activeLocation && activeLocation.user.imageUrl;
        } else if (isOfficePage) {
            img_url = activeLocation && activeLocation.imageUrls[0];
        }
        const markers = this.state.markerData.map((marker, index) => {
            const markerlocation = locations.find(loc => {
                return loc.id === marker.id;
            });
            return (
                <Marker
                    key={index}
                    name={marker.label}
                    onMouseover={this.onMarkerMouseOver.bind(null, index)}
                    onMouseout={this.onMarkerMouseOut.bind(this, index)}
                    onClick={this.onMarkerClick.bind(this, markerlocation.id)}
                    position={marker.position}
                />
            );
        });
        return (
            <Map
                google={this.props.google}
                props={this.props}
                onReady={this.initMap}
                zoom={14}
            >
                {markers}
                {activeLocation && (
                    <InfoWindow
                        marker={this.state.activeMarker}
                        onClose={this.onInfoWindowClose}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <img src={img_url} width="150px" />
                            <a
                                href={`${
                                    isDentistPage ? 'dentist' : 'offices'
                                }/${activeLocation.id}`}
                            >
                                <div>{activeLocation.name}</div>
                                <div>{activeLocation.location}</div>
                            </a>
                        </div>
                    </InfoWindow>
                )}
            </Map>
        );
    }
}
export default ResultMap;
