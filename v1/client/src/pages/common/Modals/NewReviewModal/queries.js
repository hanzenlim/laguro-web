import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const GET_REVIEWER_ID = gql`
    {
        activeUser @client {
            id
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation createReview($input: CreateReviewInput!) {
        createReview(input: $input) {
            id
        }
    }
`;
