import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import fetch from 'unfetch';
import { AutoComplete as AntdAutocomplete } from 'antd';
import styled from 'styled-components';
import { width } from 'styled-system';
import { Icon, Flex } from '../../../components';

const mapBoxApiKey =
    'pk.eyJ1IjoibGFndXJvLWFkbWluIiwiYSI6ImNqaWc3enk2bDE0dDAzd3Blb2dyOXRvc2oifQ.Ketzla96PFhKDE8-VwAI5g';

const StyledFlex = styled(Flex)`
    height: 60px;
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
        height: 60px;
        ${width};

        && .ant-select-selection {
            background-color: ${props =>
                props.theme.colors.background.transparent};
        }

        && .ant-input {
            height: 60px;
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
            height: 60px;
        }

        && .ant-select-selection__placeholder {
            height: 60px;
            padding-left: 35px;
            color: ${props => props.theme.colors.text.gray};
            font-size: ${props => props.theme.fontSizes[3]};
            z-index: ${props => props.theme.zIndex.inputElement};
            font-weight: 700;
            font-family: Ubuntu;
        }
    }
`;

const { Option } = AntdAutocomplete;

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

class LocationFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            queryString: '',
            queryResults: [],
        };
    }

    handleChange = async value => {
        await this.setState({ queryString: value });

        const header = { 'Content-Type': 'application/json' };
        const path = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            this.state.queryString
        }.json?access_token=${mapBoxApiKey}&country=us`;

        if (this.state.queryString.length > 2) {
            return fetch(path, {
                headers: header,
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(json => {
                    this.setState({
                        error: false,
                        queryResults: json.features.map(place => ({
                            value: {
                                name: place.place_name,
                                lat: place.center[1],
                                long: place.center[0],
                            },
                            text: place.place_name,
                        })),
                    });

                    return null;
                })
                .catch(err => {
                    this.setState({
                        error: true,
                        errorMsg:
                            'There was a problem retrieving data from mapbox',
                        queryResults: [],
                    });

                    // eslint-disable-next-line
                    console.warn(err);
                });
        }

        this.setState({
            error: false,
            queryResults: [],
        });

        return null;
    };

    handleSuggestionSelect = async (value, option) => {
        await this.setState({ queryString: value, queryResults: [] });
        this.props.onLocationChange(option.props.data);
    };

    render() {
        const { queryString, queryResults } = this.state;
        const { ...rest } = this.props;
        const children = queryResults.map(result => (
            <Option
                key={result.text}
                data={result.value}
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

        return (
            <StyledFlex>
                <StyledIcon
                    type="environment-o"
                    color="icon.green"
                    fontSize={4}
                />
                <StyledAutocomplete
                    onSearch={this.handleChange}
                    onSelect={this.handleSuggestionSelect}
                    value={queryString}
                    placeholder="San Francisco, California"
                    backfill={true}
                    {...rest}
                >
                    {children}
                </StyledAutocomplete>
            </StyledFlex>
        );
    }
}

LocationFilter.defaultProps = {
    onLocationChange: null,
};

LocationFilter.propTypes = {
    onLocationChange: PropTypes.func,
};

export default LocationFilter;
