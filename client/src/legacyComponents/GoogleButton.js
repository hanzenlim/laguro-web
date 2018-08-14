import React from 'react';
import styled from 'styled-components';
import googleSVG from './icons/google.svg';
import { Typography } from './common';

const StyledContainer = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 51px;
    width: 100%;
    border: 1px solid #979797;
    border-radius: 2px;
`;

const GoogleButton = props => {
    return (
        <StyledContainer {...props}>
            <img src={googleSVG} alt="google login button" width="16" />
            <Typography pl={2} color="black">
                Continue with Google
            </Typography>
        </StyledContainer>
    );
};

export default GoogleButton;
