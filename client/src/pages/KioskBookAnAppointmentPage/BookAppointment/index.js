import React, { Fragment, Component } from 'react';
import {
    Wizard,
    AppointmentSelection,
    Terms,
    Progress,
    PreviousButton,
    Onboarding,
} from '@laguro/the-bright-side-components';
import { adopt } from 'react-adopt';
import _flatten from 'lodash/flatten';
import _get from 'lodash/get';
import queryString from 'query-string';
import {
    GET_OFFICE,
    CREATE_PATIENT_APPOINTMENT_ONBOARDING,
    GET_ACTIVE_USER,
} from './queries';
import { Query, Mutation, withApollo } from 'react-apollo';
import { Flex, Text, Loading } from '@laguro/basic-components';
import * as Yup from 'yup';
import moment from 'moment';
import { RedirectErrorPage } from '../../GeneralErrorPage';
import isEmpty from 'lodash/isEmpty';
import { onKioskLogout } from '../../../util/authUtils';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

class KioskBookAnAppointmentPage extends Component {
    render() {
        const componentProps = this.props;
        const { officeId } = queryString.parse(this.props.location.search);
        const ApptSelectionComposed = adopt({
            getOneOfficeWithActiveDentistsWithAppointmentSlots: ({
                render,
            }) => {
                return (
                    <Query
                        variables={{
                            id: officeId,
                        }}
                        query={GET_OFFICE}
                    >
                        {render}
                    </Query>
                );
            },
        });

        const Composed = adopt({
            getActiveUser: ({ render }) => {
                return <Query query={GET_ACTIVE_USER}>{render}</Query>;
            },
            createPatientAppointmentOnboarding: ({ render }) => {
                return (
                    <Mutation mutation={CREATE_PATIENT_APPOINTMENT_ONBOARDING}>
                        {render}
                    </Mutation>
                );
            },
        });

        const steps = [
            {
                id: '0',
                validationSchema: Yup.object().shape({
                    appointmentSelected: Yup.string().required(
                        'You must select an appointment'
                    ),
                }),
                initialValues: {},
            },
            {
                id: '1',
                initialValues: {},
            },
        ];

        const Step0 = props => (
            <ApptSelectionComposed>
                {({
                    getOneOfficeWithActiveDentistsWithAppointmentSlots: {
                        loading,
                        error,
                        data,
                    },
                }) => {
                    if (loading) {
                        return <Loading />;
                    } else if (error) {
                        return <RedirectErrorPage />;
                    }

                    const activeDentistsWithAppointmentSlots = _get(
                        data,
                        'getOffice.activeDentists'
                    );

                    if (isEmpty(activeDentistsWithAppointmentSlots)) {
                        return (
                            <Flex flexDirection="column" alignItems="center">
                                <Text mb="6px">
                                    There are no appointments available at this
                                    office this week
                                </Text>
                                <Onboarding.NextButton
                                    onClick={() => onKioskLogout(props.client)}
                                >
                                    Log out
                                </Onboarding.NextButton>
                            </Flex>
                        );
                    }

                    const dentistTimes = _flatten(
                        activeDentistsWithAppointmentSlots.map(dent =>
                            dent.availableAppointmentSlots.map(apptSlot => ({
                                startTime: apptSlot.startTime,
                                reservationId: apptSlot.reservationId,
                                ...dent,
                                id: `${dent.id}${apptSlot.startTime}`,
                                dentistId: dent.id,
                                name: `Dr. ${dent.user.firstName} ${
                                    dent.user.lastName
                                }`,
                                rating: dent.averageRating,
                                imageUrl:
                                    dent.user.imageUrl || defaultUserImage,
                                appointmentDuration:
                                    dent.firstAppointmentDuration,
                                procedures: dent.procedures.map(p => p.name),
                                languages: dent.languages.map(
                                    lang =>
                                        lang.charAt(0).toUpperCase() +
                                        lang.toLowerCase().substr(1)
                                ),
                            }))
                        )
                    );

                    this.dentistTimes = dentistTimes;

                    return (
                        <Flex height="100%">
                            <PreviousButton
                                goToPreviousStep={() => {
                                    this.props.history.push(
                                        '/kiosk/reason-of-visit'
                                    );
                                }}
                            />

                            <AppointmentSelection
                                {...props}
                                dentistTimes={dentistTimes}
                            />
                        </Flex>
                    );
                }}
            </ApptSelectionComposed>
        );
        const historyLocationSearch = _get(this.props, 'location.search'); // same thing as history.location.search but with less bugs
        const { reasonOfVisit } = queryString.parse(historyLocationSearch);

        const Step1 = props => <Terms {...props} />;

        const render = props => {
            let step = null;

            switch (props.actions.currentStep) {
                case '0':
                    step = Step0(props);
                    break;
                case '1':
                    step = Step1(props);
                    break;
                default:
                    step = Step1(props);
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
            <Composed>
                {({ createPatientAppointmentOnboarding, getActiveUser }) => (
                    <Fragment>
                        <Progress
                            step={2}
                            steps={progressSteps}
                            percent={22.5}
                        />
                        <Wizard
                            onSubmit={async values => {
                                const dentistTime = this.dentistTimes.find(
                                    dt =>
                                        dt.id === values[0].appointmentSelected
                                );
                                try {
                                    const result = await createPatientAppointmentOnboarding(
                                        {
                                            variables: {
                                                input: {
                                                    patientId:
                                                        getActiveUser.data
                                                            .activeUser.id,
                                                    reservationId:
                                                        dentistTime.reservationId,
                                                    localStartTime: moment(
                                                        dentistTime.startTime
                                                    ),
                                                    localEndTime: moment(
                                                        dentistTime.startTime
                                                    ).add(
                                                        dentistTime.firstAppointmentDuration,
                                                        'minutes'
                                                    ),
                                                    reasonOfVisit,
                                                },
                                            },
                                        }
                                    );

                                    // Move to next step
                                    this.props.history.push(
                                        `/kiosk/booking-confirmation/${
                                            result.data
                                                .createPatientAppointmentOnboarding
                                                .id
                                        }`
                                    );
                                } catch (error) {
                                    console.log(error);
                                }
                            }}
                            Form="form"
                            render={props => (
                                <React.Fragment>
                                    {props.actions.canGoBack && (
                                        <PreviousButton
                                            goToPreviousStep={
                                                props.actions.goToPreviousStep
                                            }
                                        />
                                    )}
                                    {render({ ...props, ...componentProps })}
                                </React.Fragment>
                            )}
                            steps={steps}
                        />
                    </Fragment>
                )}
            </Composed>
        );
    }
}

export default withApollo(KioskBookAnAppointmentPage);
