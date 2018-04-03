import React, { Component } from "react";
import { connect } from "react-redux";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";

class DentistResult extends Component {
	renderProcedures(procedures) {
		if (procedures.length) {
			return procedures.map(procedure => (
				<span
					key={procedure.name}
					className="badge white-text light-blue lighten-2"
				>
					{procedure.name}
				</span>
			));
		} else {
			return <div />;
		}
	}

	imgUrl() {
		return this.props.img
			? this.props.img
			: "http://via.placeholder.com/200x200";
	}

	render() {
		return (
			<div className="searchResult">
				<img className="result-img" src={this.imgUrl()} alt="Doctor" />
				<div className="details">
					<h3>{this.props.name}</h3>
					<h5>{this.props.specialty}</h5>
					<h5>{this.props.location}</h5>
					<div className="rating">
						<ReactStars count={5} value={this.props.rating_value} />
						<span className="rating_count">
							{`(${this.props.rating_count})`}
						</span>
					</div>
					<div className="badges">
						{this.renderProcedures(this.props.procedures)}
					</div>
					<div>
						<Link
							className="btn-small light-blue lighten-2"
							to={`/dentist/${this.props.user_id}`}
						>
							View More Info
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null)(DentistResult);
