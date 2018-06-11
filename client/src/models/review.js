import makeApiCall from '../util/clientDataLoader';
import { reviewerFragment } from '../util/fragments';

const scanReviewsQuery = `
    scanReviews {
        ${reviewerFragment}
    }
`;

const getReviewQuery = `
    query ($id: String!) {
        getReview(id: $id) {
            ${reviewerFragment}
        }
    }
`;

const createReviewQuery = `
    mutation CreateReview($input: CreateReviewInput!) {
        createReview(input: $input) {
            ${reviewerFragment}
        }
    }
`;

const queryReviewQuery = `
    query RevieweeQuery($input: QueryParams!) {
        queryReviews(input: $input) {
            ${reviewerFragment}
        }
    }
`;

const deleteReviewQuery = `
    mutation DeleteReview($id: String!) {
        deleteReview(id: $id)
    }
`;

const Review = {
    scan: async () => {
        const response = await makeApiCall(scanReviewsQuery, null);
        return response.data.scanReviews;
    },
    get: async reviewId => {
        if (!reviewId) {
            return null;
        }
        const response = await makeApiCall(getReviewQuery, { id: reviewId });
        return response.data.getReview;
    },
    query: async (partitionKey, partitionValue, options) => {
        const response = await makeApiCall(queryReviewQuery, {
            input: {
                partitionKey,
                partitionValue,
                options
            }
        });
        return response.data.queryReviews;
    },
    create: async params => {
        const response = await makeApiCall(createReviewQuery, {
            input: params
        });
        return response.data.createReview;
    },
    delete: async reviewId => {
        const response = await makeApiCall(deleteReviewQuery, { id: reviewId });
        return response.data.deleteReview;
    }
};

export default Review;
