import React, { Component } from "react";
import { connect } from "react-redux";
import { Map, GoogleApiWrapper } from "google-maps-react";
import * as actions from "../actions";

class ResultMap extends Component {
	initMap(mapProps, map) {
		const { google, locations, searchLocation } = mapProps.props;
		var geocoder = new google.maps.Geocoder();
		var bounds = new google.maps.LatLngBounds();
		var service = new google.maps.DistanceMatrixService();

		// if a location was entered into the search box, filter offices by that search term, then geocode and place on map, otherwise push all pins to map
		if (searchLocation) {
			//get [string] with each offices' address (needed  for distance matrix)
			var officeAddresses = locations.map(loc => loc.location);

			//filter and sort the offices by distance
			filterResults(officeAddresses)
			.then(filteredAddresses => {
        // update the result list to match filtered/sorted result list
				mapProps.props.updateOfficeList({data: filteredAddresses})

				geocodeResults([...filteredAddresses, {location: searchLocation}]);
			});
		} else {
			//get [{}] with each offices location and "type" to determine map icon
			var allAddresses = locations.map(loc => {
				return { ...loc, type: "office" };
			});

			// place marker for each office
			geocodeResults(allAddresses);
		}

		function filterResults(addresses) {
			return new Promise(resolve => {
				service.getDistanceMatrix(
					{
						origins: [searchLocation],
						destinations: addresses,
						travelMode: "DRIVING",
						unitSystem: google.maps.UnitSystem.IMPERIAL
					},
					function(response, status) {
						if (status !== "OK") {
							alert("Distance Matrix failed: " + status);
						} else {
							var results = response.rows[0].elements;

							var locationsWithDistance = locations.map((location, index) => {
								return {
									...location,
									type: "office",
									distance: results[index].distance.text.split(" ")[0]
								}
							});

							//remove any offices greater than 35 miles away
							var filteredResults = locationsWithDistance.filter(
								location => location.distance < 35
							);

							//sort offices within range, allows their labels to reflect order
							filteredResults.sort((a, b) => a.distance - b.distance);
						}

						resolve(filteredResults);
					}
				);
			});
		}

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
							} else {
								addSearchMarker(latlng);
								map.setCenter(latlng);
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

export default GoogleApiWrapper({
	apiKey: "AIzaSyCyfeTxBZtGOquDUNxQxJsoXAoczjfYxJo"
})(connect(null, actions)(ResultMap));
