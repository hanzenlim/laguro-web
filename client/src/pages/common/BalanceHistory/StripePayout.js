import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Modal } from 'antd';

import { GET_PAYOUT_LINK, PAYOUT_USER, ADD_PAYOUT_LINK } from './queries';

import { stripeExpressClientKey } from '../../../config/keys';
import { renderPrice } from '../../../util/paymentUtil';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

import { Flex, Box, Button, Loading, Text } from '../../../components';

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
                <Flex alignItems="center" mb={20}>
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
                                <Box mb={1} mr={40}>
                                    {payoutLoginLink ? (
                                        <a
                                            href={payoutLoginLink}
                                            target="_blank"
                                        >
                                            <Button
                                                my={1}
                                                fullWidth
                                                color="primary"
                                                px={30}
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
                                                fullWidth
                                                color="primary"
                                                px={30}
                                            >
                                                Connect to your bank
                                            </Button>
                                        </a>
                                    )}
                                </Box>
                            );
                        }}
                    </Mutation>
                    <Box>
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
                            <Button type="ghost" px={30} disabled>
                                Payout unavailable
                            </Button>
                        )}
                    </Box>
                </Flex>
            );
        }}
    </Query>
);

export default StripePayoutButtons;
