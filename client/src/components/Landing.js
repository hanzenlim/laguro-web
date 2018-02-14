import React, { Component } from 'react';

import OfficeSearch from './OfficeSearch';
import DentistSearch from './DentistSearch';

class Landing extends Component {
  tabChange(event) {
    const id = event.target.parentNode.id;
    var element = document.getElementById(id);

    var elementsToToggle = document.getElementsByClassName('toggle');

    if(element && !element.classList.value.includes('active')){
      for(var el of elementsToToggle){
        el.classList.toggle('active');
      }
    }
  }

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
