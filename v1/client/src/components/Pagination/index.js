import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as AntdPagination } from 'antd';
import styled from 'styled-components';

const StyledPagination = styled(AntdPagination)`
    && .ant-pagination-item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        min-height: 20px;
        min-width: 20px;
        border: none;
    }

    && .ant-pagination-item > a {
        margin: 0;
        color: ${props => props.theme.colors.text.black};
        font-size: ${props => props.theme.fontSizes[3]};
    }

    && .ant-pagination-item-active {
        background-color: ${props => props.theme.colors.button.green};
    }

    && .ant-pagination-item-active > a {
        color: white;
    }

    && .ant-pagination-item-link {
        border: none;
    }

    && .ant-pagination-item-link:after {
        font-size: 16px;
        height: 32px;
    }

    && .ant-pagination-prev,
    && .ant-pagination-next {
        min-width: 12px;
    }

    && .ant-pagination-prev:focus .ant-pagination-item-link,
    && .ant-pagination-next:focus .ant-pagination-item-link,
    && .ant-pagination-prev:hover .ant-pagination-item-link,
    && .ant-pagination-next:hover .ant-pagination-item-link {
        color: ${props => props.theme.colors.arrow.green};
    }

    && .ant-pagination-prev.ant-pagination-disabled .ant-pagination-item-link,
    && .ant-pagination-next.ant-pagination-disabled .ant-pagination-item-link {
        color: ${props => props.theme.colors.arrow.gray};
    }
`;

const Pagination = props => {
    const { onChange, total, defaultCurrent, current } = props;

    return (
        <StyledPagination
            current={current}
            defaultCurrent={defaultCurrent}
            total={total}
            onChange={onChange}
        />
    );
};

Pagination.defaultProps = {
    onChange: () => {},
    total: 100,
    current: 1,
    defaultCurrent: 1,
};

Pagination.propTypes = {
    onChange: PropTypes.func,
    total: PropTypes.number,
    current: PropTypes.number,
    defaultCurrent: PropTypes.number,
};

export default Pagination;
