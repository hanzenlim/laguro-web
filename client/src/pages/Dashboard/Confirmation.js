import React from 'react';
import _lowerCase from 'lodash/lowerCase';
import { Flex, Box, Text, CheckMarkAnimation } from '@laguro/basic-components';

// used for confirmation panel for things like medical history form, insurance form, dentist profile form, and dentist verification
const Confirmation = props => (
    <Flex width="100%" justifyContent="center">
        <Box mt={[0, '', 120]} mb={[0, '', 120]}>
            <CheckMarkAnimation />
            <Text mt={35}>{`Congrats! You have finished your ${_lowerCase(
                props.formName
            )} form.`}</Text>
        </Box>
    </Flex>
);

export default Confirmation;
