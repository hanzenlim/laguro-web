/**
 * @class MiniCalendar
 */
import { Theme } from '@laguro/basic-components';
import * as React from 'react';
import * as styledComponents from 'styled-components';
import AppointmentPopUpView from './view';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props {
    appointment: Appointment;
    onCancel: any;
    hasCancelButton: boolean;
}

interface Office {
    id: string;
    name: string;
}

export interface Reservation {
    id: string;
    office: Office;
}

interface Patient {
    firstName: string;
    lastName: string;
    imageUrl: string;
}

export interface Appointment {
    id: string;
    startTime: string;
    endTime: string;
    patient: Patient;
    status: string;
    reservation: Reservation;
    notes: string;
    isPending: boolean;
    office: Office;
}

class AppointmentPopUp extends React.Component<Props, {}> {

    public static defaultProps = {
        onChange: () => {},
        hasCancelButton: false
    };
    public render() {
        return (
            <ThemeProvider theme={Theme}>
                <AppointmentPopUpView
                    hasCancelButton={this.props.hasCancelButton}
                    onCancel={this.props.onCancel}
                    appointment={this.props.appointment}
                />
            </ThemeProvider>
        );
    }
}

export default AppointmentPopUp;
