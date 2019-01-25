import React, { Component } from 'react';
import {
    MiniCalendar,
    OfficeFilter,
    UpcomingAppointments,
} from '@laguro/the-bright-side-components';
import moment from 'moment';

import { Box, Grid, Flex } from '../../../components/';
import DentistCalendar from '../DentistCalendar';
import { ACTIVE } from '../../../util/strings';
import AppointmentUpdateConfirmModal from './AppointmentUpdateConfirmModal';

const getActiveReservations = reservations =>
    reservations.filter(res => res.status === ACTIVE);

class DentistBookingsView extends Component {
    render() {
        const {
            isUpdateConfirmModalSubmitting,
            isUpdateConfirmModalVisible,
            handleUpdateCancellation,
            handleUpdateConfirmation,
        } = this.props;
        return (
            <Flex p={2}>
                <AppointmentUpdateConfirmModal
                    visible={isUpdateConfirmModalVisible}
                    loading={isUpdateConfirmModalSubmitting}
                    onConfirm={handleUpdateConfirmation}
                    onCancel={handleUpdateCancellation}
                />
                <Box mt={45}>
                    <Grid gridRowGap={16} mr={18}>
                        <MiniCalendar
                            reservations={getActiveReservations(
                                this.props.reservations
                            )}
                            date={this.props.date}
                            onChange={this.props.onDateChange}
                        />
                        <UpcomingAppointments
                            reservations={getActiveReservations(
                                this.props.reservations
                            )}
                            appointments={this.props.appointments
                                .filter(appt =>
                                    moment(appt.endTime).isAfter(moment())
                                )
                                .slice(0, 6)}
                        />
                        <OfficeFilter
                            defaultValue={this.props.officeIds}
                            onChange={this.props.onOfficeChange}
                            reservations={getActiveReservations(
                                this.props.reservations
                            )}
                        />
                    </Grid>
                </Box>
                <Box width="100%">
                    <DentistCalendar
                        refetch={this.props.refetch}
                        date={this.props.date}
                        appointments={this.props.appointments}
                        reservations={this.props.reservations}
                        offices={this.props.officeIds}
                        onNextWeek={this.props.onNextWeek}
                        onPrevWeek={this.props.onPrevWeek}
                        onMoveEvent={this.props.onMoveEvent}
                    />
                </Box>
            </Flex>
        );
    }
}
export default DentistBookingsView;
