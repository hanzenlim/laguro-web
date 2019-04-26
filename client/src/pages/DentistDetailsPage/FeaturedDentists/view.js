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
        <Box mt={34} mb={85}>
            <Text
                fontSize={[1, '', 2]}
                fontWeight="medium"
                lineHeight="30px"
                letterSpacing={['-0.35px', '', '-0.4px']}
                mb={[6, '', 34]}
            >
                Suggested dentists
            </Text>

            <Flex flexWrap='wrap'>
                {featuredDentists.map(item => (
                    <Box
                        border="1px solid"
                        borderColor="divider.gray"
                        width={['calc(50% - 4px)', '', 'calc(20% - 12px)']}
                        mx={[2, '', 6]}
                        my={[2, '', 0]}
                        p={20}
                    >
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
