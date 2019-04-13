import _isEmpty from 'lodash/isEmpty';
import _flatten from 'lodash/flatten';
import defaultUserImage from '../../components/Image/defaultUserImage.svg';

export const KIOSK_PAGE_PROGRESS_STEPS = [
    'REGISTRATION',
    'GENERAL INFORMATION',
    'INSURANCE',
    'BOOK AN APPOINTMENT',
    'MEDICAL HISTORY FORM',
];

const addActionToWizardStep = ({ action, step }) => {
    const copyOfStep = { ...step };
    const newOnAction = async (stepValues, allValues, formikProps) => {
        // if getStageWizardStpes already adds an onAction, add this action on top of the old action
        let hasError;
        if (copyOfStep.onAction) {
            hasError = await copyOfStep.onAction(
                stepValues,
                allValues,
                formikProps
            );
        }

        const hasRedirect = action(stepValues, allValues, formikProps);

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
            dent.availableAppointmentSlots.map(apptSlot => ({
                startTime: apptSlot.startTime,
                reservationId: apptSlot.reservationId,
                ...dent,
                id: `${dent.id}${apptSlot.startTime}`,
                dentistId: dent.id,
                name: `Dr. ${dent.user.firstName} ${dent.user.lastName}`,
                rating: dent.averageRating,
                imageUrl: dent.user.imageUrl || defaultUserImage,
                appointmentDuration: dent.firstAppointmentDuration,
                procedures: dent.procedures.map(p => p.group),
                languages: dent.languages.map(
                    lang =>
                        lang.charAt(0).toUpperCase() +
                        lang.toLowerCase().substr(1)
                ),
                insurance: dent.acceptedInsurances,
            }))
        )
    );
