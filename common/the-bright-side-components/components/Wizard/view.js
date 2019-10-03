import { Formik } from 'formik';
import React from 'react';
import {
    Step as AlbusStep,
    Steps as AlbusSteps,
    Wizard as BaseWizard,
} from 'react-albus';
import { Route } from 'react-router-dom';
import { getInitialValues } from './helpers';

class FormikWizard extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            status: undefined,
            values: getInitialValues(props.steps),
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAction = this.onAction.bind(this);
        this.renderStep = this.renderStep.bind(this);
        this.renderStepComponent = this.renderStepComponent.bind(this);
    }

    onAction = async (stepValues, stepFormActions, wizard, onAction) => {
        let status;

        try {
            if (wizard.steps[wizard.steps.length - 1].id === wizard.step.id) {
                stepFormActions.setSubmitting(true);
                status = await this.props.onSubmit(this.state.values);
                stepFormActions.setSubmitting(false);
            } else {
                // called after each step
                let hasErrorOrRedirect;
                if (onAction) {
                    hasErrorOrRedirect = await onAction(
                        stepValues,
                        this.state.values,
                        stepFormActions,
                        wizard
                    );
                    status = hasErrorOrRedirect;
                }

                if (!hasErrorOrRedirect) {
                    wizard.next();
                }
            }
        } catch (error) {
            status = error.status;
        }

        this.setState({
            status,
        });

        stepFormActions.setSubmitting(false);
    };

    handleSubmit = (stepValues, stepFormActions, wizard, onAction) => {
        this.setState(
            ({ values }) => ({
                status: undefined,
                values: {
                    ...values,
                    [wizard.step.id]: stepValues,
                },
            }),
            () => this.onAction(stepValues, stepFormActions, wizard, onAction)
        );
    };

    getStepInitialValues = (step, stepId) => {
        if (step.keepValues === false) {
            return step.initialValues;
        }
        return this.state.values[stepId];
    };

    renderStepComponent = (step, wizard) => (
        <Formik
            {...this.props.formikProps}
            initialValues={this.getStepInitialValues(step, wizard.step.id)}
            validationSchema={step.validationSchema}
            onSubmit={(stepValues, stepFormActions) => {
                this.handleSubmit(
                    stepValues,
                    stepFormActions,
                    wizard,
                    step.onAction
                );
            }}
            render={formikProps =>
                React.createElement(this.props.Form || 'form', {
                    onSubmit: formikProps.handleSubmit,
                    children: React.createElement(this.props.render, {
                        ...this.state,
                        // TODO: Remove formikProps after we completely move to using field component
                        formikProps,
                        Step: step.component,
                        actions: {
                            canGoBack: wizard.step.id !== wizard.steps[0].id,
                            goToPreviousStep: () => {
                                wizard.previous();

                                this.setState({
                                    status: undefined,
                                });
                            },
                            currentStep: wizard.step.id,
                            actionLabel: step.actionLabel,
                            isLastStep:
                                wizard.step.id ===
                                wizard.steps[wizard.steps.length - 1].id,
                            isSubmitting: formikProps.isSubmitting,
                        },
                    }),
                })
            }
        />
    );

    renderStep = step => (
        <AlbusStep
            key={step.id}
            id={step.id}
            render={wizard => this.renderStepComponent(step, wizard)}
        />
    );

    render() {
        if (!this.props.withRoutingHistory) {
            return (
                <BaseWizard>
                    <AlbusSteps>
                        {this.props.steps.map(this.renderStep)}
                    </AlbusSteps>
                </BaseWizard>
            );
        }

        return (
            <Route
                render={({ history, match: { url } }) => (
                    // TODO: Remove basename to fix routing issue in kiosk
                    <BaseWizard history={history} basename={url}>
                        <AlbusSteps>
                            {this.props.steps.map(this.renderStep)}
                        </AlbusSteps>
                    </BaseWizard>
                )}
            />
        );
    }
}

export default FormikWizard;
