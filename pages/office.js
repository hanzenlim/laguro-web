import get from 'lodash/get';
import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';
import validate from 'uuid-validate';

import { Loading } from '~/components';
import GeneralErrorPage from '../routes/GeneralErrorPage';
import Error404Page from '../routes/Error404Page';
import {
    getOfficeImageQuery,
    getOfficeByPermalink,
} from '../routes/OfficeDetailsPage/queries';
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
        const isUuid = validate(id);
        const variables = isUuid ? { id } : { permalink: id };
        const query = isUuid ? getOfficeImageQuery : getOfficeByPermalink;

        return (
            <Query query={query} variables={variables}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <GeneralErrorPage />;
                    }

                    const show404Page = isUuid
                        ? !data.getOffice
                        : !data.getOfficeByPermalink;

                    if (show404Page) {
                        return <Error404Page />;
                    }

                    const pathToData = isUuid
                        ? 'getOffice'
                        : 'getOfficeByPermalink';

                    const officeName = get(data, `${pathToData}.name`);
                    const officeId = get(data, `${pathToData}.id`);
                    const officeDescription = get(
                        data,
                        `${pathToData}.description`
                    );
                    const officeLocation = get(
                        data,
                        `${pathToData}.location.name`
                    );

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
                                imageUrls={get(data, `${pathToData}.imageUrls`)}
                                officeName={officeName}
                                id={officeId}
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
            return {};
        }

        return { id };
    } catch (error) {
        console.log(`Get office error: ${error.message}`);
        return null;
    }
};

export default withRouter(OfficeDetailsPageContainer);
