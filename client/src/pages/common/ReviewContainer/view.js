import React from 'react';
import { arrayOf, shape, string, number, func, bool } from 'prop-types';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import queryString from 'query-string';
import history from '../../../history';
import { Box, Flex, Image, Text, Rating } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import { setImageSizeToUrl } from '../../../util/imageUtil';

const ReviewContainer = props => {
    const {
        reviews,
        toggleModalState,
        viewOnly,
        tabletMobileOnly,
        match,
        info,
    } = props;

    const renderReviews = isEmpty(reviews) ? (
        <Flex
            alignItems="center"
            justifyContent="center"
            py={40}
            color="text.black50"
        >
            <Text fontSize={[1, '', 2]} fontWeight="bold">
                No reviews yet.
            </Text>
        </Flex>
    ) : (
        reviews.map(review => (
            <Box
                py={[24, '', 40]}
                borderBottom="1px solid"
                borderColor="divider.gray"
                key={review.id}
            >
                <Flex alignItems='center' mb={[24, '', 5]}>
                    <Image
                        width={[80, '', 82]}
                        height={[80, '', 82]}
                        mr={10}
                        borderRadius="50%"
                        src={setImageSizeToUrl(
                            review.reviewer.imageUrl || defaultUserImage,
                            tabletMobileOnly ? 80 : 82
                        )}
                        alt="reviewer-photo"
                    />
                    <Box>
                        <Flex
                            alignItems="center"
                            fontSize={3}
                            fontWeight="bold"
                            color="text.black"
                            lineHeight="22px"
                        >
                            <Text
                                fontSize={3}
                                lineHeight="22px"
                                letterSpacing="-0.35px"
                            >
                                {`${
                                    review.reviewer.firstName
                                } ${review.reviewer.lastName.charAt(0)}.`}
                            </Text>
                            <Flex alignItems="center" justifyContent="center" pb={3}>
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
                        <Text
                            fontSize={1}
                            color="text.black"
                            lineHeight="22px"
                            letterSpacing="-0.35px"
                        >
                            {moment(review.dateCreated).format('MMMM D YYYY')}
                        </Text>
                    </Box>
                </Flex>
                
                <Text
                    pl={[0, '', 92]}
                    fontSize={1}
                    color="text.black"
                    lineHeight="22px"
                    letterSpacing="-0.44px"
                    style={{ 'white-space': 'pre-line' }}
                >
                    {review.text}
                </Text>
            </Box>
        ))
    );

    return (
        <Box width="100%" mx="auto" mb={-1}>
            <Flex
                alignItems="center"
                justifyContent="space-between"
                pt={40}
                borderTop={['none', '', "1px solid"]}
                borderColor={['', '', 'divider.gray']}
            >
                <Text
                    fontSize={[1, '', 2]}
                    fontWeight='medium'
                    lineHeight="30px"
                    letterSpacing={['-0.35px', '', '-0.4px']}
                >
                    Reviews
                </Text>
                {!viewOnly && (
                    <Text
                        is="a"
                        color="text.blue"
                        fontSize={1}
                        fontWeight={['medium', '', 'bold']}
                        lineHeight="22px"
                        letterSpacing="-0.44px"
                        alignSelf={['center', '', 'flex-end']}
                        onClick={
                            tabletMobileOnly
                                ? () =>
                                    history.push(
                                        `/review/${_get(
                                            match,
                                            'params.id'
                                        )}?${queryString.stringify(info)}`
                                    )
                                : toggleModalState
                        }
                    >
                        Add a review
                    </Text>
                )}
            </Flex>
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
