import React, { Component, Fragment } from 'react';
import { Modal, Box } from '@laguro/basic-components';
import _get from 'lodash/get';
import styled from 'styled-components';
import CancelAppoinmentModal from '../Modals/CancelAppointmentModal';
import NewAppointment from '../NewAppointment';
import {
    CANCELLED,
    CANCELLED_BY_PATIENT,
    CANCELLED_BY_DENTIST,
} from '../../../util/strings';
import { ReservationPopUp } from '../the-bright-side-components/components/Calendar-page/ReservationPopUp';
import AppointmentPopUp from '../the-bright-side-components/components/Calendar-page/AppointmentPopUp';
import { BigCalendar } from '../the-bright-side-components/components/Calendar-page/BigCalendar';

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
    top: 108px;
    right: 2px;
    min-width: 373px;
    min-height: 80px;
    background: #f8f8f8;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: ${props => props.theme.zIndex.modal};
`;

class DentistCalendar extends Component {
    state = {
        showNewAppointment: false,
        appointmentIdToCancel: null,
        isPendingAppointment: false,
    };

    toggleShowNewAppointment = () => {
        this.setState({
            showNewAppointment: !this.state.showNewAppointment,
        });
    };

    togglCancelAppointment = () => {
        this.setState({ appointmentIdToCancel: null });
        this.props.closeApptModal();
        this.props.refetch();
    };

    onCancelAppointment = () => {
        this.setState({
            appointmentIdToCancel: this.props.appointment.id,
            isPendingAppointment: this.props.appointment.isPending,
        });
    };

    render() {
        const appointmentStatus = _get(this.props, 'appointment.status');
        const hasCancelButton =
            appointmentStatus !== CANCELLED &&
            appointmentStatus !== CANCELLED_BY_PATIENT &&
            appointmentStatus !== CANCELLED_BY_DENTIST;

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
                            onCancel={this.onCancelAppointment}
                            hasCancelButton={hasCancelButton}
                            appointment={this.props.appointment}
                        />
                    )}
                </StyledModal>
                <CancelAppoinmentModal
                    id={this.state.appointmentIdToCancel}
                    isPendingAppointment={this.state.isPendingAppointment}
                    cancellationType={CANCELLED_BY_DENTIST}
                    visible={this.state.appointmentIdToCancel !== null}
                    toggleModalState={this.togglCancelAppointment}
                    appointment={this.props.appointment}
                />
                <StyledBigCalendarContainer>
                    <BigCalendar
                        date={this.props.date}
                        onMoveEvent={this.props.onMoveEvent}
                        onEventClick={this.props.onAppointmentClick}
                        onBackgroundEventClick={this.props.onReservationClick}
                        events={this.props.appointmentEvents}
                        backgroundEvents={this.props.reservationEvents}
                        onNext={this.props.onNextWeek}
                        onPrev={this.props.onPrevWeek}
                        selectable={false}
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
                                            onSuccessApptCreation={
                                                this.props.refetch
                                            }
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
