import React, { Component, Fragment } from 'react';
import { Modal, Box } from '@laguro/basic-components';
import styled from 'styled-components';
import {
    BigCalendar,
    ReservationPopUp,
    AppointmentPopUp,
} from '@laguro/the-bright-side-components';
import NewAppointment from '../NewAppointment';

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

const StyledButton = styled.button`
    width: 160px;
    height: 31px;
    border-radius: 15.5px;
    border: solid 1px #ececec;
    background-color: white;
    font-size: ${props => props.theme.fontSizes[0]};
    color: #303449;
`;

const StyledNewAppointmentModal = styled(Box)`
    position: absolute;
    top: 107px;
    right: 0;
    background: #f8f8f8;
    z-index: ${props => props.theme.zIndex.modal};
`;

class DentistCalendar extends Component {
    state = {
        showNewAppointment: false,
    };

    toggleShowNewAppointment = () => {
        this.setState({
            showNewAppointment: !this.state.showNewAppointment,
        });
    };

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
                        renderHeader={() => (
                            <div>
                                <StyledButton
                                    onClick={this.toggleShowNewAppointment}
                                >
                                    New Appointment
                                </StyledButton>
                                {this.state.showNewAppointment && (
                                    <StyledNewAppointmentModal>
                                        <NewAppointment
                                            onClose={
                                                this.toggleShowNewAppointment
                                            }
                                            refetch={this.props.refetch}
                                        />
                                    </StyledNewAppointmentModal>
                                )}
                            </div>
                        )}
                    />
                </StyledBigCalendarContainer>
            </Fragment>
        );
    }
}

export default DentistCalendar;
