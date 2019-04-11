import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Modal } from 'antd';

import { GET_PAYOUT_LINK, PAYOUT_USER, ADD_PAYOUT_LINK } from './queries';

import { stripeExpressClientKey } from '../../../config/keys';
import { renderPrice } from '../../../util/paymentUtil';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

import { Grid, Box, Button, Loading, Text } from '../../../components';

const StripePayoutButtons = ({ userId, accountToken, totalAvailable }) => (
    <Query query={GET_PAYOUT_LINK} variables={{ id: userId }}>
        {({
            loading: loadingPayoutLink,
            error: errorPayoutLink,
            data: dataPayoutLink,
        }) => {
            if (loadingPayoutLink) return <Loading />;
            if (errorPayoutLink) return <RedirectErrorPage />;

            const { getUser } = dataPayoutLink;
            const { payoutLoginLink } = getUser;
            return (
                <Grid gridTemplateColumns="1fr 1fr" mb={20} gridColumnGap="6px">
                    <Mutation mutation={ADD_PAYOUT_LINK}>
                        {(
                            addPayoutAccount,
                            { loading: addPayoutLoading, error: addPayoutError }
                        ) => {
                            if (addPayoutLoading) {
                                return <Loading />;
                            }
                            if (addPayoutError) {
                                return <RedirectErrorPage />;
                            }

                            if (!payoutLoginLink && accountToken) {
                                addPayoutAccount({
                                    variables: {
                                        input: {
                                            userId,
                                            accountToken,
                                        },
                                    },
                                });
                            }

                            return (
                                <Box mb={1} mr={[6, '', 40]} width="100%">
                                    <Box width="100%">
                                        {payoutLoginLink ? (
                                            <a
                                                href={payoutLoginLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button
                                                    my={1}
                                                    width="100%"
                                                    color="primary"
                                                    px={[10, '', 30]}
                                                    fontSize={[0, '', 3]}
                                                >
                                                    View Stripe account
                                                </Button>
                                            </a>
                                        ) : (
                                            <a
                                                href={`https://connect.stripe.com/express/oauth/authorize?client_id=${stripeExpressClientKey}`}
                                            >
                                                <Button
                                                    my={1}
                                                    width="100%"
                                                    color="primary"
                                                    px={[10, '', 30]}
                                                    fontSize={[0, '', 3]}
                                                >
                                                    Connect to your bank
                                                </Button>
                                            </a>
                                        )}
                                    </Box>
                                </Box>
                            );
                        }}
                    </Mutation>
                    <Box width="100%">
                        {totalAvailable > 0 && payoutLoginLink ? (
                            <Mutation mutation={PAYOUT_USER}>
                                {(
                                    payoutUser,
                                    {
                                        loading: payoutLoading,
                                        error: payoutError,
                                        data: payoutData,
                                    }
                                ) => {
                                    if (payoutLoading) return <Loading />;
                                    if (payoutError)
                                        Modal.error({
                                            title: 'Payment error',
                                            content:
                                                'Please refresh and try again',
                                        });
                                    if (payoutData) {
                                        Modal.success({
                                            title: 'Successful payout',
                                            content: `Stripe has paid out ${renderPrice(
                                                payoutData.payoutUser
                                            )}`,
                                        });
                                    }
                                    const handleClick = () => {
                                        payoutUser({
                                            variables: {
                                                userId,
                                            },
                                        });
                                    };
                                    return (
                                        <Button
                                            type="ghost"
                                            border="1px solid"
                                            borderColor="divider.blue"
                                            px={30}
                                            onClick={handleClick}
                                        >
                                            <Text
                                                color="text.blue"
                                                fontSize={2}
                                            >
                                                Send available funds to Stripe
                                            </Text>
                                        </Button>
                                    );
                                }}
                            </Mutation>
                        ) : (
                            <Button
                                px={[10, '', 30]}
                                width="100%"
                                disabled
                                fontSize={[0, '', 3]}
                            >
                                Payout unavailable
                            </Button>
                        )}
                    </Box>
                </Grid>
            );
        }}
    </Query>
);

export default StripePayoutButtons;
