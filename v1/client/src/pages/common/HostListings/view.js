import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Tabs, Text, Flex, Image, Button } from '../../../components';

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
            const { id, name, listings } = office;
            return (
                <TabPane tab={name} key={id}>
                    {listings.length ? (
                        this.renderListing(listings)
                    ) : (
                        <Text textAlign="center" color="text.gray" my={50}>
                            NO LISTINGS
                        </Text>
                    )}
                </TabPane>
            );
        });

    renderListing = listings =>
        listings.map((listing, index) => {
            const {
                dateCreated,
                startTime,
                endTime,
                numChairsAvailable,
                equipment,
                reservations,
            } = listing;
            const isResevationsEmpty = reservations.length === 0;
            return (
                <Box key={index}>
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
                            <Text fontWeight="bold" display="inline">
                                {dateCreated} -{' '}
                            </Text>
                            <Text display="inline">
                                {startTime} - {endTime}
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

    renderReservation = reservations =>
        reservations.map((reservation, index) => {
            const { startTime, endTime, reservedBy, photoUrl } = reservation;
            return (
                <Flex
                    key={index}
                    justifyContent="space-between"
                    alignItems="center"
                    bg="background.white"
                    border="1px solid"
                    borderColor="divider.gray"
                    borderRadius={2}
                    mb={10}
                    p={30}
                >
                    <Box>
                        <Text
                            display="inline"
                            fontSize={4}
                            fontWeight="medium"
                            mr={30}
                        >
                            {startTime} - {endTime}
                        </Text>
                        <Text display="inline" fontSize={4}>
                            {reservedBy}
                        </Text>
                    </Box>
                    <Image
                        src={photoUrl}
                        alt={reservedBy}
                        width={38}
                        height={38}
                        borderRadius="50%"
                    />
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

const equipmentShape = PropTypes.shape({ name: PropTypes.string });

const reservationShape = PropTypes.shape({
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    reservedBy: PropTypes.string,
    photoUrl: PropTypes.string,
});

const listingShape = PropTypes.shape({
    dateCreated: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    numChairsAvailable: PropTypes.number,
    equipment: PropTypes.arrayOf(equipmentShape),
    reservations: PropTypes.arrayOf(reservationShape),
});

const officeShape = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    listings: PropTypes.arrayOf(listingShape),
});

HostListings.propTypes = {
    offices: PropTypes.arrayOf(officeShape),
};

HostListings.defaultProps = {
    offices: [
        {
            id: 'b9e5ec50-b8fd-11e8-93dd-75b37d28b126',
            name: 'hanzen office',
            listings: [
                {
                    dateCreated: 'Tue, 8/29',
                    startTime: '6:00PM',
                    endTime: '7:00PM',
                    numChairsAvailable: 2,
                    equipment: [
                        { name: 'Probes' },
                        { name: 'Excavators' },
                        { name: 'X-ray' },
                    ],
                    reservations: [
                        {
                            startTime: '6:00PM',
                            endTime: '7:00PM',
                            reservedBy: 'Dr. Sarah Parker',
                            photoUrl:
                                'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
                        },
                        {
                            startTime: '6:00PM',
                            endTime: '7:00PM',
                            reservedBy: 'Dr. Sarah Parker',
                            photoUrl:
                                'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
                        },
                    ],
                },
            ],
        },
        {
            id: 'b9e5ec50-b8fd-11e8-93dd-75b37d28b122',
            name: 'test office',
            listings: [
                {
                    dateCreated: 'Tue, 8/29',
                    startTime: '6:00PM',
                    endTime: '7:00PM',
                    numChairsAvailable: 2,
                    equipment: [
                        { name: 'Probes' },
                        { name: 'Excavators' },
                        { name: 'X-ray' },
                    ],
                    reservations: [
                        {
                            startTime: '6:00PM',
                            endTime: '7:00PM',
                            reservedBy: 'Dr. Sarah Parker',
                            photoUrl:
                                'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
                        },
                        {
                            startTime: '6:00PM',
                            endTime: '7:00PM',
                            reservedBy: 'Dr. Sarah Parker',
                            photoUrl:
                                'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
                        },
                    ],
                },
            ],
        },
        {
            id: 'b9e5ec50-b8fd-11e8-93dd-75b37d28b127',
            name: 'paul office',
            listings: [
                {
                    dateCreated: 'Tue, 8/29',
                    startTime: '6:00PM',
                    endTime: '7:00PM',
                    numChairsAvailable: 1,
                    equipment: [],
                    reservations: [],
                },
            ],
        },
        {
            id: 'b9e5ec50-b8fd-11e8-93dd-75b37d28b121',
            name: 'david office',
            listings: [],
        },
    ],
};

export default HostListings;
