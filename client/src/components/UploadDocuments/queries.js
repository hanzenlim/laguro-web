export const queryPatientDocumentQuery = `
    query ($input: QueryParams!) {
        queryPatientDocument(input: $input){
            id,
            healthInsuranceImages
        }
    }
`;

export const saveUploadedImagesUrlQuery = `
    mutation UpdatePatientDocument($input: UpdatePatientDocumentInput!) {
        updatePatientDocument(input: $input) {
            healthInsuranceImages 
        }
    }
`;

export const createPatientDocumentQuery = `
    mutation CreatePatientDocument($input: CreatePatientDocumentInput!) {
        createPatientDocument(input: $input) {
            id
        }
    }
`;

export const getFileStackPolicySignature = `
    query ($type: String!, $handle: String) {
        getFileStackPolicySignature(type: $type, handle: $handle) {
            signature,
            policy,
        }
    }
`;