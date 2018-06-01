import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import UserOffice from './UserOffice';
import * as actions from '../actions';

class UserOffices extends Component {
    constructor(props) {
        super(props);
        this.state = { offices: this.props.offices };

        this.deleteListingAndUpdateOffices = this.deleteListingAndUpdateOffices.bind(
            this
        );

        this.deleteOffice = this.deleteOffice.bind(this);
    }

    async deleteOffice(office) {
        await this.props.deleteOffice(office.id);
        this.props.reloadOffices();
    }

    async deleteListingAndUpdateOffices(listing) {
        // api call to delete listing from DB
        await this.props.deleteListing(listing.id);
        this.props.reloadOffices();
    }

    render() {
        const { offices } = this.state;

        if (!offices) return;

        if (!offices.length) {
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
                deleteOffice={this.deleteOffice}
                deleteListing={this.deleteListingAndUpdateOffices}
                queryOffices={this.props.queryOffices}
            />
        ));

        return <div>{userOffices}</div>;
    }
}

export default connect(null, actions)(UserOffices);
