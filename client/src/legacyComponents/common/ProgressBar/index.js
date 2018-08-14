import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    position: relative;
    width: 100vw;
    height: 6px;
    background-color: #d8d8d8;
`;

const StyledFiller = styled.div`
    position: absolute;
    height: 100%;
    background-color: #f46b13;
    width: ${props => props.percent || 0}%;
    transition: width 0.2s ease-in;
`;

const ProgressBar = props => {
    const { percent } = props;

    return (
        <StyledContainer>
            <StyledFiller percent={percent} />
        </StyledContainer>
    );
};

export default ProgressBar;
