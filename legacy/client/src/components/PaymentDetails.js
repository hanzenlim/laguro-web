import React, { Component } from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { renderPrice } from '../util/paymentUtil';
import { Box, Card, Flex, Typography } from './common';
import officeImgPlaceholder from './images/office-placeholder-thumbnail.png';

const StyledContainer = styled(Box)`
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 600px) {
        flex-direction: row;
    }
`;

const StyledImageContainer = styled.div`
    width: 100%;
    margin-bottom: 15px;

    @media screen and (min-width: 600px) {
        max-width: 150px;
        max-height: 100px;
        margin-bottom: 0;
        padding-right: 20px;
    }
`;

const StyledPaymentInfo = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
`;

const StyledInfoFlex = styled(Flex)`
    margin-bottom: 15px;

    @media screen and (min-width: 600px) {
        margin-bottom: 0;
    }
`;

const StyledPaymentFlex = styled(Flex)`
    align-items: flex-start;

    @media screen and (min-width: 600px) {
        align-items: flex-end;
    }
`;

const StyledTypography = styled(Typography)`
    line-height: 22px;
`;

class PaymentDetails extends Component {
    renderProcedureNames = () => {
        const { procedureNames } = this.props.payment;

        return (
            procedureNames &&
            procedureNames.map((name, index) => <li key={index}>{name}</li>)
        );
    };

    render() {
        const { index, payment } = this.props;
        const {
            action,
            date,
            description,
            endTime,
            office,
            paymentAmount,
            startTime,
            source,
        } = payment;

        if (isEmpty(payment)) {
            return '';
        }

        return (
            <Box mb={2}>
                <Card key={index}>
                    <StyledContainer p={3}>
                        {office.imageUrls && (
                            <StyledImageContainer>
                                <img
                                    width="100%"
                                    height="100%"
                                    data-name="office-image"
                                    src={
                                        !isEmpty(office.imageUrls)
                                            ? office.imageUrls[0]
                                            : officeImgPlaceholder
                                    }
                                    alt={
                                        !isEmpty(office.imageUrls)
                                            ? office.imageUrls[0]
                                            : officeImgPlaceholder
                                    }
                                />
                            </StyledImageContainer>
                        )}

                        <StyledPaymentInfo>
                            <StyledInfoFlex flexDirection="column">
                                <div data-name="office-name">
                                    <Typography fontSize={4} fontWeight="bold">
                                        {office.name}
                                    </Typography>
                                </div>
                                <div data-name="office-location">
                                    <Typography fontSize={2}>
                                        {office.location.name}
                                    </Typography>
                                </div>
                                <div>
                                    <div data-name="action">{action}</div>
                                    <div data-name="start-end-time">
                                        {startTime &&
                                            moment(startTime).format(
                                                'MMM DD h:mm a '
                                            ) +
                                                moment(endTime).format(
                                                    '- h:mm a'
                                                )}
                                    </div>
                                    <div data-name="procedures">
                                        {this.renderProcedureNames()}
                                    </div>
                                </div>
                            </StyledInfoFlex>
                            <StyledPaymentFlex flexDirection="column">
                                <Flex justifyContent="center">
                                    <div data-name="payment-amount">
                                        {renderPrice(paymentAmount)}
                                    </div>
                                </Flex>
                                <Flex justifyContent="center">
                                    <div data-name="description">
                                        <StyledTypography fontSize={2}>
                                            {description}
                                        </StyledTypography>
                                    </div>
                                </Flex>
                                <Flex justifyContent="center">
                                    <div data-name="date">
                                        <StyledTypography fontSize={1}>
                                            {date &&
                                                moment
                                                    .unix(date)
                                                    .format(
                                                        'MMMM Do, YYYY h:mm A'
                                                    )}
                                        </StyledTypography>
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
                        </StyledPaymentInfo>
                    </StyledContainer>
                </Card>
            </Box>
        );
    }
}

export default PaymentDetails;
