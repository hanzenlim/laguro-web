import React from 'react';
import _get from 'lodash/get';
import PropTypes from 'prop-types';

import { Box, Grid, Text } from '../../../components';
import OfficeCard from '../OfficeCard';
import { formatAddress } from '../../../util/styleUtil';
import officePlaceholder from '../../../components/Image/office-placeholder.png';

const FeaturedOfficesView = props => {
    const { featuredOffices } = props;

    if (!featuredOffices.length) return null;

    return (
        <Box>
            <Text
                fontSize={[1, '', 2]}
                lineHeight="30px"
                letterSpacing={['-0.35px', '', '-0.4px']}
                fontWeight="medium"
                mb="7px"
            >
                Featured offices
            </Text>

            <Grid gridTemplateColumns={["1fr 1fr", "", "1fr 1fr 1fr 1fr"]} gridColumnGap="4px">
                {featuredOffices.map(item => (
                    <OfficeCard
                        key={item.id}
                        name={item.name}
                        address={formatAddress(
                            _get(item, 'location.name'),
                            _get(item, 'location.addressDetails')
                        )}
                        rating={item.averageRating}
                        image={item.imageUrls[0] || officePlaceholder}
                        url={`/office/${item.id}`}
                    />
                ))}
            </Grid>
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
