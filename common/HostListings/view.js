import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Tabs, Text, Flex, Link, Icon, Responsive } from '~/components';
import Listings from './Listings';
import { ContainerPaddingInPixels } from '~/components/Container';
import { formatAddress } from '~/util/styleUtil';

const { TabPane } = Tabs;
const { TabletMobile } = Responsive;

const StyledTabs = styled(Tabs)`
    && .ant-tabs-nav {
        .ant-tabs-tab {
            // remove top padding of tab text
            padding: 0 0 12px 0;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                // remove top padding of tab text
                padding: 0 32px 12px 32px;
            }
        }
    }
`;

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
            const { id, name, listings, equipment, location } = office;
            const { name: address, addressDetails } = location;
            const fullAddress = formatAddress(address, addressDetails);
            return (
                <TabPane tab={name} key={id}>
                    <Flex
                        mt={12}
                        px={[ContainerPaddingInPixels, '', 0]}
                        alignItems="center"
                    >
                        <Text fontSize={[2, '', 5]} mr={[6, '', 14]}>
                            {name}
                        </Text>
                        <Flex>
                            <Link
                                to={`/office/${id}`}
                                type="ghost"
                                target="_blank"
                                isExternal
                            >
                                <Text
                                    color="text.blue"
                                    fontSize={[0, '', 1]}
                                    mr={[14, '', 24]}
                                >
                                    View Office
                                </Text>
                            </Link>
                            <Link
                                to={`/host-onboarding/add-office?mode=edit-office&officeId=${id}`}
                                type="ghost"
                                data-cy="host-office-edit-link"
                            >
                                <Text
                                    color="text.blue"
                                    fontSize={[0, '', 1]}
                                    mr={[14, '', 24]}
                                >
                                    Edit
                                </Text>
                            </Link>
                        </Flex>
                    </Flex>
                    <Box
                        mb={[20, '', 34]}
                        px={[ContainerPaddingInPixels, '', 0]}
                    >
                        <Icon
                            fontSize={[0, '', 1]}
                            type="environment-o"
                            mr={5}
                        />
                        <Text is="span" fontSize={[0, '', 1]}>
                            {fullAddress}
                        </Text>
                    </Box>
                    <Box
                        px={[ContainerPaddingInPixels, '', 28]}
                        py={[0, '', 16]}
                        mb={29}
                        bg="background.white"
                        border={['none', '', '1px solid']}
                        borderColor={['', '', 'divider.gray']}
                        borderRadius={2}
                    >
                        <Text
                            fontSize={[1, '', 3]}
                            fontWeight="medium"
                            mb={14}
                            color={['text.black', '', 'text.blue']}
                        >
                            Equipment offered
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

                    <Flex
                        px={[ContainerPaddingInPixels, '', 0]}
                        justifyContent="space-between"
                        flexDirection="row-reverse"
                        alignItems="center"
                    >
                        <Box>
                            <Link
                                to={`/host-onboarding/add-listing/?mode=add-listing&officeId=${id}`}
                                type="ghost"
                                data-cy="new-listing-link"
                            >
                                <Text
                                    textAlign="right"
                                    color="text.blue"
                                    fontSize={[0, '', 1]}
                                >
                                    Add a new Listing
                                </Text>
                            </Link>
                        </Box>
                        <TabletMobile>
                            <Text fontWeight="medium" fontSize={4}>
                                Listings
                            </Text>
                        </TabletMobile>
                    </Flex>

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
                <StyledTabs>{this.renderTabPane(offices)}</StyledTabs>
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
