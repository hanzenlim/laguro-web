import React, { useState, useEffect } from 'react';
import _upperCase from 'lodash/upperCase';
import _groupBy from 'lodash/groupBy';
import _isEmpty from 'lodash/isEmpty';
import _mapValues from 'lodash/mapValues';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import cookies from 'browser-cookies';

import { Box, Button, Flex, Grid, Text, Rating } from '~/components';
import { getFormatTextFromProps } from '~/util/intlUtils';
import { getOfficeName } from '~/util/officeUtils';
import SelectPatient from '~/common/BookAppointment/SelectPatient';
import { Onboarding } from '../the-bright-side-components';
import DentistCard from './DentistCard';

const StyledNextButton = styled(Button)`
    && {
        border-radius: 29px;
    }
`;

export const DentistRating = ({ rating, numReviews }) => (
    <Flex alignItems="center">
        <Rating disabled fontSize={15} value={rating} />
        <Text ml={6} fontSize={0}>
            {numReviews && numReviews !== 0 ? `(${numReviews.toString()})` : ''}
        </Text>
    </Flex>
);

const AppointmentSelectionView = props => {
    const {
        office,
        formikProps,
        dentistTimes: dentistTimesProp,
        moreMap,
        onMore,
    } = props;

    const [dentistList, setDentistList] = useState([]);
    const [dateList, setDateList] = useState([]);

    const formatText = getFormatTextFromProps(props);

    useEffect(() => {
        // props.dentistTimes: multiple dentists with single startTime
        // e.g. [ { id: 'dentistId', startTime: "2019-02-05T15:48:43-08:00", ...},
        //        { id: 'dentistId', startTime: "2019-02-05T15:48:43-08:00", ...}, ]

        // e.g. { 'Feb 5, 2019': [{ id: 'dentistId', startTime: "15:48:43-08:00", ...}, { id: 'dentistId', startTime: "16:48:43-08:00", ...}, ...],
        //        'Feb 6, 2019': [{ id: 'dentistId2', startTime: "15:48:43-08:00", ...},{ id: 'dentistId2', startTime: "16:48:43-08:00", ...}, ...] }
        const dentistTimesGroupedByDates = _groupBy(dentistTimesProp, dt =>
            moment(dt.startTime).format('MMM D, YYYY')
        );

        // e.g. { 'Feb 5, 2019': [{ id: 'dentistId', availableTimes: ["15:48:43-08:00", ...], ...}, ...],
        //        'Feb 6, 2019': [{ id: 'dentistId', availableTimes: ["15:48:43-08:00", ...], ...] }
        const dentistsGroupedByDates = _mapValues(
            dentistTimesGroupedByDates,
            dentistTimes =>
                Object.values(_groupBy(dentistTimes, 'dentistId')).map(
                    dentistTime => ({
                        ...dentistTime[0],
                        availableTimes: dentistTime.map(
                            dentistTimeItem => dentistTimeItem.startTime
                        ),
                        dentistTimeIds: dentistTime.map(
                            dentistTimeItem => dentistTimeItem.id
                        ),
                    })
                )
        );

        const sortedDentistsGroupedByDates = _sortBy(
            Object.keys(dentistsGroupedByDates),
            [val => moment(val)]
        );

        setDateList(sortedDentistsGroupedByDates);
        setDentistList(dentistsGroupedByDates);
    }, [dentistTimesProp]);

    return (
        <Box width={794} mb="100px">
            <Text
                fontWeight="bold"
                textAlign="center"
                fontSize={1}
                color="text.gray"
            >
                {_upperCase(getOfficeName(office))}
            </Text>
            <Onboarding.StepTitleText
                text={formatText(
                    'bookAppointment.bookAnAppointment.bookAppointment'
                )}
            />
            <Onboarding.StepBlurbText
                text={formatText(
                    'bookAppointment.bookAnAppointment.hereAreSome'
                )}
            />
            <SelectPatient
                onSetSelectedPatientId={selectedPatientId => {
                    cookies.set(
                        'kioskSelectedFamilyMember',
                        selectedPatientId,
                        {
                            expires: 0,
                        }
                    );
                }}
            />
            {dateList.map(date => (
                <Box mb={25}>
                    <Box
                        mb={15}
                        textAlign="center"
                        fontWeight="bold"
                        color="text.blue"
                    >
                        <Onboarding.FormItemLabelText text={`${date}`} />
                    </Box>
                    <Grid gridRowGap="13px">
                        {dentistList[date].map(dentist => (
                            <DentistCard
                                dentist={dentist}
                                date={date}
                                moreMap={moreMap}
                                formikProps={formikProps}
                                onMore={onMore}
                            />
                        ))}
                    </Grid>
                </Box>
            ))}
            {!_isEmpty(formikProps.values.appointmentSelected) && (
                <Onboarding.FixedBox width={329}>
                    <StyledNextButton
                        width="329px"
                        height="50px"
                        loading={formikProps.isSubmitting}
                        onClick={() => formikProps.submitForm()}
                    >
                        {formatText(
                            'bookAppointment.bookAnAppointment.bookAppt'
                        )}
                    </StyledNextButton>
                </Onboarding.FixedBox>
            )}
        </Box>
    );
};

export default injectIntl(AppointmentSelectionView);
