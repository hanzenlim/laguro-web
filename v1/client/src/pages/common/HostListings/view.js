import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { Box, Tabs, Text, Flex, Image, Button } from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const { TabPane } = Tabs;
const StyledList = styled.ul`
    columns: 3;
    list-style: none;

    li:first-child {
        font-weight: ${props => props.theme.fontWeights.medium};
    }

    li:before {
        content: '•';
        margin-right: 10px;
    }
`;

class HostListings extends PureComponent {
    renderTabPane = offices =>
        offices.map(office => {
            const { id, name, listings, equipment } = office;
            return (
                <TabPane tab={name} key={id}>
                    {listings.length ? (
                        this.renderListing(listings, equipment)
                    ) : (
                        <Text textAlign="center" color="text.gray" my={50}>
                            NO LISTINGS
                        </Text>
                    )}
                </TabPane>
            );
        });

    renderListing = (listings, equipment) =>
        listings.map(listing => {
            const {
                id,
                availability,
                numChairsAvailable,
                reservations,
            } = listing;

            const startDate = `${availability.startDay}T${
                availability.startTime
            }`;
            const endDate = `${availability.endDay}T${availability.endTime}`;
            const isResevationsEmpty = reservations.length === 0;

            return (
                <Box key={id} mb={25}>
                    <Flex justifyContent="flex-end">
                        <Button type="ghost" border="none">
                            <Text
                                fontSize={1}
                                color={
                                    isResevationsEmpty
                                        ? 'text.green'
                                        : 'text.gray'
                                }
                            >
                                delete
                            </Text>
                        </Button>
                    </Flex>
                    <Box
                        px={28}
                        py={16}
                        mt={5}
                        bg="background.lightGray"
                        css="cursor: pointer;"
                        onClick={this.props.toggleModalState}
                    >
                        <Box fontSize={5} mb={22}>
                            <Text fontWeight="bold" display="inline" mr={15}>
                                {moment(startDate).format('ddd, M/D')} -{' '}
                                {moment(endDate).format('ddd, M/D')}
                            </Text>
                            <Text display="inline">
                                {moment(startDate).format('H:mmA')} -{' '}
                                {moment(endDate).format('H:mmA')}
                            </Text>
                        </Box>
                        <Text fontSize={3} fontWeight="medium" mb={10}>
                            Available Equipments
                        </Text>
                        <StyledList>
                            <li>{`${numChairsAvailable} chair${
                                numChairsAvailable > 1 ? 's' : ''
                            }`}</li>
                            {this.renderEquipment(equipment)}
                        </StyledList>
                        <Box mt={18}>
                            {reservations.length ? (
                                this.renderReservation(reservations)
                            ) : (
                                <Text
                                    textAlign="center"
                                    color="text.gray"
                                    my={50}
                                >
                                    NO APPOINTMENTS
                                </Text>
                            )}
                        </Box>
                    </Box>
                </Box>
            );
        });

    renderEquipment = equipment =>
        equipment.map(({ name }, index) => <li key={index}>{name}</li>);

    renderAvailableTimes = availableTimes =>
        availableTimes.map(({ startTime, endTime }, index) => (
            <Text fontWeight="bold" fontSize={4} key={index}>
                {moment(startTime).format('H:mmA')} -{' '}
                {moment(endTime).format('H:mmA')}
            </Text>
        ));

    renderReservation = reservations =>
        reservations.map(reservation => {
            const { id, availableTimes, reservedBy } = reservation;
            const { firstName, lastName, imageUrl } = reservedBy.user;
            const name = `Dr. ${firstName} ${lastName}`;
            return (
                <Flex
                    key={id}
                    alignItems="flex-start"
                    justifyContent="space-between"
                    bg="background.white"
                    border="1px solid"
                    borderColor="divider.gray"
                    borderRadius={2}
                    mb={10}
                    p={30}
                >
                    <Flex alignItems="center">
                        <Image
                            src={imageUrl || defaultUserImage}
                            alt={name}
                            width={38}
                            height={38}
                            borderRadius="50%"
                        />
                        <Text ml={30} fontSize={4}>
                            {name}
                        </Text>
                    </Flex>
                    <Box>{this.renderAvailableTimes(availableTimes)}</Box>
                </Flex>
            );
        });

    render() {
        const { offices } = this.props;
        return (
            <Box width={600}>
                <Text color="text.green" fontSize={4} fontWeight="bold" mb={40}>
                    my reservations
                </Text>
                <Tabs>{this.renderTabPane(offices)}</Tabs>
            </Box>
        );
    }
}

// PropTypes

const userShape = PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    imageUrl: PropTypes.string,
});

const equipmentShape = PropTypes.shape({ name: PropTypes.string });

const reservationShape = PropTypes.shape({
    id: PropTypes.string,
    availableTimes: PropTypes.arrayOf(
        PropTypes.shape({
            startTime: PropTypes.string,
            endTime: PropTypes.string,
        })
    ),
    reservedBy: PropTypes.shape({ user: userShape }),
});

const listingShape = PropTypes.shape({
    id: PropTypes.string,
    numChairsAvailable: PropTypes.number,
    availability: PropTypes.shape({
        startTime: PropTypes.string,
        endTime: PropTypes.string,
        startDay: PropTypes.string,
        endDay: PropTypes.string,
    }),
    reservations: PropTypes.arrayOf(reservationShape),
});

const officeShape = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    equipment: PropTypes.arrayOf(equipmentShape),
    listings: PropTypes.arrayOf(listingShape),
});

HostListings.propTypes = {
    offices: PropTypes.arrayOf(officeShape),
};

export default HostListings;
