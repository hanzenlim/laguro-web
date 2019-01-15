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

const getActiveReservations = reservations =>
    reservations.filter(res => res.status === ACTIVE);

class DentistBookingsView extends Component {
    render() {
        return (
            <Flex p={2}>
                <Box mt={45}>
                    <Grid gridRowGap={16} mr={18}>
                        <MiniCalendar
                            reservations={getActiveReservations(
                                this.props.reservations
                            )}
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
                        date={this.props.date}
                        appointments={this.props.appointments}
                        reservations={this.props.reservations}
                        offices={this.props.officeIds}
                        onNextWeek={this.props.onNextWeek}
                        onPrevWeek={this.props.onPrevWeek}
                    />
                </Box>
            </Flex>
        );
    }
}
export default DentistBookingsView;
