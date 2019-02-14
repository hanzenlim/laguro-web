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
`;

export const requestDentistVerificationMutation = gql`
    mutation RequestDentistVerification(
        $input: RequestDentistVerificationInput!
    ) {
        requestDentistVerification(input: $input) {
            id
            deaRegistrationNumber
            npiNumber
            ssnOrEinOrTin
        }
    }
`;

// eslint-disable-next-line
export const getIdQueryClient = gql`
    query activeUser {
        activeUser @client {
            id
            dentistId
        }
    }
`;

export const queryPatientDocumentQuery = gql`
    query ($input: QueryParams!) {
        queryPatientDocument(input: $input){
            ${patientDocumentFragment}
        }
    }
`;

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
