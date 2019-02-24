import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const patientDocumentFragment = `
    id
    healthInsuranceImages {
        url
        side
    }
    license {
        url
        side
    }
    dentistPhotoId {
        url
        side
    }
    stateDentalLicense {
        url
        side
    }
    deaRegistration {
        url
        side
    }
    warranty {
        url
        side
    }
    businessLicense {
        url
        officeId
    }
    generalInsurance {
        url
        officeId
    }
`;

export const queryPatientDocumentQuery = gql`
    query ($input: QueryParams!) {
        queryPatientDocument(input: $input){
            ${patientDocumentFragment}
        }
    }
`;

export const saveUploadedImagesMutation = graphql(
    gql`
    mutation UpdatePatientDocument($input: UpdatePatientDocumentInput!) {
        updatePatientDocument(input: $input) {
            ${patientDocumentFragment}
        }
    }
`,
    {
        props: ({ mutate }) => ({
            saveUploadedImages: input =>
                mutate({
                    variables: {
                        input,
                    },
                }),
        }),
    }
);

export const createPatientDocumentMutation = graphql(
    gql`
        mutation CreatePatientDocument($input: CreatePatientDocumentInput!) {
            createPatientDocument(input: $input) {
                ${patientDocumentFragment}
            }
        }
    `,
    {
        props: ({ mutate }) => ({
            createPatientDocument: input =>
                mutate({
                    variables: {
                        input,
                    },
                }),
        }),
    }
);

export const getFileStackPolicySignatureQuery = `
    query ($type: String!, $handle: String) {
        getFileStackPolicySignature(type: $type, handle: $handle) {
            signature,
            policy,
        }
    }
`;
