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
        const { date, values } = this.props.filters;
        let selectedDate = values ? values.date : '';
        if (date) selectedDate = date;

        let button_color = selectedDate
            ? 'light-blue lighten-1'
            : 'grey lighten-1';
        let className = 'dropdown btn ' + button_color;

        return (
            <DatePicker
                className={className}
                selected={selectedDate ? moment(selectedDate) : moment()}
                onChange={this.handleChange.bind(this)}
            />
        );
    }
}

export default connect(
    null,
    actions
)(DateFilter);
