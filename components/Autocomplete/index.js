import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';
import { Icon, Box, Text, Flex } from '~/components';

const StyledInput = styled(AntdInput)`
    && {
        height: 100%;
        width: 100%;
        position: relative;
        background-color: ${props => props.theme.colors.background.white};
        z-index: ${props => props.theme.zIndex.overlay};

        .ant-input {
            border: 1px solid ${props => props.theme.colors.divider.darkGray};
            color: ${props => props.theme.colors.text.black};
            font-style: italic;
            font-size: ${props => props.theme.fontSizes[3]};
            font-weight: 700;
            border-radius: ${props => (props.active ? '4px 4px 0 0' : '4px')};
            transition: none;
        }

        .ant-input::placeholder {
            color: ${props => props.theme.colors.text.gray};
            font-style: italic;
            font-size: ${props => props.theme.fontSizes[3]};
            font-weight: 700;
            font-family: ${props => props.theme.fontFamily};
        }

        .ant-input:not(:first-child) {
            padding-left: 45px;
        }

        .ant-input:focus,
        .ant-input:hover {
            border-color: ${props => props.theme.colors.divider.darkGray};
            box-shadow: none;
        }
    }
`;

const StyledSuggestion = styled.div`
    background-color: ${props => props.theme.colors.background.white};
    cursor: pointer;

    :hover {
        font-weight: bold;
        background-color: ${props => props.theme.colors.background.lightGray};
    }
`;

class Autocomplete extends PureComponent {
    onChange = e => {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    };

    onSelect = event => {
        const { key } = event.currentTarget.dataset;

        if (this.props.onSuggestionSelect) {
            this.props.onSuggestionSelect(this.props.suggestions[key]);
        }
    };

    render() {
        const { query, suggestions } = this.props;

        return (
            <Box
                position="relative"
                width="600px"
                height="80px"
                borderRadius="4px"
            >
                <StyledInput
                    active={suggestions.length > 0}
                    value={query}
                    onChange={this.onChange}
                    placeholder="Silicon Valley Inn, Belmont, California"
                    prefix={
                        <Icon type="locationPin" width="30px" height="30px" />
                    }
                />

                {suggestions.length > 0 && (
                    <Box
                        pb={20}
                        pt={80}
                        position="absolute"
                        left="0"
                        right="0"
                        top="0"
                        borderRadius="4px"
                        border="1px solid #c7c7c7"
                        boxShadow={
                            suggestions.length > 0
                                ? '0 4px 10px 0 rgba(0, 0, 0, 0.4)'
                                : 'none'
                        }
                    >
                        {suggestions.map((place, i) => (
                            <StyledSuggestion
                                key={i}
                                data-key={i}
                                onClick={this.onSelect}
                            >
                                <Flex py={20} px={10}>
                                    <Icon
                                        type="locationPin"
                                        width="20px"
                                        height="20px"
                                    />
                                    <Text fontWeight="inherit" ml={5}>
                                        {place.place_name}
                                    </Text>
                                </Flex>
                            </StyledSuggestion>
                        ))}
                    </Box>
                )}
            </Box>
        );
    }
}

Autocomplete.defaultProps = {
    onSuggestionSelect: null,
    onChange: null,
    query: '',
    suggestions: [],
};

Autocomplete.propTypes = {
    onSuggestionSelect: PropTypes.func,
    onChange: PropTypes.func,
    query: PropTypes.string,
    suggestions: PropTypes.array,
};

export default Autocomplete;
