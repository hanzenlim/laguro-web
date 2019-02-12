import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DentistProfile, Progress } from '@laguro/the-bright-side-components';

const propTypes = {
    onCreate: PropTypes.func,
};

const defaultProps = {
    onCreate: () => {},
};

const progressSteps = ['1 DENTIST PROFILE', '2 Verification'];

const KioskDentistProfileView = ({ onCreate }) => (
    <Fragment>
        <Progress step={2} steps={progressSteps} percent={25} />
        <DentistProfile onSubmit={onCreate} />
    </Fragment>
);

KioskDentistProfileView.propTypes = propTypes;
KioskDentistProfileView.defaultProps = defaultProps;

export default KioskDentistProfileView;
