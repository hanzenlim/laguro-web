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
        border: none;
        box-shadow: none;

        .ant-input-number-handler-wrap {
            border: none;
        }

        .ant-input-number-handler {
            border: 1px solid #f2f2f2;
        }

        .ant-input-number-handler-up {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }

        .ant-input-number-handler-down {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }

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
