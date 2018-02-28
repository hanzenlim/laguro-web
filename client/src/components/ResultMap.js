import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class ResultMap extends Component {
	initMap(mapProps, map) {
		const { google, locations, searchLocation } = mapProps;
		var geocoder = new google.maps.Geocoder();
		var bounds = new google.maps.LatLngBounds();

		var addresses = locations.map(loc => loc.location)
		var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var labelIndex = 0;

		addresses.map(address => geocode(address, "office"));
		console.log(searchLocation)
		if(searchLocation){
			geocode(searchLocation, "search")
		}

		function geocode(address, type) {
			geocoder.geocode({ address: address }, function(results, status) {
				let result = results[0].geometry.location;
				if (status === "OK") {
					map.fitBounds(bounds.extend(result));
					if (type === "office") {
						addMarker(result);
					} else {
						addSearchMarker(result);
						map.setCenter(result);
					}
				} else {
					alert(
						"Geocode was not successful for the following reason: " + status
					);
				}
			});
		}

		function addMarker(location) {
			new google.maps.Marker({
				position: location,
				label: labels[labelIndex++ % labels.length],
				map: map
			});
		}

		function addSearchMarker(location) {
			new google.maps.Marker({
				position: location,
				icon: {
					path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
		      scale: 7.5,
		      fillColor:"red",
		      fillOpacity:1,
		      strokeWeight:2
				},
				map: map
			});
		}

		google.maps.event.addListenerOnce(map, "idle", function() {
			google.maps.event.trigger(map, "resize");
		});
	}

	render() {
		return <Map google={this.props.google} locations={this.props.locations} searchLocation={this.props.searchLocation} onReady={this.initMap} />;
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyCyfeTxBZtGOquDUNxQxJsoXAoczjfYxJo"
})(ResultMap);
