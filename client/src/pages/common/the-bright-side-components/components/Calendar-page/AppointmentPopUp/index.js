import * as React from 'react';
import AppointmentPopUpView from './view';

class AppointmentPopUp extends React.Component {
    render() {
        return (
            <AppointmentPopUpView
                hasCancelButton={this.props.hasCancelButton}
                onCancel={this.props.onCancel}
                appointment={this.props.appointment}
            />
        );
    }
}

export default AppointmentPopUp;
