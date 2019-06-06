import * as React from 'react';
import ReservationPopUpView from './view';

class ReservationPopUp extends React.Component {
    render() {
        return <ReservationPopUpView reservation={this.props.reservation} />;
    }
}

export { ReservationPopUp };
