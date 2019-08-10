import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { renderPrice } from '@laguro/basic-components/lib/components/utils/paymentUtils';

import { Text, Button, Responsive, Box, Icon } from '../../../components';
import InitialScreen from './InitialScreen';
import SuccessScreen from '../SuccessScreen';
import ReviewAddCredit from './ReviewAddCredit';

const { withScreenSizes } = Responsive;

export const AddCreditContext = createContext();

const ADD_CREDIT_STEPS = {
    INITIAL: 'initial',
    REVIEW: 'review',
    SUCCESS: 'success',
};

const AddCreditModal = ({ mobileOnly, balance }) => {
    const initialState = {
        isModalOpen: false,
        selectedFundingSource: null,
        amount: 1,
        currentStep: ADD_CREDIT_STEPS.INITIAL,
    };

    const [isModalOpen, setModalOpen] = useState(initialState.isModalOpen);
    const [currentStep, setCurrentStep] = useState(initialState.currentStep);
    const [selectedFundingSource, setFundingSource] = useState(
        initialState.selectedFundingSource
    );
    const [amount, setAmount] = useState(initialState.amount);

    const resetState = () => {
        setModalOpen(initialState.isModalOpen);
        setCurrentStep(initialState.currentStep);
        setFundingSource(initialState.selectedFundingSource);
        setAmount(initialState.amount);
    };

    const isDisabled = !selectedFundingSource || amount < initialState.amount;

    const computedAmount = amount * 100;

    const title = (
        <Text textAlign="center" fontSize={1} color="text.lightGray">
            {currentStep === ADD_CREDIT_STEPS.INITIAL && 'Add Credit'}
            {currentStep === ADD_CREDIT_STEPS.REVIEW && 'Review'}
        </Text>
    );

    return (
        <AddCreditContext.Provider
            value={{
                selectedFundingSource,
                setFundingSource,
                amount,
                computedAmount,
                setAmount,
                balance,
                currentStep,
                setCurrentStep,
                ADD_CREDIT_STEPS,
            }}
        >
            <Button
                type="ghost"
                onClick={() => setModalOpen(true)}
                width={['100%', '', 196]}
                style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, 0.09)' }}
            >
                <Text
                    fontSize={[0, '', 3]}
                    fontWeight="medium"
                    color="#626770"
                    textAlign="left"
                    px={20}
                >
                    <Icon
                        type="AddCredit"
                        color="#C2D9FD"
                        fontSize={[20, '', 30]}
                        mr={12}
                        style={{ verticalAlign: 'middle' }}
                    />
                    Add Credit
                </Text>
            </Button>

            <Modal
                title={title}
                visible={isModalOpen}
                footer={null}
                destroyOnClose
                width="100%"
                closable={currentStep !== ADD_CREDIT_STEPS.SUCCESS}
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
                {currentStep === ADD_CREDIT_STEPS.INITIAL && (
                    <InitialScreen isDisabled={isDisabled} />
                )}

                {currentStep === ADD_CREDIT_STEPS.REVIEW && <ReviewAddCredit />}

                {currentStep === ADD_CREDIT_STEPS.SUCCESS && (
                    <SuccessScreen onDone={() => resetState()}>
                        <Box textAlign="center" mb={80}>
                            <Text mt={30} fontWeight="medium">
                                Added amount
                            </Text>
                            <Text fontSize={40} fontWeight="medium" mb={8}>
                                {renderPrice(computedAmount)}
                            </Text>
                            <Text fontSize={0}>
                                Your credit has been scheduled to be transfered
                                in 3-4 business days.
                            </Text>
                        </Box>
                    </SuccessScreen>
                )}

                {currentStep === ADD_CREDIT_STEPS.REVIEW && (
                    <Button
                        type="ghost"
                        height="auto"
                        style={{ position: 'absolute', top: 20, left: 24 }}
                        onClick={() => setCurrentStep(ADD_CREDIT_STEPS.INITIAL)}
                    >
                        <Text color="text.blue" fontSize={2}>
                            back
                        </Text>
                    </Button>
                )}
            </Modal>
        </AddCreditContext.Provider>
    );
};

AddCreditModal.propTypes = {
    mobileOnly: PropTypes.bool.isRequired,
    balance: PropTypes.number.isRequired,
};

export default withScreenSizes(AddCreditModal);
