import gql from 'graphql-tag';

export const CREATE_REVIEW = gql`
    mutation createReview($input: CreateReviewInput!) {
        createReview(input: $input) {
            id
        }
    }
`;
