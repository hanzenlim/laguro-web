import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import _find from 'lodash/find';

import { Button, Checkbox, Flex, Link, Text, Box } from '~/components';
import { TERMS_PAGE_URL } from '~/util/urls';
import AppointmentConfirmation from '../AppointmentConfirmation';
import AvailableLocations from './AvailableLocations';
import AvailableTimes from './AvailableTimes';
import SuggestedDentist from './SuggestedDentist';
import { wrapperStyles } from '.';
import { BookAppointmentDecision } from './BookAppointmentDecision';
import { getUserFullName, getUserId } from '~/util/userUtils';
import { getDentistFullName } from '~/util/dentistUtils';
import { getOfficeAddress } from '~/util/officeUtils';
import { SelectPatient } from './SelectPatient';
import { withScreenSizes } from '~/components/Responsive';
import { scrollToTop } from '~/util/windowUtils';
import { getUser } from '~/util/authUtils';
import emitter from '~/util/emitter';
import { useLogin } from '~/appContext';

const Container = styled(Box)`
    ${props => !props.visible && `display: none;`};
`;

// step one: location and time selection
// step two: decision
// step three: confirmation of scheduled appointment
function BookAppointmentView({
    onPatientSelect,
    desktopOnly,
    refetch,
    user,
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
    selectedTimeSlot,
    currentPatientId,
    bookedAppointmentId,
    patient,
    apptStartTime,
    dentist,
    office,
    onBookNow,
    isBooking,
    toggleLoginModal,
    appointmentRefetch,
    setOfficeId,
}) {
    const [currentPage, setCurrentPage] = useState('selection');

    const handleBookNow = () => {
        if (desktopOnly) {
            scrollToTop();
        }

        const userSaved = getUser();

        if (userSaved) {
            setCurrentPage('decision');
        } else {
            toggleLoginModal();
        }
    };

    const renderSelection = () => {
        const patients = _get(user, 'family.members', []);

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
                {patients && patients.length !== 0 && (
                    <Box mb={moduleMarginBottom}>
                        <SelectPatient
                            patients={_get(user, 'family.members')}
                            currentPatientId={currentPatientId}
                            onPatientSelect={onPatientSelect}
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
                            onSelectTimeSlot={onSelectTimeSlot}
                        />
                    </Box>
                )}

                {isShowingAvailableLocations && (
                    <Box mb={moduleMarginBottom}>
                        <AvailableLocations
                            locationList={locationList}
                            appointmentRefetch={appointmentRefetch}
                            setOfficeId={setOfficeId}
                        />
                    </Box>
                )}

                <AvailableTimes
                    onSelectTimeSlot={onSelectTimeSlot}
                    timeSlotList={timeSlotList}
                    isFetchingNewData={isFetchingNewData}
                    selectedTimeSlot={selectedTimeSlot}
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
                    disabled={isButtonDisabled || !selectedTimeSlot}
                    onClick={handleBookNow}
                    width="100%"
                >
                    Next
                </Button>
            </Box>
        );
    };

    const renderConfirmation = () => (
        <Box {...wrapperStyles}>
            <AppointmentConfirmation appointmentId={bookedAppointmentId} />
        </Box>
    );

    return (
        <Fragment>
            <Container visible={currentPage === 'selection'}>
                {renderSelection()}
            </Container>
            <Container visible={currentPage === 'decision'}>
                <BookAppointmentDecision
                    patientName={getUserFullName(patient)}
                    apptStartTime={apptStartTime}
                    dentistName={getDentistFullName(dentist)}
                    apptAddress={getOfficeAddress(office)}
                    onNext={async () => {
                        if (await onBookNow()) {
                            setCurrentPage('confirmation');
                        }
                    }}
                    onPrevious={() => setCurrentPage('selection')}
                    isBooking={isBooking}
                />
            </Container>
            <Container visible={currentPage === 'confirmation'}>
                {renderConfirmation()}
            </Container>
        </Fragment>
    );
}

export default withScreenSizes(BookAppointmentView);
