import cookies from 'browser-cookies';
import { ACTIVE_USER } from '../util/strings';

let user = cookies.get('user');
if (user) {
    const parsedUser = JSON.parse(user);
    console.log('user', user);
    user = { ...parsedUser, __typename: ACTIVE_USER };
}

const AuthResolver = {
    defaults: {
        activeUser: null,
    },
};

export default AuthResolver;
