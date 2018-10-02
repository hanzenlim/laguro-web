import { gql } from 'apollo-boost';

export const addEmailToWaitlistMutation = gql`
    mutation addEmailToWaitlist($input: AddEmailToWaitlist!) {
        addEmailToWaitlist(input: $input) {
            id
        }
    }
`;
