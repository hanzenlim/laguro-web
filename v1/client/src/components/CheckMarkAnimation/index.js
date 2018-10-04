import React from 'react';
import styled from 'styled-components';

const StyledCheckWrap = styled.div`
    .check-wrap {
        margin: 10px auto;
        width: 134px;
        height: 129px;
        border-radius: 50%;
        border: 2px solid #3481F8;
        position: relative;
        overflow: hidden;
        animation: wrap 0.3s ease-in-out forwards;
        animation-delay: 0.3s;
        transform: scale(0);
    }
    .check-wrap::before,
    .check-wrap::after {
        content: '';
        position: absolute;
        background-color: white;
        width: 0;
        height: 5px;
        transform-origin: left;
        animation-duration: 0.3s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
    }
    .check-wrap::before {
        top: 60px;
        left: 35px;
        transform: rotate(45deg);
        animation-name: left;
        animation-delay: 0.8s;
    }
    .check-wrap::after {
        top: 80px;
        left: 54px;
        transform: rotate(-45deg);
        animation-name: right;
        animation-delay: 1.1s;
    }

    @keyframes wrap {
        0% {
            background-color: transparent;
            transform: scale(0);
        }
        100% {
            background-color: #3481F8
            transform: scale(1);
        }
    }
    @keyframes left {
        0% {
            width: 0;
        }
        100% {
            width: 30px;
        }
    }
    @keyframes right {
        0% {
            width: 0;
        }
        100% {
            width: 60px;
        }
    }
`;

const CheckMarkAnimation = () => (
    <StyledCheckWrap>
        <div className="check-wrap" />
    </StyledCheckWrap>
);

export default CheckMarkAnimation;
