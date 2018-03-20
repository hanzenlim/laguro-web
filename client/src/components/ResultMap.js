import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "google-maps-react";
import * as actions from "../actions";

class ResultMap extends Component {
	initMap(mapProps, map) {
		const { locations, searchLocation } = mapProps.props;
		const { google } = mapProps;
		var geocoder = new google.maps.Geocoder();
		var bounds = new google.maps.LatLngBounds();

		var allAddresses = locations.map(loc => {
			return { ...loc, type: "office" };
		});

		if (searchLocation) {
			var addressesWithSearchMarker = [ ...allAddresses, {location: searchLocation} ]
		}

		geocodeResults(addressesWithSearchMarker || allAddresses);

		function geocodeResults(addresses) {
			addresses.forEach((addr, index) => {
				geocoder.geocode({ address: addr.location },
					function(results, status) {
						let latlng = results[0].geometry.location;
						if (status !== "OK") {
							alert("Geocode failed: " + status);
						} else {
							map.fitBounds(bounds.extend(latlng));
							if (addr.type === "office") {
								addMarker(latlng, (index + 1).toString());
								map.setZoom(11)
							} else {
								addSearchMarker(latlng);
								map.setCenter(latlng);
								map.setZoom(12)
							}
						}
					});
			});
		}

		function addMarker(location, label) {
			new google.maps.Marker({
				position: location,
				label: label,
				map: map
			});
		}

		function addSearchMarker(location) {
			new google.maps.Marker({
				position: location,
				icon: {
					path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
					scale: 7.5,
					fillColor: "red",
					fillOpacity: 1,
					strokeWeight: 2
				},
				map: map
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
		)
	}
}

export default connect(null, actions)(ResultMap);
