import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@laguro/basic-components';
import { DentistProfile } from '@laguro/the-bright-side-components';

const propTypes = {
    onCreate: PropTypes.func,
};

const defaultProps = {
    onCreate: () => {},
};

const KioskDentistProfileView = ({ onCreate }) => (
    <Box mt={140}>
        <DentistProfile onSubmit={onCreate} />
    </Box>
);

KioskDentistProfileView.propTypes = propTypes;
KioskDentistProfileView.defaultProps = defaultProps;

export default KioskDentistProfileView;
