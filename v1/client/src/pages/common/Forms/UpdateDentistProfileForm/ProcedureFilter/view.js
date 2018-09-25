import React from 'react';
import { AutoComplete as AntdAutocomplete } from 'antd';
import styled from 'styled-components';
import { width, height } from 'styled-system';
import PropTypes from 'prop-types';

import { Flex } from '../../../../../components';

const StyledFlex = styled(Flex)`
    height: 60px;
    align-items: center;
    justify-content: flex-start;
    position: relative;
`;

const StyledAutocomplete = styled(AntdAutocomplete)`
    && {
        position: relative;
        ${height} ${width};

        && .ant-select-selection {
            background-color: ${props =>
                props.theme.colors.background.transparent};
        }

        && .ant-input {
            ${height};
            border: 1px solid;
            border-color: ${props => props.theme.colors.divider.darkGray};
            background-color: ${props => props.theme.colors.background.white};
            border-radius: 2px;
            color: ${props => props.theme.colors.text.black50};
            font-size: ${props => props.theme.fontSizes[3]};
            font-weight: 700;
            transition: none;
        }

        && .ant-select-selection__rendered {
            ${height};
        }

        && .ant-select-selection__placeholder {
            ${height};
            color: ${props => props.theme.colors.text.gray};
            font-size: ${props => props.theme.fontSizes[3]};
            z-index: ${props => props.theme.zIndex.inputElement};
            font-weight: 700;
            font-family: Ubuntu;
        }
    }
`;

const { Option, OptGroup } = AntdAutocomplete;

const StyledOption = styled(Flex)`
    && {
        background-color: ${props => props.theme.colors.background.white};
        cursor: pointer;
        padding: 10px;
        font-size: ${props => props.theme.fontSizes[3]};
    }

    ${`.ant-select-dropdown-menu-item-active`} & {
        background-color: ${props => props.theme.colors.background.green};
        color: ${props => props.theme.colors.text.white};
        font-weight: bold;

        i {
            color: ${props => props.theme.colors.text.white};
        }
    }
`;

const ProcedureFilterView = ({
    queryString,
    handleChange,
    handleSuggestionSelect,
    results,
    ...rest
}) => {
    const groupedResults = results.reduce((acc, obj) => {
        const key = obj.group;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(obj);
        return acc;
    }, {});

    const ResultGroups = Object.keys(groupedResults).map(group => (
        <OptGroup key={group}>
            {groupedResults[group].map(result => (
                <Option
                    key={result.code}
                    data={{
                        code: result.code,
                        name: result.name,
                        group: result.group,
                        duration: result.duration,
                    }}
                    style={{ padding: 0, backgroundColor: 'white' }}
                >
                    <StyledOption alignItems="center">
                        {result.code} - {result.name}
                    </StyledOption>
                </Option>
            ))}
        </OptGroup>
    ));

    return (
        <StyledFlex>
            <StyledAutocomplete
                onSearch={handleChange}
                onSelect={handleSuggestionSelect}
                value={queryString}
                placeholder="Search and add your group of procedures..."
                backfill={true}
                {...rest}
            >
                {ResultGroups}
            </StyledAutocomplete>
        </StyledFlex>
    );
};

ProcedureFilterView.defaultProps = {
    queryString: '',
    results: [],
    handleChange: () => {},
    handleSuggestionSelect: () => {},
};

ProcedureFilterView.propTypes = {
    queryString: PropTypes.string,
    results: PropTypes.array,
    handleChange: PropTypes.func,
    handleSuggestionSelect: PropTypes.func,
};

export default ProcedureFilterView;
