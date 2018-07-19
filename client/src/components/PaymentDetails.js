import React, { Component } from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { renderPrice } from '../util/paymentUtil';
import { Box, Card, Flex, Typography } from './common';
import officeImgPlaceholder from './images/office-placeholder-thumbnail.png';

const StyledPaddedBox = styled(Box)`
    width: 3%;
`;

const StyledInfoFlex = styled(Flex)`
    width: 64%;
`;

const StyledPaymentFlex = styled(Flex)`
    width: 20%;
`;

class PaymentDetails extends Component {
    render() {
        const { index, payment } = this.props;
        const {
            action,
            date,
            description,
            endTime,
            office,
            paymentAmount,
            procedureName,
            startTime,
            source
        } = payment;

        if (isEmpty(payment)) {
            return '';
        }

        return (
            <Box key={index} mb={2}>
                <Card>
                    <Flex p={3}>
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            width="13%"
                        >
                            <img
                                data-name="office-image"
                                src={
                                    !isEmpty(office.imageUrls)
                                        ? office.imageUrls[0]
                                        : officeImgPlaceholder
                                }
                                alt={office.imageUrls[0]}
                            />
                        </Flex>
                        <StyledPaddedBox pr={3} />
                        <StyledInfoFlex
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <div data-name="office-name">
                                <Typography fontSize={4} fontWeight="bold">
                                    {office.name}
                                </Typography>
                            </div>
                            <div data-name="office-location">
                                <Typography fontSize={2}>
                                    {office.location}
                                </Typography>
                            </div>
                            <div>
                                <div data-name="action">{action}</div>
                                <div data-name="start-end-time">
                                    {moment(startTime).format(
                                        'MMM DD h:mm a - '
                                    ) + moment(endTime).format('h:mm a')}
                                </div>
                                <div data-name="procedures">
                                    {procedureName && <li>{procedureName}</li>}
                                </div>
                            </div>
                        </StyledInfoFlex>
                        <StyledPaymentFlex
                            flexDirection="column"
                            justifyContent="center"
                        >
                            <Flex justifyContent="center">
                                <div data-name="payment-amount">
                                    {renderPrice(paymentAmount)}
                                </div>
                            </Flex>
                            <Flex justifyContent="center">
                                <div data-name="description">
                                    <Box fontSize={2} description={description}>
                                        {description}
                                    </Box>
                                </div>
                            </Flex>
                            <Flex justifyContent="center">
                                <div data-name="date">
                                    <Typography fontSize={1}>
                                        {date &&
                                            moment
                                                .unix(date)
                                                .format('MMMM Do, YYYY h:mm A')}
                                    </Typography>
                                </div>
                            </Flex>
                            <Flex justifyContent="center">
                                <div data-name="source">
                                    <Typography>{`${source.brand} - ${
                                        source.last4
                                    }`}</Typography>
                                </div>
                            </Flex>
                        </StyledPaymentFlex>
                    </Flex>
                </Card>
            </Box>
        );
    }
}

export default PaymentDetails;
