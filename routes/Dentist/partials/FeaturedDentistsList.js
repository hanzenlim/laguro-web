import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Text, Link } from '~/components';
import DentistCard from './DentistCard';

const FeaturedDentistsList = props => {
    const { featuredDentists } = props;

    if (featuredDentists.length === 0) return null;

    return (
        <Box mt={34} mb={85}>
            <Text
                fontSize={[1, '', 2]}
                fontWeight="medium"
                lineHeight="30px"
                letterSpacing={['-0.35px', '', '-0.4px']}
                mb={[6, '', 20]}
            >
                Featured dentists
            </Text>

            <Grid
                gridTemplateColumns={[
                    '1fr 1fr',
                    '1fr 1fr',
                    '1fr 1fr 1fr 1fr 1fr',
                ]}
                gridColumnGap="12px"
            >
                {featuredDentists.map(item => (
                    <Box
                        border="1px solid"
                        borderColor="divider.gray"
                        my={[4, '', 0]}
                        p={20}
                    >
                        <Link type="ghost" to={`/dentist/${item.id}`}>
                            <DentistCard
                                name={item.name}
                                specialty={item.specialty}
                                numReviews={item.numReviews}
                                rating={item.averageRating}
                                image={
                                    item.imageUrl ||
                                    '/static/images/default_dentist_profile_img_square.svg'
                                }
                            />
                        </Link>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

FeaturedDentistsList.propTypes = {
    featuredDentists: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            specialty: PropTypes.string,
            numReviews: PropTypes.string,
            averageRating: PropTypes.number,
        })
    ),
};

export default FeaturedDentistsList;
