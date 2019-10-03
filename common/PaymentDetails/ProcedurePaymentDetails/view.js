import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { Text, Flex, Icon, Box } from '~/components';
import { renderPrice } from '~/util/paymentUtil';
import LineItem from '../components/lineItem';
import Section from '../components/section';
import CreditCard from '../components/creditCard';
import {
    PAYMENT,
    PROCEDURE_PAYMENT_TYPE,
    PROCEDURE_SET_HISTORY_PAYMENT_TYPE,
} from '~/util/strings';

const PaymentDetailsView = ({ cardType, withCC, payment, total }) => {
    const { stripePayment, invoice, dateCreated } = payment;

    const totalPrice = item =>
        cardType === PAYMENT ? item.totalPrice : item.payoutAmount;

    const getInvoiceItems = itemType =>
        invoice.items.filter(item => item.type === itemType);

    const LineItemGroup = ({ itemType, name, withQuantity }) =>
        getInvoiceItems(itemType).map(item => (
            <LineItem
                name={name || (item.quantity > 1 ? `${item.name}s` : item.name)}
                quantity={withQuantity ? item.quantity : null}
                price={totalPrice(item)}
            />
        ));

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

            <Section title="Procedures">
                <LineItemGroup withQuantity itemType={PROCEDURE_PAYMENT_TYPE} />
            </Section>
            <Section
                title={cardType === PAYMENT ? 'Total Paid' : 'Total Received'}
            >
                <Flex justifyContent={withCC ? 'space-between' : 'flex-end'}>
                    {withCC && (
                        <CreditCard
                            brand={stripePayment.source.brand}
                            last4={stripePayment.source.last4}
                        />
                    )}
                    <TotalPaid amount={total} />
                </Flex>
            </Section>
        </Flex>
    );
};

const TotalPaid = ({ amount }) => (
    <Box>
        <Text
            fontSize={[2, '', 5]}
            color="text.black"
            fontWeight="bold"
            lineHeight="1.1"
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
