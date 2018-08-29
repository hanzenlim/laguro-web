import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';

import {
    Box,
    Flex,
    Image,
    Text,
    Rating,
    Truncate,
    Loading,
} from '../../../components';

const StyledRating = styled(Rating)`
    &&.ant-rate {
        display: inline-block;
        vertical-align: middle;
    }
    ${space};
`;

const ShowMore = () => (
    <Text
        color="text.green"
        fontWeight="bold"
        display="inline-block"
        css="cursor:pointer;"
    >
        show more
    </Text>
);

const ReviewContianer = props => {
    const { reviews, loading } = props;

    const renderReviews =
        reviews &&
        reviews.map(review => (
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
                    />
                    <Box px={15}>
                        <Text
                            fontSize={18}
                            fontWeight="bold"
                            color="text.semiBlack"
                        >
                            {`${review.reviewer.firstName} ${
                                review.reviewer.lastName
                            }`}
                            <StyledRating
                                disabled
                                ml={15}
                                value={review.rating}
                            />
                        </Text>
                        <Text fontSize={14} color="text.semiBlack">
                            {review.dateCreated}
                        </Text>
                    </Box>
                </Flex>
                <Text mt={15} fontSize={14} color="text.semiBlack">
                    <Truncate lines={3} toggle={<ShowMore />}>
                        {review.text}
                    </Truncate>
                </Text>
            </Box>
        ));

    return (
        <Box width={720} mx="auto">
            {loading ? <Loading /> : renderReviews}
        </Box>
    );
};

ReviewContianer.propTypes = {
    loading: PropTypes.bool.isRequired,
    reviews: PropTypes.array,
};

export default ReviewContianer;
