import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../../actions';

class DateFilter extends Component {
    handleChange(date) {
        this.props.updateFilters({ date });
    }

    render() {
        return (
            <DatePicker
                className="dropdown btn light-blue lighten-1"
                selected={this.props.selectedDate ? moment(this.props.selectedDate) : moment()}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

export default connect(null, actions)(DateFilter);
