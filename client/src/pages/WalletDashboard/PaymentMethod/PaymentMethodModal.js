import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

import { Text, Responsive } from '../../../components';
import BankAccounts from './BankAccounts';
import InfoVerification from './InfoVerification';

const { withScreenSizes } = Responsive;

const Modal = styled(AntdModal)`
    &.ant-modal {
        max-width: 400px;
        margin: 0 auto;
    }
`;

export const PAYMENT_METHOD_STEPS = {
    INITIAL: 'initial',
    INFO_VERIFICATION: 'info verification',
};

const PaymentMethodModal = ({ visible, toggleModalVisibility, mobileOnly }) => {
    const [currentStep, setCurrentStep] = useState(
        PAYMENT_METHOD_STEPS.INITIAL
    );

    const title = (
        <Text textAlign="center" fontSize={1} color="text.lightGray">
            {currentStep === PAYMENT_METHOD_STEPS.INITIAL
                ? 'Payment Method'
                : 'Link a new bank account'}
        </Text>
    );

    const onCancel = () => {
        toggleModalVisibility();
        setCurrentStep(PAYMENT_METHOD_STEPS.INITIAL);
    };

    return (
        <Modal
            title={title}
            visible={visible}
            footer={null}
            destroyOnClose
            width="100%"
            style={mobileOnly ? { top: 0, height: '100vh' } : {}}
            bodyStyle={
                mobileOnly
                    ? { height: 'calc(100vh - 55px)', overflow: 'auto' }
                    : {}
            }
            onCancel={onCancel}
        >
            {currentStep === PAYMENT_METHOD_STEPS.INITIAL && (
                <BankAccounts setCurrentStep={setCurrentStep} />
            )}

            {currentStep === PAYMENT_METHOD_STEPS.INFO_VERIFICATION && (
                <InfoVerification />
            )}
        </Modal>
    );
};

PaymentMethodModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleModalVisibility: PropTypes.func.isRequired,
    mobileOnly: PropTypes.bool.isRequired,
};

export default withScreenSizes(PaymentMethodModal);
