import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { message } from 'antd';

import HomePageView from './view';
import Newsletter from '../common/Newsletter';
import history from '../../history';

class HomePage extends Component {
    componentDidMount() {
        // used to scroll to hash location on load
        const { hash } = this.props.location;
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();

        const params = qs.parse(history.location.search);

        if (params && params.reason && params.reason === 'token-expiry') {
            message.error('Please login again', 5, () => {
                history.push('/');
            });
        }
    }
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Laguro</title>
                    <link rel="canonical" href="https://www.laguro.com/" />
                    <meta
                        name="description"
                        content="Laguro is a dental care platform matching patients with the right dentist anytime, anywhere"
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'http://schema.org',
                                '@type': 'WebSite',
                                url: 'https://www.laguro.com/',
                                potentialAction: {
                                    '@type': 'SearchAction',
                                    target:
                                        'https://www.laguro.com/dentist/search?text={query}',
                                    query: 'Dentist',
                                },
                            }),
                        }}
                    />
                </Helmet>
                <HomePageView />
                <Newsletter />
            </Fragment>
        );
    }
}

export default withRouter(HomePage);
