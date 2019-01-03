import React from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '../../../components';
import LinkCard from '../../common/LinkCard';
import { formatAddress } from '../../../util/styleUtil';
import officePlaceholder from '../../../components/Image/office-placeholder.png';

const FeaturedOfficesView = props => {
    const { featuredOffices } = props;

    if (!featuredOffices) return null;

    return (
        <Box mt={40} height={360} mb={80}>
            <Text fontSize={5}>find our highlights</Text>

            <Flex justifyContent="space-between" mt={30}>
                {featuredOffices.map(item => (
                    <Box width="186px" key={item.id} mr={30}>
                        <LinkCard
                            subtitle={item.name}
                            address={formatAddress(
                                _get(item, 'location.name'),
                                _get(item, 'location.addressDetails')
                            )}
                            rating={item.averageRating}
                            image={item.imageUrls[0] || officePlaceholder}
                            url={`/office/${item.id}`}
                        />
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

FeaturedOfficesView.propTypes = {
    featuredOffices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            location: PropTypes.object,
            numReviews: PropTypes.string,
            averageRating: PropTypes.number,
        })
    ),
};

export default FeaturedOfficesView;
