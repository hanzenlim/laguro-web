import React, { Fragment, Component } from 'react';
import {
    Wizard,
    SelectProcedure,
    Progress,
    PreviousButton,
} from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';

class KioskBookAnAppointmentPage extends Component {
    render() {
        const componentProps = this.props;

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

        const procedureList = {
            'Fillings': false,
            'Crowns, Bridges, Veneers': false,
            'Root Canals': false,
            'Gum Surgery / Grafting': false,
            'Deep Cleaning': false,
            'Whitening / Cosmetic': false,
            'Implant placement': false,
            'Implant crown': false,
            'Extractions / Surgery': false,
            'Dentures': false,
            'Braces': false,
        };
        const Step0 = props => (
            <SelectProcedure
                {...props}
                reasonOfVisit={props.values[0].reasonOfVisit}
                procedureList={procedureList}
            />
        );

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
                        // This officeId is the officeId of bell dental office in prod
                        // https://www.laguro.com/office/e91ba710-2b37-11e9-998e-9da6024c6b32
                        this.props.history.push(
                            `/kiosk/book-appointment?officeId=e91ba710-2b37-11e9-998e-9da6024c6b32&reasonOfVisit=${Object.keys(
                                values[0]
                            )
                                .filter(k => values[0][k])
                                .toString()}`
                        )
                    }
                    Form="form"
                    render={props => {
                        return (
                            <React.Fragment>
                                <PreviousButton
                                    goToPreviousStep={() => {
                                        this.props.history.push(
                                            '/kiosk/reason-of-visit'
                                        );
                                    }}
                                />
                                {render({
                                    ...props,
                                    ...componentProps,
                                })}
                            </React.Fragment>
                        );
                    }}
                    steps={steps}
                />
            </Fragment>
        );
    }
}

export default KioskBookAnAppointmentPage;
