import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import {
    Box,
    Text,
    Flex,
    Image,
    Button,
    Card,
    Link,
    Responsive,
} from '../../../components';
import { CANCELLED } from '../../../util/strings';
import { setImageSizeToUrl } from '../../../util/imageUtil';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const { TabletMobile, Desktop } = Responsive;

export const NoAppointmentsCard = ({ text }) => (
    <Fragment>
        <TabletMobile>
            <Box
                width="100%"
                height="100vh"
                bg="background.whiteSmoke"
                alignItems="center"
                justifyContent="center"
                borderTop="1px solid"
                borderColor="divider.gray"
                pt={16}
            >
                <Text
                    fontSize={1}
                    textAlign="center"
                    fontWeight="medium"
                    color="text.gray"
                >
                    {text}
                </Text>
            </Box>
        </TabletMobile>
        <Desktop>
            <Card style={{ boxShadow: '1px 1px 7px 0 rgba(0, 0, 0, 0.15)' }}>
                <Flex alignItems="center" justifyContent="center">
                    <Text fontSize={3} fontWeight="bold" color="text.black50">
                        {text}
                    </Text>
                </Flex>
            </Card>
        </Desktop>
    </Fragment>
);

class PatientAppointments extends PureComponent {
    renderAppointments = appointments =>
        appointments.map(
            ({
                id,
                localStartTime,
                startTime,
                dentist,
                reservation,
                status,
            }) => {
                const { lastName, firstName, imageUrl } = dentist.user;
                const dentistName = `Dr. ${firstName} ${lastName}`;
                const { name: officeName, id: officeId } = reservation.office;
                const isCancelled = status === CANCELLED;

                return (
                    <Fragment>
                        <Flex
                            key={id}
                            justifyContent="space-between"
                            alignItems="center"
                            p={[20, '', 30]}
                            mb={[0, '', 12]}
                            border="1px solid"
                            borderColor="divider.gray"
                            borderRadius={2}
                            opacity={isCancelled ? 0.5 : 1}
                        >
                            <TabletMobile>
                                <Image
                                    src={setImageSizeToUrl(
                                        imageUrl || defaultUserImage,
                                        30
                                    )}
                                    alt={dentistName}
                                    width={30}
                                    height={30}
                                    borderRadius="50%"
                                />
                                <Box fontSize={1} minWidth="108px">
                                    <Text
                                        fontWeight="bold"
                                        letterSpacing="-0.3px"
                                    >
                                        {moment(localStartTime).format(
                                            'MMM D, h:mmA'
                                        )}
                                    </Text>
                                    <Link to={`/office/${officeId}`}>
                                        <Text fontWeight="light">
                                            {officeName}
                                        </Text>
                                    </Link>
                                </Box>
                                <Box maxWidth="100px">
                                    <Link to={`/dentist/${dentist.id}`}>
                                        <Text
                                            textOverflow="ellipsis"
                                            whiteSpace="nowrap"
                                            overflow="hidden"
                                            fontWeight="medium"
                                            fontSize={1}
                                            letterSpacing="-0.3px"
                                        >
                                            {dentistName}
                                        </Text>
                                    </Link>
                                </Box>
                                <Button
                                    type="ghost"
                                    border="none"
                                    onClick={this.props.toggleModalState(id)}
                                >
                                    <Text color="text.blue" fontSize={0}>
                                        cancel
                                    </Text>
                                </Button>
                            </TabletMobile>
                            <Desktop>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    minWidth="474px"
                                >
                                    <Box
                                        textAlign="center"
                                        fontSize={4}
                                        minWidth="140px"
                                    >
                                        <Text fontWeight="bold">
                                            {moment(localStartTime).format(
                                                'ddd, M/D/YY'
                                            )}
                                        </Text>
                                        <Text fontWeight="light">
                                            {moment(localStartTime).format(
                                                'h:mm A'
                                            )}
                                        </Text>
                                    </Box>
                                    <Image
                                        src={setImageSizeToUrl(
                                            imageUrl || defaultUserImage,
                                            48
                                        )}
                                        alt={dentistName}
                                        width={48}
                                        height={48}
                                        borderRadius="50%"
                                    />
                                    <Box maxWidth="220px">
                                        <Link to={`/dentist/${dentist.id}`}>
                                            <Text
                                                textOverflow="ellipsis"
                                                whiteSpace="nowrap"
                                                overflow="hidden"
                                                fontWeight="medium"
                                                fontSize={4}
                                            >
                                                {dentistName}
                                            </Text>
                                        </Link>
                                        <Link to={`/office/${officeId}`}>
                                            <Text
                                                fontWeight="light"
                                                fontSize={4}
                                            >
                                                {officeName}
                                            </Text>
                                        </Link>
                                    </Box>
                                </Flex>
                                {moment().isBefore(moment(startTime)) && (
                                    <Button
                                        type="ghost"
                                        border="none"
                                        onClick={this.props.toggleModalState(
                                            id
                                        )}
                                    >
                                        <Text color="text.blue" fontSize={2}>
                                            cancel
                                        </Text>
                                    </Button>
                                )}
                            </Desktop>
                        </Flex>
                    </Fragment>
                );
            }
        );

    render() {
        const { appointments } = this.props;
        return (
            <Box>
                {!isEmpty(appointments) ? (
                    this.renderAppointments(appointments)
                ) : (
                    <NoAppointmentsCard text="You have no appointments yet!" />
                )}
            </Box>
        );
    }
}

const dentistShape = PropTypes.shape({
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        imageUrl: PropTypes.string,
    }),
});

const reservationShape = PropTypes.shape({
    office: PropTypes.shape({
        name: PropTypes.string,
    }),
});

PatientAppointments.propTypes = {
    appointments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            dentist: dentistShape,
            reservation: reservationShape,
            localStartTime: PropTypes.string,
            status: PropTypes.string,
        })
    ),
    toggleModalState: PropTypes.func,
};

export default PatientAppointments;
