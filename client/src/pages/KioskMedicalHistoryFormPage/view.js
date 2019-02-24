import {
    HealthHistoryForm,
    Wizard,
    Onboarding,
} from '@laguro/the-bright-side-components';
import { Box } from '@laguro/basic-components';
import * as React from 'react';
import * as Yup from 'yup';
import _isEmpty from 'lodash/isEmpty';
import { getRedirectUrl } from '../../history';

const {
    BloodDisorders,
    BrainDisorders,
    DoctorGeneralInformation,
    DrugAllergies,
    DrugsAndAlcohol1,
    DrugsAndAlcohol2,
    GeneralDentalInfo1,
    GeneralDentalInfo2,
    GeneralHealth,
    GeneralMedicalInfo1,
    GeneralMedicalInfo2,
    ImmuneAndCancer,
    LastDentalExam,
    LastDentalExamProcedure,
    NutritionalDiseases,
    OtherHeartConditions,
    RespiratoryDisorders,
    TerminalIllness,
    UrgentHeartConditions,
    WomenOnly,
} = HealthHistoryForm;

const getInitialValues = questions => {
    const initialValues = {};

    questions.forEach(q => {
        initialValues[q.name] = q.value;
    });
    return initialValues;
};

const steps = [
    {
        id: 'LastDentalExam',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(LastDentalExam.questions),
    },
    {
        id: 'LastDentalExamProcedure',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(LastDentalExamProcedure.questions),
    },
    {
        id: 'DoctorGeneralInformation',
        validationSchema: Yup.object().shape({
            'Physician address': Yup.string(),
            'Physician name': Yup.string(),
            'Physician phone number': Yup.string(),
        }),
        component: null,
        initialValues: getInitialValues(DoctorGeneralInformation.questions),
    },
    {
        id: 'GeneralHealth',
        validationSchema: Yup.object().shape({
            'Any changes in your general health within the past year?': Yup.string().required(
                'Required'
            ),
            'Any changes in your general health within the past year? (Explanation)': Yup.string(),
            'Are you being treated for any conditions? If yes, please list': Yup.string().required(
                'Required'
            ),
            'Are you currently taking any prescription or over the counter medicine(s)?': Yup.string().required(
                'Required'
            ),
            'Are you in good health?': Yup.string().required('Required'),
            'Have you been hospiltalized in the past 5 years?': Yup.string().required(
                'Required'
            ),
            'When was your last physical exam? (Month)': Yup.string(),
            'When was your last physical exam? (Year)': Yup.string(),
        }),
        component: null,
        initialValues: getInitialValues(GeneralHealth.questions),
    },
    {
        id: 'GeneralMedicalInfo1',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(GeneralMedicalInfo1.questions),
    },
    {
        id: 'GeneralMedicalInfo2',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(GeneralMedicalInfo2.questions),
    },
    {
        id: 'WomenOnly',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(WomenOnly.questions),
    },
    {
        id: 'GeneralDentalInfo1',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(GeneralDentalInfo1.questions),
    },
    {
        id: 'GeneralDentalInfo2',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(GeneralDentalInfo2.questions),
    },
    {
        id: 'DrugAllergies',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(DrugAllergies.questions),
    },
    {
        id: 'UrgentHeartConditions',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(UrgentHeartConditions.questions),
    },
    {
        id: 'OtherHeartConditions',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(OtherHeartConditions.questions),
    },
    {
        id: 'BloodDisorders',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(BloodDisorders.questions),
    },
    {
        id: 'NutritionalDiseases',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(NutritionalDiseases.questions),
    },
    {
        id: 'ImmuneAndCancer',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(ImmuneAndCancer.questions),
    },
    {
        id: 'RespiratoryDisorders',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(RespiratoryDisorders.questions),
    },
    {
        id: 'TerminalIllness',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(TerminalIllness.questions),
    },
    {
        id: 'BrainDisorders',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(BrainDisorders.questions),
    },
    {
        id: 'DrugsAndAlcohol1',
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(DrugsAndAlcohol1.questions),
    },
    {
        id: 'DrugsAndAlcohol2',
        validationSchema: Yup.object().shape({
            'Has a physician or previous dentist recommended that you take antibiotics prior to your dental treatment?': Yup.string().required(
                'Required'
            ),
        }),
        component: null,
        initialValues: getInitialValues(DrugsAndAlcohol2.questions),
    },
];

const render = props => {
    let Step = null;

    switch (props.actions.currentStep) {
        case 'LastDentalExam':
            Step = LastDentalExam;
            break;
        case 'LastDentalExamProcedure':
            Step = LastDentalExamProcedure;
            break;
        case 'DoctorGeneralInformation':
            Step = DoctorGeneralInformation;
            break;
        case 'GeneralHealth':
            Step = GeneralHealth;
            break;
        case 'GeneralMedicalInfo1':
            Step = GeneralMedicalInfo1;
            break;
        case 'GeneralMedicalInfo2':
            Step = GeneralMedicalInfo2;
            break;
        case 'WomenOnly':
            Step = WomenOnly;
            break;
        case 'GeneralDentalInfo1':
            Step = GeneralDentalInfo1;
            break;
        case 'GeneralDentalInfo2':
            Step = GeneralDentalInfo2;
            break;
        case 'DrugAllergies':
            Step = DrugAllergies;
            break;
        case 'UrgentHeartConditions':
            Step = UrgentHeartConditions;
            break;
        case 'OtherHeartConditions':
            Step = OtherHeartConditions;
            break;
        case 'BloodDisorders':
            Step = BloodDisorders;
            break;
        case 'NutritionalDiseases':
            Step = NutritionalDiseases;
            break;
        case 'ImmuneAndCancer':
            Step = ImmuneAndCancer;
            break;
        case 'RespiratoryDisorders':
            Step = RespiratoryDisorders;
            break;
        case 'TerminalIllness':
            Step = TerminalIllness;
            break;
        case 'BrainDisorders':
            Step = BrainDisorders;
            break;
        case 'DrugsAndAlcohol1':
            Step = DrugsAndAlcohol1;
            break;
        case 'DrugsAndAlcohol2':
            Step = DrugsAndAlcohol2;
            break;
        default:
            Step = LastDentalExam;
    }

    return (
        <Box width="330px" mx="auto" pt="100px">
            {/* TODO: Move to render function of wizard */}
            {/* for kiosk registration, redirect url will be empty. for web onboarding, redirect will not be empty */}
            {props.canSkip && !_isEmpty(getRedirectUrl()) && (
                <Onboarding.SkipButton
                    onSkip={props.onSkip}
                    text="Skip to insurance"
                />
            )}
            <Step {...props} />
        </Box>
    );
};

const HealthHistoryFormView = componentProps => (
    <Wizard
        onSubmit={componentProps.onFinishForm}
        Form="form"
        render={props => (
            <React.Fragment>
                {props.actions.canGoBack && (
                    <Onboarding.PreviousButton
                        goToPreviousStep={props.actions.goToPreviousStep}
                    />
                )}
                {render({ ...props, ...componentProps })}
            </React.Fragment>
        )}
        steps={steps}
    />
);

export default HealthHistoryFormView;
