import React, { PureComponent } from 'react';
import get from 'lodash/get';
import { Query } from 'react-apollo';
import { getOfficeImageQuery } from './queries';
import OfficeDetailsPageView from './view';
import { Loading } from '../../components';
import { RedirectErrorPage } from '../../pages/GeneralErrorPage';

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
                        return <RedirectErrorPage />;
                    }
                    return (
                        <OfficeDetailsPageView
                            officeDetailsDoneLoadingHandler={
                                this.officeDetailsDoneLoadingHandler
                            }
                            officeDetailsDoneLoading={
                                this.state.officeDetailsDoneLoading
                            }
                            imageUrls={get(data, 'getOffice.imageUrls')}
                            id={id}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default OfficeDetailsPageContainer;
