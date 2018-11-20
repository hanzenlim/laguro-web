import React, { PureComponent } from 'react';
import { Query, graphql, compose } from 'react-apollo';
import cookies from 'browser-cookies';

import UpdateDentistProfileFormView from './view';
import { Loading } from '../../../../components';
import { RedirectErrorPage } from '../../../GeneralErrorPage';
import {
    getIdQueryClient,
    getUserDentistQuery,
    updateDentistMutation,
    createDentistMutation,
    getActiveUserQuery,
} from './queries';

class UpdateDentistProfileContainer extends PureComponent {
    state = {
        isUpdated: false,
        procedures: {},
        updateDentistError: null,
        isSubmitting: false,
    };

    onCompleted = ({ getUser, updateDentist, createDentist }) => {
        const data = getUser.dentist || updateDentist || createDentist;

        if (data) {
            const { procedures } = data;

            const _procedures = {};
            procedures.forEach(p => {
                _procedures[p.group] = {
                    code: p.code,
                    name: p.name,
                    group: p.group,
                    duration: p.duration,
                };
            });

            if (!this.state.procedures) {
                this.setState({
                    procedures: _procedures,
                });
            }

        }
    };

    render() {
        const { updateDentist, createDentist } = this.props;

        return (
            <Query query={getIdQueryClient}>
                {({ data }) => (
                    <Query
                        query={getUserDentistQuery}
                        fetchPolicy="cache-and-network"
                        variables={{ id: data.activeUser.id }}
                        onCompleted={this.onCompleted}
                    >
                        {({ loading, error, data: dentistData }) => {
                            if (error) return <RedirectErrorPage />;
                            if (loading) return <Loading />;

                            const {
                                getUser: { dentist },
                            } = dentistData;

                            const { procedures, isUpdated } = this.state;

                            const { id, specialty, bio } = dentist || {};
                            const mappedData = {
                                id,
                                specialty,
                                bio,
                                procedures,
                            };

                            const onSuccess = async values => {
                                await this.setState({ isSubmitting: true });
                                const inputBase = {
                                    specialty: values.specialty,
                                    bio: values.bio,
                                    procedures: values.procedures.map(p => ({
                                        code: 'code',
                                        duration: 0,
                                        group: p,
                                        name: 'name',
                                    })),
                                };

                                if (dentist) {
                                    const {
                                        error: updateDentistError,
                                    } = await updateDentist({
                                        id: dentist.id,
                                        ...inputBase,
                                    });

                                    this.setState({
                                        updateDentistError,
                                    });
                                } else {
                                    const {
                                        error: updateDentistError,
                                    } = await createDentist({
                                        userId: data.activeUser.id,
                                        ...inputBase,
                                    });

                                    this.setState({
                                        updateDentistError,
                                    });
                                }

                                window.scrollTo(0, 0);
                                this.setState({
                                    isUpdated: true,
                                    isSubmitting: false,
                                });

                                if (this.props.onComplete) {
                                    this.props.onComplete();
                                }
                            };

                            return (
                                <UpdateDentistProfileFormView
                                    data={mappedData}
                                    error={
                                        this.state.updateDentistError &&
                                        'Something went wrong. Please try again later.'
                                    }
                                    onSuccess={onSuccess}
                                    procedures={procedures}
                                    isUpdated={isUpdated}
                                    isSubmitting={this.state.isSubmitting}
                                />
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

export default compose(
    graphql(createDentistMutation, {
        props: ({ mutate }) => ({
            createDentist: input =>
                mutate({
                    variables: {
                        input,
                    },
                    update: (proxy, { data: { createDentist } }) => {
                        const data = proxy.readQuery({
                            query: getActiveUserQuery,
                        });

                        data.activeUser = {
                            ...data.activeUser,
                            ...createDentist.user,
                            dentistId: createDentist.id,
                        };

                        cookies.set('user', JSON.stringify(data.activeUser), {
                            maxAge: 86400000,
                        });

                        proxy.writeQuery({
                            query: getActiveUserQuery,
                            data,
                        });
                    },
                }),
        }),
    }),
    graphql(updateDentistMutation, {
        props: ({ mutate }) => ({
            updateDentist: input =>
                mutate({
                    variables: {
                        input,
                    },
                }),
        }),
    })
)(UpdateDentistProfileContainer);
