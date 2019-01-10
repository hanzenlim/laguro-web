import React, { Component } from 'react';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import { Box, Loading } from '@laguro/basic-components';
import { getDentistIdQueryClient, getDentistQuery } from './queries';
import { RedirectErrorPage } from '../../GeneralErrorPage';
import DentistBookingsView from './view';

class DentistBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            // will be populated by OfficeFilter
            currentOfficeIds: null,
        };
    }

    getUniqueOfficeIdsFromReservations = reservations => [
        ...new Set(reservations.map(res => res.office.id)),
    ];

    // called by OfficeFilter
    onOfficeChange = officeIds =>
        this.setState({ currentOfficeIds: officeIds });

    // called by MiniCalendar
    onDateChange = date => {
        this.setState({ date });
    };

    onNextWeek = () => {
        const { date } = this.state;
        date.setDate(date.getDate() + 7);
        this.setState({ date });
    };

    onPrevWeek = () => {
        const { date } = this.state;
        date.setDate(date.getDate() - 7);
        this.setState({ date });
    };

    render() {
        const { currentOfficeIds } = this.state;

        return (
            <Query query={getDentistIdQueryClient}>
                {({ data: clientData }) => (
                    <Query
                        query={getDentistQuery}
                        fetchPolicy="network-only"
                        variables={{ id: clientData.activeUser.dentistId }}
                    >
                        {({ loading, error, data }) => {
                            if (error) return <RedirectErrorPage />;
                            if (loading)
                                return (
                                    <Box height="100vh">
                                        <Loading />
                                    </Box>
                                );

                            const appointments = _get(
                                data,
                                'getDentist.appointments'
                            );

                            const reservations = _get(
                                data,
                                'getDentist.reservations'
                            );

                            return (
                                <DentistBookingsView
                                    date={this.state.date}
                                    onDateChange={this.onDateChange}
                                    onNextWeek={this.onNextWeek}
                                    onPrevWeek={this.onPrevWeek}
                                    onOfficeChange={this.onOfficeChange}
                                    reservations={reservations}
                                    appointments={appointments}
                                    officeIds={
                                        currentOfficeIds ||
                                        this.getUniqueOfficeIdsFromReservations(
                                            reservations
                                        )
                                    }
                                />
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

export default DentistBookings;
