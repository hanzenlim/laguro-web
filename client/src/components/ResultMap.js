import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map } from 'google-maps-react';
import * as actions from '../actions';

class ResultMap extends Component {
    initMap(mapProps, map) {
        const { locations, searchLocation } = mapProps.props;
        const { google } = mapProps;
        const geocoder = new google.maps.Geocoder();
        const bounds = new google.maps.LatLngBounds();

        const allAddresses = locations.map(loc => ({ ...loc, type: 'office' }));

        if (searchLocation) {
            var addressesWithSearchMarker = [
                ...allAddresses,
                { location: searchLocation },
            ];
        }

        geocodeResults(addressesWithSearchMarker || allAddresses);

        function geocodeResults(addresses) {
            addresses.forEach((addr, index) => {
                geocoder.geocode({ address: addr.location }, (results, status) => {
                    const latlng = results[0].geometry.location;
                    if (status !== 'OK') {
                        alert(`Geocode failed: ${status}`);
                    } else {
                        map.fitBounds(bounds.extend(latlng));
                        if (addr.type === 'office') {
                            addMarker(latlng, (index + 1).toString());
                            map.setZoom(10);
                        } else {
                            addSearchMarker(latlng);
                            map.setCenter(latlng);
                            map.setZoom(11);
                        }
                    }
                });
            });
        }

        function addMarker(location, label) {
            new google.maps.Marker({
                position: location,
                label,
                map,
            });
        }

        function addSearchMarker(location) {
            new google.maps.Marker({
                position: location,
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 7.5,
                    fillColor: 'red',
                    fillOpacity: 1,
                    strokeWeight: 2,
                },
                map,
            });
        }
    }

    render() {
        return (
            <Map
                google={this.props.google}
                props={this.props}
                onReady={this.initMap}
            />
        );
    }
}

export default connect(null, actions)(ResultMap);
