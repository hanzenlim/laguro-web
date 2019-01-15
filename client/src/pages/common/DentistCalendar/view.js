import React, { Component, Fragment } from 'react';
import { Modal, Box } from '@laguro/basic-components';
import styled from 'styled-components';
import {
    BigCalendar,
    ReservationPopUp,
    AppointmentPopUp,
} from '@laguro/the-bright-side-components';

const StyledModal = styled(Modal)`
    && {
        .ant-modal-body {
            padding: 0;
        }
    }
`;

const StyledBigCalendarContainer = styled(Box)`
    && {
        .rbc-time-view {
            background: ${props => props.theme.colors.background.white};
        }
    }
`;

class DentistCalendar extends Component {
    render() {
        return (
            <Fragment>
                <StyledModal
                    onCancel={this.props.closeResModal}
                    destroyOnClose={true}
                    visible={this.props.resId}
                    width={365}
                    closable={true}
                >
                    {this.props.resId && (
                        <ReservationPopUp
                            reservation={this.props.reservation}
                        />
                    )}
                </StyledModal>
                <StyledModal
                    onCancel={this.props.closeApptModal}
                    destroyOnClose={true}
                    visible={this.props.apptId}
                    width={365}
                    closable={true}
                >
                    {this.props.apptId && (
                        <AppointmentPopUp
                            appointment={this.props.appointment}
                        />
                    )}
                </StyledModal>
                <StyledBigCalendarContainer>
                    <BigCalendar
                        date={this.props.date}
                        onEventClick={this.props.onAppointmentClick}
                        onBackgroundEventClick={this.props.onReservationClick}
                        events={this.props.appointmentEvents}
                        backgroundEvents={this.props.reservationEvents}
                        onNext={this.props.onNextWeek}
                        onPrev={this.props.onPrevWeek}
                    />
                </StyledBigCalendarContainer>
            </Fragment>
        );
    }
}

export default DentistCalendar;
