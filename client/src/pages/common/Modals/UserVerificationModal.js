import React from 'react';

import PropTypes from 'prop-types';
import UserVerification from '../UserVerification';

import { Modal } from '../../../components';

const UserVerificationModal = ({
    closeModal,
    visible,
    onVerificationComplete,
    persona,
}) => (
    <Modal
        title="Verification"
        onCancel={closeModal}
        destroyOnClose={true}
        visible={visible}
        width={600}
    >
        <UserVerification
            persona={persona}
            onComplete={onVerificationComplete}
        />
    </Modal>
);

UserVerificationModal.defaultProps = {
    closeModal: () => {},
    visible: false,
};

UserVerificationModal.propTypes = {
    closeModal: PropTypes.func,
    visible: PropTypes.bool,
};

export default UserVerificationModal;
