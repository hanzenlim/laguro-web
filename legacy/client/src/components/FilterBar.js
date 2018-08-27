import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'materialize-css';

import DateFilter from './filters/DateFilter';
import LocationFilter from './filters/LocationFilter';

class FilterBar extends Component {
    componentDidMount() {
        const elements = document.getElementsByClassName('dropdown-trigger');
        for (const el of elements) {
            Dropdown.init(el, {
                coverTrigger: false,
                closeOnClick: false,
            });
            Dropdown.getInstance(el);
        }
    }

	filterDefaults = {
	    location: 'Location',
	    insurance: 'Insurance',
	    price: 'Price',
	    procedure: 'Procedure',
	};

	render() {
	    return (
	        <div className="filters">
	            <div>
	                <DateFilter selectedDate={this.props.filters.date} />
	            </div>
	            <div>
	                <a className="dropdown-trigger dropdown btn light-blue lighten-1" data-target="dropdown1">
	                    {this.props.filters.location ? this.props.filters.location : 'Location'}
	                </a>
	                <ul id='dropdown1' className='dropdown-content'>
	                    <LocationFilter searchLocation={this.props.filters.location} />
	                </ul>
	            </div>
	        </div>
	    );
	}
}

function mapStateToProps(state) {
    return { filters: state.filters };
}

export default connect(mapStateToProps)(FilterBar);
