import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import get from 'lodash/get';

import UpdateDentistProfileFormView from './view';
import { Loading } from '../../../../components';
import {
    getIdQueryClient,
    getDentistQuery,
    updateDentistMutation,
} from './queries';

class UpdateDentistProfileContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.initialLoad = true;
    }
    state = {
        isUpdated: false,
        procedures: {},
    };

    addProcedureTag = (value, option) => {
        const procedure = {
            code: option.props.data.code,
            name: option.props.data.name,
            group: option.props.data.group,
            duration: option.props.data.duration,
        };

        if (!(procedure.group in this.state.procedures)) {
            const procedures = Object.assign({}, this.state.procedures);
            procedures[procedure.group] = procedure;
            this.setState({ procedures });
        }
    };

    removeProcedureTag = (e, group) => {
        if (group in this.state.procedures) {
            const procedures = Object.assign({}, this.state.procedures);
            delete procedures[group];
            this.setState({ procedures });
        }
    };

    render() {
        return (
            <Query query={getIdQueryClient}>
                {({ data }) => (
                    <Query
                        query={getDentistQuery}
                        variables={{ id: data.activeUser.dentistId }}
                    >
                        {({ loading, error, data: dentistData }) => {
                            if (error) return <div>Error</div>;
                            if (loading) return <Loading />;

                            return (
                                <Mutation mutation={updateDentistMutation}>
                                    {(
                                        updateDentist,
                                        {
                                            data: updateDentistData,
                                            loading: updateDentistLoading,
                                            error: updateDentistError,
                                        }
                                    ) => {
                                        const {
                                            id,
                                            specialty,
                                            bio,
                                            procedures,
                                        } =
                                            get(
                                                updateDentistData,
                                                'updateDentist'
                                            ) || get(dentistData, 'getDentist');

                                        if (this.initialLoad) {
                                            const _procedures = {};
                                            procedures.forEach(p => {
                                                _procedures[p.group] = {
                                                    code: p.code,
                                                    name: p.name,
                                                    group: p.group,
                                                    duration: p.duration,
                                                };
                                            });
                                            this.setState({
                                                procedures: _procedures,
                                            });
                                            this.initialLoad = false;
                                        }

                                        const mappedData = {
                                            id,
                                            specialty,
                                            bio,
                                            procedures,
                                        };

                                        const onSuccess = async values => {
                                            const input = {
                                                id: mappedData.id,
                                                specialty: values.specialty,
                                                bio: values.bio,
                                                procedures: Object.keys(
                                                    this.state.procedures
                                                ).map(
                                                    k =>
                                                        this.state.procedures[k]
                                                ),
                                            };

                                            await updateDentist({
                                                variables: { input },
                                            });

                                            window.scrollTo(0, 0);

                                            this.setState({
                                                isUpdated: true,
                                            });
                                        };

                                        return (
                                            <UpdateDentistProfileFormView
                                                data={mappedData}
                                                loading={updateDentistLoading}
                                                addProcedureTag={
                                                    this.addProcedureTag
                                                }
                                                removeProcedureTag={
                                                    this.removeProcedureTag
                                                }
                                                error={
                                                    updateDentistError &&
                                                    'Something went wrong. Please try again later.'
                                                }
                                                procedures={
                                                    this.state.procedures
                                                }
                                                onSuccess={onSuccess}
                                                isUpdated={this.state.isUpdated}
                                            />
                                        );
                                    }}
                                </Mutation>
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

export default UpdateDentistProfileContainer;
