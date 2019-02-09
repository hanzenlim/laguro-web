import React, { Fragment, Component } from 'react';
import {
    Wizard,
    ReasonOfVisit,
    Progress,
} from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';

class KioskBookAnAppointmentPage extends Component {
    render() {
        const steps = [
            {
                id: '0',
                // validationSchema: {},
                component: null,
                initialValues: {
                    reasonOfVisit: '',
                },
            },
        ];

        const Step0 = props => <ReasonOfVisit {...props} />;

        const render = props => {
            let step = null;

            switch (props.actions.currentStep) {
                case '0':
                    step = Step0(props);
                    break;
                default:
                    step = Step0(props);
            }

            return (
                <Flex justifyContent="center" mt="100px">
                    {step}
                </Flex>
            );
        };

        const progressSteps = [
            '1 REGISTRATION',
            '2 BOOK AN APPOINTMENT',
            '3 MEDICAL HISTORY FORM',
            '4 INSURANCE',
        ];

        return (
            <Fragment>
                {/* TODO: Move progress to a parent component */}
                <Progress step={2} steps={progressSteps} percent={22.5} />
                <Wizard
                    onSubmit={values =>
                        values[0].reasonOfVisit === 'Exam/Check up/Cleaning'
                            ? this.props.history.push(
                                  `/kiosk/book-appointment?reasonOfVisit=Exam/Check up/Cleaning`
                              )
                            : this.props.history.push('/kiosk/select-procedure')
                    }
                    Form="form"
                    render={props => render({ ...props, ...this.props })}
                    steps={steps}
                />
            </Fragment>
        );
    }
}

export default KioskBookAnAppointmentPage;
