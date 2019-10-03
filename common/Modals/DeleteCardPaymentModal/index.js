import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import _get from 'lodash/get';

import DeleteCardPaymentModalView from './view';
import { removePaymentOptionMutation } from './queries';
import { getPaymentOptionQuery } from '../../Forms/PaymentCardForm/queries';
import { getUser } from '~/util/authUtils';

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
        const user = getUser();
        return (
            <Mutation
                mutation={removePaymentOptionMutation}
                refetchQueries={refetchQueries(_get(user, 'id'))}
            >
                {(removePaymentOption, { loading }) => {
                    const onSubmit = async () => {
                        await removePaymentOption({
                            variables: {
                                input: {
                                    paymentToken: this.props.paymentToken,
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
