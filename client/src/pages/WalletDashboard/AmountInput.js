import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import styled from 'styled-components';

import { Text } from '../../components';

const StyledInput = styled(InputNumber)`
    &.ant-input-number-lg {
        height: 60px;
        width: 100%;
        font-size: 40px;

        input {
            text-align: center;
        }
    }
`;

const AmountInput = ({ amount, onChange, mode }) => {
    const isWithdrawCreditMode = mode === 'withdraw credit';
    return (
        <Fragment>
            <Text mb={4}>Amount</Text>
            <StyledInput
                formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                min={isWithdrawCreditMode ? 2 : 1}
                {...isWithdrawCreditMode && { max: 4500 }}
                value={amount}
                onChange={onChange}
                size="large"
            />
        </Fragment>
    );
};

AmountInput.propTypes = {
    mode: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AmountInput;
