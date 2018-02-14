import React, { Component } from 'react';

import OfficeSearch from './OfficeSearch';
class Landing extends Component {
  render() {
    return (
      <div className="bigSearch">
        <div className="search-tabs">
          <div
            className="tab active toggle"
            id="office-tab"
            onClick={this.tabChange}
            >
            <h5>Find an Office</h5>
          </div>
          <div
            className="tab toggle"
            id="dentist-tab"
            onClick={this.tabChange}
            >
            <h5>Find a Dentist</h5>
          </div>
        </div>
        <OfficeSearch/>
        <DentistSearch/>
      </div>
    )
  }

}

export default Landing;
