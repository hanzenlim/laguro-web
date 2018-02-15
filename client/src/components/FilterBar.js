import React, { Component } from "react";
import { connect } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

class FilterBar extends Component {
	filterDefaults = {
		date: "Date",
		location: "Location",
		insurance: "Insurance",
		price: "Price",
		procedure: "Procedure"
	};

	renderFilters() {
		let { filters } = this.props;
		let defaults = this.filterDefaults;
		let keys = Object.keys(defaults);

		return keys.map(key => {
			let value = filters[`${key}`] ? filters[`${key}`] : defaults[`${key}`];

			return (
				<a key={value} className="waves-effect btn light-blue lighten-2">
					{value}
				</a>
			);
		});
	}

	render() {
		return <div className="filters">{this.renderFilters()}</div>;
	}
}

function mapStateToProps(state) {
	return { filters: state.filters };
}

export default connect(mapStateToProps)(FilterBar);
