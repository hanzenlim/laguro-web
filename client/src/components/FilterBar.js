import React, { Component } from "react";
import { connect } from "react-redux";
import * as materialize from "materialize-css/dist/js/materialize.js";

import DateFilter from "./filters/DateFilter";
import LocationFilter from "./filters/LocationFilter";

class FilterBar extends Component {
	componentDidMount() {
		var elements = document.getElementsByClassName("dropdown-trigger");
		for (var el of elements) {
			materialize.Dropdown.init(el, {
				coverTrigger: false,
				closeOnClick: false
			});
		  materialize.Dropdown.getInstance(el);

		}
	}

	filterDefaults = {
		location: "Location",
		insurance: "Insurance",
		price: "Price",
		procedure: "Procedure"
	};

	render() {
		return (
			<div className="filters">
				<div>
					<DateFilter selectedDate={this.props.filters["date"]} />
				</div>
				<div>
					<a className="dropdown-trigger dropdown btn light-blue lighten-1" data-target="dropdown1">
						{this.props.filters.location ? this.props.filters.location : "Location"}
					</a>
					<ul id='dropdown1' className='dropdown-content'>
						<LocationFilter searchLocation={this.props.filters.location} />
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { filters: state.filters };
}

export default connect(mapStateToProps)(FilterBar);
