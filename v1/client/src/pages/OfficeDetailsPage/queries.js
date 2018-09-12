import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getOfficeQuery = gql`
    query($id: String!) {
        getOffice(id: $id) {
            name
            location {
                name
                geoPoint {
                    lat
                    lon
                }
            }
            description
            imageUrls
        }
    }
`;

export const getOfficeImageQuery = gql`
    query($id: String!) {
        getOffice(id: $id) {
            imageUrls
        }
    }
`;
