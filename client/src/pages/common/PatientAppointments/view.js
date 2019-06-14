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
    Icon,
} from '../../../components';
import { CANCELLED } from '../../../util/strings';
import { setImageSizeToUrl } from '../../../util/imageUtil';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const { TabletMobile, Desktop } = Responsive;

const filterAppointments = ({ appointments, isUpcoming }) =>
    appointments.filter(({ endTime }) =>
        isUpcoming
            ? moment(endTime).diff(moment()) > -1
            : moment(endTime).diff(moment()) < 0
    );

export const NoAppointmentsCard = ({ text }) => (
    <Fragment>
        <TabletMobile>
            <Box
                width="100%"
                height="100vh"
                alignItems="center"
                justifyContent="center"
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
            ({ id, localStartTime, startTime, dentist, office, status }) => {
                const { lastName, firstName, imageUrl } = dentist.user;
                const dentistName = `Dr. ${firstName} ${lastName}`;
                const { name: officeName, id: officeId, location } = office;
                const isCancelled = status === CANCELLED;

                return (
                    <Fragment>
                        <Flex
                            key={id}
                            justifyContent="space-between"
                            alignItems="flex-start"
                            p={[20, '', 30]}
                            mb={[10, '', 12]}
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
                                    width={40}
                                    height={40}
                                    borderRadius="50%"
                                    mr={10}
                                />
                                <Box fontSize={1} minWidth="108px">
                                    <Text
                                        fontWeight="bold"
                                        letterSpacing="-0.3px"
                                        style={{
                                            textDecoration:
                                                isCancelled && 'line-through',
                                        }}
                                    >
                                        {moment(localStartTime).format(
                                            'MMM D, h:mmA'
                                        )}
                                    </Text>
                                    <Link
                                        target="_blank"
                                        to={`/dentist/${dentist.id}`}
                                        isExternal
                                    >
                                        <Text
                                            textOverflow="ellipsis"
                                            whiteSpace="nowrap"
                                            overflow="hidden"
                                            fontWeight="medium"
                                            fontSize={1}
                                            letterSpacing="-0.3px"
                                            mb={15}
                                        >
                                            {dentistName}
                                        </Text>
                                    </Link>
                                    <Link
                                        target="_blank"
                                        to={`/office/${officeId}`}
                                        isExternal
                                    >
                                        <Text
                                            fontWeight="light"
                                            color="text.blue"
                                        >
                                            {officeName}
                                        </Text>
                                    </Link>
                                    <Text color="text.lightGray" mt={4}>
                                        <Icon
                                            type="locationPinWithFill"
                                            color="text.lightGray"
                                            fontSize={10}
                                            mr={5}
                                        />
                                        {location.name}
                                    </Text>
                                    {/* {!isCancelled && (
                                        <Box mt={15}>
                                            <Link to='/'>
                                                <Text color='text.blue'>
                                                    View Treatment Detail
                                                </Text>
                                            </Link>
                                            <Link to='/' color='text.blue'>
                                                <Text color='text.blue'>
                                                    View Receipt
                                                </Text>
                                            </Link>
                                        </Box>
                                    )} */}
                                </Box>
                                {isCancelled ? (
                                    <Text fontWeight="medium" fontSize={0}>
                                        cancelled
                                    </Text>
                                ) : (
                                    moment().isBefore(moment(startTime)) && (
                                        <Button
                                            type="ghost"
                                            border="none"
                                            height="auto"
                                            onClick={this.props.toggleModalState(
                                                id
                                            )}
                                        >
                                            <Text
                                                color="text.lightGray"
                                                fontSize={0}
                                            >
                                                cancel
                                            </Text>
                                        </Button>
                                    )
                                )}
                            </TabletMobile>
                            <Desktop>
                                <Flex
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                >
                                    <Text
                                        fontSize={2}
                                        mt={12}
                                        mr={30}
                                        style={{
                                            textDecoration:
                                                isCancelled && 'line-through',
                                        }}
                                        width={190}
                                        maxWidth="25%"
                                    >
                                        <Text fontWeight="bold" is="span">
                                            {moment(localStartTime).format(
                                                'ddd, M/D/YY'
                                            )}
                                        </Text>
                                        <Text fontWeight="light" is="span">
                                            {' '}
                                            {moment(localStartTime).format(
                                                'h:mm A'
                                            )}
                                        </Text>
                                    </Text>
                                    <Image
                                        src={setImageSizeToUrl(
                                            imageUrl || defaultUserImage,
                                            48
                                        )}
                                        alt={dentistName}
                                        width={40}
                                        height={40}
                                        borderRadius="50%"
                                        mr={30}
                                    />
                                    <Box mt={12} mr={30} maxWidth={300}>
                                        <Link
                                            target="_blank"
                                            to={`/dentist/${dentist.id}`}
                                            isExternal
                                        >
                                            <Text
                                                textOverflow="ellipsis"
                                                whiteSpace="nowrap"
                                                overflow="hidden"
                                                fontWeight="medium"
                                                fontSize={2}
                                            >
                                                {dentistName}
                                            </Text>
                                        </Link>
                                        <Link
                                            target="_blank"
                                            to={`/office/${officeId}`}
                                            isExternal
                                        >
                                            <Text
                                                fontWeight="light"
                                                fontSize={2}
                                                color="text.blue"
                                                mt={15}
                                            >
                                                {officeName}
                                            </Text>
                                        </Link>
                                        <Text color="text.lightGray" mt={4}>
                                            <Icon
                                                type="locationPinWithFill"
                                                color="text.lightGray"
                                                fontSize={10}
                                                mr={5}
                                            />
                                            {location.name}
                                        </Text>
                                        {/* {!isCancelled && (
                                            <Box mt={15}>
                                                <Link to='/' mr={10}>
                                                    <Text color='text.blue' is='span'>
                                                        View Treatment Detail
                                                    </Text>
                                                </Link>
                                                <Link to='/' color='text.blue'>
                                                    <Text color='text.blue' is='span'>
                                                        View Receipt
                                                    </Text>
                                                </Link>
                                            </Box>
                                        )} */}
                                    </Box>
                                </Flex>
                                {isCancelled ? (
                                    <Text
                                        fontWeight="medium"
                                        fontSize={2}
                                        mt={12}
                                    >
                                        cancelled
                                    </Text>
                                ) : (
                                    moment().isBefore(moment(startTime)) && (
                                        <Button
                                            type="ghost"
                                            border="none"
                                            height="auto"
                                            onClick={this.props.toggleModalState(
                                                id
                                            )}
                                        >
                                            <Text
                                                color="text.lightGray"
                                                mt={14}
                                            >
                                                cancel
                                            </Text>
                                        </Button>
                                    )
                                )}
                            </Desktop>
                        </Flex>
                    </Fragment>
                );
            }
        );

    render() {
        const { appointments } = this.props;
        const upcomingAppointments = filterAppointments({
            appointments,
            isUpcoming: true,
        });
        const pastAppointments = filterAppointments({
            appointments,
            isUpcoming: false,
        });
        return (
            <Box>
                {!isEmpty(appointments) ? (
                    <Fragment>
                        {upcomingAppointments.length ? (
                            <Box mb={50}>
                                <Text fontSize={2} fontWeight="medium" mb={8}>
                                    Upcoming appointments
                                </Text>
                                {this.renderAppointments(upcomingAppointments)}
                            </Box>
                        ) : null}
                        {pastAppointments.length ? (
                            <Box mb={50}>
                                <Text fontSize={2} fontWeight="medium" mb={8}>
                                    Past appointments
                                </Text>
                                {this.renderAppointments(pastAppointments)}
                            </Box>
                        ) : null}
                    </Fragment>
                ) : (
                    <NoAppointmentsCard text="There are no appointments to show" />
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
