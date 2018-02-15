import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import DentistResult from "./DentistResult";
import FilterBar from "./FilterBar";

class DentistResultIndex extends Component {
	componentWillMount() {
		this.props.fetchDentists();
    console.log(this.props)
	}

  renderDentistList(dentists){
    const allDentists = this.props.dentists.data;

    if(allDentists){
      return allDentists.map(dentist => (
        <DentistResult
          name={dentist.name}
          type={dentist.type}
          location={dentist.location}
          badges={dentist.badges}
          key={dentist._id}
        />
      ));
    } else {
      return <div></div>
    }
  }

	render() {
    return (
      <div>
        <FilterBar />
        {this.renderDentistList()}
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
