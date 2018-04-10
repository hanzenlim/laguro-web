import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ReactStars from "react-stars";

class OfficeResultIndex extends Component {
  componentDidMount() {
    this.office_id = this.props.match.params.office_id;

    this.props.getOfficeListings(this.office_id);
    this.props.getOneOffice(this.office_id);
  }

  renderImages(office) {
    return office.img_url.map(url => (
      <img className="officeImg" key={url} src={url} alt="office" />
    ));
  }

  render() {
    let { office } = this.props;

    if (!office || Object.keys(office).length === 0) {
      return <div>Loading...</div>;
    } else {
      if (office.rating && office.rating.length) {
        this.avg_rating =
          office.rating.reduce((acc, val) => acc + val) / office.rating.length;
				this.rating_count = office.rating.length;
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
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    listings: state.listings.selected,
    office: state.offices.selected
  };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
