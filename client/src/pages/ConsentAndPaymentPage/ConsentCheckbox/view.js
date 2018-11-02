import React from 'react';
import PropTypes from 'prop-types';

import { Box, Checkbox, Text } from '../../../components';

const ConsentCheckboxView = props => {
    const { dentistName, onClickCheckbox, hasConsented } = props;

    return (
        <Box ml={[12, '', 36]} my={[24, '', 16]}>
            <Checkbox onChange={onClickCheckbox} checked={hasConsented}>
                <Text
                    is="span"
                    color="text.black"
                    fontSize={[1, '', 2]}
                    pl={10}
                    letterSpacing={['-0.3px', '', '0px']}
                >
                    I agree upon the above procedures to be performed by{' '}
                    <Text is="span" fontWeight="bold">
                        {dentistName}
                    </Text>
                    .
                </Text>
            </Checkbox>
        </Box>
    );
};

ConsentCheckboxView.propTypes = {
    dentistName: PropTypes.string.isRequired,
    onClickCheckbox: PropTypes.func,
    hasConsented: PropTypes.bool.isRequired,
};

export default ConsentCheckboxView;
