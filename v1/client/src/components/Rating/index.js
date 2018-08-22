import React from 'react';
import { Rate as AntdRate } from 'antd';
import styled from 'styled-components';

const StyledRating = styled(AntdRate)`
    &&.ant-rate {
        display: block;
        font-size: 0;
    }

    && .ant-rate-star-full,
    && .ant-rate-star-half > .ant-rate-star-first {
        color: ${props => props.theme.colors.rating.yellow};
    }

    && .ant-rate-star-first,
    && .ant-rate-star-second {
        color: inherit;
    }

    && .ant-rate-star-zero,
    && .ant-rate-star-half > .ant-rate-star-second {
        color: ${props => props.theme.colors.rating.gray};
    }

    && .ant-rate-star {
        margin-right: 3px;
    }

    && .ant-rate-star:last-child {
        margin-right: 0;
    }

    && .anticon-star:before {
        font-size: ${props => props.size || '12px'};
    }
`;

const Rating = props => {
    const { ...rest } = props;

    return <StyledRating {...rest} allowHalf defaultValue={0} />;
};

export default Rating;
