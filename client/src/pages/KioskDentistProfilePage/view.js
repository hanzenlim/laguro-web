import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@laguro/basic-components';
import { DentistProfile, Progress } from '@laguro/the-bright-side-components';

const propTypes = {
    onCreate: PropTypes.func,
};

const defaultProps = {
    onCreate: () => {},
};

const progressSteps = ['1 DENTIST PROFILE', '2 Verification'];

const KioskDentistProfileView = ({ onCreate }) => (
    <Box mt={48}>
        <Progress step={1} steps={progressSteps} percent={50} />
        <DentistProfile onSubmit={onCreate} />
    </Box>
);

KioskDentistProfileView.propTypes = propTypes;
KioskDentistProfileView.defaultProps = defaultProps;

export default KioskDentistProfileView;
