import React from 'react';

import { Modal } from '~/components';
import ForgotPassword from '~/common/ForgotPassword';

const ForgotPassModal = ({
    visible,
    openLoginModal,
    closeModal,
    isSubmitting,
    sendPassResetLink,
}) => (
    <Modal
        onCancel={closeModal}
        destroyOnClose={true}
        visible={visible}
        width={650}
    >
        <ForgotPassword
            sendPassResetLink={sendPassResetLink}
            openLoginModal={openLoginModal}
            isSubmitting={isSubmitting}
        />
    </Modal>
);

export default ForgotPassModal;
