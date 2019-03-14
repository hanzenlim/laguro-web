import React, { Component } from 'react';
import styled from 'styled-components';
import Payment from '../common/Payment/index';
import { Box } from '../../components/index';

const StyledBox = styled(Box)`
    && {
        // removing empty space
        span.ant-radio + * {
            padding-left: 0;
        }
        // removing radio buttons
        .ant-radio {
            display: none;
        }
        // removing Card Info
        .payment-card-form-title {
            display: none;
        }
        // styling add a new card button
        .existing-card-form-add-a-new-card-text {
            width: 33%;
            background-color: ${props => props.theme.colors.background.blue};
            padding: 12px 20px;
            color: white;
            border-radius: 5px;
        }
        // adding space between existing cards and add a new card button
        .existing-card-form-add-a-new-card-radio {
            margin-top: 20px;
        }
        .new-card-form-submit-button {
            height: 47px;
            span {
                font-size: 16px;
            }
        }
    }
`;

class PaymentMethods extends Component {
    render() {
        return (
            <StyledBox width={400}>
                <Payment
                    isInPatientDashboard={true}
                    btnText="Submit new card"
                />
            </StyledBox>
        );
    }
}

export default PaymentMethods;
