import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Link } from '../../../components';
import DentistCard from '../DentistCard';
import { setImageSizeToUrl } from '../../../util/imageUtil';
import defaultDentistProfileImg from '../../../components/Image/default_dentist_profile_img_square.svg';

const FeaturedDentistsView = props => {
    const { featuredDentists } = props;

    if (featuredDentists.length === 0) return null;

    return (
        <Box mt={40} mb={80}>
            <Text fontSize={5}>similar dentists</Text>

            <Flex justifyContent="space-between" mt={30}>
                {featuredDentists.map(item => (
                    <Box width="20%">
                        <Link type="ghost" to={`/dentist/${item.id}`}>
                            <DentistCard
                                name={item.name}
                                specialty={item.specialty}
                                numReviews={item.numReviews}
                                rating={item.averageRating}
                                image={setImageSizeToUrl(
                                    item.imageUrl || defaultDentistProfileImg,
                                    260
                                )}
                            />
                        </Link>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

FeaturedDentistsView.propTypes = {
    featuredDentists: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            specialty: PropTypes.string,
            numReviews: PropTypes.string,
            averageRating: PropTypes.number,
        })
    ),
};

export default FeaturedDentistsView;
