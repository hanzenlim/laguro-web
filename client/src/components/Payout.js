import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PendingPayouts from './PendingPayouts';
import { PAYOUT_LOGIN } from '../util/strings';
import * as actions from '../actions';
import User from '../models/user';

class Payout extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, receivable: null };
        this.loadPayout();
    }

    async loadPayout() {
        const { auth } = this.props;
        const { location } = this.props;
        const params = queryString.parse(location.search);
        const accountToken = params.code;

        let user = await User.getByGoogleId(auth.googleId, PAYOUT_LOGIN);
        if (accountToken && !user.payoutAccountId) {
            user = await User.addPayoutAccount(user.id, accountToken);
        }
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        if (!user) {
            return <div />;
        }
        let payoutLogin = (
            <div>
                <div>
                    <h1>Payout page</h1>
                </div>
                <a href="https://connect.stripe.com/express/oauth/authorize?client_id=ca_Ckn9cr02OBbfnptZyI9b5ruq90H0cDX9">
                    Create Payout Link{' '}
                </a>
            </div>
        );
        if (user.payoutLoginLink) {
            payoutLogin = (
                <div>
                    <h1> Stripe express account login link</h1>
                    <a href={user.payoutLoginLink}>Login Link</a>
                </div>
            );
        }
        return (
            <div>
                {payoutLogin}
                <PendingPayouts user={user} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(Payout);
