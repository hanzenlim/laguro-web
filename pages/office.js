import get from 'lodash/get';
import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';
import { Loading } from '~/components';
import GeneralErrorPage from '../routes/GeneralErrorPage';
import Error404Page from '../routes/Error404Page';
import { getOfficeImageQuery } from '../routes/OfficeDetailsPage/queries';
import OfficeDetailsPageView from '../routes/OfficeDetailsPage/view';
import { withRouter } from 'next/router';

class OfficeDetailsPageContainer extends PureComponent {
    state = {
        officeDetailsDoneLoading: false,
        id: null,
    };

    officeDetailsDoneLoadingHandler = () => {
        this.setState({
            officeDetailsDoneLoading: true,
        });
    };

    render() {
        const { id } = this.props;

        return (
            <Query query={getOfficeImageQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <GeneralErrorPage />;
                    }

                    // TODO: add SSR 404
                    if (!data.getOffice) {
                        return <Error404Page />;
                    }

                    const officeName = get(data, 'getOffice.name');
                    const officeDescription = get(
                        data,
                        'getOffice.description'
                    );
                    const officeLocation = get(data, 'getOffice.location.name');

                    return (
                        <Fragment>
                            <Head>
                                <title>{`${officeName} | Laguro`}</title>
                                <meta
                                    name="description"
                                    content={`${officeName} in ${officeLocation}. ${officeDescription}`}
                                />
                                <link
                                    rel="canonical"
                                    href={`https://www.laguro.com${this.props.router.asPath}`}
                                />
                            </Head>

                            <OfficeDetailsPageView
                                officeDetailsDoneLoadingHandler={
                                    this.officeDetailsDoneLoadingHandler
                                }
                                officeDetailsDoneLoading={
                                    this.state.officeDetailsDoneLoading
                                }
                                imageUrls={get(data, 'getOffice.imageUrls')}
                                officeName={officeName}
                                id={id}
                            />
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

OfficeDetailsPageContainer.getInitialProps = async ({ req }) => {
    try {
        const id = get(req, 'params.id', '');

        if (!id) {
            return null;
        }

        return { id };
    } catch (error) {
        console.log(`Get office error: ${error.message}`);
        return null;
    }
};

export default withRouter(OfficeDetailsPageContainer);
