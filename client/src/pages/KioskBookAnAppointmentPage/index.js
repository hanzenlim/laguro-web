import React, { Fragment } from 'react';
import _random from 'lodash/random';
import {
    Wizard,
    ReasonOfVisit,
    AppointmentSelection,
    SelectProcedure,
    Terms,
    BookingConfirmation,
    Progress,
} from '@laguro/the-bright-side-components';
import { adopt } from 'react-adopt';
import {
    GET_OFFICE,
    CREATE_PATIENT_APPOINTMENT_ONBOARDING,
    GET_ACTIVE_USER,
} from './queries';
import { Query, Mutation } from 'react-apollo';
import { Flex } from '@laguro/basic-components';
import * as Yup from 'yup';
import moment from 'moment';

const Composed = adopt({
    getOffice: ({ render }) => {
        return (
            <Query
                variables={{ id: '1a85a780-fcbf-11e8-b3a0-d32c9e487a86' }}
                query={GET_OFFICE}
            >
                {render}
            </Query>
        );
    },
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
        validationSchema: {},
        component: null,
        initialValues: {
            reasonOfVisit: '',
        },
    },
    {
        id: '1',
        validationSchema: {},
        component: null,
        initialValues: procedureList,
    },
    {
        id: '2',
        validationSchema: Yup.object().shape({
            appointmentSelected: Yup.string().required(
                'You must select an appointment'
            ),
        }),
        initialValues: {},
    },
    {
        id: '3',
        initialValues: {},
    },
    {
        id: '4',
        initialValues: {},
    },
];

const events = [];

for (let i = 0; i < 36; i += 1) {
    events.push({
        id: i.toString(),
        startTime: moment()
            .add((i + _random(1)) % 6, 'days')
            .format(),
        name: 'Dr. William Choi',
        rating: 4.5,
        specialties: [
            'Adjun',
            'Endodo',
            'Adjun',
            'Endodo',
            'Adjun',
            'Endodo',
            'Adjun',
            'Endodo',
            'Adjun',
            'Endodo',
            'Adjun',
            'Endodo',
        ],
        imageUrl: 'http://bit.ly/laguro-joe',
    });
}

const procedureList = {
    'Adjunctive General': false,
    Diagnostic: false,
    Preventive: false,
    Restorative: false,
    'Oral Surgery': false,
    'Maxillofacial / Prosthetics': false,
    Orthodontics: false,
    Periodontics: false,
    Prosthodontics: false,
    Endodontics: false,
    Implantology: false,
};

const Step0 = props => <ReasonOfVisit {...props} />;
const Step1 = props => (
    <SelectProcedure {...props} procedureList={procedureList} />
);
const Step2 = props => (
    <Composed>
        {({ getOffice }) => {
            // TODO: Continue after new getOffice is implemented
            console.log(getOffice, 'GET OFFICE CALL');
            // const list = [];
            // getOffice.data.getOffice.listings[0].reservations.map(r =>
            //     list.push(r)
            // );
            // console.log('NEW LIST', list);
            return <AppointmentSelection {...props} events={events} />;
        }}
    </Composed>
);
const Step3 = props => (
    <Composed>
        {({ createPatientAppointmentOnboarding, getActiveUser }) => {
            return (
                <Terms
                    {...props}
                    onSubmit={async () => {
                        const result = await createPatientAppointmentOnboarding(
                            {
                                variables: {
                                    input: {
                                        patientId:
                                            getActiveUser.data.activeUser.id,
                                        reservationId:
                                            props.values[2].appointmentSelected,
                                        localStartTime: 'String',
                                        localEndTime: 'String',
                                        reasonOfVisit: 'String',
                                    },
                                },
                            }
                        );
                        // Move to next step
                        props.formikProps.submitForm();
                    }}
                />
            );
        }}
    </Composed>
);
const Step4 = props => (
    <BookingConfirmation
        date="Jan. 19. 2019"
        rating={4}
        time="5:15PM"
        doctorName="Dr. William Choi"
    />
);

const render = props => {
    let step = null;

    console.log(1111, props);

    switch (props.actions.currentStep) {
        case '0':
            step = Step0(props);
            break;
        case '1':
            step = Step1(props);
            break;
        case '2':
            step = Step2(props);
            break;
        case '3':
            step = Step3(props);
            break;
        case '4':
            step = Step4(props);
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

const KioskBookAnAppointmentPage = () => {
    return (
        <Fragment>
            {/* TODO: Move progress to a parent component */}
            <Progress step={2} steps={progressSteps} percent={22.5} />
            <Wizard
                onSubmit={value => console.log(value)}
                Form="form"
                render={props => render(props)}
                steps={steps}
            />
        </Fragment>
    );
};

export default KioskBookAnAppointmentPage;
