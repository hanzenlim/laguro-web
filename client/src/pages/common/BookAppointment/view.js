import React from 'react';
import { Button, Checkbox, Flex, Link, Text, Box } from '../../../components';
import { TERMS_PAGE_URL } from '../../../util/urls';
import AppointmentConfirmation from '../AppointmentConfirmation';
import AvailableLocations from './AvailableLocations';
import AvailableTimes from './AvailableTimes';
import SuggestedDentist from './SuggestedDentist';
import { wrapperStyles } from '.';

const BookAppointmentView = props => {
    const {
        bookedAppointmentId,
        locationList,
        onBookNow,
        isBooking,
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
    } = props;

    if (bookedAppointmentId)
        return <AppointmentConfirmation appointmentId={bookedAppointmentId} />;

    return (
        <Box {...wrapperStyles}>
            {isShowingSuggestedDentist && (
                <SuggestedDentist
                    suggestedDentist={suggestedDentist}
                    onFindAnotherMatch={onFindAnotherMatch}
                    isFindAnotherMatchDisabled={isFindAnotherMatchDisabled}
                />
            )}
            {isShowingAvailableLocations && (
                <AvailableLocations locationList={locationList} />
            )}

            <AvailableTimes
                onSelectTimeSlot={onSelectTimeSlot}
                timeSlotList={timeSlotList}
                isFetchingNewData={isFetchingNewData}
            />

            <Flex pt={28} pb={34} alignItems="center" justifyContent="center">
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
                loading={isBooking}
                onClick={onBookNow}
                width="100%"
            >
                {/* <Text
                    color="text.white"
                    fontSize="14px"
                    fontWeight="bold"
                    letterSpacing="-0.3px"
                >

                </Text> */}
                Book now
            </Button>
        </Box>
    );
};

export default BookAppointmentView;
