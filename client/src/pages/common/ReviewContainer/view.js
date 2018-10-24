import React from 'react';
import { arrayOf, shape, string, number, func, bool } from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';

import { Box, Flex, Image, Text, Rating, Truncate } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const ReviewContainer = props => {
    const {
        reviews,
        averageRating,
        numReviews,
        toggleModalState,
        viewOnly,
        tabletMobileOnly,
    } = props;

    const renderReviewsStats = (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            pt={[0, '', 40]}
        >
            <Flex alignItems="center">
                <Flex alignItems="center" justifyContent="center">
                    <Rating
                        disabled
                        mr={10}
                        value={averageRating}
                        fontSize={tabletMobileOnly ? '12px' : '18px'}
                    />
                </Flex>
                <Text
                    display="inline"
                    lineHeight="34px"
                    fontSize={[1, '', 5]}
                    fontWeight={['bold', '', 'regular']}
                >{`${numReviews} Review${numReviews !== 1 ? 's' : ''}`}</Text>
            </Flex>
            {!viewOnly && (
                <Text
                    is="a"
                    color="text.blue"
                    fontSize={1}
                    mr={20}
                    fontWeight={['medium', '', 'bold']}
                    lineHeight="22px"
                    alignSelf={['center', '', 'flex-end']}
                    onClick={toggleModalState}
                >
                    add review
                </Text>
            )}
        </Flex>
    );

    const renderReviews = isEmpty(reviews) ? (
        <Flex
            alignItems="center"
            justifyContent="center"
            py={20}
            color="text.black50"
        >
            <Text fontSize={[1, '', 2]} fontWeight="bold">
                No reviews yet.
            </Text>
        </Flex>
    ) : (
        reviews.map(review => (
            <Box
                py={[22, '', 40]}
                borderBottom="1px solid"
                borderColor="divider.gray"
                key={review.id}
            >
                <Flex alignItems="center">
                    <Image
                        width={[80, '', 82]}
                        height={[80, '', 82]}
                        borderRadius="50%"
                        src={review.reviewer.imageUrl || defaultUserImage}
                        alt="reviewer-photo"
                    />
                    <Box px={10}>
                        <Flex
                            alignItems="center"
                            fontSize={3}
                            fontWeight="bold"
                            color="text.black"
                            lineHeight="22px"
                        >
                            {`${
                                review.reviewer.firstName
                            } ${review.reviewer.lastName.charAt(0)}.`}
                            <Flex alignItems="center" justifyContent="center">
                                <Rating
                                    disabled
                                    ml={10}
                                    value={review.rating}
                                    fontSize={
                                        tabletMobileOnly ? '12px' : '18px'
                                    }
                                />
                            </Flex>
                        </Flex>
                        <Text fontSize={1} color="text.black" lineHeight="22px">
                            {moment(review.dateCreated).format('MMMM D YYYY')}
                        </Text>
                    </Box>
                </Flex>
                <Text
                    mt={4}
                    fontSize={[0, '', 1]}
                    color="text.black"
                    lineHeight="22px"
                >
                    <Truncate lines={3} hasToggle>
                        {review.text}
                    </Truncate>
                </Text>
            </Box>
        ))
    );

    return (
        <Box mx="auto" mb={-1}>
            {renderReviewsStats}
            {renderReviews}
        </Box>
    );
};

ReviewContainer.propTypes = {
    reviews: arrayOf(
        shape({
            id: string,
            reviewer: {
                id: string,
                firstName: string,
                lastName: string,
                imageUrl: string,
            },
            text: string,
            rating: number,
            dateCreated: string,
        })
    ),
    totalRating: number,
    numReviews: number,
    toggleModalState: func,
    viewOnly: bool,
};

ReviewContainer.defaultProps = {
    totalRating: 0,
    numReviews: 0,
    viewOnly: false,
};

export default withScreenSizes(ReviewContainer);
