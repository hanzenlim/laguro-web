import React, { Component } from "react";
import { connect } from "react-redux";
import ReactStars from 'react-stars';

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

	imgUrl(){
		return this.props.img ? this.props.img : "http://via.placeholder.com/200x200"
	}

	render() {
		return (
			<div className="searchResult">
				<img
					className="result-img"
					src={this.imgUrl()}
					alt="Doctor"
				/>
				<div className="details">
					<h3>{this.props.name}</h3>
					<h5>{this.props.type}</h5>
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
						{this.renderBadges(this.props.badges)}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null)(DentistResult);
