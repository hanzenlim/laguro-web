/* eslint-disable camelcase */
import React, { Component } from 'react';
import { message } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { adopt } from 'react-adopt';
import { Query, Mutation, withApollo } from 'react-apollo';
import { getUser } from '../../util/authUtils';
import { RedirectErrorPage } from '../GeneralErrorPage';
import { GET_USER, UPDATE_INSURANCE_INFO_MUTATION } from './queries';
import { Flex, Loading, Box } from '../../components/index';
import {
    getPatientInsuranceFormWizardSteps,
    INSURANCE_WIZARD_STEP_ID,
    PATIENT_INSURANCE_FORM_LAST_WIZARD_STEP_ID,
} from './getPatientInsuranceFormWizardSteps';
import history from '../../history';
import { KioskInsurance } from '../common/the-bright-side-components/components/Kiosk/KioskInsurance';
import { Onboarding, Wizard } from '../common/the-bright-side-components';

const getCurrentWizardStep = () => history.location.pathname.split('/')[2];

class PatientInsuranceForm extends Component {
    constructor(props) {
        super(props);
        this.Composed = adopt({
            getUserResponse: ({ render, userId }) => (
                <Query
                    query={GET_USER}
                    variables={{
                        id: userId,
                    }}
                    fetchPolicy="network-only"
                    skip={!_isEmpty(props.user)}
                >
                    {render}
                </Query>
            ),
            updateInsuranceInfoMutation: ({ render }) => (
                <Mutation mutation={UPDATE_INSURANCE_INFO_MUTATION}>
                    {render}
                </Mutation>
            ),
        });
    }

    componentDidMount() {
        message.warning(
            "We only accept the primary holder's insurance information at this time. If you are a dependent, then please reach out to our support team.",
            10
        );
    }

    render() {
        const userId = _get(getUser(), 'id');
        const currentWizardStepId = getCurrentWizardStep();

        return (
            <this.Composed {...{ userId, currentWizardStepId }}>
                {({
                    getUserResponse: {
                        loading: isGetUserLoading,
                        error: getUserHasError,
                        data: userData,
                    },
                    updateInsuranceInfoMutation,
                }) => {
                    if (isGetUserLoading) {
                        return <Loading />;
                    }

                    if (getUserHasError) {
                        return <RedirectErrorPage />;
                    }

                    this.user = _get(userData, 'getUser') || this.user; // work around for this.user not getting set at random moments

                    const render = props => {
                        let step;

                        // in order
                        switch (props.actions.currentStep) {
                            case INSURANCE_WIZARD_STEP_ID:
                                step = <KioskInsurance {...props} />;
                                break;
                            case PATIENT_INSURANCE_FORM_LAST_WIZARD_STEP_ID:
                                this.props.onFinish();
                                return null;
                            default:
                                step = null;
                        }

                        return (
                            <Flex justifyContent="center" pt="100px">
                                {step}
                            </Flex>
                        );
                    };

                    return (
                        <Box>
                            <Wizard
                                onSubmit={() => {}}
                                Form="form"
                                render={wizardProps => (
                                    <React.Fragment>
                                        {wizardProps.actions.canGoBack && (
                                            <Onboarding.PreviousButton
                                                goToPreviousStep={
                                                    wizardProps.actions
                                                        .goToPreviousStep
                                                }
                                            />
                                        )}
                                        {render({
                                            ...wizardProps,
                                            ...this.props,
                                        })}
                                    </React.Fragment>
                                )}
                                steps={getPatientInsuranceFormWizardSteps({
                                    user: this.user,
                                    mutations: {
                                        updateInsuranceInfoMutation,
                                    },
                                })}
                            />
                        </Box>
                    );
                }}
            </this.Composed>
        );
    }
}
export default withApollo(PatientInsuranceForm);
