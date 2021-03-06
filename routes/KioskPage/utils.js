import _isEmpty from 'lodash/isEmpty';
import _flatten from 'lodash/flatten';
import cookies from 'browser-cookies';
import defaultUserImage from '../../components/Image/defaultUserImage.svg';
import {
    kioskPurposeOfVisitCookieVariableName,
    kioskIsAccountNewCookieVariableName,
} from '../KioskRegPage';
import {
    CHECKIN_WIZARD_STEP_ID,
    KIOSK_CONFIRMATION_WIZARD_STEP_ID,
    KIOSK_FLOW_SUCCESS_WIZARD_STEP_ID,
} from './getKioskPageWizardSteps';
import { KIOSK_URL } from '../../util/urls';

export const getKioskPageProgressSteps = formatText =>
    [
        'registration.title',
        'generalInformation.title',
        'generalInformation.insurance.insurance',
        'bookAppointment.title',
        'medicalHistoryForm.title',
    ].map(t => formatText(t).toUpperCase());

const addActionToWizardStep = ({ action, step }) => {
    const copyOfStep = { ...step };
    const newOnAction = async (stepValues, allValues, formikProps, wizard) => {
        // if getStageWizardStpes already adds an onAction, add this action on top of the old action
        let hasError;
        if (copyOfStep.onAction) {
            hasError = await copyOfStep.onAction(
                stepValues,
                allValues,
                formikProps,
                wizard
            );
        }

        const hasRedirect = action(stepValues, allValues, formikProps, wizard);

        return hasError || hasRedirect;
    };

    return { ...copyOfStep, onAction: newOnAction };
};

export const addActionsToWizardSteps = ({ actions, wizardSteps }) => {
    const copyOfWizardSteps = [...wizardSteps];
    const stepIdsToAddActionTo = actions.map(action => action.stepId);

    return copyOfWizardSteps.map(ws => {
        if (stepIdsToAddActionTo.includes(ws.id)) {
            return addActionToWizardStep({
                action: actions.find(a => a.stepId === ws.id).action,
                step: ws,
            });
        }
        return ws;
    });
};

export const getDentistTimes = activeDentistsWithAppointmentSlots =>
    !_isEmpty(activeDentistsWithAppointmentSlots) &&
    _flatten(
        activeDentistsWithAppointmentSlots.map(dent =>
            dent.appointmentTimeslots.map(apptSlot => ({
                startTime: apptSlot.localStartTime,
                ...dent,
                id: `${dent.dentistId}${apptSlot.localStartTime}`,
                dentistId: dent.dentistId,
                name: `Dr. ${dent.firstName} ${dent.lastName}`,
                rating: dent.averageRating,
                imageUrl: dent.imageUrl || defaultUserImage,
                appointmentDuration: dent.firstAppointmentDuration,
                procedures: dent.procedures,
                languages: dent.languages.map(
                    lang =>
                        lang.charAt(0).toUpperCase() +
                        lang.toLowerCase().substr(1)
                ),
                insurance: dent.acceptedInsurances,
            }))
        )
    );

export const redirectFromHealthHistory = router => {
    const isCheckIn =
        cookies.get(kioskPurposeOfVisitCookieVariableName) === 'checkIn';

    if (isCheckIn) {
        router.push(`${KIOSK_URL}/${CHECKIN_WIZARD_STEP_ID}`);
    } else if (JSON.parse(cookies.get(kioskIsAccountNewCookieVariableName))) {
        router.push(`${KIOSK_URL}/${KIOSK_CONFIRMATION_WIZARD_STEP_ID}`);
    } else {
        router.push(`${KIOSK_URL}/${KIOSK_FLOW_SUCCESS_WIZARD_STEP_ID}`);
    }
};
