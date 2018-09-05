import React from 'react';
import { storiesOf } from '@storybook/react';
import PaymentConfirmation from '../src/pages/common/PaymentConfirmation';
import styled from 'styled-components';

const StyledDiv = styled.div`
    width: 513px;
`

storiesOf('Payment Confimation', module)
    .add('default', () => (<StyledDiv><PaymentConfirmation /></StyledDiv>))
