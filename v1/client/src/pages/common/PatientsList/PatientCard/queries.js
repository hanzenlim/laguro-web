import { gql } from 'apollo-boost';

export const updatePatientImagesMutation = gql`
    mutation updatePatientImages($input: UpdatePatientImages!) {
        updatePatientImages(input: $input) {
            id
            patientImages {
                imageUrl
            }
        }
    }
`;
