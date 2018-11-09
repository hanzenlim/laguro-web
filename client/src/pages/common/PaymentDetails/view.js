import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _get from 'lodash/get';

import { Text, Flex, Icon, Image, Box } from '../../../components';
import { formatListingTime } from '../../../util/timeUtil';
import { renderPrice } from '../../../util/paymentUtil';
import visa from '../../../components/Image/visa.svg';
import mastercard from '../../../components/Image/mastercard.svg';
import whiteLogo from '../../../components/Image/whiteLogo.png';
import americanExpress from '../../../components/Image/americanExpress.svg';
import discover from '../../../components/Image/discover.svg';
import {
    PAYMENT,
    RESERVATION_PAYMENT_TYPE,
    EQUIPMENT_PAYMENT_TYPE,
    PROCEDURE_PAYMENT_TYPE,
    APPOINTMENT_PAYMENT_TYPE,
    BOOKING_FEE_PAYMENT_TYPE,
    MATERIAL_PAYMENT_TYPE,
    CLEANING_FEE_PAYMENT_TYPE,
    CHAIR_TIME_PAYMENT_TYPE,
} from '../../../util/strings';

const PaymentDetailsView = ({
    cardType,
    office,
    startTime,
    endTime,
    withCC,
    payment,
    total,
}) => {
    const { stripePayment, type, invoice, reservation } = payment;

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
                {office.name}
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
                    {office.location.name}
                </Text>
            </Flex>

            <Section
                title={
                    type === RESERVATION_PAYMENT_TYPE ||
                    type === EQUIPMENT_PAYMENT_TYPE
                        ? 'Booking Time'
                        : 'Appointment Time'
                }
            >
                {_get(reservation, 'availableTimes.length') ? (
                    reservation.availableTimes.map(availableTime => (
                        <Text fontSize={[0, '', 3]} color="text.black">
                            {formatListingTime(
                                availableTime.startTime,
                                availableTime.endTime
                            )}
                        </Text>
                    ))
                ) : (
                    <Text fontSize={[0, '', 3]} color="text.black">
                        {formatListingTime(startTime, endTime)}
                    </Text>
                )}
            </Section>

            {/* Reservation receipt details */}
            {type === RESERVATION_PAYMENT_TYPE && (
                <Section title="Chairs">
                    <LineItemGroup
                        withQuantity
                        itemType={CHAIR_TIME_PAYMENT_TYPE}
                    />
                </Section>
            )}
            {type === RESERVATION_PAYMENT_TYPE &&
                getInvoiceItems(CLEANING_FEE_PAYMENT_TYPE).length > 0 && (
                    <Section title="Cleaning">
                        <LineItemGroup
                            name="Cleaning Fee"
                            itemType={CLEANING_FEE_PAYMENT_TYPE}
                        />
                    </Section>
                )}
            {(type === RESERVATION_PAYMENT_TYPE || EQUIPMENT_PAYMENT_TYPE) &&
                getInvoiceItems(EQUIPMENT_PAYMENT_TYPE).length > 0 && (
                    <Section title="Equipment">
                        <Box width={['unset', '', 360]}>
                            <LineItemGroup
                                withQuantity
                                itemType={EQUIPMENT_PAYMENT_TYPE}
                            />
                        </Box>
                    </Section>
                )}
            {type === RESERVATION_PAYMENT_TYPE &&
                getInvoiceItems(MATERIAL_PAYMENT_TYPE).length > 0 && (
                    <Section title="Materials">
                        <LineItemGroup
                            withQuantity
                            itemType={MATERIAL_PAYMENT_TYPE}
                        />
                    </Section>
                )}
            {type === RESERVATION_PAYMENT_TYPE &&
                cardType === PAYMENT &&
                getInvoiceItems(BOOKING_FEE_PAYMENT_TYPE).length > 0 && (
                    <Section title="Booking Fee">
                        <LineItemGroup
                            name="Booking Fee"
                            itemType={BOOKING_FEE_PAYMENT_TYPE}
                        />
                    </Section>
                )}
            {/* Appointment receipt details */}
            {(type === APPOINTMENT_PAYMENT_TYPE ||
                type === PROCEDURE_PAYMENT_TYPE) &&
                getInvoiceItems(PROCEDURE_PAYMENT_TYPE).length > 0 && (
                    <Section title="Procedures">
                        <LineItemGroup
                            withQuantity
                            itemType={PROCEDURE_PAYMENT_TYPE}
                        />
                    </Section>
                )}
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

const CreditCard = ({ brand, last4 }) => {
    const creditCardImg = () => {
        switch (brand) {
            case 'Visa':
                return visa;
            case 'Mastercard':
                return mastercard;
            case 'American Express':
                return americanExpress;
            case 'Discover':
                return discover;
            default:
                return whiteLogo;
        }
    };

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            height={[30, '', 50]}
            width={[80, '', 130]}
            border="1px solid"
            borderRadius="2px"
            borderColor="divider.darkGray"
        >
            <Image
                src={creditCardImg()}
                height={[16, '', 20]}
                width={[22, '', 30]}
            />
            <Text fontSize={[0, '', 2]} fontWeight="bold" color="text.black">
                {` •••• ${last4}`}
            </Text>
        </Flex>
    );
};

const Section = ({ title, children }) => (
    <Flex
        width={['100%', '', 'unset']}
        flexDirection="column"
        mb={[16, '', 40]}
    >
        <Box
            pb={[8, '', 18]}
            mb={[8, '', 18]}
            borderBottom="1px solid"
            borderColor="divider.darkGray"
            width={['100%', '', 360]}
        >
            <Text
                color="text.gray"
                fontWeight="bold"
                fontSize={[0, '', 4]}
                style={{ textTransform: 'uppercase' }}
            >
                {title}
            </Text>
        </Box>
        {children}
    </Flex>
);

const LineItem = ({ quantity, name, price }) => (
    <Flex justifyContent="space-between">
        <Flex pr={10}>
            {quantity && (
                <Text
                    fontSize={[0, '', 3]}
                    fontWeight="bold"
                    color="text.black"
                >
                    {quantity}
                    &nbsp;
                </Text>
            )}
            <Text fontSize={[0, '', 3]} color="text.black">
                {name}
            </Text>
        </Flex>
        <Text fontSize={[0, '', 3]} fontWeight="bold" color="text.black">
            {renderPrice(price)}
        </Text>
    </Flex>
);

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
    office: PropTypes.object,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    withCC: PropTypes.bool,
    payment: PropTypes.object,
    total: PropTypes.number,
};

PaymentDetailsView.defaultProps = {
    cardType: PAYMENT,
    office: { name: 'Missing Office', location: { name: 'Missing Office' } },
    startTime: moment(),
    endTime: moment(),
    withCC: true,
    payment: {
        stripePayment: { source: { brand: 'Visa', last4: 1234 } },
        type: RESERVATION_PAYMENT_TYPE,
        invoice: { items: [] },
    },
    total: 12345,
};

export default PaymentDetailsView;
