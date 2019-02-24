import { gql } from 'apollo-boost';

export const CREATE_REVIEW = gql`
    mutation createReview($input: CreateReviewInput!) {
        createReview(input: $input) {
            id
        }
    }
`;
