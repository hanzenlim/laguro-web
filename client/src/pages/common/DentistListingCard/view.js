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
    Grid,
    Responsive,
} from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import Bundle from '../Bundle';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const { Desktop, Mobile } = Responsive;

const StyledCard = styled(Card)`
    &&.ant-card-bordered {
        height: 350px;
        width: ${({ showMap }) => (showMap ? '839px' : '100%')};
        border-radius: 0;
        border: none;
        box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
            -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
        border: 1px solid #ececec;
    }

    @media (min-width: ${props => props.theme.breakpoints[1]}) {
        &&.ant-card-bordered {
            border: none;
            box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
                -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
        }
    }

    @media (max-width: ${props => props.theme.breakpoints[1]}) {
        &&.ant-card-bordered {
            height: 100%;
            width: 100%;
        }
    }

    && {
        .ant-card-body {
            padding: 10px 16px;
            height: 100%;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                padding: 20px 22px;
            }

            @media (max-width: 767px) {
                padding-top: 23px;
                padding-bottom: 23px;
            }
        }
    }
`;

class DentistListingCard extends PureComponent {
    state = {
        tagStopPoint: null,
    };

    componentDidMount() {
        if (this.props.dentist && !_isEmpty(this.props.dentist.procedures)) {
            this.setState({
                tagStopPoint: this.getStopPoint({
                    procedures: this.props.dentist.procedures,
                }),
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.showMap !== this.props.showMap) {
            if (
                this.props.dentist &&
                !_isEmpty(this.props.dentist.procedures)
            ) {
                this.setState({
                    tagStopPoint: this.getStopPoint({
                        procedures: this.props.dentist.procedures,
                    }),
                });
            }
        }
    }

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

    getStopPoint = ({ procedures = [] }) => {
        const { showMap, mobileOnly } = this.props;
        let stopPoint = null;

        let threshold = showMap ? 394 : 1188;

        if (mobileOnly) {
            threshold = 330;
        }

        procedures.reduce((acc, cur, i) => {
            if (!stopPoint && stopPoint !== 0 && acc >= threshold) {
                stopPoint = i;
            }

            return acc + cur.length * 6.5 + 38;
        }, 0);

        return stopPoint;
    };

    render() {
        const {
            dentist,
            variant,
            screenWidth,
            tabletOnly,
            mobileOnly,
            tabletMobileOnly,
            showMap,
            onRedirect,
        } = this.props;

        const earliestAvailableDate =
            dentist.availableTimes.length > 0 &&
            moment(dentist.availableTimes[0].startTime).format('dddd, MMMM D');

        const availableTimes = dentist.availableTimes;

        const { tagStopPoint } = this.state;

        return (
            <Button
                type="ghost"
                height="auto"
                width="100%"
                onClick={onRedirect}
            >
                <StyledCard showMap={showMap}>
                    <Flex height="100%" flexDirection={['column', 'row']}>
                        <Flex width={['100%', 'calc(100% - 304px)']}>
                            <Box
                                display={['none', 'block']}
                                width={variant === 'small' ? '90px' : '136px'}
                            >
                                <Image
                                    src={dentist.imageUrl || defaultUserImage}
                                    width="136px"
                                    height="136px"
                                    borderRadius="50%"
                                />
                            </Box>
                            <Box width="32px" display={['none', 'block']} />
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
                                                showMap
                                                    ? 'flex-start'
                                                    : ['flex-start', 'center']
                                            }
                                            flexDirection={
                                                showMap
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
                                            {!showMap && (
                                                <Flex
                                                    alignItems="flex-end"
                                                    lineHeight="15px"
                                                >
                                                    <Rating
                                                        disabled={true}
                                                        fontSize={[
                                                            '12px',
                                                            '15px',
                                                        ]}
                                                        value={dentist.rating}
                                                    />
                                                    <Text
                                                        ml={6}
                                                        fontSize="12px"
                                                    >
                                                        {dentist.reviewCount &&
                                                        dentist.reviewCount !==
                                                            0
                                                            ? `(${
                                                                  dentist.reviewCount
                                                              })`
                                                            : ''}
                                                    </Text>
                                                </Flex>
                                            )}
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

                                <Mobile>
                                    {!_isEmpty(dentist.procedures) &&
                                        dentist.procedures.length && (
                                            <Box overflow="hidden">
                                                <Flex
                                                    flexWrap="wrap"
                                                    mb={6}
                                                    mt={10}
                                                >
                                                    {dentist.procedures.map(
                                                        (procedure, index) => {
                                                            if (
                                                                tagStopPoint &&
                                                                index >
                                                                    tagStopPoint
                                                            ) {
                                                                return null;
                                                            }

                                                            if (
                                                                tagStopPoint &&
                                                                index ===
                                                                    tagStopPoint
                                                            ) {
                                                                return (
                                                                    <Box
                                                                        bg={
                                                                            TAG_COLORS[
                                                                                index %
                                                                                    4
                                                                            ]
                                                                        }
                                                                        px={12}
                                                                        py="3px"
                                                                        borderRadius="15.5px"
                                                                        mr="6px"
                                                                        mb="6px"
                                                                    >
                                                                        <Text
                                                                            color="text.white"
                                                                            lineHeight="normal"
                                                                            fontSize="10px"
                                                                        >
                                                                            ...
                                                                        </Text>
                                                                    </Box>
                                                                );
                                                            }

                                                            return (
                                                                <Box
                                                                    bg={
                                                                        TAG_COLORS[
                                                                            index %
                                                                                4
                                                                        ]
                                                                    }
                                                                    px={12}
                                                                    py="2px"
                                                                    borderRadius="15.5px"
                                                                    mr="6px"
                                                                    mb="6px"
                                                                >
                                                                    <Text
                                                                        color="text.white"
                                                                        lineHeight="normal"
                                                                        fontSize="10px"
                                                                    >
                                                                        {
                                                                            procedure
                                                                        }
                                                                    </Text>
                                                                </Box>
                                                            );
                                                        }
                                                    )}
                                                </Flex>
                                            </Box>
                                        )}
                                </Mobile>

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

                                <Desktop>
                                    {!_isEmpty(dentist.procedures) &&
                                        dentist.procedures.length && (
                                            <Box
                                                height={68}
                                                maxHeight={68}
                                                overflow="hidden"
                                            >
                                                <Flex
                                                    flexWrap="wrap"
                                                    mb={6}
                                                    mt={10}
                                                >
                                                    {dentist.procedures.map(
                                                        (procedure, index) => {
                                                            if (
                                                                tagStopPoint &&
                                                                index >
                                                                    tagStopPoint
                                                            ) {
                                                                return null;
                                                            }

                                                            if (
                                                                tagStopPoint &&
                                                                index ===
                                                                    tagStopPoint
                                                            ) {
                                                                return (
                                                                    <Box
                                                                        bg={
                                                                            TAG_COLORS[
                                                                                index %
                                                                                    4
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
                                                                            ...
                                                                        </Text>
                                                                    </Box>
                                                                );
                                                            }

                                                            return (
                                                                <Box
                                                                    bg={
                                                                        TAG_COLORS[
                                                                            index %
                                                                                4
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
                                                                        {
                                                                            procedure
                                                                        }
                                                                    </Text>
                                                                </Box>
                                                            );
                                                        }
                                                    )}
                                                </Flex>
                                            </Box>
                                        )}
                                </Desktop>

                                {dentist.availableTimes &&
                                dentist.availableTimes.length !== 0 ? (
                                    <Fragment>
                                        <Text
                                            mb={[5, 8]}
                                            fontWeight="500"
                                            fontSize={['12px', '18px']}
                                            textAlign="left"
                                            mt={[5, 0]}
                                        >
                                            {`Available times `}
                                            {moment(
                                                dentist.availableTimes[0]
                                                    .startTime
                                            ).diff(moment(), 'days') === 0 &&
                                                'today'}
                                            {moment(
                                                dentist.availableTimes[0]
                                                    .startTime
                                            ).diff(moment(), 'days') === 1 &&
                                                'tomorrow'}
                                            {moment(
                                                dentist.availableTimes[0]
                                                    .startTime
                                            ).diff(moment(), 'days') > 1 &&
                                                `on ${earliestAvailableDate}`}
                                        </Text>
                                        <Box
                                            height={84}
                                            maxHeight={84}
                                            overflow="hidden"
                                            width="100%"
                                        >
                                            <Grid
                                                gridTemplateColumns={[
                                                    'repeat(auto-fit, 79px)',
                                                    'repeat(auto-fit, 147px)',
                                                ]}
                                                gridGap={3}
                                            >
                                                {[
                                                    ...availableTimes,
                                                    ...availableTimes,
                                                ].map(
                                                    (availableTime, index) => {
                                                        if (
                                                            (index > 9 ||
                                                                (showMap &&
                                                                    index >
                                                                        3)) &&
                                                            !tabletOnly &&
                                                            !tabletMobileOnly
                                                        )
                                                            return null;

                                                        if (
                                                            (index === 9 ||
                                                                (showMap &&
                                                                    index ===
                                                                        3)) &&
                                                            !tabletOnly &&
                                                            !tabletMobileOnly
                                                        ) {
                                                            return (
                                                                <Button
                                                                    type="primary"
                                                                    height={40}
                                                                    width="100%"
                                                                    ghost={true}
                                                                    pb={10}
                                                                    fontSize={
                                                                        20
                                                                    }
                                                                    fontWeight="700"
                                                                >
                                                                    ...
                                                                </Button>
                                                            );
                                                        }

                                                        if (
                                                            (index > 7 &&
                                                                mobileOnly) ||
                                                            (index > 3 &&
                                                                tabletMobileOnly &&
                                                                !tabletOnly) ||
                                                            (index > 5 &&
                                                                tabletOnly) ||
                                                            (screenWidth ===
                                                                768 &&
                                                                index > 3)
                                                        ) {
                                                            return null;
                                                        }

                                                        if (
                                                            (index === 7 &&
                                                                mobileOnly) ||
                                                            (index === 3 &&
                                                                tabletMobileOnly &&
                                                                !tabletOnly) ||
                                                            (index === 5 &&
                                                                tabletOnly) ||
                                                            (screenWidth ===
                                                                768 &&
                                                                index === 3)
                                                        ) {
                                                            return (
                                                                <Button
                                                                    type="primary"
                                                                    height={40}
                                                                    width="100%"
                                                                    ghost={true}
                                                                    pb={10}
                                                                    fontSize={[
                                                                        12,
                                                                        18,
                                                                    ]}
                                                                    fontWeight="700"
                                                                >
                                                                    ...
                                                                </Button>
                                                            );
                                                        }

                                                        return (
                                                            <Button
                                                                data-start={
                                                                    availableTime.startTime
                                                                }
                                                                data-reservation={
                                                                    availableTime.reservationId
                                                                }
                                                                type="primary"
                                                                height={40}
                                                                width="100%"
                                                                ghost={true}
                                                                onClick={
                                                                    this
                                                                        .handleSelectAppointment
                                                                }
                                                                fontSize={[
                                                                    12,
                                                                    18,
                                                                ]}
                                                            >
                                                                {moment(
                                                                    availableTime.startTime
                                                                ).format(
                                                                    'h:mm A'
                                                                )}
                                                            </Button>
                                                        );
                                                    }
                                                )}
                                            </Grid>
                                        </Box>
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
                        <Desktop>
                            <Box
                                width="1px"
                                border="solid 0.5px #dbdbdb"
                                my={12}
                            />
                        </Desktop>
                        <Mobile>
                            <Box
                                width="100%"
                                height="1px"
                                border="solid 0.5px #dbdbdb"
                                mt={18}
                                mb={12}
                            />
                        </Mobile>
                        <Flex justifyContent="center">
                            <Box width={304}>
                                <Bundle
                                    procedures={dentist.procedures}
                                    insurance={dentist.insurance}
                                />
                            </Box>
                        </Flex>
                    </Flex>
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
