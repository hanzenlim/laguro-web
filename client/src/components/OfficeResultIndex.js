import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import OfficeResult from './OfficeResult';
import FilterBar from './FilterBar';
import ResultMap from './ResultMap';
import { LISTINGS, REVIEWS } from '../util/strings';

class OfficeResultIndex extends Component {
    componentWillMount() {
        document.title = 'Laguro - Search Index';
        this.props.fetchOffices(this.props.filters, LISTINGS, REVIEWS);
    }

    renderMap() {
        return (
            <ResultMap
                locations={this.props.offices}
                google={window.google}
                searchLocation={
                    this.props.filters.location
                        ? this.props.filters.location
                        : null
                }
            />
        );
    }

    renderOfficeList() {
        const filteredOffices = this.props.offices;
        const officeList = filteredOffices.map((office, index) => {
            const { reviews } = office;

            // calculate avg rating
            if (reviews && reviews.length) {
                this.avg_rating =
                    reviews
                        .map(review => review.rating)
                        .reduce((acc, rating) => acc + rating, 0) /
                    reviews.length;
                this.rating_count = reviews.length;
            } else {
                this.avg_rating = 0;
                this.rating_count = 0;
            }
            return (
                <OfficeResult
                    name={office.name}
                    location={office.location}
                    chairs={office.numChairs}
                    listings={office.listings}
                    avg_rating={this.avg_rating}
                    rating_count={this.rating_count}
                    img={office.imageUrls ? office.imageUrls[0] : null}
                    office_id={office.id}
                    index={index}
                    key={office.id}
                />
            );
        });

        return officeList;
    }

    render() {
        if (this.props.invalid) {
            this.props.fetchOffices(this.props.filters, LISTINGS, REVIEWS);
        }

        if (this.props.isFetching) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <FilterBar />
                <div className="resultContainer">
                    <div className="resultList">{this.renderOfficeList()}</div>
                    <div className="map">{this.renderMap()}</div>
                </div>
            </div>
        );
    }
}

function getVisibleOffices(offices) {
    // remove any offices greater than 35 miles away
    // if no location filter, office.distance is undefined and !!(undefined > 35) == false
    const filteredOffices = offices.filter(office => {
        if (office.distance && office.distance.split(',').join('') > 35) {
            return false;
        }

        return true;
    });

    // sort offices within range, allows their labels to reflect order
    return filteredOffices.sort((a, b) => a.distance - b.distance);
}

function mapStateToProps(state) {
    return {
        offices: getVisibleOffices(state.offices.all),
        isFetching: state.offices.isFetching,
        invalid: state.offices.invalid,
        filters: state.filters
    };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
