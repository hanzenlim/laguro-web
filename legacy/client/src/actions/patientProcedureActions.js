import history from '../history';
import {
    FETCH_PATIENT_PROCEDURE_HISTORY,
    GET_SELECTED_PATIENT_PROCEDURES,
    REQUEST_PATIENT_PROCEDURE_HISTORY,
    UPDATE_PATIENT_PROCEDURES
} from './types';
import PatientProcedure from '../models/patientProcedure';
import makeApiCall from '../util/clientDataLoader';
import { dispatchChildren } from '../util/dispatchUtil';

const updatePatientProceduresQuery = `
    mutation UpdatePatientProcedures($input: UpdatePatientProceduresInput!) {
        updatePatientProcedures(input: $input) {
            id
            patientId
            procedureNum
            dateCreated
            totalCost
            patientEstimate
            insuranceEstimate
            name
            status
            dentistId
        }
    }
`;

const requestPatientProcedure = () => {
    return {
        type: REQUEST_PATIENT_PROCEDURE_HISTORY
    };
};

export const getProcedures = (ids, ...options) => async dispatch => {
    dispatch(requestPatientProcedure());
    const patientProcedures = await Promise.all(
        ids.map(id => PatientProcedure.get(id, options))
    );
    dispatch({
        type: GET_SELECTED_PATIENT_PROCEDURES,
        payload: patientProcedures
    });
    dispatchChildren(patientProcedures, options, dispatch);
};

export const queryPatientProcedure = (key, value) => async dispatch => {
    dispatch(requestPatientProcedure());
    const patientProcedure = await PatientProcedure.query(key, value);
    dispatch({
        type: FETCH_PATIENT_PROCEDURE_HISTORY,
        payload: patientProcedure
    });
};

export const updatePatientProcedure = procedures => async dispatch => {
    const patientProcedure = await Promise.all(
        procedures.map(pc => PatientProcedure.update(pc))
    );
    dispatch({
        type: UPDATE_PATIENT_PROCEDURES,
        payload: patientProcedure
    });
};

export const updatePatientProcedures = procedures => async dispatch => {
    const response = await makeApiCall(updatePatientProceduresQuery, {
        input: procedures
    });
    if (response && response.errors) {
        alert(response.errors[0].message);
    } else {
        const patientProcedures = response.data.updatePatientProcedures;
        dispatch({
            type: UPDATE_PATIENT_PROCEDURES,
            payload: patientProcedures
        });
        history.push(
            `/payment-success?procedureIds=${JSON.stringify(
                patientProcedures.map(pc => pc.id)
            )}`
        );
    }
};
