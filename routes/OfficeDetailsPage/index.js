import get from 'lodash/get';
import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import validate from 'uuid-validate';

import { Loading } from '~/components';
import GeneralErrorPage from '~/routes/GeneralErrorPage';
import Error404Page from '~/routes/Error404Page';
import { getOfficeImageQuery } from './queries';
import OfficeDetailsPageView from './view';

class OfficeDetailsPageContainer extends PureComponent {
    state = {
        officeDetailsDoneLoading: false,
    };

    officeDetailsDoneLoadingHandler = () => {
        this.setState({
            officeDetailsDoneLoading: true,
        });
    };

    render() {
        const { id } = this.props.match.params;
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

                    // TODO: add SSR 404
                    if (show404Page) {
                        return <Error404Page />;
                    }

                    const pathToData = isUuid
                        ? 'getOffice'
                        : 'getOfficeByPermalink';

                    const officeName = get(data, `${pathToData}.name`);
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
                            <Helmet>
                                <title>{`${officeName} | Laguro`}</title>
                                <meta
                                    name="description"
                                    content={`${officeName} in ${officeLocation}. ${officeDescription}`}
                                />
                                <link
                                    rel="canonical"
                                    href={`https://www.laguro.com${window.location.pathname}`}
                                />
                            </Helmet>

                            <OfficeDetailsPageView
                                officeDetailsDoneLoadingHandler={
                                    this.officeDetailsDoneLoadingHandler
                                }
                                officeDetailsDoneLoading={
                                    this.state.officeDetailsDoneLoading
                                }
                                imageUrls={get(data, `${pathToData}.imageUrls`)}
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

export default OfficeDetailsPageContainer;
