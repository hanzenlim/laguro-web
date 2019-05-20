import React, { Fragment } from 'react';
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
import _groupBy from 'lodash/groupBy';
import _isEmpty from 'lodash/isEmpty';
import _mapValues from 'lodash/mapValues';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';
import styled from 'styled-components';
import { Rating } from '../../../components';
import { getInsuranceText } from '../../../util/insuranceUtil';

export const DentistRating = ({ rating, numReviews }) => (
    <Flex alignItems="center">
        <Rating disabled={true} fontSize={15} value={rating} />
        <Text ml={6} fontSize={0}>
            {numReviews && numReviews !== 0 ? `(${numReviews.toString()})` : ''}
        </Text>
    </Flex>
);

const StyledCard = styled(Card)`
    overflow: hidden;
    &&.ant-card-bordered {
        box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
            -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
    }
`;

const StyledNextButton = styled(Button)`
    && {
        border-radius: 29px;
    }
`;

class AppointmentSelectionView extends React.PureComponent {
    renderDentistPanel = (dentists, date) => (
        <Grid gridRowGap="13px">
            {dentists.map(dentist => this.renderDentistCard(dentist, date))}
        </Grid>
    );

    renderDentistCard = (dentist, date) => {
        const availableTimes = this.props.moreMap[`${dentist.id}${date}`]
            ? dentist.availableTimes
            : dentist.availableTimes.slice(0, 7);
        return (
            <StyledCard p={0}>
                <Box px={28} py={26}>
                    <Flex mb={10}>
                        <Box width={103} mr={22}>
                            <Image
                                src={dentist.imageUrl}
                                width={103}
                                height={103}
                                borderRadius="50%"
                            />
                        </Box>
                        <Box width="100%">
                            <Text
                                fontSize={14}
                                color="text.gray"
                                fontWeight="bold"
                                lineHeight="17px"
                                textTransform="uppercase"
                            >
                                {dentist.specialty}
                            </Text>
                            <Flex mb={4} alignItems="center">
                                <Text
                                    style={{
                                        'white-space': 'pre-line',
                                    }}
                                    fontWeight="bold"
                                    fontSize={4}
                                    lineHeight="24px"
                                    mr={9}
                                    color="#303449"
                                    textAlign="left"
                                >
                                    {dentist.name}
                                </Text>
                                <DentistRating
                                    rating={dentist.rating}
                                    numReviews={dentist.numReviews}
                                />
                            </Flex>

                            {!_isEmpty(dentist.acceptedInsurances) && (
                                <Flex alignItems="flex-start" mb={4}>
                                    <Icon type="insurance" />
                                    <Text
                                        fontSize={1}
                                        lineHeight="17px"
                                        ml="8px"
                                    >
                                        Accepts{' '}
                                        {dentist.acceptedInsurances.length > 1
                                            ? dentist.acceptedInsurances.map(
                                                  (sp, index) =>
                                                      index !==
                                                      dentist.acceptedInsurances
                                                          .length -
                                                          1
                                                          ? `${getInsuranceText(
                                                                sp
                                                            )}, `
                                                          : `and ${getInsuranceText(
                                                                sp
                                                            )}`
                                              )
                                            : getInsuranceText(
                                                  dentist.acceptedInsurances[0]
                                              )}
                                    </Text>
                                </Flex>
                            )}

                            {!_isEmpty(dentist.languages) && (
                                <Flex alignItems="center" mb={10}>
                                    <Icon type="languages" />
                                    <Text
                                        fontSize={1}
                                        lineHeight="17px"
                                        ml="8px"
                                    >
                                        Speaks{' '}
                                        {dentist.languages.length > 1 ? (
                                            dentist.languages.map((sp, index) =>
                                                index !==
                                                dentist.languages.length - 1 ? (
                                                    <Text
                                                        is="span"
                                                        textTransform="capitalize"
                                                    >{`${sp.toLowerCase()}, `}</Text>
                                                ) : (
                                                    <Fragment>
                                                        and
                                                        <Text
                                                            is="span"
                                                            textTransform="capitalize"
                                                        >{` ${sp.toLowerCase()}`}</Text>
                                                    </Fragment>
                                                )
                                            )
                                        ) : (
                                            <Text
                                                is="span"
                                                textTransform="capitalize"
                                            >
                                                {dentist.languages[0].toLowerCase()}
                                            </Text>
                                        )}
                                    </Text>
                                </Flex>
                            )}

                            <Text fontSize={1} mb={10}>
                                {`Appointment duration: ${
                                    dentist.appointmentDuration === 30
                                        ? '30 min'
                                        : '1 hour'
                                }`}
                            </Text>

                            <Text
                                mb={16}
                                fontWeight="medium"
                                fontSize={1}
                                lineHeight="17px"
                                textAlign="left"
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
                                    dentist.availableTimes.length > 7 && (
                                        <Button
                                            height={40}
                                            width="100%"
                                            ghost
                                            pb={10}
                                            fontWeight="700"
                                            onClick={() => {
                                                this.props.onMore(
                                                    `${dentist.id}${date}`
                                                );
                                            }}
                                        >
                                            ...
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
                            dentistTimeItem => dentistTimeItem.startTime
                        ),
                        dentistTimeIds: dentistTime.map(
                            dentistTimeItem => dentistTimeItem.id
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
