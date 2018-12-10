import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

import DeleteCardPaymentModalView from './view';
import { removePaymentOptionMutation, getUserIdQueryClient } from './queries';
import { getPaymentOptionQuery } from '../../Forms/PaymentCardForm/queries';

const refetchQueries = userId => [
    {
        query: getPaymentOptionQuery,
        variables: { id: userId },
    },
];

class DeleteCardPaymentModal extends PureComponent {
    state = {
        isVisible: true,
    };

    onCancel = () => {
        this.setState({
            isVisible: !this.state.isVisible,
        });

        this.props.toggleModalState();
    };

    render() {
        return (
            <Query query={getUserIdQueryClient}>
                {({ data: clientData }) => (
                    <Mutation
                        mutation={removePaymentOptionMutation}
                        refetchQueries={refetchQueries(
                            clientData.activeUser.id
                        )}
                    >
                        {(removePaymentOption, { loading }) => {
                            const onSubmit = async () => {
                                await removePaymentOption({
                                    variables: {
                                        input: {
                                            paymentToken: this.props
                                                .paymentToken,
                                        },
                                    },
                                });

                                this.setState({
                                    isVisible: !this.state.isVisible,
                                });

                                this.props.toggleModalState();
                            };

                            return (
                                <DeleteCardPaymentModalView
                                    visible={this.state.isVisible}
                                    onCancel={this.onCancel}
                                    onSubmit={onSubmit}
                                    loading={loading}
                                />
                            );
                        }}
                    </Mutation>
                )}
            </Query>
        );
    }
}

DeleteCardPaymentModal.defaultProps = {
    paymentToken: null,
    toggleModalState: () => {},
};

DeleteCardPaymentModal.propTypes = {
    paymentToken: PropTypes.string.isRequired,
    toggleModalState: PropTypes.func.isRequired,
};

export default DeleteCardPaymentModal;
