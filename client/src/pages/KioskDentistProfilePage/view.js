import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@laguro/basic-components';
import { DentistProfile, Progress } from '@laguro/the-bright-side-components';
import { getProgressBarProps } from '../../components/utils';
import { getSearchParamValueByKey } from '../../history';

const propTypes = {
    onCreate: PropTypes.func,
};

const defaultProps = {
    onCreate: () => {},
};

const progressSteps = ['Dentist Profile', 'Verification'];

const currentStep = progressSteps[0];

const KioskDentistProfileView = ({ onCreate, steps, withoutProgressBar }) => (
    <Box>
        {!withoutProgressBar &&
            getSearchParamValueByKey('referer') !== 'ProfilePage' && (
                <Progress
                    {...getProgressBarProps({
                        currentStep,
                        progressSteps,
                    })}
                />
            )}
        <DentistProfile onSubmit={onCreate} steps={steps} />
    </Box>
);

KioskDentistProfileView.propTypes = propTypes;
KioskDentistProfileView.defaultProps = defaultProps;

export default KioskDentistProfileView;
