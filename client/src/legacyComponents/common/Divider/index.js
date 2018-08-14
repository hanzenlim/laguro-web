import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../common';

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
`;

const StyledDivider = styled.hr`
    height: 1px;
    margin: 0;
    border: none;
    flex-shrink: 0;
    background-color: #c8c7c7;

    ${props => props.flex && 'flex: 1;'};
`;

const Divider = props => {
    const { text } = props;

    if (text) {
        return (
            <StyledContainer>
                <StyledDivider flex />
                <Typography px={2} fontSize={3}>
                    {text}
                </Typography>
                <StyledDivider flex />
            </StyledContainer>
        );
    }

    return <StyledDivider />;
};

export default Divider;
