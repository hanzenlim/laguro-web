import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';
import { Collapse } from 'antd';
import {
    Box,
    Text,
    Flex,
    Image,
    Button,
    Link,
    Responsive,
} from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import { NoAppointmentsCard } from '../PatientAppointments/view';
import { CANCELLED } from '../../../util/strings';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)`
    &&.ant-collapse {
        background-color: ${props => props.theme.colors.background.white};

        .ant-collapse-item .ant-collapse-header {
            padding: 20px 24px;
            .arrow {
                line-height: 12px;
                transform: unset;
                -webkit-transform: unset;
                right: 14px;
                top: 21px;
                left: unset;
                width: 12px;
            }
        }

        .ant-collapse-content-active {
            background-color: #fbfbfb;
        }

        .ant-collapse-content-box {
            padding: 14px 28px;
        }
    }
`;

const { TabletMobile, Desktop } = Responsive;

const StyledList = styled.ul`
    ${props => props.columns && `columns: ${props.columns}`};
    list-style-position: inside;
    padding: 0;
    margin: 0;

    > li {
        page-break-inside: avoid;
        break-inside: avoid;
    }
`;

class DentistAppointments extends PureComponent {
    renderReservations = reservations => {
        const { tabletMobileOnly } = this.props;
        const resContents = reservations.map(
            ({
                id,
                office,
                localAvailableTimes,
                numChairsSelected,
                equipmentSelected,
                appointments,
            }) => {
                const isAppointmentsEmpty = isEmpty(appointments);
                return tabletMobileOnly ? (
                    <Panel
                        header={
                            <Box>
                                <Text fontWeight="bold" fontSize={2} mb={6}>
                                    {office.name}
                                </Text>
                                <Box ml={30}>
                                    <StyledList>
                                        {this.renderAvailableTimes(
                                            localAvailableTimes
                                        )}
                                    </StyledList>
                                </Box>
                            </Box>
                        }
                        key={id}
                    >
                        <Text fontWeight="bold" fontSize={1} mb={8}>
                            Equipments ordered
                        </Text>
                        <Box ml={30} mb={20}>
                            <StyledList columns={2}>
                                <li>
                                    <Text
                                        fontSize={1}
                                        lineHeight="20px"
                                        display="inline"
                                    >
                                        {`${numChairsSelected} chair${
                                            numChairsSelected > 1 ? 's' : ''
                                        }`}
                                    </Text>
                                </li>
                                {this.renderEquipment(equipmentSelected)}
                            </StyledList>
                        </Box>
                        <Text fontWeight="bold" fontSize={1} mb={16}>
                            Appointments
                        </Text>
                        <Box mt>
                            {!isEmpty(appointments) ? (
                                this.renderAppointments(appointments)
                            ) : (
                                <Text
                                    mb={14}
                                    fontSize={1}
                                    textAlign="center"
                                    color="text.gray"
                                >
                                    NO APPOINTMENTS
                                </Text>
                            )}
                        </Box>
                    </Panel>
                ) : (
                    <Box mb={50} key={id}>
                        <Flex justifyContent="flex-end" mb={12}>
                            <Button
                                type="ghost"
                                onClick={
                                    isAppointmentsEmpty
                                        ? this.props.toggleModalState(id)
                                        : null
                                }
                            >
                                <Text
                                    color={
                                        isAppointmentsEmpty
                                            ? 'text.blue'
                                            : 'text.gray'
                                    }
                                    fontSize={2}
                                >
                                    cancel
                                </Text>
                            </Button>
                        </Flex>
                        <Box
                            bg="background.white"
                            border="1px solid"
                            borderColor="divider.gray"
                            borderRadius={2}
                            px={28}
                            py={16}
                        >
                            <Link to={`/office/${office.id}`}>
                                <Text fontWeight="bold" fontSize={5} mb={28}>
                                    {office.name}
                                </Text>
                            </Link>
                            <Text fontWeight="bold" fontSize={3} mt={12} mb={8}>
                                Bookings
                            </Text>
                            <StyledList>
                                {this.renderAvailableTimes(localAvailableTimes)}
                            </StyledList>
                            <Text fontWeight="bold" fontSize={3} mt={12} mb={8}>
                                Equipments ordered
                            </Text>
                            <StyledList columns={3}>
                                <li>
                                    <Text
                                        fontSize={0}
                                        lineHeight="20px"
                                        display="inline"
                                    >
                                        {`${numChairsSelected} chair${
                                            numChairsSelected > 1 ? 's' : ''
                                        }`}
                                    </Text>
                                </li>
                                {this.renderEquipment(equipmentSelected)}
                            </StyledList>
                            <Box mt={38}>
                                {!isEmpty(appointments) ? (
                                    this.renderAppointments(appointments)
                                ) : (
                                    <Text
                                        textAlign="center"
                                        color="text.darkGray"
                                    >
                                        NO APPOINTMENTS
                                    </Text>
                                )}
                            </Box>
                        </Box>
                    </Box>
                );
            }
        );

        return (
            <Fragment>
                <TabletMobile>
                    <StyledCollapse defaultActiveKey={[reservations[0]]}>
                        {resContents}
                    </StyledCollapse>
                </TabletMobile>
                <Desktop>{resContents}</Desktop>
            </Fragment>
        );
    };

    renderAvailableTimes = localAvailableTimes =>
        localAvailableTimes.map((availableTime, index) => {
            const date = moment(availableTime.startTime).format('ddd M/D/YYYY');
            const start = moment(availableTime.startTime).format('h:mm A');
            const end = moment(availableTime.endTime).format('h:mm A');

            return (
                <li key={index}>
                    <Box fontSize={[0, '', 2]} display="inline">
                        <Text
                            display="inline"
                            lineHeight={['20px', '', 'inherit']}
                        >
                            {date},{' '}
                        </Text>
                        <Text
                            display="inline"
                            lineHeight={['20px', '', 'inherit']}
                            fontWeight={['regular', '', 'light']}
                        >
                            {start} - {end}
                        </Text>
                    </Box>
                </li>
            );
        });

    renderEquipment = equipment =>
        equipment.map((item, index) => (
            <li key={index}>
                <Text fontSize={0} lineHeight="20px" display="inline">
                    {item}
                </Text>
            </li>
        ));

    renderAppointments = appointments =>
        appointments.map(({ id, startTime, patient, status }) => {
            const name = `${patient.firstName} ${patient.lastName}`;
            const isCancelled = status === CANCELLED;
            return (
                <Fragment>
                    <TabletMobile>
                        <Flex
                            key={id}
                            justifyContent="space-between"
                            alignItems="center"
                            py={20}
                            px={25}
                            bg="background.white"
                            border="1px solid"
                            borderColor="divider.gray"
                            borderRadius={2}
                            opacity={isCancelled ? 0.5 : 1}
                        >
                            <Box fontSize={1} minWidth="100px">
                                <Box minWidth="138px">
                                    <Text fontWeight="bold">
                                        {moment(startTime).format(
                                            'MM/D, h:mm A'
                                        )}
                                    </Text>
                                </Box>
                                <Box maxWidth="170px">
                                    <Text
                                        textOverflow="ellipsis"
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                    >
                                        {name}
                                    </Text>
                                </Box>
                            </Box>
                            <Image
                                src={patient.imageUrl || defaultUserImage}
                                alt={name}
                                width={38}
                                height={38}
                                borderRadius="50%"
                            />
                        </Flex>
                    </TabletMobile>

                    <Desktop>
                        <Flex
                            key={id}
                            justifyContent="space-between"
                            alignItems="center"
                            py={20}
                            px={30}
                            mb={10}
                            bg="background.white"
                            border="1px solid"
                            borderColor="divider.gray"
                            borderRadius={2}
                            opacity={isCancelled ? 0.5 : 1}
                        >
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                                fontSize={4}
                                position="relative"
                                minWidth="352px"
                            >
                                <Box textAlign="center" minWidth="138px">
                                    <Text fontWeight="bold">
                                        {moment(startTime).format(
                                            'ddd, M/D, YYYY'
                                        )}
                                    </Text>
                                    <Text fontWeight="light">
                                        {moment(startTime).format('h:mm A')}
                                    </Text>
                                </Box>
                                <Box maxWidth="170px">
                                    <Text
                                        textOverflow="ellipsis"
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                    >
                                        {name}
                                    </Text>
                                </Box>
                            </Flex>
                            <Image
                                src={patient.imageUrl || defaultUserImage}
                                alt={name}
                                width={38}
                                height={38}
                                borderRadius="50%"
                            />
                        </Flex>
                    </Desktop>
                </Fragment>
            );
        });

    render() {
        const { reservations } = this.props;

        return (
            <Box>
                <Box>
                    {!isEmpty(reservations) ? (
                        this.renderReservations(reservations)
                    ) : (
                        <NoAppointmentsCard text="You have no bookings yet!" />
                    )}
                </Box>
            </Box>
        );
    }
}

// PropTypes
const appointmentShape = PropTypes.shape({
    id: PropTypes.string,
    startTime: PropTypes.string,
    patient: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        imageUrl: PropTypes.string,
    }),
    status: PropTypes.string,
});

const localAvailableTimeshape = PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
});

const officeShape = PropTypes.shape({
    name: PropTypes.string,
});

DentistAppointments.propTypes = {
    reservations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            office: officeShape,
            localAvailableTimes: PropTypes.arrayOf(localAvailableTimeshape),
            numChairsSelected: PropTypes.number,
            equipmentSelected: PropTypes.arrayOf(PropTypes.string),
            appointments: PropTypes.arrayOf(appointmentShape),
        })
    ),
    toggleModalState: PropTypes.func.isRequired,
};

export default withScreenSizes(DentistAppointments);
