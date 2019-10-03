import _get from 'lodash/get';
import moment from 'moment-timezone';
import React, { PureComponent, Component } from 'react';
import { adopt } from 'react-adopt';
import { Query } from 'react-apollo';
import _isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';

import { Loading } from '~/components';
import { trackBookAppointment } from '~/util/trackingUtils';
import { RedirectErrorPage } from '~/routes/GeneralErrorPage';
import { getAppointmentQuery } from './queries';
import AppointmentConfirmationView from './view';
import { stripTimezone } from '~/util/timeUtil';
import { formatAddress } from '~/util/styleUtil';

const Composed = adopt({
    getAppointment: ({ render, appointmentId }) => (
        <Query
            query={getAppointmentQuery}
            variables={{ id: appointmentId }}
            skip={_isEmpty(appointmentId)}
        >
            {render}
        </Query>
    ),
});

class AppointmentConfirmation extends Component {
    getInternalPage = () => {
        const router = useRouter();
        const isOnOfficePage = router.asPath.includes('office');
        const isOnDentistPage = router.asPath.includes('dentist');

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

                    const localStartTime = _get(data, 'localStartTime');

                    return (
                        <AppointmentConfirmationView
                            h1="YOUR BOOKING IS CONFIRMED"
                            h2={
                                !_isEmpty(localStartTime) &&
                                moment(stripTimezone(localStartTime))
                                    .utcOffset(0, true)
                                    .format('LLLL')
                            }
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
