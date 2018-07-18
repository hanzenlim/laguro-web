import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserOffice from './UserOffice';
import * as actions from '../actions';

class UserOfficeIndex extends Component {
    constructor(props) {
        super(props);

        this.deleteUserOffice = this.deleteUserOffice.bind(this);
    }

    async deleteUserOffice(officeToCancel) {
        const { dentist } = this.props;

        // find the office this reservation is for
        dentist.offices = dentist.offices.filter(
            office => office.id !== officeToCancel.id
        );

        await this.props.deleteOffice(officeToCancel.id);
        this.props.updateDentist(dentist);
    }

    render() {
        const { offices } = this.props.dentist;

        if (!offices || !offices.length) {
            return (
                <div>
                    {'No offices yet - '}
                    <Link
                        className="blue-text text-darken-2"
                        to={'/landlord-onboarding/add-office'}
                    >
                        create a new office to begin hosting today
                    </Link>
                </div>
            );
        }

        let userOffices = offices.map(office => (
            <UserOffice
                key={office.id}
                office={office}
                deleteUserOffice={this.deleteUserOffice}
            />
        ));

        return <div>{userOffices}</div>;
    }
}

function mapStateToProps(state) {
    return { dentist: state.dentists.selectedDentist };
}

export default connect(mapStateToProps, actions)(UserOfficeIndex);
