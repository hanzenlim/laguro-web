import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styled from 'styled-components';

import PendingPayouts from './PendingPayouts';
import { stripeExpressClientKey } from '../config/keys';
import * as actions from '../actions';
import User from '../models/user';
import { PAYOUT_LOGIN, AVAILABLE } from '../util/strings';
import { renderPrice } from '../util/paymentUtil';
import { paymentFragment } from '../util/fragments';
import makeApiCall from '../util/clientDataLoader';
import { Box, Flex, Button, Typography } from './common';

const PROCEDURE_PERCENTAGE = 0.85;
const RESERVATION_PERCENTAGE = 0.8;

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

const StyledContainer = styled(Box)`
    max-width: 800px;

    @media screen and (min-width: 800px) {
        margin: auto;
    }
`;

const StyledButtonContainer = styled(Box)`
    max-width: 300px;
`;

const StyledSummaryContainer = styled(Flex)`
    min-width: 215px;
    min-height: 85px;

    @media screen and (max-width: 600px) {
        min-width: 175px;
    }
`;

class Payout extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null, receivable: null };

        this.payoutUser = this.payoutUser.bind(this);
        this.loadAccountReceivable = this.loadAccountReceivable.bind(this);

        this.loadPayout();
        this.loadAccountReceivable();
    }

    async loadPayout() {
        const { auth } = this.props;
        const { location } = this.props;
        const params = queryString.parse(location.search);
        const accountToken = params.code;

        let user = await User.get(auth.id, PAYOUT_LOGIN);
        if (accountToken && !user.payoutAccountId) {
            user = await User.addPayoutAccount(user.id, accountToken);
        }
        this.setState({ user });
    }

    async loadAccountReceivable() {
        const { auth } = this.props;
        const response = await makeApiCall(getUserAccountReceivableQuery, {
            userId: auth.id
        });
        const receivable = response.data.getUserAccountReceivable;
        this.setState({ receivable });
    }

    async payoutUser() {
        const { auth } = this.props;
        const response = await makeApiCall(payoutUserQuery, {
            userId: auth.id
        });
        alert(`Paid out ${renderPrice(response.data.payoutUser)}`);
        this.loadAccountReceivable();
    }

    render() {
        const { user, receivable } = this.state;
        if (!user || !receivable) {
            return <div />;
        }

        let totalAmount = 0;
        let availableAmount = 0;
        for (let i = 0; i < receivable.length; i++) {
            let percentage = receivable[i].type === 'RESERVATION' ? RESERVATION_PERCENTAGE : PROCEDURE_PERCENTAGE;
            const payoutAmount = receivable[i].stripePayment.amount;
            totalAmount += Math.floor(payoutAmount * percentage);
            if (receivable[i].chargeStatus === AVAILABLE && receivable[i].type === 'RESERVATION') {
                availableAmount += payoutAmount;
            }
        }

        let payoutLogin = (
            <Box mb={1}>
                {user.payoutLoginLink ? (
                    <a href={user.payoutLoginLink}>
                        <Button my={1} fullWidth color="primary">
                            Go to Stripe
                        </Button>
                    </a>
                ) : (
                    <a
                        href={`https://connect.stripe.com/express/oauth/authorize?client_id=${stripeExpressClientKey}`}
                    >
                        <Button my={1} fullWidth color="primary">
                            Create Stripe account
                        </Button>
                    </a>
                )}
            </Box>
        );

        let payoutButton = (
            <Box>
                {availableAmount > 0 ? (
                    <Button
                        fullWidth
                        color="secondary"
                        tooltip="Click here to retreive all your available funds"
                        onClick={this.payoutUser}
                    >
                        Payout available
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        color="secondary"
                        tooltip="No funds available. Funds typically take 7 business days to clear"
                        disabled
                        onClick={this.payoutUser}
                    >
                        Payout unavailable
                    </Button>
                )}
            </Box>
        );

        let payoutSummary = (
            <StyledSummaryContainer flexDirection="column" justifyContent="space-between">
                <Flex justifyContent="space-between">
                    <Typography>Available:</Typography>
                    <Typography>
                        {renderPrice(availableAmount)}
                    </Typography>
                </Flex>
                <Flex justifyContent="space-between">
                    <Typography>Pending:</Typography>
                    <Typography>
                        {renderPrice(totalAmount - availableAmount)}
                    </Typography>
                </Flex>
                <Flex justifyContent="space-between">
                    <Typography>Total: </Typography>
                    <Typography>{renderPrice(totalAmount)}</Typography>
                </Flex>
            </StyledSummaryContainer>
        );

        return (
            <StyledContainer m={3} py={4}>
                <Typography fontSize={5} fontWeight="bold">
                    Laguro Balance
                </Typography>
                <Flex justifyContent="space-between" alignItems="center" my={3}>
                    <StyledButtonContainer>
                        {payoutLogin}
                        {user && user.payoutAccountId && payoutButton}
                    </StyledButtonContainer>
                    <Box ml={2} height="100%">{payoutSummary}</Box>
                </Flex>
                <PendingPayouts receivable={receivable} />
            </StyledContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(
    mapStateToProps,
    actions
)(Payout);
