import React from 'react';
import _lowerCase from 'lodash/lowerCase';
import { Flex, Box, Text, CheckMarkAnimation } from '~/components';

// used for confirmation panel for things like medical history form, insurance form, dentist profile form, and dentist verification
const Confirmation = props => (
    <Flex width="100%" justifyContent="center">
        <Box my={[0, '', 120]}>
            <CheckMarkAnimation />
            <Text mt={35}>
                {props.ownMessage
                    ? props.ownMessage
                    : `Congrats! You have finished your ${_lowerCase(
                          props.formName
                      )} form.`}
            </Text>
        </Box>
    </Flex>
);

export default Confirmation;
