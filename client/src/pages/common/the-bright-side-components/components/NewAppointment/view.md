import React, { Fragment } from 'react';
import AppointmentForm from './components/AppointmentForm';
import {
    Theme,
} from '@laguro/basic-components';
import * as styledComponents from 'styled-components';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

const NewAppointmentView = ({ onClose, onMakeAnotherAppt, ...rest }) => {
    const { data, patientsName, firstAppointmentDuration, onFilter, onSubmit } = rest;
    return (
        <Fragment>
                <ThemeProvider theme={Theme}>
                    <AppointmentForm 
                        data={data}
                        patientsName={patientsName}
                        firstAppointmentDuration={firstAppointmentDuration}
                        onFilter={onFilter}
                        onSubmit={onSubmit}
                        onClose={onClose}
                    />
                </ThemeProvider>
        </Fragment>
    )
};

export default NewAppointmentView;
