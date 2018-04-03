import React, { Component } from "react";
import { connect } from "react-redux";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";

class DentistResult extends Component {
	renderProcedures(procedures) {
		if (procedures.length) {
			return procedures.slice(0,4).map(procedure => (
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
				<div className="content">
					<div className="header">
						<h4>{this.props.name}</h4>
						<h6>{this.props.specialty} - {this.props.location}</h6>
					</div>
					<div className="badges">
						{this.renderProcedures(this.props.procedures)}
					</div>
					<div className="row">
						<div className="rating col s12 m7">
							<ReactStars count={5} value={this.props.rating_value} />
							<span className="rating_count">
								{`(${this.props.rating_count})`}
							</span>
						</div>
						<div className="col s12 m5">
							<Link
								className="badge light-blue lighten-2 white-text"
								to={`/dentist/${this.props.user_id}`}
								>
									View More
								</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null)(DentistResult);
