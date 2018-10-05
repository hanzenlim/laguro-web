import React, { PureComponent } from 'react';
import get from 'lodash/get';
import moment from 'moment';
import { compose, Query, graphql, withApollo } from 'react-apollo';
import {
    getDentistQuery,
    getUserQuery,
    createAppointmentMutation,
    checkPatientVerified,
} from './queries';

import BookAppointmentView from './view';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

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

            showVerificationModal: false,
            paymentError: null,
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

        return false;
    };

    handleCloseVerificationModal = () => {
        this.setState({
            showVerificationModal: false,
        });
    };

    handlePay = async paymentOptionId => {
        const {
            client,
            data: { activeUser },
        } = this.props;

        const {
            data: { getUser },
        } = await client.query({
            query: checkPatientVerified,
            variables: { id: activeUser.id },
        });

        if (getUser && getUser.isVerified) {
            await this.props.mutate({
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
        }

        this.setState({ showVerificationModal: true });
    };

    handleVerificationResult = () => {
        this.setState({ showVerificationModal: false });
    };

    render() {
        const { id } = this.props;
        const {
            isPaymentVisible,
            bookedAppointment,
            showVerificationModal,
        } = this.state;

        return (
            <Query query={getDentistQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    return (
                        <BookAppointmentView
                            data={get(data, 'getDentist.reservations')}
                            isPaymentVisible={isPaymentVisible}
                            bookedAppointment={bookedAppointment}
                            showVerificationModal={showVerificationModal}
                            onFilter={this.handleFilter}
                            onPay={this.handlePay}
                            onSelect={this.handleSelect}
                            onVerificationResult={this.handleVerificationResult}
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
