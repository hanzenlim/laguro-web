import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import _get from 'lodash/get';

import LoginPageView from './view';
import { getUser } from '../../util/authUtils';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoginModalOpen: true,
        };

        this.toggleLoginModal = this.toggleLoginModal.bind(this);
    }

    toggleLoginModal = () => {
        if (this.props.toggleModal) {
            this.props.toggleModal();
        }
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen,
        });
    };

    render() {
        const search = queryString.parse(_get(this.props, 'location.search'));
        const { location } = this.props;
        const user = getUser();

        // Check if user is logged in or not.
        if (_get(user, 'id')) {
            return <Redirect to={search.redirectTo} />;
        }

        return (
            <Fragment>
                <Helmet>
                    <title>Log in to Laguro</title>
                    <meta
                        name="description"
                        content="Log in to access your Laguro account."
                    />
                    <link rel="canonical" href="https://www.laguro.com/login" />
                </Helmet>
                <LoginPageView
                    isLoginModalOpen={this.state.isLoginModalOpen}
                    toggleLoginModal={this.toggleLoginModal}
                    message={_get(location, 'state.message')}
                />
            </Fragment>
        );
    }
}
export default LoginPage;
