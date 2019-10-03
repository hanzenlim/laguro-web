import React, { PureComponent } from 'react';
import { width, height } from 'styled-system';
import styled from 'styled-components';

import { Flex, Text, Button } from '~/components';

const StyledDiv = styled(Flex)`
    ${width}
    ${height}
    margin-right: 14px;
    margin-bottom: 10px;
    text-align: center;
    background-color: rgba(184, 233, 134, 0.1);
    border-radius: 4px;
    border: 1px solid #d9d9d9;
`;

class DentistPosPinCodeView extends PureComponent {
    render() {
        const { pinCode = '', onRenewPincode } = this.props;
        const pinArr = [];

        for (let i = 0; i < pinCode.length; i++) {
            pinArr.push(pinCode.charAt(i));
        }

        return (
            <Flex flexDirection="column" alignItems="center">
                <Flex justifyContent="center">
                    {pinArr.map(pin => (
                        <StyledDiv
                            justifyContent="center"
                            alignItems="center"
                            width={['42px', '60px', '60px']}
                            height={['40px', '54px', '54px']}
                        >
                            {pin}
                        </StyledDiv>
                    ))}
                </Flex>
                <Text>Use this pin code to validate your POS transaction</Text>
                <Button mt="20px" onClick={onRenewPincode}>
                    Renew pin code
                </Button>
            </Flex>
        );
    }
}

export default DentistPosPinCodeView;
