import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import _get from 'lodash/get';
import { Flex, Image } from '../../components';

import history from '../../history';
import LoginPageView from './view';
import { getUser } from '../../util/authUtils';

import bannerBg from '../../images/banner-bg.png';

class LoginPage extends Component {
    state = {
        isLoginModalOpen: true,
    };

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
        const { isLoginModalOpen } = this.state;
        const isOnPromoPage = history.location.pathname.includes('/promo100');
        const user = getUser();

        if (!isOnPromoPage) {
            // Check if user is logged in or not.
            if (_get(user, 'id')) {
                return <Redirect to={search.redirectTo} />;
            }
        }

        if (!isLoginModalOpen) {
            return <Redirect to="/" />;
        }

        return (
            <Fragment>
                {isOnPromoPage ? (
                    <Helmet>
                        <title>Sign up to Laguro</title>
                        <meta name="description" content="Signup to laguro" />
                        <link
                            rel="canonical"
                            href="https://www.laguro.com/promo100"
                        />
                    </Helmet>
                ) : (
                    <Helmet>
                        <title>Log in to Laguro</title>
                        <meta
                            name="description"
                            content="Log in to access your Laguro account."
                        />
                        <link
                            rel="canonical"
                            href="https://www.laguro.com/login"
                        />
                    </Helmet>
                )}
                <Flex
                    display={['none', 'flex', '']}
                    position="absolute"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                    zIndex="1"
                    style={{ overflow: 'hidden' }}
                >
                    <Image
                        height="100%"
                        src={bannerBg}
                        alt="homepage-background"
                        style={{ objectFit: 'cover' }}
                    />
                </Flex>
                <LoginPageView
                    isLoginModalOpen={this.state.isLoginModalOpen}
                    toggleLoginModal={this.toggleLoginModal}
                    message={_get(location, 'state.message')}
                    mode={_get(location, 'state.mode', 'signIn')}
                />
            </Fragment>
        );
    }
}
export default LoginPage;
