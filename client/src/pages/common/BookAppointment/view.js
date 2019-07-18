import React, { Fragment } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _find from 'lodash/find';

import { Button, Checkbox, Flex, Link, Text, Box } from '../../../components';
import { TERMS_PAGE_URL } from '../../../util/urls';
import AppointmentConfirmation from '../AppointmentConfirmation';
import AvailableLocations from './AvailableLocations';
import AvailableTimes from './AvailableTimes';
import SuggestedDentist from './SuggestedDentist';
import { wrapperStyles } from '.';
import { BookAppointmentDecision } from './BookAppointmentDecision';
import { getUserFullName } from '../../../util/userUtils';
import { getDentistFullName } from '../../../util/dentistUtils';
import { getOfficeAddress } from '../../../util/officeUtils';
import { SelectPatient } from './SelectPatient';
import { withScreenSizes } from '../../../components/Responsive';
import { scrollToTop } from '../../../util/windowUtils';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import { getUserId } from '../../../util/userUtils';

const Container = styled(Box)`
    ${props => !props.visible && `display: none;`};
`;

// step one: location and time selection
// step two: decision
// step three: confirmation of scheduled appointment
class BookAppointmentView extends React.Component {
    state = { currentPage: 'selection' };

    handleBookNow = () => {
        const { onPatientSelect, desktopOnly } = this.props;
        if (desktopOnly) {
            scrollToTop();
        }

        const userSaved = getUser();

        if (userSaved) {
            this.setState({ currentPage: 'decision' });
        } else {
            emitter.emit('loginModal', {
                sideEffect: async user => {
                    await this.props.refetch({ id: user.id });
                    const patientId = getUserId(
                        _find(_get(this.props.user, 'family.members'), [
                            'relationshipToPrimary',
                            'SELF',
                        ])
                    );
                    onPatientSelect && onPatientSelect(patientId);
                },
            });
        }
    };

    renderSelection = () => {
        const {
            locationList,
            onFindAnotherMatch,
            timeSlotList,
            isFetchingNewData,
            isShowingSuggestedDentist,
            isShowingAvailableLocations,
            hasAgreed,
            onToggleCheckbox,
            isButtonDisabled,
            onSelectTimeSlot,
            suggestedDentist,
            isFindAnotherMatchDisabled,
        } = this.props;

        const patients = _get(this.props.user, 'family.members');

        const moduleMarginBottom = [13, '', 25];

        return (
            <Box {...wrapperStyles}>
                <Text
                    fontWeight="medium"
                    fontSize={[3, '', 4]}
                    mb={[12, '', 16]}
                    letterSpacing="-0.5px"
                >
                    Make an appointment
                </Text>
                {_isArray(patients) && (
                    <Box mb={moduleMarginBottom}>
                        <SelectPatient
                            patients={_get(this.props.user, 'family.members')}
                            currentPatientId={this.props.currentPatientId}
                            onPatientSelect={this.props.onPatientSelect}
                        />
                    </Box>
                )}
                {isShowingSuggestedDentist && (
                    <Box mb={moduleMarginBottom}>
                        <SuggestedDentist
                            suggestedDentist={suggestedDentist}
                            onFindAnotherMatch={onFindAnotherMatch}
                            isFindAnotherMatchDisabled={
                                isFindAnotherMatchDisabled
                            }
                        />
                    </Box>
                )}

                {isShowingAvailableLocations && (
                    <Box mb={moduleMarginBottom}>
                        <AvailableLocations locationList={locationList} />
                    </Box>
                )}

                <AvailableTimes
                    onSelectTimeSlot={onSelectTimeSlot}
                    timeSlotList={timeSlotList}
                    isFetchingNewData={isFetchingNewData}
                />

                <Flex
                    pt={28}
                    pb={34}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Checkbox checked={hasAgreed} onChange={onToggleCheckbox} />
                    <Text
                        ml={11}
                        fontSize="12px"
                        letterSpacing="-0.3px"
                        lineHeight="1.5"
                    >
                        By clicking this checkbox, I am agreeing to{' '}
                        <Link to={TERMS_PAGE_URL} target="_blank" isExternal>
                            <Text is="span" color="text.blue">
                                Terms & Conditions
                            </Text>
                        </Link>
                    </Text>
                </Flex>
                <Button
                    disabled={isButtonDisabled}
                    onClick={this.handleBookNow}
                    width="100%"
                >
                    Next
                </Button>
            </Box>
        );
    };

    renderConfirmation = () => (
        <Box {...wrapperStyles}>
            <AppointmentConfirmation
                appointmentId={this.props.bookedAppointmentId}
            />
        </Box>
    );

    render() {
        return (
            <Fragment>
                <Container visible={this.state.currentPage === 'selection'}>
                    {this.renderSelection()}
                </Container>
                <Container visible={this.state.currentPage === 'decision'}>
                    <BookAppointmentDecision
                        patientName={getUserFullName(this.props.patient)}
                        apptStartTime={this.props.apptStartTime}
                        dentistName={getDentistFullName(this.props.dentist)}
                        apptAddress={getOfficeAddress(this.props.office)}
                        onNext={async () => {
                            if (await this.props.onBookNow()) {
                                this.setState({
                                    currentPage: 'confirmation',
                                });
                            }
                        }}
                        onPrevious={() =>
                            this.setState({
                                currentPage: 'selection',
                            })
                        }
                        isBooking={this.props.isBooking}
                    />
                </Container>
                <Container visible={this.state.currentPage === 'confirmation'}>
                    {this.renderConfirmation()}
                </Container>
            </Fragment>
        );
    }
}

export default withScreenSizes(BookAppointmentView);
