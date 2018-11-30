import React, { Fragment, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import DentistDetailsPageView from './view';
import { getDentistQuery } from './queries';
import { Loading, Box } from '../../components';
import GeneralErrorPage from '../GeneralErrorPage';
import Error404Page from '../Error404Page';

class DentistDetailsPageContainer extends PureComponent {
    render() {
        const { id } = this.props.match.params;

        return (
            <Query query={getDentistQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <Box minHeight="600px">
                                <Loading />
                            </Box>
                        );
                    }

                    if (error) {
                        return <GeneralErrorPage />;
                    }

                    const dentist = data.getDentist;

                    if (!dentist) {
                        return <Error404Page />;
                    }

                    if (!dentist.isVerified) {
                        return <GeneralErrorPage />;
                    }

                    const firstName = _get(dentist, 'user.firstName');
                    const lastName = _get(dentist, 'user.lastName');
                    const dentistName = `Dr. ${firstName} ${lastName}`;
                    const specialty = _get(dentist, 'specialty');
                    const bio = _get(dentist, 'bio');

                    return (
                        <Fragment>
                            <Helmet>
                                <title>{`${dentistName} | Laguro`}</title>
                                <meta
                                    name="description"
                                    content={`${dentistName}. ${specialty}. ${bio}`}
                                />
                                <link
                                    rel="canonical"
                                    href={`https://www.laguro.com${
                                        window.location.pathname
                                    }`}
                                />
                            </Helmet>
                            <DentistDetailsPageView dentist={dentist} id={id} />
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default DentistDetailsPageContainer;
