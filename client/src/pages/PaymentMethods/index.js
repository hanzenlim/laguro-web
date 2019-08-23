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
            <StyledBox width="100%">
                <Payment
                    isInPatientDashboard={true}
                    btnText="Submit new card"
                />
            </StyledBox>
        );
    }
}

export default PaymentMethods;
