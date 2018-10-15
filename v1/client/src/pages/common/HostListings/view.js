import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import {
    Box,
    Tabs,
    Text,
    Flex,
    Image,
    Button,
    Link,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const { TabPane } = Tabs;
const StyledList = styled.ul`
    columns: 3;
    list-style-position: inside;
    padding: 0;
    margin: 0;

    > li {
        page-break-inside: avoid;
        break-inside: avoid;
    }
`;

class HostListings extends PureComponent {
    renderTabPane = offices =>
        offices.map(office => {
            const { id, name, listings, equipment } = office;
            return (
                <TabPane tab={name} key={id}>
                    <Flex justifyContent="flex-end" mt={12}>
                        <Link to={`/office/${id}`} type="ghost">
                            <Text color="text.blue" fontSize={1} mr={24}>
                                view office
                            </Text>
                        </Link>
                        <Link
                            to={`/host-onboarding/add-office/?mode=edit-office&officeId=${id}`}
                            type="ghost"
                        >
                            <Text color="text.blue" fontSize={1} mr={24}>
                                edit
                            </Text>
                        </Link>
                        <Link
                            to={`/host-onboarding/add-listing/?mode=add-listing&officeId=${id}`}
                            type="ghost"
                        >
                            <Text color="text.blue" fontSize={1}>
                                add a new listing
                            </Text>
                        </Link>
                    </Flex>
                    <Box
                        px={28}
                        py={16}
                        mt={13}
                        bg="background.white"
                        border="1px solid"
                        borderColor="divider.gray"
                        borderRadius={2}
                    >
                        <Text fontSize={3} fontWeight="medium" mb={14}>
                            Equipments offered in this office
                        </Text>
                        <StyledList>
                            {equipment.map(({ name: itemName }, index) => (
                                <li key={index}>
                                    <Text display="inline">{itemName}</Text>
                                </li>
                            ))}
                        </StyledList>
                    </Box>
                    {listings.length ? (
                        this.renderListing(listings)
                    ) : (
                        <Text textAlign="center" color="text.darkGray" my={50}>
                            NO LISTINGS
                        </Text>
                    )}
                </TabPane>
            );
        });

    renderListing = listings =>
        listings.map(listing => {
            const { id, availability, reservations } = listing;

            const startDate = `${availability.startDay}T${
                availability.startTime
            }`;
            const endDate = `${availability.endDay}T${availability.endTime}`;
            const isResevationsEmpty = reservations.length === 0;

            return (
                <Box key={id} mt={28}>
                    <Flex justifyContent="flex-end">
                        <Button
                            type="ghost"
                            onClick={
                                isResevationsEmpty
                                    ? this.props.toggleCancelModalState(id)
                                    : null
                            }
                            height="40px"
                            mb={10}
                        >
                            <Text
                                fontSize={1}
                                color={
                                    isResevationsEmpty
                                        ? 'text.blue'
                                        : 'text.gray'
                                }
                            >
                                delete listing
                            </Text>
                        </Button>
                    </Flex>
                    <Box
                        px={28}
                        py={16}
                        mt={5}
                        bg="background.white"
                        border="1px solid"
                        borderColor="divider.gray"
                        borderRadius={2}
                    >
                        <Box fontSize={5} mb={30}>
                            <Text fontWeight="medium" display="inline" mr={15}>
                                {moment(startDate).format('ddd, M/D')} -{' '}
                                {moment(endDate).format('ddd, M/D')}
                            </Text>
                            <Text display="inline">
                                {moment(startDate).format('h:mm a')} -{' '}
                                {moment(endDate).format('h:mm a')}
                            </Text>
                        </Box>
                        <Box mt={18}>
                            {reservations.length ? (
                                this.renderReservation(reservations)
                            ) : (
                                <Text
                                    textAlign="center"
                                    color="text.darkGray"
                                    my={50}
                                >
                                    NO BOOKINGS
                                </Text>
                            )}
                        </Box>
                    </Box>
                </Box>
            );
        });

    renderReservation = reservations =>
        reservations.map(reservation => {
            const {
                id,
                availableTimes,
                reservedBy,
                numChairsSelected,
                equipmentSelected,
            } = reservation;
            const { firstName, lastName, imageUrl } = reservedBy.user;
            const name = `Dr. ${firstName} ${lastName}`;
            return (
                <Box
                    key={id}
                    bg="background.white"
                    border="1px solid"
                    borderColor="divider.gray"
                    borderRadius={2}
                    mb={10}
                >
                    <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        p={26}
                    >
                        <Box textAlign="center">
                            {this.renderAvailableTimes(availableTimes)}
                        </Box>
                        <Text mx={15} fontSize={4}>
                            {name}
                        </Text>
                        <Image
                            src={imageUrl || defaultUserImage}
                            alt={name}
                            width={38}
                            height={38}
                            borderRadius="50%"
                        />
                    </Flex>
                    <Box
                        borderTop="1px solid"
                        borderColor="divider.gray"
                        px={26}
                        py={20}
                    >
                        <Box fontSize={1} mb={8}>
                            Equipments ordered by{' '}
                            <Text fontWeight="medium" is="span">
                                {name}
                            </Text>
                        </Box>
                        <StyledList>
                            <li>
                                <Text display="inline" fontWeight="medium">
                                    {`${numChairsSelected} chair${
                                        numChairsSelected > 1 ? 's' : ''
                                    }`}
                                </Text>
                            </li>
                            {equipmentSelected.map((item, index) => (
                                <li key={index}>
                                    <Text display="inline">{item}</Text>
                                </li>
                            ))}
                        </StyledList>
                    </Box>
                </Box>
            );
        });

    renderAvailableTimes = availableTimes =>
        availableTimes.map(({ startTime, endTime }, index) => (
            <Fragment key={index}>
                {index === 0 && (
                    <Text fontSize={4} fontWeight="medium">
                        {moment(startTime).format('ddd, MMM/D/YY')}
                    </Text>
                )}
                <Text fontSize={4}>
                    {moment(startTime).format('h:mmA')} -{' '}
                    {moment(endTime).format('h:mmA')}
                </Text>
            </Fragment>
        ));

    render() {
        const { offices } = this.props;
        return (
            <Box width={600}>
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
    numChairsSelected: PropTypes.number,
    equipmentSelected: PropTypes.arrayOf(PropTypes.string),
});

const listingShape = PropTypes.shape({
    id: PropTypes.string,
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
    toggleCancelModalState: PropTypes.func,
};

export default HostListings;
