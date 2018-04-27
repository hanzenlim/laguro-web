import React, { Component } from "react";
import { connect } from "react-redux";
import ReactStars from "react-stars";

import * as actions from "../actions";
import NewReview from "./forms/NewReview";
import ReviewContainer from "./ReviewContainer";

class OfficeResultIndex extends Component {
  componentDidMount() {
    this.office_id = this.props.match.params.office_id;

    this.props.getOfficeListings(this.office_id);
    this.props.getOneOffice(this.office_id);
		this.props.fetchReviews(this.office_id);
  }

  renderImages(office) {
    if (!office.img_url || !office.img_url.length) return <div/>
    return office.img_url.map(url => (
      <img className="officeImg" key={url} src={url} alt="office" />
    ));
  }

  renderEquipment(office) {
    if (office.equipment && office.equipment.length) {
      return office.equipment.map(equipment => (
        <li className="listingRow" key={equipment.name}>
          {equipment.name} - ${equipment.price}
        </li>
      ));
    } else {
      return <li className="listingRow">No Equipment Available</li>;
    }
  }

  render() {
    let { office, auth, reviews, officeLoading } = this.props;

    if (officeLoading) {
      return <div>Loading...</div>;
    } else {
			// calculate avg rating
			if (reviews && reviews.length) {
				this.avg_rating =
					reviews.map(review => (review.rating)).reduce((acc, rating) => acc + rating, 0) / reviews.length;
				this.rating_count = reviews.length;
			} else {
				this.avg_rating = 0;
				this.rating_count = 0;
			}

      return (
        <div className="listing">
          <div className="officeImgs">{this.renderImages(office)}</div>

          <div className="listingDetails">
            <div className="listingHeader">
              <div>
                <h3>{office.name}</h3>
                <h5>{office.location}</h5>
              </div>
							<div>
								<div className="rating">
			            <ReactStars
			              count={5}
			              edit={false}
										size={18}
			              value={this.avg_rating}
			            />
			            <span className="rating_count">
			              {`${this.rating_count} Reviews`}
			            </span>
			          </div>
							</div>
            </div>

            <div className="availableRow">
              <div>
                <h5>Equipment Available</h5>
                {this.renderEquipment(office)}
              </div>
            </div>

						<div className="profile_section">
							<h5>{"Reviews for " + office.name}</h5>
							{/* if logged out, hide new review form */}
							{auth && auth.data ? <NewReview reviewee={office} /> : ""}
							<ReviewContainer
								reviewee_id={office._id}
								reviewee_name={office.name}
								reviews={reviews}
							/>
						</div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    officeLoading: state.offices.isFetching,
    listings: state.listings.selected,
    office: state.offices.selected,
		reviews: state.reviews.selected,
		auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
