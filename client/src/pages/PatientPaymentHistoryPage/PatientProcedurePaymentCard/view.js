import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import PatientPaymentDetails from '../PatientPaymentDetails/index';
import { renderPrice, getPaymentBreakdown } from '../../../util/paymentUtil';
import {
    Card,
    Text,
    Flex,
    Box,
    Icon,
    Button,
    Truncate,
} from '@laguro/basic-components';
import {
    AVAILABLE,
    PENDING,
    PAYMENT_CARD,
    PAYMENT_MADE,
} from '../../../util/strings';
import { getOutstandingPaymentText } from '../utils';

const StyledCard = styled(Card)`
    && {
        width: 100%;
        margin-bottom: 7px;
        box-shadow: 1px 1px 7px 0 rgba(0, 0, 0, 0.15);
        border-color: ${props => props.theme.colors.divider.gray};

        .ant-card-body {
            padding: 14px 20px;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                padding: 20px 40px;
            }
        }

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            margin-bottom: 40px;
        }
    }
`;

const renderInvoiceItem = (procedures, persona) =>
    !_isEmpty(procedures) &&
    procedures.map(procedure => (
        <Box>
            <Flex justifyContent="space-between">
                <Text fontSize={[0, '', 2]}>{_get(procedure, 'name')}</Text>
                <Text minWidth={80} fontSize={[0, '', 2]} textAlign="right">
                    {renderPrice(_get(procedure, 'price'))}
                </Text>
            </Flex>
            <Box
                my={[6, '', 15]}
                borderBottom="1.5px solid"
                borderColor="divider.darkGray"
            />
        </Box>
    ));

const PatientProcedurePaymentCardView = ({
    closeModal,
    cardType,
    opentDetailModal,
    visibleModal,
    payment,
    paymentStatus,
    totalAmount,
    persona,
}) => {
    const getPaymentStatusColor = () => {
        switch (paymentStatus) {
            case AVAILABLE:
                return 'text.blue';
            case PENDING:
                return 'text.yellow';
            default:
                return 'text.black';
        }
    };
    const { refundAmount } = payment;
    const isOnPaymentHistory = paymentStatus === PAYMENT_MADE;

    const installmentPlanInfoWidth = 380;
    const invoiceItem = _get(payment, 'invoice.items[0]');
    const insuranceCoverage = getPaymentBreakdown(payment, 'insuranceCoverage');
    const installmentPlan = _get(payment, 'installmentPlan');
    const discount = getPaymentBreakdown(payment, 'discount');

    const procedures = renderInvoiceItem(
        _get(invoiceItem, 'procedureSet'),
        persona
    );

    const installmentPlanNumChargePeriods = getPaymentBreakdown(
        payment,
        'installmentPlanNumChargePeriods'
    );
    const installmentPlanInterval = getPaymentBreakdown(
        payment,
        'installmentPlanInterval'
    );

    return (
        <StyledCard key={payment.id}>
            <Flex alignItems="center">
                <Box>
                    <Text
                        fontSize={[isOnPaymentHistory ? 1 : 0, '', 3]}
                        color={getPaymentStatusColor()}
                        textTransform={isOnPaymentHistory ? '' : 'uppercase'}
                        mb={isOnPaymentHistory ? 0 : 14}
                        fontWeight={isOnPaymentHistory ? 'normal' : 'bold'}
                    >
                        {paymentStatus}
                    </Text>
                    <Flex flexDirection="column">
                        {!isOnPaymentHistory ? (
                            <Text
                                fontSize={1}
                                textTransform="uppercase"
                                lineHeight="1.1"
                            >
                                Procedure
                            </Text>
                        ) : null}
                        <Flex alignItems="flex-end">
                            <Text
                                fontSize={[4, '', 5]}
                                fontWeight="bold"
                                lineHeight="1.1"
                            >
                                {renderPrice(
                                    getPaymentBreakdown(
                                        payment,
                                        'recentPaymentMade'
                                    )
                                )}
                            </Text>
                            {refundAmount && (
                                <Text
                                    ml={10}
                                    color="text.yellow"
                                >{`(${renderPrice(
                                    refundAmount
                                )} Refunded)`}</Text>
                            )}
                        </Flex>
                    </Flex>
                </Box>
                <Flex alignItems="top">
                    <Button
                        onClick={() => opentDetailModal(payment.id)}
                        type="ghost"
                        height={[50, '', 70]}
                        width={[50, '', 70]}
                        top="0"
                        right="0"
                        position="absolute"
                    >
                        <Icon
                            fontSize={[0, '', 3]}
                            color="icon.blue"
                            type="right"
                        />
                    </Button>
                </Flex>
            </Flex>
            <Box
                my={[10, '', 16]}
                borderBottom="1.5px solid"
                borderColor="divider.black50"
            />
            <Text
                fontSize={[2, '', 5]}
                fontWeight="bold"
                lineHeight="1.1"
                mb={isOnPaymentHistory ? 50 : 4}
            >
                <Truncate lines={1}>
                    {`Dr. ${payment.payee.firstName} ${payment.payee.lastName}`}
                </Truncate>
            </Text>
            {/* this is payment invoice modal */}
            <PatientPaymentDetails
                payment={payment}
                visible={visibleModal === `payment_detail_${payment.id}`}
                onCancel={closeModal}
                cardType={cardType}
                total={totalAmount}
            />
            <Box>
                <Text
                    fontSize={[0, '', 3]}
                    fontWeight="medium"
                    mb={[6, '', 10]}
                >
                    {`Procedure${
                        !_isEmpty(procedures) && procedures.length > 1
                            ? 's'
                            : ''
                    }`}
                </Text>

                <Box pl={20} mb={50}>
                    <Box
                        mt={[6, '', 7]}
                        mb={[6, '', 15]}
                        borderBottom="1.5px solid"
                        borderColor="divider.darkGray"
                    />
                    {renderInvoiceItem(
                        _get(invoiceItem, 'procedureSet'),
                        persona
                    )}
                </Box>

                {(insuranceCoverage !== 0 || discount !== 0) && (
                    <Flex fontSize={[0, '', 2]} justifyContent="space-between">
                        <Text fontWeight="medium">Procedure total</Text>
                        <Text fontWeight="medium">
                            {renderPrice(getPaymentBreakdown(payment, 'total'))}
                        </Text>
                    </Flex>
                )}

                {insuranceCoverage !== 0 && (
                    <Flex fontSize={[0, '', 2]} justifyContent="space-between">
                        <Text fontWeight="medium">Insurance coverage</Text>
                        <Text fontWeight="medium" color="#417505">
                            {renderPrice(-1 * insuranceCoverage)}
                        </Text>
                    </Flex>
                )}
                {discount !== 0 && (
                    <Flex fontSize={[0, '', 2]} justifyContent="space-between">
                        <Text fontWeight="medium">Discount</Text>
                        <Text fontWeight="medium" color="#417505">
                            {renderPrice(-1 * discount)}
                        </Text>
                    </Flex>
                )}

                <Flex
                    fontSize={[0, '', 2]}
                    mt={20}
                    mb={20}
                    justifyContent="space-between"
                >
                    <Text fontWeight="500">Total</Text>
                    <Text
                        fontWeight={
                            _isEmpty(installmentPlan) ? 'bold' : 'medium'
                        }
                    >
                        {renderPrice(
                            getPaymentBreakdown(
                                payment,
                                'afterInsuranceAndDiscountBeforeInstallmentPlan'
                            )
                        )}
                    </Text>
                </Flex>

                {!_isEmpty(installmentPlan) && (
                    <Box>
                        <Box
                            my={[10, '', 16]}
                            borderBottom="1.5px solid"
                            borderColor="divider.black50"
                        />
                        <Flex justifyContent="center">
                            <Box>
                                <Flex
                                    width={installmentPlanInfoWidth}
                                    fontSize={[0, '', 2]}
                                    justifyContent="space-between"
                                >
                                    <Text fontWeight="500">
                                        {getOutstandingPaymentText(
                                            installmentPlanNumChargePeriods,
                                            installmentPlanInterval
                                        )}
                                    </Text>
                                    <Text fontWeight="500">
                                        {renderPrice(
                                            getPaymentBreakdown(
                                                payment,
                                                'afterInsuranceAndDiscountBeforeInstallmentPlan'
                                            ) -
                                                getPaymentBreakdown(
                                                    payment,
                                                    'downPayment'
                                                )
                                        )}
                                    </Text>
                                </Flex>
                                <Flex
                                    width={installmentPlanInfoWidth}
                                    fontSize={[0, '', 2]}
                                    justifyContent="space-between"
                                >
                                    <Text fontWeight="500">
                                        Down payment paid
                                    </Text>
                                    <Text fontWeight="bold">
                                        {renderPrice(
                                            getPaymentBreakdown(
                                                payment,
                                                'downPayment'
                                            )
                                        )}
                                    </Text>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                )}
            </Box>
        </StyledCard>
    );
};

PatientProcedurePaymentCardView.propTypes = {
    closeModal: PropTypes.func,
    cardType: PropTypes.string,
    payment: PropTypes.object,
    paymentStatus: PropTypes.string,
    persona: PropTypes.string,
    totalAmount: PropTypes.number,
    reservation: PropTypes.object,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    office: PropTypes.object,
};

PatientProcedurePaymentCardView.defaultProps = {
    closeModal: () => {},
    cardType: PAYMENT_CARD,
    payment: { id: '123', refundAmount: 123 },
    paymentStatus: AVAILABLE,
    totalAmount: 123,
    reservation: {},
    startTime: moment(),
    endTime: moment(),
    office: { name: 'Missing Office', location: { name: 'Missing Office' } },
};

export default PatientProcedurePaymentCardView;
