import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import { getAppointmentQuery } from './queries';
import PaymentSuccessPageView from './view';

class PaymentSuccess extends PureComponent {
    render() {
        const { location } = this.props;
        const { appointmentId } = queryString.parse(location.search);

        return (
            <Query
                query={getAppointmentQuery}
                variables={{ id: appointmentId }}
            >
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div>Loading...</div>;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    return <PaymentSuccessPageView data={data} />;
                }}
            </Query>
        );
    }
}

export default PaymentSuccess;
