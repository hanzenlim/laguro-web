import { gql } from 'apollo-boost';
// import cookies from 'browser-cookies';
import { userFragment } from '../../../util/fragments';

// const userId = cookies.get('userId');
const userId = 'b71c43a0-941f-11e8-af52-c5fa9bd2759a';

const headerQuery = gql`
    query{
        getUser(id: "${userId}") {
            ${userFragment}
        }
    }
`;

export default headerQuery;
