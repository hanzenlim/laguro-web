import React, { Fragment, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import _get from 'lodash/get';
import DentistDetailsPageView from './view';
import { fetchDentistFromES } from './queries';
import { Loading, Box } from '../../components';
import GeneralErrorPage from '../GeneralErrorPage';
import Error404Page from '../Error404Page';

class DentistDetailsPageContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            dentist: null,
        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const result = await fetchDentistFromES(id);
        this.setState({ isLoading: false, dentist: _get(result, '_source') })
    }

    render() {
        const { isLoading, dentist } = this.state;
        const { id } = this.props.match.params;

        if (isLoading) {
            return (
                <Box minHeight="600px">
                    <Loading />
                </Box>
            );
        }

        // if (error) {
        //     return <GeneralErrorPage />;
        // }

        if (!dentist) {
            return <Error404Page />;
        }

        if (!dentist.isVerified) {
            return <GeneralErrorPage />;
        }

        const dentistName = `Dr. ${_get(dentist, 'name')}`;
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
    }
}

export default DentistDetailsPageContainer;
