import React, { Fragment, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import DentistDetailsPageView from './view';
import { getDentistQuery } from './queries';
import { Loading, Box } from '../../components';
import { RedirectErrorPage } from '../GeneralErrorPage';

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
                        return <RedirectErrorPage />;
                    }

                    const dentist = data.getDentist;

                    if (!dentist.isVerified) {
                        return <RedirectErrorPage />;
                    }

                    const firstName = _get(dentist, 'user.firstName');
                    const lastName = _get(dentist, 'user.lastName');
                    const dentistName = `Dr. ${firstName} ${lastName}`;

                    return (
                        <Fragment>
                            <Helmet>
                                <title>{`${dentistName} | Laguro`}</title>
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
