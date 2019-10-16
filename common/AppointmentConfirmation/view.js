import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import moment from 'moment-timezone';

import { CheckMarkAnimation, Text, Box, Flex, Icon, Link } from '~/components';
import {
    PATIENT_DASHBOARD_PAGE_URL_BASE,
    OFFICE_PAGES_URL_PREFIX,
} from '~/util/urls';
import { trackBookAppointment } from '~/util/trackingUtils';

const PaymentConfirmationView = ({
    h1,
    h2,
    h3,
    officeId,
    internalPage,
    data,
}) => {
    useEffect(() => {
        trackBookAppointment({
            appointmentId: _get(data, 'id'),
            dentistId: _get(data, 'dentist.id'),
            city: _get(data, 'timezone'),
            weekDay: moment(_get(data, 'localStartTime')).format('dddd'),
            hour: moment(_get(data, 'localStartTime')).format('hh:mm a'),
            internalPage,
            eventAction: 'Conversion',
            // TODO: Put back when API is ready
            officeId,
        });
    }, []);

    return (
        <div>
            <Text textAlign="center">
                <CheckMarkAnimation />
                <Flex
                    alignItems="center"
                    flexDirection="row"
                    height="100%"
                    justifyContent="center"
                >
                    <Box width={['100%', '', '400px']}>
                        <Text
                            fontSize={[2, '', 4]}
                            py={10}
                            textTransform="uppercase"
                        >
                            {h1}
                        </Text>
                        <Text fontSize={[2, '', 4]}>{h2}</Text>

                        {h3 ? (
                            <Link to={`${OFFICE_PAGES_URL_PREFIX}/${officeId}`}>
                                <Flex
                                    mt={5}
                                    mb={24}
                                    flexDirection="row"
                                    justifyContent="center"
                                >
                                    <Icon
                                        type="locationPin"
                                        width="20px"
                                        height="20px"
                                        color="icon.lightGray"
                                        mx={5}
                                    />
                                    <Text color="text.blue">{h3}</Text>
                                </Flex>
                            </Link>
                        ) : null}
                        <Link
                            to={`${PATIENT_DASHBOARD_PAGE_URL_BASE}appointments`}
                        >
                            <Flex
                                justifyContent="center"
                                color="text.blue"
                                fontWeight="medium"
                                alignItems="center"
                            >
                                <Text mr={5} color="inherit">
                                    View and manage your appointments{' '}
                                </Text>
                                <Icon
                                    color="inherit"
                                    fill="currentColor"
                                    width={13}
                                    height={13}
                                    type="rightForwardArrow"
                                />
                            </Flex>
                        </Link>
                    </Box>
                </Flex>
            </Text>
        </div>
    );
};

PaymentConfirmationView.propTypes = {
    h1: PropTypes.string,
    h2: PropTypes.string,
    h3: PropTypes.string,
};

PaymentConfirmationView.defaultProps = {
    h1: 'Your booking is confirmed',
    h2: 'Tuesday, August 28, 2018 , 5:30pm',
    h3: '535 Mission St. San Francisco, CA 94116',
};

export default PaymentConfirmationView;
