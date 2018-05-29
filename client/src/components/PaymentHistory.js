import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaymentDetails from './PaymentDetails';
import * as actions from '../actions';
import Payment from '../models/payment';
import { PAYER_ID } from '../util/strings';

class PaymentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: null
        };
    }

    componentWillMount() {
        this.fetchPayments();
    }

    async fetchPayments() {
        await this.props.fetchUser();
        const userId = this.props.auth.id;
        const payments = await Payment.query(PAYER_ID, userId);
        this.setState({ payments });
    }

    render() {
        const { payments } = this.state;
        if (!payments) {
            return <div />;
        }
        if (!payments.length) {
            return <div>No past payments.</div>;
        }
        const paymentDetails = payments.map(payment => (
            <PaymentDetails payment={payment} />
        ));
        return <div>{paymentDetails}</div>;
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}
export default connect(mapStateToProps, actions)(PaymentHistory);
