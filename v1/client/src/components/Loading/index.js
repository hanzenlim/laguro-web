import React from 'react';
import styled from 'styled-components';

const StyledLoadingComponent = styled.div`
    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        width: 100%;
    }

    .loading > div {
        width: 12px;
        height: 12px;
        background-color: ${props => props.theme.colors.loading.green};
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .loading > div:not(:last-child) {
        margin-right: 6px;
    }

    .loading .bounce1 {
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }

    .loading .bounce2 {
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
        0%,
        80%,
        100% {
            -webkit-transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1);
        }
    }

    @keyframes sk-bouncedelay {
        0%,
        80%,
        100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        40% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
`;

const Loading = () => (
    <StyledLoadingComponent>
        <div className="loading">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
        </div>
    </StyledLoadingComponent>
);

export default Loading;
