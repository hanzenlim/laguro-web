import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { Icon } from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import {
    Box,
    Button,
    Card,
    Flex,
    Grid,
    Image,
    Rating,
    Text,
} from '@laguro/basic-components';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const StyledCard = styled(Card)`
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
        const { dentist, variant, onRedirect } = this.props;

        const availableTimes =
            dentist.availableTimes && dentist.availableTimes.slice(0, 3);

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
                                            {dentist.specialty}
                                        </Text>
                                        <Flex
                                            mb={4}
                                            alignItems={[
                                                'flex-start',
                                                'center',
                                            ]}
                                            flexDirection={['column', 'row']}
                                        >
                                            <Text
                                                fontWeight="bold"
                                                fontSize={['14px', '20px']}
                                                mr={14}
                                                color="#303449"
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
                                                    {dentist.ratingCount &&
                                                        `(${dentist.ratingCount.toString()})`}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                        <Text
                                            mb={8}
                                            fontSize="12px"
                                            color="#9b9b9b"
                                            fontWeight="normal"
                                            textTransform="uppercase"
                                        >
                                            {dentist.address}
                                        </Text>
                                    </Flex>
                                    <Text
                                        style={{ 'white-space': 'pre-line' }}
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
                                            Available times
                                        </Text>
                                        <Grid
                                            gridTemplateColumns="repeat(4, 1fr)"
                                            gridColumnGap="4px"
                                            gridRowGap="4px"
                                        >
                                            {availableTimes.map(
                                                (availableTime, index) => (
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

                                            {dentist.availableTimes &&
                                                dentist.availableTimes.length >
                                                    3 && (
                                                    <Button
                                                        type="primary"
                                                        width="100%"
                                                        height={40}
                                                        onClick={onRedirect}
                                                        fontSize={[
                                                            '12px',
                                                            '18px',
                                                        ]}
                                                    >
                                                        More
                                                    </Button>
                                                )}
                                        </Grid>
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

export default DentistListingCard;
