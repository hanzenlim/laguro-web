import React from 'react';
import styled from 'styled-components';

import { Container } from '../../../components';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media screen and (min-width: 1200px) {
        flex-direction: row;
    }
`;

const PaymentPageView = props => {
    const { data } = props;

    return (
        <Container>
            <StyledContainer>
                <div>{JSON.stringify(data)}</div>
            </StyledContainer>
        </Container>
    );
};

export default PaymentPageView;
