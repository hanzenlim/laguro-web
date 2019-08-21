import React from 'react';

import { Box, Text } from '../components/';

const LaguroCreditsTermsPage = () => (
    <Box m="40px auto" px={25} width="100%" maxWidth={900}>
        <Text fontWeight="bold" mb={20}>
            Laguro Credits Program Terms and Conditions
        </Text>

        <Text mb={20}>
            The Laguro Credits Program allows registered Laguro users to earn
            coupon credits (“Credits”) that may be redeemed for a wide array of
            products and services throughout the Laguro Platform. For example,
            Credits may be redeemed for qualifying dental treatment, utilization
            of clinical space, or purchase of miscellaneous dental supplies and
            services via the Laguro Platform pursuant to the terms and
            conditions set forth below.
        </Text>

        <Box pl={20}>
            <Text fontWeight="bold" mb={20}>
                Redeeming Credits
            </Text>

            <Text mb={20}>
                Credits may only be redeemed via the Laguro Site, Application,
                and Services. Credits will automatically appear as so on your
                account. You may only redeem Credits after the Credits are
                reflected in your Laguro Account. Credits are coupons issued for
                promotional purposes; they have no cash value and may not be
                transferred or exchanged for cash.
            </Text>

            <Text mb={20}>
                Credits may not be earned by creating multiple Laguro Accounts.
                Credits accrued in separate Laguro Accounts may not be combined
                into one Laguro Account. Credits may not be transferred to any
                other Laguro user.
            </Text>

            <Text mb={20}>
                If for any reason you believe that there is a discrepancy
                regarding your balance of Credits, please contact us at
                support@laguro.com. Laguro may require you to submit additional
                information in order to make a determination about your balance.
                All decisions regarding your balance will be final and at
                Laguro’s sole discretion.
            </Text>

            <Text fontWeight="bold" mb={20}>
                Termination and Changes
            </Text>

            <Text mb={20}>
                Laguro may suspend or terminate the Laguro Credits Program or a
                user’s ability to participate in the Laguro Credits Program at
                any time for any reason.
            </Text>

            <Text mb={20}>
                Laguro reserves the right to suspend accounts or remove Credits
                if we notice any activity that we believe is abusive,
                fraudulent, or in violation of the Laguro Terms of Service or
                Privacy Statement. Laguro reserves the right to review and
                investigate all Credits activities and to suspend accounts or
                modify credits in our sole discretion as deemed fair and
                appropriate.
            </Text>

            <Text mb={20}>
                The scope, variety, and type of services and products that you
                may obtain by redeeming Credits can change at any time.
            </Text>

            <Text fontWeight="bold" mb={20}>
                Updates to the Terms
            </Text>

            <Text mb={20}>
                We can update these terms at any time without prior notice. If
                we modify these terms, we will post the modification on the
                Laguro.com website, applications, or services, which are
                effective upon posting. Continued participation in the Laguro
                Credits Program after any modification shall constitute consent
                to such modification.
            </Text>
        </Box>
    </Box>
);

export default LaguroCreditsTermsPage;
