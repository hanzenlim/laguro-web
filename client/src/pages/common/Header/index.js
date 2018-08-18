import React from 'react';
import { Query } from 'react-apollo';
import Header from './view';
import headerQuery from './queries';

const HeaderContainer = () => (
    <Query query={headerQuery}>
        {({ loading, error, data }) => {
            if (loading) {
                return <div>loading...</div>;
            }

            if (error) {
                return <div>error...</div>;
            }
            const onLandingPage = window.location.pathname === '/';
            const auth = data.getUser ? data.getUser : null;

            return <Header auth={auth} onLandingPage={onLandingPage} />;
        }}
    </Query>
);

export default HeaderContainer;
