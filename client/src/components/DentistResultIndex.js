import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import DentistResult from "./DentistResult";
import FilterBar from "./FilterBar";
import ResultMap from "./ResultMap";

class DentistResultIndex extends Component {
	componentWillMount() {
		this.props.fetchDentists(this.props.filters);
	}

  renderDentistList(){
    const allDentists = this.props.dentists;
    if(allDentists){
      return allDentists.map(dentist => {

				//average the ratings
				let avg_rating = dentist.rating.length > 0 ? dentist.rating.reduce((acc, val) => acc + val)/dentist.rating.length : 0

				return <DentistResult
				          name={dentist.name}
				          type={dentist.type}
				          location={dentist.location}
				          badges={dentist.badges}
									rating_value={avg_rating}
									rating_count={dentist.rating.length}
									img={dentist.img_url}
				          key={dentist._id}
				        />
      });
    } else {
      return <div></div>
    }
  }

	render() {
    return (
      <div>
        <FilterBar />
				<div className="resultContainer">
					<div className="resultList">
						{this.renderDentistList()}
					</div>
					<div className="map">
						<ResultMap
							locations={this.props.dentists}
							google={window.google}
							searchLocation={this.props.filters.location ? this.props.filters.location : null }/>
					</div>
				</div>
      </div>
    );
	}
}

function mapStateToProps(state) {
	return {
    dentists: state.dentists,
    filters: state.filters
   };
}

export default connect(mapStateToProps, actions)(DentistResultIndex);
