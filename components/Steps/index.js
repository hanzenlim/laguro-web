import React from 'react';
import styled from 'styled-components';
import { Steps as AntdSteps } from 'antd';
import PropTypes from 'prop-types';
import { space } from 'styled-system';

const Step = AntdSteps.Step;

const StyledSteps = styled(AntdSteps)`
    && {
        ${space};
    }
    &&& .ant-steps-item {
        margin-right: 10px;
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            height: 120px;
        }
    }
    &&& .ant-steps-item-tail {
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            height: 120px;
        }
    }
    && .ant-steps-item-finish .ant-steps-icon {
        color: ${props => props.theme.colors.text.white};
    }
    && .ant-steps-item-finish .ant-steps-item-tail:after {
        background-color: ${props => props.theme.colors.background.blue};
    }
    .ant-steps-item-finish .ant-steps-item-icon,
    .ant-steps-item-process .ant-steps-item-icon {
        background: ${props => props.theme.colors.icon.blue};
        border: 0px;
    }
    .ant-steps-item-wait .ant-steps-item-icon {
        background: ${props => props.theme.colors.background.white};
    }
`;

const StyledStep = styled(Step)``;

const Steps = props => {
    const { size } = props;

    return (
        <StyledSteps {...props}>
            {Array(size)
                .fill()
                .map((_v, i) => (
                    <StyledStep key={i} />
                ))}
        </StyledSteps>
    );
};

Steps.propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    current: PropTypes.number.isRequired,
};

export default Steps;
