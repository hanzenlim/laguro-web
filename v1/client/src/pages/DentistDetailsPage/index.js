import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';

import DentistDetailsPageView from './view';
import { getDentistQuery } from '../common/DentistDetails/queries';
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

                    return <DentistDetailsPageView dentist={dentist} id={id} />;
                }}
            </Query>
        );
    }
}

export default DentistDetailsPageContainer;
