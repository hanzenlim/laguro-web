import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import { Text, Responsive } from '../../../components';
import BankAccounts from './BankAccounts';
import InfoVerification from './InfoVerification';
import SelectVerificationMethod from './SelectVerificationMethod';
import InstantVerification from './InstantVerification';

const { withScreenSizes } = Responsive;

export const PaymentMethodContext = createContext();

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

    const onClose = () => {
        toggleModalVisibility();
        setCurrentStep(PAYMENT_METHOD_STEPS.INITIAL);
    };

    return (
        <PaymentMethodContext.Provider
            value={{
                currentStep,
                setCurrentStep,
                PAYMENT_METHOD_STEPS,
                onClose,
            }}
        >
            <Modal
                title={title}
                visible={visible}
                footer={null}
                destroyOnClose
                width="100%"
                style={
                    mobileOnly
                        ? {
                              top: 0,
                              height: '100vh',
                              maxWidth: 400,
                              margin: '0 auto',
                          }
                        : { maxWidth: 400, margin: '0 auto' }
                }
                bodyStyle={
                    mobileOnly
                        ? { height: 'calc(100vh - 55px)', overflow: 'auto' }
                        : {}
                }
                onCancel={onClose}
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
                    <InstantVerification />
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
