import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Flex } from '@laguro/basic-components';
import PatientProcedurePaymentCardView from '../../../../../src/pages/PatientPaymentHistoryPage/PatientProcedurePaymentCard/view';
import { PATIENT, PAYMENT_CARD } from '../../../../../src/util/strings';
import {
    PAYMENT_MADE,
    PROCEDURE_PAYMENT_TYPE,
    CHARGED,
} from '@laguro/basic-components/lib/components/utils/stringUtils';
import PatientProcedurePaymentDetailsView from '../../../../../src/pages/PatientPaymentHistoryPage/PatientProcedurePaymentDetails/view';
import { Card } from 'antd';
import { getPaymentBreakdown } from '../../../../../src/util/paymentUtil';

const paymentBody = {
    payee: {
        id: 'dentistId',
        firstName: 'William',
        lastName: 'Choi',
    },
    stripePayment: {
        id: 'id',
        created: '11/05/1995',
        amount: 100,
        source: {
            brand: 'Mastercard',
            last4: 1234,
        },
        refunds: {
            data: {
                created: '11/05/1995',
            },
        },
    },
    chargeStatus: CHARGED,
};

const first_paymentDetailsOfInsuranceDiscount = {
    discount: {
        amount: 10000,
    },
    nominalAmount: 15500,
    invoice: {
        items: [
            {
                payoutAmount: 82560,
                quantity: 1,
                originalPrice: 113200,
                totalPrice: 103200,
                type: PROCEDURE_PAYMENT_TYPE,
                procedureSet: [
                    {
                        name: 'CROWN - 3/4 CAST NOBLE METAL',
                        price: 107500,
                    },
                    {
                        name:
                            'TOPICAL APPLICATION OF FLUORIDE - EXCLUDING VARNISH',
                        price: 5700,
                    },
                ],
            },
        ],
    },
};

const second_paymentDetailsOfInsuranceDiscountInstallment = {
    paymentRequestId: 'e2682960-36d2-11e9-9c50-f789102f662b',
    payerId: 'f66aae70-2006-11e9-a6a0-632d208a04a8',
    discount: {
        amount: 5000,
    },
    type: 'PROCEDURE_SET_HISTORY',
    itemId: 'a69bd6c8-d031-48e0-8c78-c0537cb2de80',
    dateCreated: '2019-02-22T19:00:40Z',
    nominalAmount: 30400,
    installmentPlan: {
        numChargePeriods: 2,
        charges: [
            {
                amount: 10000,
                isDownPayment: true,
                chargeId: 'ch_1E6jGFEFHeaB7gzaBsVqIscw',
                order: 0,
            },
        ],
        numPeriodsPaid: 0,
        totalPaid: 10000,
        payoutIds: [],
        interval: 'month',
        downPaymentAmount: 10000,
    },
    currency: 'usd',
    id: '25ef7ed0-36d4-11e9-9c50-f789102f662b',
    invoice: {
        items: [
            {
                payoutAmount: 121600,
                quantity: 1,
                originalPrice: 157000,
                totalPrice: 152000,
                name: 'Treatment',
                type: PROCEDURE_PAYMENT_TYPE,
                procedureSet: [
                    {
                        name: 'RESIN-BASED COMPOSITE - TWO SURFACES, ANTERIOR',
                        adaCode: 'D2331',
                        dateCreated: '2019-02-22T18:31:57Z',
                        id: 'bd66300f-1a10-4a73-b945-022ec1d749b9',
                        price: 27000,
                        status: 'COMPLETED',
                    },
                    {
                        name: 'APICOECTOMY - MOLAR (FIRST ROOT)',
                        adaCode: 'D3425',
                        dateCreated: '2019-02-22T18:31:57Z',
                        id: '1dcbdfe8-db87-4c43-801c-e075c9293fe1',
                        price: 130000,
                        status: 'COMPLETED',
                    },
                ],
            },
        ],
    },
    payeeId: 'df493c80-36da-11e9-82c0-8d63d96eaaef',
    subscriptionId: 'sub_EZt24dsAkCgMey',
    status: 'CHARGED',
};

const third_paymentDetails = {
    itemId: 'd915ccab-5d43-4edc-bf91-05ee615d0415',
    dateCreated: '2019-02-22T19:04:52Z',
    chargeId: 'ch_1E6jKJEFHeaB7gzaw28yXp2A',
    paymentRequestId: '835dccc0-36d4-11e9-9c50-f789102f662b',
    payerId: 'f66aae70-2006-11e9-a6a0-632d208a04a8',
    nominalAmount: 395000,
    currency: 'usd',
    id: 'bbcbc0d0-36d4-11e9-9c50-f789102f662b',
    invoice: {
        items: [
            {
                payoutAmount: 252800,
                quantity: 1,
                originalPrice: 395000,
                totalPrice: 395000,
                name: 'Treatment',
                type: PROCEDURE_PAYMENT_TYPE,
                procedureSet: [
                    {
                        name:
                            'REMOVAL OF FOREIGN BODY FROM MUCOSA, SKIN, OR SUBCUTANEOUS ALVEOLAR TISSUE',
                        adaCode: 'D7530',
                        dateCreated: '2019-02-22T18:36:03Z',
                        id: '09b4d613-f971-4d64-9ddc-1ece7bcb669a',
                        price: 40000,
                        status: 'COMPLETED',
                    },
                    {
                        name:
                            'ABUTMENT SUPPORTED PORCELAIN FUSED TO METAL CROWN (HIGH NOBLE METAL)',
                        adaCode: 'D6059',
                        dateCreated: '2019-02-22T18:36:03Z',
                        id: '6a8323b0-a4a9-4940-a34e-564911b1d326',
                        price: 130000,
                        status: 'COMPLETED',
                    },
                    {
                        name:
                            'SURGICAL PLACEMENT OF INTERIM IMPLANT BODY FOR TRANSITIONAL PROSTHESIS: ENDOSTEAL IMPLANT',
                        adaCode: 'D6012',
                        dateCreated: '2019-02-22T18:31:57Z',
                        id: '12808df1-54db-4ad3-b7ff-7f538db540c5',
                        price: 225000,
                        status: 'COMPLETED',
                    },
                ],
            },
        ],
    },
    payeeId: 'df493c80-36da-11e9-82c0-8d63d96eaaef',
    type: 'PROCEDURE_SET_HISTORY',
    status: 'CHARGED',
};

const fifth_paymentDetailsOfDiscountInstallment = {
    paymentRequestId: 'e9f51dc0-36d5-11e9-9978-ff01a7a14c45',
    payerId: 'f66aae70-2006-11e9-a6a0-632d208a04a8',
    discount: {
        amount: 5000,
    },
    type: 'PROCEDURE_SET_HISTORY',
    itemId: 'd443269c-dc0c-46ee-891b-d5468d113f63',
    dateCreated: '2019-02-22T19:13:33Z',
    nominalAmount: 135000,
    installmentPlan: {
        numChargePeriods: 2,
        charges: [
            {
                amount: 45000,
                isDownPayment: true,
                chargeId: 'ch_1E6jShEFHeaB7gzaX4RymXHJ',
                order: 0,
            },
        ],
        numPeriodsPaid: 0,
        totalPaid: 45000,
        payoutIds: [],
        interval: 'month',
        downPaymentAmount: 45000,
    },
    currency: 'usd',
    id: 'f2480190-36d5-11e9-9978-ff01a7a14c45',
    invoice: {
        items: [
            {
                payoutAmount: 108000,
                quantity: 1,
                originalPrice: 140000,
                totalPrice: 135000,
                name: 'Treatment',
                type: PROCEDURE_PAYMENT_TYPE,
                procedureSet: [
                    {
                        name: 'ABUTMENT SUPPORTED PORCELAIN/CERAMIC CROWN',
                        adaCode: 'D6058',
                        dateCreated: '2019-02-22T18:36:03Z',
                        id: '5eec8453-25b7-4e0b-b292-f416ea2a6fbb',
                        price: 140000,
                        status: 'COMPLETED',
                    },
                ],
            },
        ],
    },
    payeeId: 'df493c80-36da-11e9-82c0-8d63d96eaaef',
    subscriptionId: 'sub_EZtFLurjZfuNyX',
    status: 'CHARGED',
};

const fourth_paymentDetailsOfDiscount = {
    paymentRequestId: '835dccc0-36d4-11e9-9c50-f789102f662b',
    payerId: 'f66aae70-2006-11e9-a6a0-632d208a04a8',
    discount: {
        rate: 0.2,
    },
    type: 'PROCEDURE_SET_HISTORY',
    itemId: 'd915ccab-5d43-4edc-bf91-05ee615d0415',
    dateCreated: '2019-02-22T19:04:52Z',
    chargeId: 'ch_1E6jKJEFHeaB7gzaw28yXp2A',
    nominalAmount: 316000,
    currency: 'usd',
    id: 'bbcbc0d0-36d4-12e9-9c50-f7891021662b',
    invoice: {
        items: [
            {
                payoutAmount: 252800,
                quantity: 1,
                originalPrice: 395000,
                totalPrice: 316000,
                name: 'Treatment',
                type: PROCEDURE_PAYMENT_TYPE,
                procedureSet: [
                    {
                        name:
                            'REMOVAL OF FOREIGN BODY FROM MUCOSA, SKIN, OR SUBCUTANEOUS ALVEOLAR TISSUE',
                        adaCode: 'D7530',
                        dateCreated: '2019-02-22T18:36:03Z',
                        id: '09b4d613-f971-4d64-9ddc-1ece7bcb669a',
                        price: 40000,
                        status: 'COMPLETED',
                    },
                    {
                        name:
                            'ABUTMENT SUPPORTED PORCELAIN FUSED TO METAL CROWN (HIGH NOBLE METAL)',
                        adaCode: 'D6059',
                        dateCreated: '2019-02-22T18:36:03Z',
                        id: '6a8323b0-a4a9-4940-a34e-564911b1d326',
                        price: 130000,
                        status: 'COMPLETED',
                    },
                    {
                        name:
                            'SURGICAL PLACEMENT OF INTERIM IMPLANT BODY FOR TRANSITIONAL PROSTHESIS: ENDOSTEAL IMPLANT',
                        adaCode: 'D6012',
                        dateCreated: '2019-02-22T18:31:57Z',
                        id: '12808df1-54db-4ad3-b7ff-7f538db540c5',
                        price: 225000,
                        status: 'COMPLETED',
                    },
                ],
            },
        ],
    },
    payeeId: 'df493c80-36da-11e9-82c0-8d63d96eaaef',
    status: 'CHARGED',
};

const payment1 = {
    ...paymentBody,
    ...first_paymentDetailsOfInsuranceDiscount,
};

storiesOf('MyPage.PaymentHistory.Patient', module).add(
    'insurance,discount',
    () => (
        <Flex maxWidth={1100}>
            <Box maxWidth={612} mr={15}>
                <PatientProcedurePaymentCardView
                    payment={payment1}
                    persona={PATIENT}
                    paymentStatus={PAYMENT_MADE}
                    cardType={PAYMENT_CARD}
                    opentDetailModal={() => {}}
                    closeModal={() => {}}
                    visibleModal={''}
                />
            </Box>
            <Card>
                <PatientProcedurePaymentDetailsView
                    payment={payment1}
                    cardType={PAYMENT_CARD}
                    withCC={true}
                    total={getPaymentBreakdown(payment1, 'recentPaymentMade')}
                />
            </Card>
        </Flex>
    )
);

const payment2 = {
    ...paymentBody,
    ...second_paymentDetailsOfInsuranceDiscountInstallment,
};

storiesOf('MyPage.PaymentHistory.Patient', module).add(
    'insurance,discount,Installment',
    () => (
        <Flex>
            <Box maxWidth={612} mr={15}>
                <PatientProcedurePaymentCardView
                    payment={payment2}
                    persona={PATIENT}
                    paymentStatus={PAYMENT_MADE}
                    cardType={PAYMENT_CARD}
                    opentDetailModal={() => {}}
                    closeModal={() => {}}
                    visibleModal={false}
                />
            </Box>
            <Card>
                <PatientProcedurePaymentDetailsView
                    payment={payment2}
                    cardType={PAYMENT_CARD}
                    withCC={true}
                    total={getPaymentBreakdown(payment2, 'recentPaymentMade')}
                />
            </Card>
        </Flex>
    )
);

const payment3 = {
    ...paymentBody,
    ...third_paymentDetails,
};

storiesOf('MyPage.PaymentHistory.Patient', module).add(
    'normal payment without anything',
    () => (
        <Flex>
            <Box maxWidth={612} mr={15}>
                <PatientProcedurePaymentCardView
                    payment={payment3}
                    persona={PATIENT}
                    paymentStatus={PAYMENT_MADE}
                    cardType={PAYMENT_CARD}
                    opentDetailModal={() => {}}
                    closeModal={() => {}}
                    visibleModal={false}
                />
            </Box>
            <Box width={612}>
                <Card>
                    <PatientProcedurePaymentDetailsView
                        payment={payment3}
                        cardType={PAYMENT_CARD}
                        withCC={true}
                        total={getPaymentBreakdown(
                            payment3,
                            'recentPaymentMade'
                        )}
                    />
                </Card>
            </Box>
        </Flex>
    )
);

const payment4 = {
    ...paymentBody,
    ...fourth_paymentDetailsOfDiscount,
};

storiesOf('MyPage.PaymentHistory.Patient', module).add('discount', () => (
    <Flex>
        <Box width={612} mr={15}>
            <PatientProcedurePaymentCardView
                payment={payment4}
                persona={PATIENT}
                paymentStatus={PAYMENT_MADE}
                cardType={PAYMENT_CARD}
                opentDetailModal={() => {}}
                closeModal={() => {}}
                visibleModal={false}
            />
        </Box>
        <Box width={612}>
            <Card>
                <PatientProcedurePaymentDetailsView
                    payment={payment4}
                    cardType={PAYMENT_CARD}
                    withCC={true}
                    total={getPaymentBreakdown(payment4, 'recentPaymentMade')}
                />
            </Card>
        </Box>
    </Flex>
));

const payment5 = {
    ...paymentBody,
    ...fifth_paymentDetailsOfDiscountInstallment,
};

storiesOf('MyPage.PaymentHistory.Patient', module).add(
    'discount,installment',
    () => (
        <Flex>
            <Box maxWidth={612} mr={15}>
                <PatientProcedurePaymentCardView
                    payment={payment5}
                    persona={PATIENT}
                    paymentStatus={PAYMENT_MADE}
                    cardType={PAYMENT_CARD}
                    opentDetailModal={() => {}}
                    closeModal={() => {}}
                    visibleModal={false}
                />
            </Box>
            <Card>
                <PatientProcedurePaymentDetailsView
                    payment={payment5}
                    cardType={PAYMENT_CARD}
                    withCC={true}
                    total={getPaymentBreakdown(payment5, 'recentPaymentMade')}
                />
            </Card>
        </Flex>
    )
);
