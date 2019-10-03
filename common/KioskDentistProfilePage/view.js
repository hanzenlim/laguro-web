import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '~/components';
import { getProgressBarProps } from '~/components/utils';
import { getSearchParamValueByKey } from '~/util/history';
import { Progress } from '~/common/the-bright-side-components/components/Onboarding/Patient/Progress';
import { DentistProfile } from '~/common/the-bright-side-components/components/Onboarding/Dentist/DentistProfile';

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
