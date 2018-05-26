import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactStars from 'react-stars';
import { Link } from 'react-router-dom';

class OfficeResult extends Component {
    renderTimes(listings) {
        if (listings) {
            const filteredListings = listings.filter(
                listing => !listing.reserved_by
            );

            if (filteredListings.length === 0) {
                return (
                    <div className="valign-wrapper">
                        <small>No times available</small>
                    </div>
                );
            }
            return filteredListings.map(listing => (
                <Link
                    key={listing.id}
                    to={`/office/${listing.office.id}/listing/${listing.id}`}
                    className="badge white-text light-blue lighten-2"
                >
                    {moment(listing.time_available).format('MMM D, h a')}
                </Link>
            ));
        }
        return <div />;
    }

    imgUrl() {
        return this.props.img
            ? this.props.img
            : 'http://via.placeholder.com/200x200';
    }

    render() {
        return (
            <div className="searchResult hoverable">
                <img className="result-img" src={this.imgUrl()} alt="Office" />
                <div className="content">
                    <div className="header">
                        <Link
                            className="blue-text text-darken-2"
                            to={`/office/${this.props.office_id}`}
                        >
                            <h5>
                                {this.props.index + 1}. {this.props.name}
                            </h5>
                        </Link>
                        <h6>{this.props.location}</h6>
                    </div>
                    <div className="rating">
                        <ReactStars
                            count={5}
                            edit={false}
                            value={this.props.avg_rating}
                        />
                        <span className="rating_count">
                            {`${this.props.rating_count} Reviews`}
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
