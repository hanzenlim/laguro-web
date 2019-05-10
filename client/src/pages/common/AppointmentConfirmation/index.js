import _get from 'lodash/get';
import moment from 'moment-timezone';
import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { Query } from 'react-apollo';
import { Loading } from '../../../components';
import { trackBookAppointment } from '../../../util/trackingUtils';
import { RedirectErrorPage } from '../../GeneralErrorPage';
import { getAppointmentQuery } from './queries';
import AppointmentConfirmationView from './view';
import { stripTimezone } from '../../../util/timeUtil';
import history from '../../../history';
import { formatAddress } from '../../../util/styleUtil';

const Composed = adopt({
    getAppointment: ({ render, appointmentId }) => (
        <Query query={getAppointmentQuery} variables={{ id: appointmentId }}>
            {render}
        </Query>
    ),
});

class AppointmentConfirmation extends PureComponent {
    getInternalPage = () => {
        const isOnOfficePage = history.location.pathname.includes('office');
        const isOnDentistPage = history.location.pathname.includes('dentist');

        if (isOnOfficePage) {
            return 'office';
        }

        if (isOnDentistPage) {
            return 'dentist';
        }

        return '';
    };

    render() {
        const { appointmentId } = this.props;

        return (
            <Composed appointmentId={appointmentId}>
                {({ getAppointment }) => {
                    const data = _get(getAppointment, 'data.getAppointment');
                    const loading = _get(getAppointment, 'loading');
                    const error = _get(getAppointment, 'error');

                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    const internalPage = this.getInternalPage();
                    const officeId = _get(data, 'office.id');

                    trackBookAppointment({
                        appointmentId: _get(data, 'id'),
                        dentistId: _get(data, 'dentist.id'),
                        city: _get(data, 'timezone'),
                        weekDay: moment(_get(data, 'localStartTime')).format(
                            'dddd'
                        ),
                        hour: moment(_get(data, 'localStartTime')).format(
                            'hh:mm a'
                        ),
                        internalPage,
                        eventAction: 'Conversion',
                        // TODO: Put back when API is ready
                        officeId,
                    });

                    return (
                        <AppointmentConfirmationView
                            h1="YOUR BOOKING IS CONFIRMED"
                            h2={moment(
                                stripTimezone(_get(data, 'localStartTime'))
                            )
                                .utcOffset(0, true)
                                .format('LLLL')}
                            h3={formatAddress(_get(data, 'location.name'))}
                            appointmentId={_get(data, 'id')}
                            officeId={officeId}
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default AppointmentConfirmation;
