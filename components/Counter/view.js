import React from 'react';
import ProptTypes from 'prop-types';
import { Button, Flex, Text, Icon } from '~/components';

const Counter = props => {
    const { count, onAddClick, onMinusClick } = props;

    return (
        <Flex justifyContent="center" alignItems="center">
            <Button
                type="ghost"
                opacity={count === 0 ? '0.5' : '1'}
                onClick={onMinusClick}
                mr="22px"
            >
                <Icon type="minus" width="30px" height="30px" />
            </Button>
            <Text>{count}</Text>
            <Button type="ghost" onClick={onAddClick} ml="22px">
                <Icon type="coloredPlus" width="30px" height="30px" />
            </Button>
        </Flex>
    );
};

Counter.defaultProps = {
    count: 0,
    onAddClick: () => {},
    onMinusClick: () => {},
};

Counter.propTypes = {
    count: ProptTypes.number.isRequired,
    onAddClick: ProptTypes.func.isRequired,
    onMinusClick: ProptTypes.func.isRequired,
};

export default Counter;
