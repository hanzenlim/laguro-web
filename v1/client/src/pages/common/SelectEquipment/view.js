import React from 'react';
import PropTypes from 'prop-types';

import { Text, Flex, Button, Box } from '../../../components';

const SelectEquipmentView = props => {
    const { selected, list, onSelect } = props;

    return (
        <Box>
            <Text
                mb={26}
                lineHeight="30px"
                fontWeight="bold"
                color="text.black"
                fontSize={3}
            >
                Equipment needed
            </Text>
            <Flex flexWrap="wrap">
                {list.map((item, i) => (
                    <Button
                        key={i}
                        type="ghost"
                        onClick={onSelect}
                        data-key={i}
                        mr={10}
                        mb={6}
                        height="auto"
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            bg={
                                selected.includes(item)
                                    ? 'background.green'
                                    : 'background.whiteSmoke'
                            }
                            borderRadius="29px"
                            color={
                                selected.includes(item)
                                    ? 'text.white'
                                    : 'text.black'
                            }
                            px={18}
                            py={10}
                        >
                            <Text
                                color="inherit"
                                fontSize={1}
                                fontWeight="bold"
                            >
                                {item.name}
                            </Text>
                            <Text color="inherit" fontSize={1}>
                                {item.price}
                            </Text>
                        </Flex>
                    </Button>
                ))}
            </Flex>
        </Box>
    );
};

SelectEquipmentView.propTypes = {
    selected: PropTypes.string,
    list: PropTypes.array,
    onSelect: PropTypes.func,
};

SelectEquipmentView.defaultProps = {
    selected: null,
    list: [],
    onSelect: () => {},
};

export default SelectEquipmentView;
