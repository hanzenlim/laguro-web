import * as React from 'react';
import { getOfficeToColorMap, getOfficeIdsFromRes } from '../util';
import UpcomingAppointmentsView from './view';

class UpcomingAppointments extends React.Component {
    render() {
        return (
            <UpcomingAppointmentsView
                appointments={this.props.appointments}
                colorMap={getOfficeToColorMap(
                    getOfficeIdsFromRes(this.props.reservations)
                )}
            />
        );
    }

    static defaultProps = {
        onChange: () => {},
    };
}

export { UpcomingAppointments };
