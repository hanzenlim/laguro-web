import React, { Component } from 'react';
import { AVAILABLE } from '../util/strings';
import { paymentFragment } from '../util/fragments';
import makeApiCall from '../util/clientDataLoader';

const getUserAccountReceivableQuery = `
    query ($userId: String!) {
        getUserAccountReceivable(userId: $userId) {
            ${paymentFragment}
        }
    }
`;

const payoutUserQuery = `
    mutation ($userId: String!) {
        payoutUser(userId: $userId)
    }
`;

class PendingPayouts extends Component {
    constructor(props) {
        super(props);
        this.state = { receivable: null };
        this.payoutUser = this.payoutUser.bind(this);
        this.loadAccountReceivable = this.loadAccountReceivable.bind(this);
        this.loadAccountReceivable();
    }

    async loadAccountReceivable() {
        const { user } = this.props;
        const response = await makeApiCall(getUserAccountReceivableQuery, {
            userId: user.id
        });
        const receivable = response.data.getUserAccountReceivable;
        this.setState({ receivable });
    }

    async payoutUser() {
        const { user } = this.props;
        const response = await makeApiCall(payoutUserQuery, {
            userId: user.id
        });
        alert('Paid out $' + response.data.payoutUser / 100);
        this.loadAccountReceivable();
    }

    render() {
        const { user } = this.props;
        const { receivable } = this.state;
        if (!user || !receivable) {
            return <div />;
        }
        let totalAmount = 0;
        let availableAmount = 0;
        for (let i = 0; i < receivable.length; i++) {
            const payoutAmount = receivable[i].stripePayment.amount;
            totalAmount += payoutAmount;
            if (receivable[i].chargeStatus === AVAILABLE) {
                availableAmount += payoutAmount;
            }
        }
        totalAmount = (totalAmount * 0.8 / 100).toFixed(2);
        availableAmount = (availableAmount * 0.8 / 100).toFixed(2);
        const pendingAmount = (totalAmount - availableAmount).toFixed(2);
        let receivableList = receivable.map((receivable, index) => {
            const reservation = receivable.reservation;

            // TODO consider storing PAYOUT amount or implement calculation util function
            // TODO figure out what info to display
            return (
                <li key={index}>
                    <div>Id: {receivable.id}</div>
                    {reservation && (
                        <div>
                            <div>Location: {reservation.location}</div>
                            <div>Start time: {reservation.startTime}</div>
                            <div>End time: {reservation.endTime}</div>
                        </div>
                    )}
                    <div>
                        Amount: ${receivable.stripePayment.amount * 0.8 / 100}
                    </div>
                </li>
            );
        });
        return (
            <div>
                {user.payoutAccountId ? (
                    <button onClick={this.payoutUser}>
                        Payout available amount
                    </button>
                ) : (
                    ''
                )}
                <div>Available amount: ${availableAmount}</div>
                <div>Pending Amount: ${pendingAmount}</div>
                <div>Total receivables: ${totalAmount}</div>
                <ul>{receivableList}</ul>
            </div>
        );
    }
}

export default PendingPayouts;
