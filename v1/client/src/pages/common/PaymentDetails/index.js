import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import PaymentDetailsView from './view';
import { Text, Flex, Modal, Button } from '../../../components';
import { PAYMENT } from '../../../util/strings';

const PaymentDetails = ({
    payment,
    cardType,
    total,
    reservation,
    startTime,
    endTime,
    fullPage = false,
    ...rest
}) => {
    const { office } = reservation;

    const withCC = cardType === PAYMENT;

    if (fullPage) {
        return (
            <PaymentDetailsView
                payment={payment}
                cardType={cardType}
                office={office}
                startTime={startTime}
                endTime={endTime}
                withCC={withCC}
                total={total}
            />
        );
    }

    return (
        <Modal {...rest} width={720}>
            <PaymentDetailsView
                payment={payment}
                cardType={cardType}
                office={office}
                startTime={startTime}
                endTime={endTime}
                withCC={withCC}
                total={total}
            />
            <Flex justifyContent="flex-end">
                <Button
                    className="print-btn"
                    height="60px"
                    px={30}
                    onClick={() => window.print()}
                >
                    <Text fontWeight="bold" color="text.white" fontSize={3}>
                        print
                    </Text>
                </Button>
            </Flex>
        </Modal>
    );
};

PaymentDetails.propTypes = {
    payment: PropTypes.object,
    cardType: PropTypes.string,
    total: PropTypes.string,
    reservation: PropTypes.object,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
};

PaymentDetails.defaultProps = {
    payment: { id: '123' },
    cardType: PAYMENT,
    total: '123',
    reservation: { office: {} },
    startTime: moment(),
    endTime: moment(),
};

export default PaymentDetails;
