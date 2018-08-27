import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import queryString from 'query-string';
import { getReservationQuery } from './queries';
import PaymentPageView from './view';

class Payment extends PureComponent {
    render() {
        const { reservationId } = queryString.parse(this.props.location.search);

        alert(reservationId);
        return (
            <Query
                query={getReservationQuery}
                variables={{ id: reservationId }}
            >
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div>Loading...</div>;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    return <PaymentPageView data={data} />;
                }}
            </Query>
        );
    }
}

export default Payment;
