import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import PaymentDetailsView from './view';
import ProcedurePaymentDetailsView from './ProcedurePaymentDetails/view';
import { Text, Flex, Modal, Button } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import {
    PAYMENT,
    PROCEDURE_SET_HISTORY_PAYMENT_TYPE,
} from '../../../util/strings';

const PaymentDetails = ({
    payment,
    cardType,
    total,
    reservation,
    startTime,
    endTime,
    desktopOnly,
    fullPage = false,
    ...rest
}) => {
    const { office } = reservation;
    const withCC = cardType === PAYMENT;
    const paymentDetailsViewProps = {
        payment,
        cardType,
        office,
        startTime,
        endTime,
        withCC,
        total,
    };

    if (fullPage) {
        if (payment.type === PROCEDURE_SET_HISTORY_PAYMENT_TYPE) {
            return <ProcedurePaymentDetailsView {...paymentDetailsViewProps} />;
        }
        return <PaymentDetailsView {...paymentDetailsViewProps} />;
    }

    return (
        <Modal
            {...rest}
            footer={null}
            width={desktopOnly ? 620 : '100%'}
            style={
                desktopOnly
                    ? null
                    : {
                          top: '0',
                          left: '0',
                          right: '0',
                          bottom: '0',
                          margin: '0',
                          height: '100%',
                      }
            }
        >
            {payment.type === PROCEDURE_SET_HISTORY_PAYMENT_TYPE ? (
                <ProcedurePaymentDetailsView {...paymentDetailsViewProps} />
            ) : (
                <PaymentDetailsView {...paymentDetailsViewProps} />
            )}
            <Flex justifyContent="flex-end">
                <Button
                    className="print-btn"
                    height={[30, '', 60]}
                    px={[12, '', 30]}
                    mb={76}
                    onClick={() => window.print()}
                >
                    <Text
                        fontWeight="bold"
                        color="text.white"
                        fontSize={[1, '', 3]}
                    >
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

export default withScreenSizes(PaymentDetails);
