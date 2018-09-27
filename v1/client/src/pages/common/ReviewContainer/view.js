import React from 'react';
import { arrayOf, shape, string, number, func, bool } from 'prop-types';
import moment from 'moment';

import { Box, Flex, Image, Text, Rating, Truncate } from '../../../components';

const ReviewContainer = props => {
    const {
        reviews,
        averageRating,
        numReviews,
        toggleModalState,
        viewOnly,
    } = props;

    const renderReviewsStats = (
        <Flex alignItems="center" justifyContent="space-between" pt={40}>
            <Flex alignItems="center">
                <Flex alignItems="center" justifyContent="center">
                    <Rating
                        disabled
                        mr={10}
                        value={averageRating}
                        size="18px"
                    />
                </Flex>
                <Text
                    display="inline"
                    lineHeight="34px"
                    fontSize={5}
                >{`${numReviews} Review${numReviews > 1 ? 's' : ''}`}</Text>
            </Flex>
            {!viewOnly && (
                <Text
                    is="a"
                    color="text.green"
                    fontSize={1}
                    fontWeight="bold"
                    lineHeight="22px"
                    alignSelf="flex-end"
                    onClick={toggleModalState}
                >
                    add review
                </Text>
            )}
        </Flex>
    );

    const renderReviews = reviews.map(review => (
        <Box
            py={40}
            borderBottom="1px solid"
            borderColor="divider.gray"
            key={review.id}
        >
            <Flex alignItems="center">
                <Image
                    width={82}
                    height={82}
                    borderRadius="50%"
                    src={review.reviewer.imageUrl}
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
                            <Rating disabled ml={10} value={review.rating} />
                        </Flex>
                    </Flex>
                    <Text
                        fontSize={1}
                        color="text.black"
                        lineHeight="22px"
                        width={720}
                    >
                        {moment(review.dateCreated).format('MMMM D YYYY')}
                    </Text>
                </Box>
            </Flex>
            <Text mt={4} fontSize={1} color="text.black" lineHeight="22px">
                <Truncate lines={3} hasToggle>
                    {review.text}
                </Truncate>
            </Text>
        </Box>
    ));

    return (
        <Box width={720} mx="auto">
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

export default ReviewContainer;
