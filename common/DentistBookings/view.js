import React, { Component } from 'react';
import moment from 'moment';
import { Box, Grid, Flex } from '~/components/';
import DentistCalendar from '../DentistCalendar';
import AppointmentUpdateConfirmModal from './AppointmentUpdateConfirmModal';
import { MiniCalendar } from '../the-bright-side-components/components/Calendar-page/MiniCalendar';
import { UpcomingAppointments } from '../the-bright-side-components/components/Calendar-page/UpcomingAppointments';
import { OfficeFilter } from '../the-bright-side-components/components/Calendar-page/OfficeFilter';

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
                            reservations={this.props.officeListings}
                            date={this.props.date}
                            onChange={this.props.onDateChange}
                        />
                        <UpcomingAppointments
                            reservations={this.props.officeListings}
                            appointments={this.props.appointments
                                .filter(appt =>
                                    moment(appt.endTime).isAfter(moment())
                                )
                                .slice(0, 6)}
                        />
                        <OfficeFilter
                            defaultValue={this.props.officeIds}
                            onChange={this.props.onOfficeChange}
                            reservations={this.props.officeListings}
                        />
                    </Grid>
                </Box>
                <Box width="100%">
                    <DentistCalendar
                        refetch={this.props.refetch}
                        date={this.props.date}
                        appointments={this.props.appointments}
                        reservations={this.props.officeListings}
                        officeIds={this.props.officeIds}
                        onNextWeek={this.props.onNextWeek}
                        onPrevWeek={this.props.onPrevWeek}
                        onMoveEvent={this.props.onMoveEvent}
                        allOfficeIds={this.props.allOfficeIds}
                    />
                </Box>
            </Flex>
        );
    }
}
export default DentistBookingsView;
