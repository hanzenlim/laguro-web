import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../../../components';
import Register from '../../common/Register';

const ReservationModalView = ({
    closeModal,
    openLoginModal,
    visible,
    signup,
    isSubmitting,
}) => (
    <Modal onCancel={closeModal} destroyOnClose={true} visible={visible}>
        <Register
            openLoginModal={openLoginModal}
            signup={signup}
            isSubmitting={isSubmitting}
        />
    </Modal>
);

ReservationModalView.defaultProps = {
    closeModal: () => {},
    signup: () => {},
    visible: false,
    isSubmitting: false,
};

ReservationModalView.propTypes = {
    closeModal: PropTypes.func,
    signup: PropTypes.func,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default ReservationModalView;
