import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@laguro/basic-components';
import { DentistProfile, Progress } from '@laguro/the-bright-side-components';
import { getProgressBarProps } from '../../components/utils';

const propTypes = {
    onCreate: PropTypes.func,
};

const defaultProps = {
    onCreate: () => {},
};

const progressSteps = ['Dentist Profile', 'Verification'];

const currentStep = progressSteps[0];

const KioskDentistProfileView = ({ onCreate }) => (
    <Box>
        <Progress
            {...getProgressBarProps({
                currentStep,
                progressSteps,
            })}
        />
        <DentistProfile onSubmit={onCreate} />
    </Box>
);

KioskDentistProfileView.propTypes = propTypes;
KioskDentistProfileView.defaultProps = defaultProps;

export default KioskDentistProfileView;
