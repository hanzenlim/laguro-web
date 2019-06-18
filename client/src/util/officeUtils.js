import React from 'react';
import _ from 'lodash';
import { formatAddress } from './styleUtil';
import { Flex, Icon, Text } from '../components';

export const getOfficeAddress = office =>
    formatAddress(
        _(office).get('location.name', ''),
        _(office).get('location.addressDetails', '')
    );

export const renderAddress = address => (
    <Flex flexDirection="row" justifyContent="center">
        <Icon
            type="locationPin"
            width="20px"
            height="20px"
            color="icon.lightGray"
            mx={5}
        />
        <Text fontSize={[1, '', 2]} color="text.lightGray">
            {address}
        </Text>
    </Flex>
);
