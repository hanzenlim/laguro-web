import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Tabs, Text, Flex, Link } from '../../../components';
import Listings from './Listings';
import { ContainerPaddingInPixels } from '../../../components/Container';

const { TabPane } = Tabs;

export const StyledList = styled.ul`
    columns: 2;
    padding: 0 0 0 16px;
    margin: 0;

    @media (min-width: ${props => props.theme.breakpoints[1]}) {
        columns: 3;
    }

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
                    <Flex
                        justifyContent="flex-end"
                        mt={12}
                        px={[ContainerPaddingInPixels, '', 0]}
                    >
                        <Link to={`/office/${id}`} type="ghost">
                            <Text
                                color="text.blue"
                                fontSize={[0, '', 1]}
                                mr={[14, '', 24]}
                            >
                                view office
                            </Text>
                        </Link>
                        <Link
                            to={`/host-onboarding/add-office/?mode=edit-office&officeId=${id}`}
                            type="ghost"
                        >
                            <Text
                                color="text.blue"
                                fontSize={[0, '', 1]}
                                mr={[14, '', 24]}
                            >
                                edit
                            </Text>
                        </Link>
                        <Link
                            to={`/host-onboarding/add-listing/?mode=add-listing&officeId=${id}`}
                            type="ghost"
                        >
                            <Text color="text.blue" fontSize={[0, '', 1]}>
                                add a new listing
                            </Text>
                        </Link>
                    </Flex>
                    <Box
                        px={[ContainerPaddingInPixels, '', 28]}
                        py={[0, '', 16]}
                        mt={[20, '', 14]}
                        bg="background.white"
                        border={['none', '', '1px solid']}
                        borderColor={['', '', 'divider.gray']}
                        borderRadius={2}
                    >
                        <Text fontSize={[1, '', 3]} fontWeight="medium" mb={14}>
                            Equipments offered in this office
                        </Text>
                        <StyledList>
                            {equipment.map(({ name: itemName }, index) => (
                                <li key={index}>
                                    <Text display="inline" fontSize={1}>
                                        {itemName}
                                    </Text>
                                </li>
                            ))}
                        </StyledList>
                    </Box>
                    <Text
                        mt={28}
                        mb={10}
                        px={ContainerPaddingInPixels}
                        display={['block', '', 'none']}
                        fontSize={4}
                        fontWeight="medium"
                    >
                        Listings
                    </Text>
                    {listings.length ? (
                        <Listings
                            listings={listings}
                            toggleCancelModalState={
                                this.props.toggleCancelModalState
                            }
                        />
                    ) : (
                        <Text textAlign="center" color="text.darkGray" my={50}>
                            NO LISTINGS
                        </Text>
                    )}
                </TabPane>
            );
        });

    render() {
        const { offices } = this.props;
        return (
            <Box width={['100%', '', 600]} maxWidth="100%" mb={[100, '', 0]}>
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
