import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

export const getDentistQuery = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            isVerified
            dentist {
                id
                deaRegistrationNumber
                ssnOrEinOrTin
                npiNumber
                isVerified
                isHostVerified
            }
        }
    }
`;

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

export const queryPatientDocumentQuery = gql`
    query ($input: QueryParams!) {
        queryPatientDocument(input: $input){
            ${patientDocumentFragment}
        }
    }
`;

export const requestDentistVerificationMutation = graphql(
    gql`
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
    `,
    {
        props: ({ mutate }) => ({
            requestDentistVerification: input =>
                mutate({
                    variables: {
                        input,
                    },
                }),
        }),
    }
);

export const updateDentistMutation = graphql(
    gql`
        mutation UpdateDentist($input: UpdateDentistInput!) {
            updateDentist(input: $input) {
                id
                deaRegistrationNumber
                npiNumber
                ssnOrEinOrTin
            }
        }
    `,
    {
        props: ({ mutate }) => ({
            updateDentist: input =>
                mutate({
                    variables: {
                        input,
                    },
                }),
        }),
    }
);

export const userInsurancePreferencesQuery = gql`
    query($id: String!) {
        getUser(id: $id) {
            id
            insurancePreference {
                useInsurance
                insurance {
                    firstName
                    lastName
                    birthdate
                    insuranceMemberId
                    insuranceProvider
                }
            }
        }
    }
`;

export const getActiveUserQuery = gql`
    {
        activeUser @client {
            id
            firstName
            lastName
            imageUrl
            email
            intercomHash
            dentistId
            isDentist
            isHost
        }
    }
`;

export const getActiveUser = graphql(getActiveUserQuery, {
    props: ({ data: { activeUser } }) => ({
        user: activeUser,
    }),
});

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

export const saveUserMutation = graphql(
    gql`
        mutation UpdateUser($input: UpdateUserInput!) {
            updateUser(input: $input) {
                id
                isVerified
                sentVerificationDocuments
                insurancePreference {
                    useInsurance
                    insurance {
                        firstName
                        lastName
                        birthdate
                        insuranceMemberId
                        insuranceProvider
                    }
                }
            }
        }
    `,
    {
        props: ({ mutate }) => ({
            saveUser: input =>
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
