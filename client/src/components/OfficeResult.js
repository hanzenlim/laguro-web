import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';

class OfficeResult extends Component {
	renderTimes(listings) {
		if(listings){
			return listings.map(listing => (
				<span key={listing.time} className="badge white-text light-blue lighten-2">
					{moment(listing.time).format('MMM D, h a')}
				</span>
			));
		} else {
			return <div></div>
		}
	}

	render() {
		return (
			<div className="searchResult">
				<img src="http://via.placeholder.com/200x200" alt="Office" />
				<div className="details">
					<h3>{this.props.name}</h3>
					<h5>{this.props.location}</h5>
					<h5>{this.props.rating} Stars</h5>
					<div className="badges">
						<span className="badgeLabel">Available Times</span>
						{this.renderTimes(this.props.listings)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null)(OfficeResult);
