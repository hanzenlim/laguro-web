import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import _get from 'lodash/get';
import styled from 'styled-components';
import { Grid, Text, Flex, Icon, Box } from '../../../components';
import { renderPrice } from '../../../util/paymentUtil';
import LineItem from '../../common/PaymentDetails/components/lineItem';
import CreditCard from '../../common/PaymentDetails/components/creditCard';
import {
    PAYMENT,
    PROCEDURE_PAYMENT_TYPE,
    PROCEDURE_SET_HISTORY_PAYMENT_TYPE,
} from '../../../util/strings';
import {
    getOutstandingPaymentText,
    getPatientPaymentBreakdown,
} from '../utils';

const StyledGrid = styled(Grid)`
    width: 100%;
`;

const PaymentDetailsView = ({ cardType, withCC, payment, total }) => {
    const { stripePayment, invoice, dateCreated } = payment;

    const getInvoiceItemProcedureSet = itemType =>
        invoice.items.filter(item => item.type === itemType)[0].procedureSet;

    const LineItemGroup = ({ itemType, name }) =>
        getInvoiceItemProcedureSet(itemType).map(procedure => (
            <LineItem name={name || procedure.name} price={procedure.price} />
        ));

    const stripePaymentSource = _get(stripePayment, 'source');
    const brand = _get(stripePaymentSource, 'brand');
    const last4 = _get(stripePaymentSource, 'last4');

    const insuranceCoverage = getPatientPaymentBreakdown(
        payment,
        'insuranceCoverage'
    );
    const discount = getPatientPaymentBreakdown(payment, 'discount');
    const downPayment = getPatientPaymentBreakdown(payment, 'downPayment');

    const installmentPlanNumChargePeriods = getPatientPaymentBreakdown(
        payment,
        'installmentPlanNumChargePeriods'
    );

    const installmentPlanInterval = getPatientPaymentBreakdown(
        payment,
        'installmentPlanInterval'
    );

    return (
        <Flex mt={5} flexDirection="column" alignItems="center">
            <Text mb={25} fontSize={[1, '', 3]} fontWeight="bold">
                {cardType === PAYMENT ? 'Payment Details' : 'Balance Details'}
            </Text>
            <Text fontSize={[1, '', 6]} fontWeight="bold" textAlign="center">
                Treatment Invoice
            </Text>
            <Flex justifyContent="center" mb={40}>
                <Icon
                    fontSize={4}
                    type="environment-o"
                    color="icon.lightGray"
                    fontWeight="bold"
                    mr={[4, '', 6]}
                />
                <Text fontSize={[0, '', 1]} color="text.darkGray">
                    {moment(dateCreated).format('MMMM D')}
                </Text>
            </Flex>

            <StyledGrid gridRowGap={10}>
                <LineItemGroup withQuantity itemType={PROCEDURE_PAYMENT_TYPE} />

                {insuranceCoverage !== 0 && (
                    <LineItem
                        name="Insurance coverage"
                        price={-1 * insuranceCoverage}
                    />
                )}

                {discount !== 0 && (
                    <LineItem name="Discount" price={-1 * discount} />
                )}

                {downPayment !== 0 && (
                    <LineItem
                        name={getOutstandingPaymentText(
                            installmentPlanNumChargePeriods,
                            installmentPlanInterval
                        )}
                        price={
                            -1 *
                            (getPatientPaymentBreakdown(
                                payment,
                                'afterInsuranceAndDiscountBeforeInstallmentPlan'
                            ) -
                                downPayment)
                        }
                    />
                )}
            </StyledGrid>

            <Flex
                mt={30}
                width="100%"
                justifyContent={withCC ? 'space-between' : 'flex-end'}
            >
                <Text
                    fontSize={[2, '', 5]}
                    color="text.black"
                    fontWeight="bold"
                    lineHeight="50px"
                >
                    Total
                </Text>
                <Box>
                    <TotalPaid amount={total} />
                    {withCC && <CreditCard brand={brand} last4={last4} />}
                </Box>
            </Flex>
        </Flex>
    );
};

const TotalPaid = ({ amount }) => (
    <Box>
        <Text
            fontSize={[2, '', 5]}
            color="text.black"
            fontWeight="bold"
            lineHeight="50px"
            textAlign="right"
        >
            {renderPrice(amount)}
        </Text>
    </Box>
);

PaymentDetailsView.propTypes = {
    cardType: PropTypes.string,
    withCC: PropTypes.bool,
    payment: PropTypes.object,
    total: PropTypes.number,
};

PaymentDetailsView.defaultProps = {
    cardType: PAYMENT,
    withCC: true,
    payment: {
        stripePayment: { source: { brand: 'Visa', last4: 1234 } },
        type: PROCEDURE_SET_HISTORY_PAYMENT_TYPE,
        invoice: { items: [] },
    },
    total: 12345,
};

export default PaymentDetailsView;
