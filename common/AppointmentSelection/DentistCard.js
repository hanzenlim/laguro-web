import React, { Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import {
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Image,
    Text,
    Icon,
    Rating,
} from '~/components';
import { getInsuranceText } from '~/util/insuranceUtil';
import { getFormatTextFromProps, getIntlLanguage } from '~/util/intlUtils';
import { DENTIST_SPECIALTY_TEXTS } from '~/util/dentistSpecialtyUtils';

import Procedures from './Procedures';

export const DentistRating = ({ rating, numReviews }) => (
    <Flex alignItems="center">
        <Rating disabled fontSize={15} value={rating} />
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

const DentistCard = props => {
    const { moreMap, formikProps, onMore, dentist, date } = props;
    const formatText = getFormatTextFromProps(props);
    const availableTimes = moreMap[`${dentist.id}${date}`]
        ? dentist.availableTimes
        : dentist.availableTimes.slice(0, 7);

    return (
        <StyledCard p={0}>
            <Box px={28} py={26}>
                <Flex mb={10}>
                    <Box width={103} mr={22}>
                        <Image
                            src={
                                dentist.imageUrl ||
                                '/static/images/defaultUserImage.svg'
                            }
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
                            {formatText(
                                DENTIST_SPECIALTY_TEXTS[dentist.specialty]
                            )}
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
                                <Text fontSize={1} lineHeight="17px" ml="8px">
                                    {formatText(
                                        'bookAppointment.bookAnAppointment.accepts'
                                    )}{' '}
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
                                                      : `${formatText(
                                                            'general.and'
                                                        )} ${getInsuranceText(
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
                                <Text fontSize={1} lineHeight="17px" ml="8px">
                                    {formatText('general.speaks')}{' '}
                                    {dentist.languages.length > 1 ? (
                                        dentist.languages.map((sp, index) =>
                                            index !==
                                            dentist.languages.length - 1 ? (
                                                <Text
                                                    is="span"
                                                    textTransform="capitalize"
                                                >{`${getIntlLanguage(
                                                    sp,
                                                    formatText
                                                )}, `}</Text>
                                            ) : (
                                                <Fragment>
                                                    {formatText('general.and')}
                                                    <Text
                                                        is="span"
                                                        textTransform="capitalize"
                                                    >{` ${getIntlLanguage(
                                                        sp,
                                                        formatText
                                                    )}`}</Text>
                                                </Fragment>
                                            )
                                        )
                                    ) : (
                                        <Text
                                            is="span"
                                            textTransform="capitalize"
                                        >
                                            {getIntlLanguage(
                                                dentist.languages[0],
                                                formatText
                                            )}
                                        </Text>
                                    )}
                                </Text>
                            </Flex>
                        )}

                        <Procedures procedures={dentist.procedures} />

                        <Text fontSize={1} mb={10}>
                            {`${formatText(
                                'bookAppointment.bookAnAppointment.appointmentDuration'
                            )}: ${
                                dentist.appointmentDuration === 30
                                    ? `30 ${formatText('general.minutes')}`
                                    : `1 ${formatText('general.hour')}`
                            }`}
                        </Text>

                        <Text
                            mb={16}
                            fontWeight="medium"
                            fontSize={1}
                            lineHeight="17px"
                            textAlign="left"
                        >
                            {formatText(
                                'bookAppointment.bookAnAppointment.availableTimes'
                            )}
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
                                        formikProps.values
                                            .appointmentSelected !==
                                        dentist.dentistTimeIds[index]
                                    }
                                    type={
                                        formikProps.values
                                            .appointmentSelected ===
                                            dentist.dentistTimeIds[index] &&
                                        'primary'
                                    }
                                    // TODO: Fix re render of whole page
                                    onClick={() => {
                                        formikProps.setFieldValue(
                                            'appointmentSelected',
                                            dentist.dentistTimeIds[index]
                                        );
                                    }}
                                >
                                    {moment(at).format('h:mm A')}
                                </Button>
                            ))}

                            {!moreMap[`${dentist.id}${date}`] &&
                                dentist.availableTimes.length > 7 && (
                                    <Button
                                        height={40}
                                        width="100%"
                                        ghost
                                        pb={10}
                                        fontWeight="700"
                                        onClick={() => {
                                            onMore(`${dentist.id}${date}`);
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

export default injectIntl(DentistCard);
