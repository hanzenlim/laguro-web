import styled from 'styled-components';

export const StyledIcon = styled.span`
    width: 18px;
    height: 18px;
    display: inline-block;
    border-radius: 50%;
    background-color: #ffffff;
    border: 5px solid ${props => props.theme.colors.mapPin.red};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transform: ${props => `translate(${-18 / 2}px, ${-18}px)`};
`;
