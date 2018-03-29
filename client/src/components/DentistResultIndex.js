import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import DentistResult from "./DentistResult";
import FilterBar from "./FilterBar";
import ResultMap from "./ResultMap";

class DentistResultIndex extends Component {
	componentWillMount() {
		document.title = "Laguro - Search Index";
		this.props.fetchDentists(this.props.filters);
	}

	renderMap() {
		return (
			<ResultMap
				locations={this.props.dentists}
				google={window.google}
				searchLocation={
					this.props.filters.location ? this.props.filters.location : null
				}
			/>
		);
	}

	renderDentistList() {
		const filteredDentists = this.props.dentists;

		let dentistList = filteredDentists.map(dentist => {
			//average the ratings
			let avg_rating =
				dentist.rating.length
					? dentist.rating.reduce((acc, val) => acc + val) /
						dentist.rating.length
					: 0;

			return (
				<DentistResult
					name={dentist.name}
					specialty={dentist.specialty}
					location={dentist.location}
					procedures={dentist.procedures}
					rating_value={avg_rating}
					rating_count={dentist.rating.length}
					img={dentist.img_url}
					key={dentist._id}
				/>
			);
		});

		return dentistList;
	}

	render() {
		if (this.props.invalid) {
			this.props.fetchDentists(this.props.filters);
		}

		if (this.props.isFetching) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<FilterBar />
				<div className="resultContainer">
					<div className="resultList">{this.renderDentistList()}</div>
					<div className="map">{this.renderMap()}</div>
				</div>
			</div>
		);
	}
}

function getVisibleOffices(offices) {
	//remove any offices greater than 35 miles away
	//if no location filter, office.distance is undefined and !!(undefined > 35) == false
	let filteredOffices = offices.filter(office => {
		if (office.distance > 35) {
			return false;
		}

		return true;
	});

	//sort offices within range, allows their labels to reflect order
	return filteredOffices.sort((a, b) => a.distance - b.distance);
}

function mapStateToProps(state) {
	return {
		dentists: getVisibleOffices(state.dentists.dentists),
		isFetching: state.dentists.isFetching,
		invalid: state.dentists.invalid,
		filters: state.filters
	};
}

export default connect(mapStateToProps, actions)(DentistResultIndex);
