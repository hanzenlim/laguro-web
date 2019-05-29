/**
 * @class MiniCalendar
 */
import * as React from 'react';
import * as styledComponents from 'styled-components';
import { Theme } from '@laguro/basic-components';
import { getOfficeToColorMap, getOfficeIdsFromRes } from '../util';
import ReservationPopUpView from './view';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props {
    reservation: Reservation;
}

interface Office {
    id: string;
    name: string;
    imageUrls: string[];
    location: Location;
}

interface Location {
    name: string;
}

interface LocalAvailableTime {
    startTime: string;
    endTime: string;
}

interface User {
    firstName;
    lastName;
    imageUrl: string;
}

interface Host {
    user: User;
}

export interface Reservation {
    id: string;
    office: Office;
    localAvailableTimes: LocalAvailableTime[];
    appointments: Appointment[];
    numChairsSelected: number;
    equipmentSelected: string[];
    host: Host;
}

interface Appointment {
    id: string;
}

class ReservationPopUp extends React.Component<Props, {}> {
    render() {
        return (
            <ThemeProvider theme={Theme}>
                <ReservationPopUpView reservation={this.props.reservation} />
            </ThemeProvider>
        );
    }

    static defaultProps = {
        onChange: () => {}
    };
}

export default ReservationPopUp;
