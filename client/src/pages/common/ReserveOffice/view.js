import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Responsive } from '../../../components';
import SelectReservation from './SelectReservation';
import FindAppointment from './FindAppointment';
import Payment from '../Payment';
import PaymentConfirmation from '../PaymentConfirmation';
import SummaryCost from './SummaryCost';
import {
    SELECT_APPOINTMENT_VIEW,
    PAYMENT_VIEW,
    CONFIRMATION_VIEW,
} from '../../../util/strings';

const { Desktop, TabletMobile } = Responsive;

const ReserveOfficeView = ({
    findAvailabilityHandler,
    triggerFindReservations,
    selectedDates,
    officeId,
    currentDisplay,
    onChangeCurrentDisplay,
    onPay,
    onPayBackButton,
    onMakeReservation,
    updateEquipmentDetailsData,
    updateSummaryDetailsData,
    totalPrice,
    updateSummarySectionData,
    summaryList,
    onPayBtnText,
    isSubmitting,
    updateSubmittingState,
}) => (
    <Box>
        <Box
            boxShadow={['none', '', '1px 1px 7px 0 rgba(0, 0, 0, 0.15)']}
            border={['none', '', '1px solid']}
            borderColor={['', '', 'divider.gray']}
            pt={[0, '', 16]}
            pr={[0, '', 32]}
            pl={[0, '', 32]}
            pb={32}
        >
            {currentDisplay !== CONFIRMATION_VIEW && (
                <Text
                    mb={[10, '', 15]}
                    lineHeight="30px"
                    fontWeight="bold"
                    color="text.black"
                    fontSize={[1, '', 3]}
                >
                    <Desktop>Book a chair</Desktop>
                    <TabletMobile>Make an appointment</TabletMobile>
                </Text>
            )}
            {currentDisplay === SELECT_APPOINTMENT_VIEW && (
                <Fragment>
                    <FindAppointment
                        findAvailabilityHandler={findAvailabilityHandler}
                    />
                    <SelectReservation
                        officeId={officeId}
                        triggerQuery={triggerFindReservations}
                        selectedDates={selectedDates}
                        onChangeCurrentDisplay={onChangeCurrentDisplay}
                        onMakeReservation={onMakeReservation}
                        updateEquipmentDetailsData={updateEquipmentDetailsData}
                        updateSummaryDetailsData={updateSummaryDetailsData}
                        updateSummarySectionData={updateSummarySectionData}
                    />
                </Fragment>
            )}
            {currentDisplay === PAYMENT_VIEW && (
                <Fragment>
                    <Box mt={30}>
                        <SummaryCost
                            summaryData={summaryList}
                            totalPrice={totalPrice}
                        />
                    </Box>
                    <Box mt={60}>
                        <Payment
                            btnText={onPayBtnText}
                            onPay={onPay}
                            isSubmitting={isSubmitting}
                            updateSubmittingState={updateSubmittingState}
                            onBackButton={onPayBackButton}
                            hasBackButton={true}
                        />
                    </Box>
                </Fragment>
            )}

            {currentDisplay === CONFIRMATION_VIEW && (
                <Fragment>
                    <PaymentConfirmation
                        h1="YOUR BOOKING HAS BEEN MADE"
                        h2={null}
                        h3={null}
                    />
                </Fragment>
            )}
        </Box>
    </Box>
);

ReserveOfficeView.propTypes = {
    findAvailabilityHandler: PropTypes.func.isRequired,
    selectedDates: PropTypes.string,
    triggerFindReservations: PropTypes.bool.isRequired,
    officeId: PropTypes.string.isRequired,
    onChangeCurrentDisplay: PropTypes.func.isRequired,
    currentDisplay: PropTypes.string.isRequired,
};

export default ReserveOfficeView;
