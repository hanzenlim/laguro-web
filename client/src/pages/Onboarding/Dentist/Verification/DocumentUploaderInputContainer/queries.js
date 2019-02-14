import { gql } from 'apollo-boost';

export const getFileStackPolicySignatureQuery = gql`
    query($type: String!, $handle: String) {
        getFileStackPolicySignature(type: $type, handle: $handle) {
            signature
            policy
        }
    }
`;
