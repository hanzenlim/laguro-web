import { gql } from 'apollo-boost';

// eslint-disable-next-line
export const getOfficeImageQuery = gql`
    query($id: String!) {
        getOffice(id: $id) {
            id
            imageUrls
            name
            description
            location {
                name
            }
        }
    }
`;

export const getOfficeByPermalink = gql`
    query($permalink: String!) {
        getOfficeByPermalink(permalink: $permalink) {
            id
            imageUrls
            name
            description
            location {
                name
            }
        }
    }
`;
