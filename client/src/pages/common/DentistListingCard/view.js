import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import {
    Icon,
    Box,
    Button,
    Card,
    Flex,
    Image,
    Rating,
    Text,
} from '../../../components/index';
import { withScreenSizes } from '../../../components/Responsive';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const StyledCard = styled(Card)`
    &&.ant-card-bordered {
        border-radius: 0;
        box-shadow: none;
        border: 1px solid #ececec;
    }

    @media (min-width: ${props => props.theme.breakpoints[1]}) {
        &&.ant-card-bordered {
            border: none;
            box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
                -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
        }
    }

    && {
        .ant-card-body {
            padding: 14px 20px;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                padding: 24px 26px;
            }
        }
    }
`;

class DentistListingCard extends PureComponent {
    handleSelectAppointment = e => {
        e.stopPropagation();

        const { start, reservation } = e.currentTarget.dataset;

        const appointment = {
            startTime: start,
            address: this.props.dentist.address,
            reservationId: reservation,
            url: this.props.dentist.url,
        };

        if (this.props.onSelectAppointment) {
            this.props.onSelectAppointment(appointment);
        }
    };

    render() {
        const { dentist, variant, onRedirect, desktopOnly } = this.props;
        const isShowMoreVisibile =
            (desktopOnly &&
                dentist.availableTimes &&
                dentist.availableTimes.length > 7) ||
            (!desktopOnly &&
                dentist.availableTimes &&
                dentist.availableTimes.length > 3);

        const earliestAvailableDate =
            dentist.availableTimes.length > 0 &&
            moment(dentist.availableTimes[0].startTime).format('dddd, MMMM D');

        const availableTimes =
            dentist.availableTimes && desktopOnly
                ? dentist.availableTimes.slice(0, 7)
                : dentist.availableTimes.slice(0, 3);

        return (
            <Button
                type="ghost"
                height="auto"
                width="100%"
                onClick={onRedirect}
            >
                <StyledCard>
                    <Box>
                        <Flex mb={10}>
                            <Box
                                display={['none', 'block']}
                                width={variant === 'small' ? '90px' : '136px'}
                                mr={32}
                            >
                                <Image
                                    src={dentist.imageUrl || defaultUserImage}
                                    width="100%"
                                    height="auto"
                                    borderRadius="50%"
                                />
                            </Box>
                            <Box width="100%">
                                <Flex>
                                    <Box
                                        display={['block', 'none']}
                                        width={'46px'}
                                        mr={17}
                                    >
                                        <Image
                                            src={
                                                dentist.imageUrl ||
                                                defaultUserImage
                                            }
                                            width="100%"
                                            height="auto"
                                            borderRadius="50%"
                                        />
                                    </Box>
                                    <Flex
                                        flex="1"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                    >
                                        <Text
                                            fontSize={['11px', '14px']}
                                            color="#c7c7c7"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                        >
                                            {dentist.specialty}
                                        </Text>
                                        <Flex
                                            mb={4}
                                            alignItems={
                                                variant === 'small'
                                                    ? 'flex-start'
                                                    : ['flex-start', 'center']
                                            }
                                            flexDirection={
                                                variant === 'small'
                                                    ? 'column'
                                                    : ['column', 'row']
                                            }
                                        >
                                            <Text
                                                style={{
                                                    'white-space': 'pre-line',
                                                }}
                                                fontWeight="bold"
                                                fontSize={['14px', '20px']}
                                                mr={14}
                                                color="#303449"
                                                textAlign="left"
                                            >
                                                {dentist.name}
                                            </Text>
                                            <Flex
                                                alignItems="flex-end"
                                                lineHeight="15px"
                                            >
                                                <Rating
                                                    disabled={true}
                                                    fontSize={['12px', '15px']}
                                                    value={dentist.rating}
                                                />
                                                <Text ml={6} fontSize="12px">
                                                    {dentist.reviewCount &&
                                                    dentist.reviewCount !== 0
                                                        ? `(${
                                                              dentist.reviewCount
                                                          })`
                                                        : ''}
                                                </Text>
                                            </Flex>
                                        </Flex>

                                        <Text
                                            style={{
                                                'white-space': 'pre-line',
                                            }}
                                            mb={8}
                                            fontSize="12px"
                                            color="#9b9b9b"
                                            fontWeight="normal"
                                            textTransform="uppercase"
                                            textAlign="left"
                                        >
                                            {dentist.address}
                                        </Text>
                                    </Flex>
                                </Flex>

                                {!_isEmpty(dentist.insurance) && (
                                    <Flex alignItems="center">
                                        <Icon type="insurance" />
                                        <Text
                                            fontSize={['12px', '14px']}
                                            ml="8px"
                                        >
                                            Accepts{' '}
                                            {dentist.insurance.length > 1
                                                ? dentist.insurance.map(
                                                      (sp, index) =>
                                                          index !==
                                                          dentist.insurance
                                                              .length -
                                                              1
                                                              ? `${sp}, `
                                                              : `and ${sp}`
                                                  )
                                                : dentist.insurance[0]}
                                        </Text>
                                    </Flex>
                                )}
                                {!_isEmpty(dentist.languages) && (
                                    <Flex alignItems="center">
                                        <Icon type="languages" />
                                        <Text
                                            fontSize={['12px', '14px']}
                                            ml="8px"
                                        >
                                            Speaks{' '}
                                            {dentist.languages.length > 1
                                                ? dentist.languages.map(
                                                      (sp, index) =>
                                                          index !==
                                                          dentist.languages
                                                              .length -
                                                              1
                                                              ? `${sp}, `
                                                              : `and ${sp}`
                                                  )
                                                : dentist.languages[0]}
                                        </Text>
                                    </Flex>
                                )}

                                {!_isEmpty(dentist.procedures) &&
                                    dentist.procedures.length && (
                                        <Flex flexWrap="wrap" mb={6} mt={10}>
                                            {dentist.procedures.map(
                                                (procedure, index) => (
                                                    <Box
                                                        bg={
                                                            TAG_COLORS[
                                                                index % 4
                                                            ]
                                                        }
                                                        px={16}
                                                        borderRadius="19.5px"
                                                        mr="6px"
                                                        mb="6px"
                                                    >
                                                        <Text
                                                            color="text.white"
                                                            lineHeight="20px"
                                                            fontSize={[
                                                                '10px',
                                                                '12px',
                                                            ]}
                                                        >
                                                            {procedure}
                                                        </Text>
                                                    </Box>
                                                )
                                            )}
                                        </Flex>
                                    )}

                                {dentist.availableTimes &&
                                dentist.availableTimes.length !== 0 ? (
                                    <Fragment>
                                        <Text
                                            mb={[5, 8]}
                                            fontWeight="500"
                                            fontSize={['12px', '18px']}
                                            textAlign="left"
                                        >
                                            {`Available times on ${earliestAvailableDate}`}
                                        </Text>
                                        <Flex flexWrap="wrap">
                                            {availableTimes.map(
                                                availableTime => (
                                                    <Button
                                                        data-start={
                                                            availableTime.startTime
                                                        }
                                                        data-reservation={
                                                            availableTime.reservationId
                                                        }
                                                        type="primary"
                                                        height={40}
                                                        width={[
                                                            '75px',
                                                            '100px',
                                                            '100px',
                                                        ]}
                                                        mx="2px"
                                                        my="2px"
                                                        ghost={true}
                                                        onClick={
                                                            this
                                                                .handleSelectAppointment
                                                        }
                                                        fontSize={[
                                                            '12px',
                                                            '18px',
                                                        ]}
                                                    >
                                                        {moment(
                                                            availableTime.startTime
                                                        ).format('h:mm A')}
                                                    </Button>
                                                )
                                            )}

                                            {isShowMoreVisibile && (
                                                <Button
                                                    type="primary"
                                                    width={[
                                                        '75px',
                                                        '100px',
                                                        '100px',
                                                    ]}
                                                    height={40}
                                                    my="2px"
                                                    mx="2px"
                                                    onClick={onRedirect}
                                                    fontSize={['12px', '18px']}
                                                >
                                                    More
                                                </Button>
                                            )}
                                        </Flex>
                                    </Fragment>
                                ) : (
                                    <Text
                                        style={{ 'white-space': 'pre-line' }}
                                        fontSize={['12px', '18px']}
                                        fontWeight="500"
                                        textAlign="left"
                                    >
                                        There are no available times
                                    </Text>
                                )}
                            </Box>
                        </Flex>
                    </Box>
                </StyledCard>
            </Button>
        );
    }
}

DentistListingCard.propTypes = {
    variant: PropTypes.oneOf(['small', 'large']),
    dentist: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        specialty: PropTypes.string,
        address: PropTypes.string,
        rating: PropTypes.number,
        ratingCount: PropTypes.number,
        languages: PropTypes.arrayOf(PropTypes.string),
        procedures: PropTypes.arrayOf(PropTypes.string),
        insurance: PropTypes.arrayOf(PropTypes.string),
        availableTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    }),
    onRedirect: PropTypes.func,
    onSelectAppointment: PropTypes.func,
};

export default withScreenSizes(DentistListingCard);