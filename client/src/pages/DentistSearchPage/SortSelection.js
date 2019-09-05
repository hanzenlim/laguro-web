import React from 'react';
// import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

import { Flex, Box, Text } from '../../components';
import { sortByList } from '.';

const { Option } = AntdSelect;

const Select = styled(AntdSelect)`
    & {
        .ant-select-selection {
            height: 50px;
            border-radius: 26px;
        }

        .ant-select-selection__rendered {
            line-height: 48px;
            margin: 0 20px;
            font-size: ${({ theme }) => theme.fontSizes[1]};

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                font-size: ${props => props.theme.fontSizes[2]};
            }
        }
    }
`;

const SortSelection = ({ value, onChange }) => (
    <Flex alignItems="center">
        <Text mr={22} fontSize={[1, '', 2]} color="#757575">
            Sort by:
        </Text>
        <Box width={180} is="form">
            <Select value={value} onChange={onChange}>
                {sortByList.map(i => (
                    <Option value={i.value} key={i.value}>
                        {i.desc}
                    </Option>
                ))}
            </Select>
        </Box>
    </Flex>
);

SortSelection.propTypes = {};

export default SortSelection;
