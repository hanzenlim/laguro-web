import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

import { Text, Responsive } from '../../../components';
import BankAccounts from './BankAccounts';
import InfoVerification from './InfoVerification';
import SelectVerificationMethod from './SelectVerificationMethod';

const { withScreenSizes } = Responsive;

export const PaymentMethodContext = createContext();

const Modal = styled(AntdModal)`
    &.ant-modal {
        max-width: 400px;
        margin: 0 auto;
    }
`;

const PAYMENT_METHOD_STEPS = {
    INITIAL: 'initial',
    INFO_VERIFICATION: 'info verification',
    SELECT_VERIFICATION_METHOD: 'select verification method',
    INSTANT_VERIFICATION: 'instant verification',
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
        <PaymentMethodContext.Provider
            value={{
                currentStep,
                setCurrentStep,
                PAYMENT_METHOD_STEPS,
            }}
        >
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
                    <BankAccounts />
                )}

                {currentStep === PAYMENT_METHOD_STEPS.INFO_VERIFICATION && (
                    <InfoVerification />
                )}

                {currentStep ===
                    PAYMENT_METHOD_STEPS.SELECT_VERIFICATION_METHOD && (
                    <SelectVerificationMethod />
                )}

                {currentStep === PAYMENT_METHOD_STEPS.INSTANT_VERIFICATION && (
                    <div>Todo: Instant Verification Screen</div>
                )}
            </Modal>
        </PaymentMethodContext.Provider>
    );
};

PaymentMethodModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    toggleModalVisibility: PropTypes.func.isRequired,
    mobileOnly: PropTypes.bool.isRequired,
};

export default withScreenSizes(PaymentMethodModal);
