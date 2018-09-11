import React, { PureComponent } from 'react';
import get from 'lodash/get';
import moment from 'moment';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import {
    getDentistQuery,
    getUserQuery,
    createAppointmentMutation,
} from './queries';

import BookAppointmentView from './view';
import { Loading } from '../../../components';

class BookAppointment extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            reservationId: null,
            patientId: null,
            location: null,
            procedure: null,
            startTime: null,
            endTime: null,
            isPaymentVisible: false,
            bookedAppointment: null,
        };
    }

    handleFilter = () => {
        this.setState({ isPaymentVisible: false });
    };

    handleSelect = async data => {
        this.setState({
            reservationId: data.reservationId,
            patientId: this.props.data.activeUser.id,
            location: data.location,
            procedure: data.procedure,
            startTime: data.startTime,
            endTime: data.endTime,
            isPaymentVisible: true,
        });
    };

    handlePaymentSuccess = async paymentOptionId => {
        const result = await this.props.mutate({
            variables: {
                input: {
                    reservationId: this.state.reservationId,
                    patientId: this.props.data.activeUser.id,
                    procedure: this.state.procedure,
                    startTime: this.state.startTime,
                    endTime: this.state.endTime,
                    paymentOptionId,
                },
            },
        });

        this.setState({
            bookedAppointment: {
                location: this.state.location,
                time: moment(this.state.startTime).format('LLLL'),
            },
        });

        return result;
    };

    render() {
        const { id } = this.props;

        return (
            <Query query={getDentistQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    return (
                        <BookAppointmentView
                            data={get(data, 'getDentist.reservations')}
                            onFilter={this.handleFilter}
                            isPaymentVisible={this.state.isPaymentVisible}
                            onPaymentSuccess={this.handlePaymentSuccess}
                            onSelect={this.handleSelect}
                            bookedAppointment={this.state.bookedAppointment}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default compose(
    withApollo,
    graphql(getUserQuery),
    graphql(createAppointmentMutation)
)(BookAppointment);
