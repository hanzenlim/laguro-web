import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import ReactStars from 'react-stars';
import { Link } from "react-router-dom";

class OfficeResult extends Component {
	renderTimes(listings) {
		if(listings){
			return listings.map(listing => (
				<Link
					key={listing.id}
					to={`/offices/${listing.office_id}/listings/${listing.id}`}
					className="badge white-text light-blue lighten-2">
					{moment(listing.time).format('MMM D, h a')}
				</Link>
			));
		} else {
			return <div></div>
		}
	}

	imgUrl(){
		return this.props.img ? this.props.img : "http://via.placeholder.com/200x200"
	}

	render() {
		return (
			<div className="searchResult">
				<img
					className="result-img"
					src={this.imgUrl()}
					alt="Office"
				/>
				<div className="details">
					<h3>{this.props.name}</h3>
					<h5>{this.props.location}</h5>
					<div className="rating">
						<ReactStars
							count={5}
							value={this.props.rating_value}
						/>
						<span className="rating_count">
							{`(${this.props.rating_count})`}
						</span>
					</div>
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
