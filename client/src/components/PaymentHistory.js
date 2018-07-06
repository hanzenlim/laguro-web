import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaymentDetails from './PaymentDetails';
import * as actions from '../actions';
import { Box, Typography } from './common';
import { PAYER_ID, PAYEE_ID } from '../util/strings';

const paymentHistoryQuery = `
    query QueryPayments($input: QueryParams!) {
        queryPayments(input: $input) {
            id
            type
            status
            reservation {
              location
              numChairsSelected
              startTime
              endTime
              office {
                  id
                  name
                  imageUrls
              }
            }
            appointment {
              location
              procedure {
                name
              }
              startTime
              endTime
              reservation{
                  office {
                      id
                      name
                      imageUrls
                  }
              }
            }
            nominalAmount
            currency
            stripePayment {
              amount
              source {
                brand
                last4
              }
            }
            chargeStatus
            dateCreated
        }
    }
`;

class PaymentHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payerHistory: [],
            payeeHistory: []
        };
    }

    componentWillMount() {
        this.fetchPayments();
    }

    async fetchPayments() {
        await this.props.fetchUser();
        const userId = this.props.auth.id;
        const payerHistory = await this.props.loadPaymentHistory(paymentHistoryQuery, PAYER_ID, userId);
        const payeeHistory = await this.props.loadPaymentHistory(paymentHistoryQuery, PAYEE_ID, userId);
        this.setState({ payerHistory, payeeHistory });
    }

    render() {

        const { payeeHistory, payerHistory } = this.state;
        if (!payeeHistory.length && !payerHistory.length) {
            return <div />;
        }
        const payeeHistoryDetails = payeeHistory.map((payment, index) => (
            <PaymentDetails payment={payment} key={index} />
        ));
        const payerHistoryDetails = payerHistory.map((payment, index) => (
            <PaymentDetails payment={payment} key={index} />
        ));

        return (
            <Box mx={7} mt={5}>
                <Typography fontSize={5}>
                    Payment History
                </Typography>
                <Box pb={3} />
                {payeeHistoryDetails}
                <Box pb={3} />
                {payerHistoryDetails}
            </Box>);
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}
export default connect(mapStateToProps, actions)(PaymentHistory);
