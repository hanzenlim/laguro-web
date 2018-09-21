import React from 'react';
import { AutoComplete as AntdAutocomplete } from 'antd';
import styled from 'styled-components';
import { width, height } from 'styled-system';
import PropTypes from 'prop-types';

import { Icon, Flex } from '../../../components';
import { LOCATION, DENTIST } from '../../../util/strings';

const StyledFlex = styled(Flex)`
    height: auto;
    align-items: center;
    justify-content: flex-start;
    position: relative;
`;

const StyledIcon = styled(Icon)`
    position: absolute;
    top: 20px;
    left: 15px;
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
            padding-left: 45px;
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
            padding-left: 35px;
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

const LocationFilterView = ({
    queryString,
    handleChange,
    handleSuggestionSelect,
    dentistResults,
    locationResults,
    withDentists,
    onBlur,
    onChange,
    ...rest
}) => {
    const LocationOptions = locationResults.map(result => (
        <Option
            key={result.text}
            data={{ type: LOCATION, location: result.value }}
            style={{ padding: 0, backgroundColor: 'white' }}
        >
            <StyledOption alignItems="center">
                <Icon
                    type="environment-o"
                    color="icon.darkGray"
                    fontSize={3}
                    ml={6}
                    mr={10}
                />
                {result.text}
            </StyledOption>
        </Option>
    ));

    const GroupedLocationOptions = (
        <OptGroup key="Search by Location">{LocationOptions}</OptGroup>
    );

    const DentistOptions = (
        <OptGroup key="Go to Dentist Profile">
            {dentistResults.map((result, index) => (
                <Option
                    key={index}
                    data={{ type: DENTIST, id: result.dentistId }}
                    style={{ padding: 0, backgroundColor: 'white' }}
                >
                    <StyledOption>
                        <Icon
                            type="user"
                            color="icon.darkGray"
                            fontSize={3}
                            ml={6}
                            mr={10}
                        />
                        {`${result.name} - ${result.specialty} at ${
                            result.location
                        }`}
                    </StyledOption>
                </Option>
            ))}
        </OptGroup>
    );

    return (
        <StyledFlex>
            <StyledIcon type="environment-o" color="icon.green" fontSize={4} />
            <StyledAutocomplete
                onSearch={handleChange}
                onSelect={handleSuggestionSelect}
                onBlur={onBlur}
                value={queryString}
                onChange={onChange}
                placeholder="San Francisco, California"
                backfill={true}
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
