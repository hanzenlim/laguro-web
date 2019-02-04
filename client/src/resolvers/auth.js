import cookies from 'browser-cookies';
import { gql } from 'apollo-boost';
import { ACTIVE_USER } from '../util/strings';

let user = cookies.get('user');
if (user) {
    const parsedUser = JSON.parse(user);
    user = { ...parsedUser, __typename: ACTIVE_USER };
}

const AuthResolver = {
    defaults: {
        activeUser: user || null,
    },
    resolvers: {
        Mutation: {
            setActiveUser(_, variables, { cache }) {
                const data = {
                    data: {
                        activeUser: {
                            ...variables.input.activeUser,
                            __typename: 'ActiveUser',
                        },
                    },
                };
                cache.writeData(data);
                return data;
            },
        },
    },
};

export default AuthResolver;
