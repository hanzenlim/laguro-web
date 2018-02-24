import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from 'moment';

import OfficeResult from "./OfficeResult";
import FilterBar from "./FilterBar";

class OfficeResultIndex extends Component {
	componentWillMount() {
		this.props.fetchListings();
		this.props.fetchOffices();
	}

  renderOfficeList(){
    const allOffices = this.props.offices.data;
		const allListings = this.props.listings.data;


    if(allOffices){
      let officeList = allOffices.map(office => {
				//get all listings for this office

				let officeListings = allListings ? allListings.filter(listing => listing.office === office._id) : []

				//extract the price and time for each listing
				let listings = officeListings.map(listing => {
					return {
						time: moment(listing.time_available),
						office_id: listing.office,
						id: listing._id
					}
				})

				//average the ratings
				let avg_rating = office.rating.length > 0 ? office.rating.reduce((acc, val) => acc + val)/office.rating.length : null

        return <OfficeResult
			          name={office.name}
			          location={office.location}
			          chairs={office.chairs}
								listings={listings}
								rating_value={avg_rating}
								rating_count={office.rating.length}
								img={office.img_url}
			          key={office._id}
			        />
      });

			return officeList;
    } else {
      return <div></div>
    }
  }

	render() {
    return (
      <div>
        <FilterBar />
        {this.renderOfficeList()}
      </div>
    );
	}
}

function mapStateToProps(state) {
	return {
    offices: state.offices,
		listings: state.listings,
    filters: state.filters
   };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
