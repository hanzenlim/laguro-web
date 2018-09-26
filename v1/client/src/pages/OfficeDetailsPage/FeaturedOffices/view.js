import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '../../../components';
import LinkCard from '../../common/LinkCard';

const FeaturedOfficesView = props => {
    const { featuredOffices } = props;

    if (!featuredOffices) return null;

    return (
        <Box mt={40}>
            <Text fontSize={5}>find our highlights</Text>

            <Flex justifyContent="flex-start" mt={30}>
                {featuredOffices.map(item => (
                    <Box width="186px" key={item.id} mr={30}>
                        <LinkCard
                            title={item.name}
                            subtitle={item.description}
                            address={item.address}
                            rating={item.totalRating}
                            image={item.imageUrls[0]}
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
            address: PropTypes.string,
            numReviews: PropTypes.string,
            totalRating: PropTypes.number,
        })
    ),
};

export default FeaturedOfficesView;
