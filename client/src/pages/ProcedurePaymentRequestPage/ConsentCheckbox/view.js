import React from 'react';
import PropTypes from 'prop-types';

import { Box, Checkbox, Text } from '../../../components';

const ConsentCheckboxView = props => {
    const { onClickCheckbox, hasConsented } = props;

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
                    I agree upon to pay the above procedures.
                </Text>
            </Checkbox>
        </Box>
    );
};

ConsentCheckboxView.propTypes = {
    onClickCheckbox: PropTypes.func,
    hasConsented: PropTypes.bool.isRequired,
};

export default ConsentCheckboxView;
