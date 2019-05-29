/**
 * @class MiniCalendar
 */
import * as React from 'react';
import * as styledComponents from 'styled-components';
import { Theme } from '@laguro/basic-components';
import { getOfficeToColorMap, getOfficeIdsFromRes } from '../util';
import UpcomingAppointmentsView from './view';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props {
    reservations: Reservation[];
    appointments: Appointment[];
}

interface Office {
    id: string;
    name: string;
}

interface LocalAvailableTime {
    startTime: string;
    endTime: string;
}

interface Reservation {
    id: string;
    office: Office;
    localAvailableTimes: LocalAvailableTime[];
}

export interface Appointment {
    id: string;
    startTime: string;
    endTime: string;
    patient: Patient;
    status: string;
    reservation: Reservation;
    isCancelled: boolean;
    isRejected: boolean;
    isPending: boolean;
}

interface Patient {
    firstName: string;
    lastName: string;
    imageUrl: string;
}

class UpcomingAppointments extends React.Component<Props, {}> {
    render() {
        return (
            <ThemeProvider theme={Theme}>
                <UpcomingAppointmentsView
                    appointments={this.props.appointments}
                    colorMap={getOfficeToColorMap(getOfficeIdsFromRes(this.props.reservations))}
                />
            </ThemeProvider>
        );
    }

    static defaultProps = {
        onChange: () => {}
    };
}

export default UpcomingAppointments;
