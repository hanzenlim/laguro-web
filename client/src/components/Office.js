import React, { Component } from "react";
import { connect } from "react-redux";
import ReactStars from "react-stars";

import * as actions from "../actions";
import NewReview from "./forms/NewReview";
import ReviewContainer from "./ReviewContainer";
import PhotoGrid from "./PhotoGrid";
import { LISTINGS, REVIEWS } from "../util/strings";

class OfficeResultIndex extends Component {
    componentDidMount() {
        this.office_id = this.props.match.params.office_id;

        this.props.getOffice(this.office_id, LISTINGS, REVIEWS);
    }

    renderImages(office) {
        if (!office.imageUrls || !office.imageUrls.length) return <div />;
        return office.imageUrls.map(url => (
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
        }
        return <li className="listingRow">No Equipment Available</li>;
    }

    render() {
        const { office, auth, officeLoading, reviews } = this.props;

        if (officeLoading) {
            return <div>Loading...</div>;
        }
        // calculate avg rating
        if (reviews && reviews.length) {
            this.avg_rating =
                reviews
                    .map(review => review.rating)
                    .reduce((acc, rating) => acc + rating, 0) / reviews.length;
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
                        {auth && auth.data ? (
                            <NewReview reviewee={office} />
                        ) : (
                            ""
                        )}
                        <ReviewContainer
                            revieweeId={office.id}
                            revieweeName={office.name}
                            reviews={reviews}
                        />
                    </div>
                </div>
                <PhotoGrid numRow="1" page="office" />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        officeLoading: state.offices.isFetching,
        office: state.offices.selected,
        auth: state.auth,
        reviews: state.reviews.all
    };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
