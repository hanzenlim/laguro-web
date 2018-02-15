import React, { Component } from "react";
import { connect } from "react-redux";

class DentistResult extends Component {
	renderBadges(badges) {
		if(badges){
			return badges.map(badge => (
				<span key={badge} className="badge white-text light-blue lighten-2">
					{badge}
				</span>
			));
		} else {
			return <div></div>
		}
	}

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
