import {
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Image,
    Text,
    Icon,
} from '@laguro/basic-components';
import { Onboarding } from '@laguro/the-bright-side-components';
import _get from 'lodash/get';
import _groupBy from 'lodash/groupBy';
import _isEmpty from 'lodash/isEmpty';
import _mapValues from 'lodash/mapValues';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';
import * as React from 'react';
import styled from 'styled-components';
import { Rating } from '../../../components';

export const DentistRating = ({ rating, numReviews }) => (
    <Flex alignItems="center">
        <Rating disabled={true} fontSize="16px" value={rating} />
        <Text textAlign="center" ml={6} mt={4} fontSize={0} lineHeight="22.5px">
            {numReviews.toString()}
        </Text>
    </Flex>
);

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const StyledCard = styled(Card)`
    overflow: hidden;
`;

const StyledNextButton = styled(Button)`
    && {
        border-radius: 29px;
    }
`;

class AppointmentSelectionView extends React.PureComponent {
    renderDentistPanel = (dentists, date) => (
        <Grid gridRowGap="6px">
            {dentists.map(dentist => this.renderDentistCard(dentist, date))}
        </Grid>
    );

    renderDentistCard = (dentist, date) => {
        const availableTimes = this.props.moreMap[`${dentist.id}${date}`]
            ? dentist.availableTimes
            : dentist.availableTimes.slice(0, 3);
        const languages = _get(dentist, 'languages');
        return (
            <StyledCard p={0}>
                <Box px={28} py={26}>
                    <Flex mb={10}>
                        <Box width={103} mr={22}>
                            <Image
                                src={dentist.imageUrl}
                                width={103}
                                height={94}
                                borderRadius={4}
                            />
                        </Box>
                        <Box width="100%">
                            <Text textTransform="uppercase">
                                {' '}
                                {dentist.specialty}{' '}
                            </Text>
                            <Flex mb={9}>
                                <Text
                                    fontWeight="bold"
                                    fontSize={[3, 4, '']}
                                    mr={14}
                                >
                                    {dentist.name}
                                </Text>
                                <DentistRating
                                    rating={dentist.rating}
                                    numReviews={dentist.numReviews}
                                />
                            </Flex>
                            {!_isEmpty(dentist.procedures) &&
                            dentist.procedures.length ? (
                                <Flex flexWrap="wrap" mb={6}>
                                    {dentist.procedures.map(
                                        (procedure, index) => (
                                            <Button type="ghost" height="auto">
                                                <Box
                                                    bg={TAG_COLORS[index % 4]}
                                                    px={16}
                                                    borderRadius="19.5px"
                                                    mr="6px"
                                                    mb="6px"
                                                >
                                                    <Text
                                                        color="text.white"
                                                        lineHeight="20px"
                                                        fontSize={0}
                                                        letterSpacing="-0.4px"
                                                    >
                                                        {procedure}
                                                    </Text>
                                                </Box>
                                            </Button>
                                        )
                                    )}
                                </Flex>
                            ) : (
                                <Text mb={34}>No procedures selected.</Text>
                            )}
                            {!_isEmpty(dentist.insurance) && (
                                <Flex alignItems="center">
                                    <Icon type="insurance" />
                                    <Text fontSize={0} ml="8px">
                                        Accepts{' '}
                                        {dentist.insurance.length > 1
                                            ? dentist.insurance.map(
                                                  (sp, index) =>
                                                      index !==
                                                      dentist.insurance.length -
                                                          1
                                                          ? `${sp}, `
                                                          : `and ${sp}`
                                              )
                                            : dentist.insurance[0]}
                                    </Text>
                                </Flex>
                            )}
                            {!_isEmpty(languages) && (
                                <Flex alignItems="center">
                                    <Icon type="languages" />
                                    <Text fontSize={0} ml="8px">
                                        Languages spoken:{' '}
                                        {languages.length > 1
                                            ? dentist.languages.map(
                                                  (sp, index) =>
                                                      index !==
                                                      dentist.languages.length -
                                                          1
                                                          ? `${sp}, `
                                                          : `and ${sp}`
                                              )
                                            : languages[0]}
                                    </Text>
                                </Flex>
                            )}
                            <Text fontSize={0} mb={10}>
                                {`Appointment duration: ${
                                    dentist.appointmentDuration === 30
                                        ? '30 min'
                                        : '1 hour'
                                }`}
                            </Text>
                            <Text
                                mb={9}
                                fontWeight="medium"
                                fontSize={[2, 3, '']}
                            >
                                Available Times
                            </Text>
                            <Grid
                                gridTemplateColumns="repeat(4, 1fr)"
                                gridColumnGap="4px"
                                gridRowGap="4px"
                            >
                                {availableTimes.map((at, index) => (
                                    <Button
                                        height={40}
                                        width="100%"
                                        ghost={
                                            this.props.formikProps.values
                                                .appointmentSelected !==
                                            dentist.dentistTimeIds[index]
                                        }
                                        type={
                                            this.props.formikProps.values
                                                .appointmentSelected ===
                                                dentist.dentistTimeIds[index] &&
                                            'primary'
                                        }
                                        onClick={() => {
                                            this.props.formikProps.setFieldValue(
                                                'appointmentSelected',
                                                dentist.dentistTimeIds[index]
                                            );
                                        }}
                                    >
                                        {moment(at).format('h:mm A')}
                                    </Button>
                                ))}

                                {!this.props.moreMap[`${dentist.id}${date}`] &&
                                    dentist.availableTimes.length > 3 && (
                                        <Button
                                            height={40}
                                            width="100%"
                                            type="primary"
                                            onClick={() => {
                                                this.props.onMore(
                                                    `${dentist.id}${date}`
                                                );
                                            }}
                                        >
                                            More
                                        </Button>
                                    )}
                            </Grid>
                        </Box>
                    </Flex>
                </Box>
            </StyledCard>
        );
    };

    render() {
        // props.dentistTimes: multiple dentists with single startTime
        // e.g. [ { id: 'dentistId', startTime: "2019-02-05T15:48:43-08:00", ...},
        //        { id: 'dentistId', startTime: "2019-02-05T15:48:43-08:00", ...}, ]

        // e.g. { 'Feb 5, 2019': [{ id: 'dentistId', startTime: "15:48:43-08:00", ...}, { id: 'dentistId', startTime: "16:48:43-08:00", ...}, ...],
        //        'Feb 6, 2019': [{ id: 'dentistId2', startTime: "15:48:43-08:00", ...},{ id: 'dentistId2', startTime: "16:48:43-08:00", ...}, ...] }
        const dentistTimesGroupedByDates = _groupBy(
            this.props.dentistTimes,
            dt => moment(dt.startTime).format('MMM D, YYYY')
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
                            dentistTime => dentistTime.startTime
                        ),
                        dentistTimeIds: dentistTime.map(
                            dentistTime => dentistTime.id
                        ),
                    })
                )
        );

        return (
            <Box width={794} mb="100px">
                <Onboarding.StepTitleText text="Book an appointment" />
                <Onboarding.StepBlurbText text="Here are some of the dentists that are available in the next few days." />
                {_sortBy(Object.keys(dentistsGroupedByDates), [
                    val => moment(val),
                ]).map(date => (
                    <Box mb={25}>
                        <Box
                            mb={15}
                            textAlign="center"
                            fontWeight="bold"
                            color="text.blue"
                        >
                            <Onboarding.FormItemLabelText text={`${date}`} />
                        </Box>
                        {this.renderDentistPanel(
                            dentistsGroupedByDates[date],
                            date
                        )}
                    </Box>
                ))}
                {!_isEmpty(
                    this.props.formikProps.values.appointmentSelected
                ) && (
                    <Onboarding.FixedBox width={329}>
                        <StyledNextButton
                            width="329px"
                            height="50px"
                            loading={this.props.formikProps.isSubmitting}
                            onClick={() => this.props.formikProps.submitForm()}
                        >
                            Next
                        </StyledNextButton>
                    </Onboarding.FixedBox>
                )}
            </Box>
        );
    }
}

export default AppointmentSelectionView;
