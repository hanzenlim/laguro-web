import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { renderPrice } from '../../../util/paymentUtil';

import { Text, Button, Responsive, Box, Icon } from '../../../components';
import InitialScreen from './InitialScreen';
import ReviewWithdrawal from './ReviewWithdrawal';
import SuccessScreen from '../SuccessScreen';

const { withScreenSizes } = Responsive;

export const WithdrawCreditContext = createContext();

const WITHDRAW_CREDIT_STEPS = {
    INITIAL: 'initial',
    REVIEW: 'review',
    SUCCESS: 'success',
};

const CLEARING_VALUES = {
    STANDARD: 'standard',
    INSTANT: 'nextAvailable',
};

const WithdrawCreditModal = ({ mobileOnly, balance }) => {
    const initialState = {
        isModalOpen: false,
        selectedFundingSource: null,
        selectedPaymentPlatform: null,
        amount: 2,
        clearing: CLEARING_VALUES.STANDARD,
        currentStep: WITHDRAW_CREDIT_STEPS.INITIAL,
    };

    const [isModalOpen, setModalOpen] = useState(initialState.isModalOpen);
    const [currentStep, setCurrentStep] = useState(initialState.currentStep);
    const [selectedFundingSource, setFundingSource] = useState(
        initialState.selectedFundingSource
    );
    const [selectedPaymentPlatform, setPaymentPlatform] = useState(
        initialState.selectedPaymentPlatform
    );
    const [amount, setAmount] = useState(initialState.amount);
    const [clearing, setClearing] = useState(initialState.clearing);

    const resetState = () => {
        setModalOpen(initialState.isModalOpen);
        setCurrentStep(initialState.currentStep);
        setFundingSource(initialState.selectedFundingSource);
        setPaymentPlatform(initialState.selectedPaymentPlatform);
        setAmount(initialState.amount);
        setClearing(initialState.clearing);
    };

    const isWithdrawModalDisabled = balance <= 0;
    const isDisabled = !selectedFundingSource || amount < initialState.amount;
    const computedAmount = amount * 100;

    const title = (
        <Text textAlign="center" fontSize={1} color="text.lightGray">
            {currentStep === WITHDRAW_CREDIT_STEPS.INITIAL && 'Withdraw'}
            {currentStep === WITHDRAW_CREDIT_STEPS.REVIEW &&
                'Withdrawal review'}
        </Text>
    );

    return (
        <WithdrawCreditContext.Provider
            value={{
                selectedFundingSource,
                setFundingSource,
                selectedPaymentPlatform,
                setPaymentPlatform,
                amount,
                computedAmount,
                setAmount,
                balance,
                currentStep,
                setCurrentStep,
                clearing,
                setClearing,
                WITHDRAW_CREDIT_STEPS,
                CLEARING_VALUES,
            }}
        >
            <Button
                disabled={isWithdrawModalDisabled}
                type="ghost"
                onClick={() => setModalOpen(true)}
                width={['100%', '', 196]}
                style={{
                    boxShadow: '0 2px 6px 1px rgba(0, 0, 0, 0.09)',
                    opacity: isWithdrawModalDisabled ? 0.4 : 1,
                }}
            >
                <Text
                    fontSize={[0, '', 3]}
                    fontWeight="medium"
                    color="#626770"
                    textAlign="left"
                    px={20}
                >
                    <Icon
                        type="Withdraw"
                        color="#FFCBAA"
                        fontSize={[20, '', 30]}
                        mr={12}
                        style={{ verticalAlign: 'middle' }}
                    />
                    Withdraw
                </Text>
            </Button>

            <Modal
                title={title}
                visible={isModalOpen}
                footer={null}
                destroyOnClose
                width="100%"
                closable={currentStep !== WITHDRAW_CREDIT_STEPS.SUCCESS}
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
                        ? {
                              height: 'calc(100vh - 55px)',
                              overflow: 'auto',
                              paddingTop: 12,
                          }
                        : { paddingTop: 12, minHeight: 300 }
                }
                onCancel={() => resetState()}
            >
                {currentStep === WITHDRAW_CREDIT_STEPS.INITIAL && (
                    <InitialScreen isDisabled={isDisabled} />
                )}

                {currentStep === WITHDRAW_CREDIT_STEPS.REVIEW && (
                    <ReviewWithdrawal />
                )}

                {currentStep === WITHDRAW_CREDIT_STEPS.SUCCESS && (
                    <SuccessScreen onDone={() => resetState()}>
                        <Box textAlign="center" mb={80}>
                            <Text mt={30} fontWeight="medium">
                                WITHDRAWN AMOUNT
                            </Text>
                            <Text fontSize={40} fontWeight="medium" mb={8}>
                                {renderPrice(computedAmount)}
                            </Text>
                            <Text fontSize={0}>
                                {`Your credit has been scheduled to be transfered in ${
                                    clearing === CLEARING_VALUES.STANDARD
                                        ? '3-5'
                                        : '1-2'
                                } business days.`}
                            </Text>
                        </Box>
                    </SuccessScreen>
                )}

                {currentStep === WITHDRAW_CREDIT_STEPS.REVIEW && (
                    <Button
                        type="ghost"
                        height="auto"
                        style={{ position: 'absolute', top: 20, left: 24 }}
                        onClick={() =>
                            setCurrentStep(WITHDRAW_CREDIT_STEPS.INITIAL)
                        }
                    >
                        <Text color="text.blue" fontSize={2}>
                            back
                        </Text>
                    </Button>
                )}
            </Modal>
        </WithdrawCreditContext.Provider>
    );
};

WithdrawCreditModal.propTypes = {
    mobileOnly: PropTypes.bool.isRequired,
    balance: PropTypes.number.isRequired,
};

export default withScreenSizes(WithdrawCreditModal);
