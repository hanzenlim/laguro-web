import React, { Component } from "react";
import { connect } from "react-redux";
class DentistResult extends Component {
	render() {
		return (
			<div className="searchResult">
				<img src="http://via.placeholder.com/200x200" alt="Doctor" />
				<div className="details">
					<h3>{this.props.name}</h3>
					<h5>{this.props.type}</h5>
					<h5>{this.props.location}</h5>
					<div className="badges">
						{this.renderBadges(this.props.badges)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null)(DentistResult);
