import React from 'react';
import { AutoComplete as AntdAutocomplete } from 'antd';
import styled from 'styled-components';
import { width, height } from 'styled-system';
import PropTypes from 'prop-types';

import { Icon, Flex, Truncate, Box } from '../../../components';
import { LOCATION, DENTIST } from '../../../util/strings';

const StyledFlex = styled(Flex)`
    height: auto;
    align-items: center;
    justify-content: flex-start;
    position: relative;
`;

const StyledIcon = styled(Icon)`
    position: absolute;
    z-index: ${props => props.theme.zIndex.inputElement};
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
            padding-left: ${props => (props.withDentists ? '20px' : '45px')};
            border: 1px solid;
            border-color: ${props => props.theme.colors.divider.darkGray};
            background-color: ${props => props.theme.colors.background.white};
            border-radius: 2px;
            color: ${props => props.theme.colors.text.black50};
            font-size: ${props => props.theme.fontSizes[2]};
            font-weight: 700;
            transition: none;
        }

        && .ant-input-disabled {
            background-color: #f5f5f5;
        }

        && .ant-select-selection__rendered {
            ${height};
        }

        && .ant-select-selection__placeholder {
            ${height};
            padding-left: ${props => (props.withDentists ? '10px' : '35px')};
            color: ${props => props.theme.colors.text.gray};
            font-size: ${props => props.theme.fontSizes[2]};
            z-index: ${props => props.theme.zIndex.inputElement};
            font-weight: 700;
            font-family: Silka;
        }

        && .ant-select-search__field__mirror {
            display: none;
        }
    }
`;

const { Option, OptGroup } = AntdAutocomplete;

const StyledOption = styled(Flex)`
    && {
        background-color: ${props => props.theme.colors.background.white};
        cursor: pointer;
        padding: 10px;
        font-size: ${props => props.theme.fontSizes[2]};
    }

    ${`.ant-select-dropdown-menu-item-active`} & {
        background-color: ${props => props.theme.colors.background.blue};
        color: ${props => props.theme.colors.text.white};
        font-weight: bold;

        i {
            color: ${props => props.theme.colors.text.white};
        }
    }
`;

const LocationFilterView = ({
    queryString,
    handleChange,
    handleSuggestionSelect,
    dentistResults,
    locationResults,
    withDentists,
    placeholder,
    onBlur,
    onChange,
    disabled,
    // eslint-disable-next-line
    width,
    ...rest
}) => {
    const LocationOptions = locationResults.map(result => (
        <Option
            key={result.text}
            text={result.text}
            data={{ type: LOCATION, location: result.value }}
            style={{ padding: 0, backgroundColor: 'white' }}
        >
            <StyledOption alignItems="center">
                <Icon
                    type="environment-o"
                    color="icon.darkGray"
                    fontSize={2}
                    ml={6}
                    mr={10}
                />
                <Box width={width - 50}>
                    <Truncate lines={1} ellipsis trimWhitespace>
                        {result.text}
                    </Truncate>
                </Box>
            </StyledOption>
        </Option>
    ));

    const GroupedLocationOptions = (
        <OptGroup key="Search by Location">{LocationOptions}</OptGroup>
    );

    const DentistResultString = result => {
        if (result.location && result.specialty) {
            return `${result.name} - ${result.specialty} at ${result.location}`;
        } else if (result.location) {
            return `${result.name} - Dentist at ${result.location}`;
        } else if (result.specialty) {
            return `${result.name} - ${result.specialty}`;
        }
        return `${result.name}`;
    };

    const DentistOptions = (
        <OptGroup key="Go to Dentist Profile">
            {dentistResults.map((result, index) => (
                <Option
                    key={index}
                    text={DentistResultString(result)}
                    data={{ type: DENTIST, id: result.dentistId }}
                    style={{
                        padding: 0,
                        backgroundColor: 'white',
                    }}
                >
                    <StyledOption>
                        <Icon
                            type="user"
                            color="icon.darkGray"
                            fontSize={2}
                            ml={6}
                            mr={10}
                        />
                        <Box width={width - 50}>
                            <Truncate lines={1} ellipsis trimWhitespace>
                                {DentistResultString(result)}
                            </Truncate>
                        </Box>
                    </StyledOption>
                </Option>
            ))}
        </OptGroup>
    );

    return (
        <StyledFlex>
            {!withDentists && (
                <StyledIcon
                    width={20}
                    height={20}
                    ml={14}
                    type="locationPin"
                    color="icon.blue"
                    fontSize={3}
                />
            )}
            <StyledAutocomplete
                onSearch={handleChange}
                onSelect={handleSuggestionSelect}
                onBlur={onBlur}
                value={queryString}
                onChange={onChange}
                disabled={disabled}
                withDentists={withDentists}
                width={width}
                optionLabelProp="text"
                placeholder={
                    placeholder ||
                    'Start searching for dental offices or dentists near you'
                }
                defaultActiveFirstOption={false}
                {...rest}
            >
                {withDentists && DentistOptions}
                {withDentists ? GroupedLocationOptions : LocationOptions}
            </StyledAutocomplete>
        </StyledFlex>
    );
};

LocationFilterView.defaultProps = {
    queryString: '',
    locationResults: [],
    dentistResults: [],
    handleChange: () => {},
    handleSuggestionSelect: () => {},
};

LocationFilterView.propTypes = {
    queryString: PropTypes.string,
    locationResults: PropTypes.array,
    dentistResults: PropTypes.array,
    handleChange: PropTypes.func,
    handleSuggestionSelect: PropTypes.func,
};

export default LocationFilterView;
