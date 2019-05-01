import React, { Fragment, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import get from 'lodash/get';
import { Query } from 'react-apollo';
import { getOfficeImageQuery } from './queries';
import OfficeDetailsPageView from './view';
import { Loading } from '../../components';
import GeneralErrorPage from '../../pages/GeneralErrorPage';
import Error404Page from '../Error404Page';

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
                            <Helmet>
                                <title>{`${officeName} | Laguro`}</title>
                                <meta
                                    name="description"
                                    content={`${officeName} in ${officeLocation}. ${officeDescription}`}
                                />
                                <link
                                    rel="canonical"
                                    href={`https://www.laguro.com${
                                        window.location.pathname
                                    }`}
                                />
                            </Helmet>

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

export default OfficeDetailsPageContainer;
