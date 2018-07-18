import React from 'react';
import { mount } from 'enzyme';
import { ProcedureConsent } from '../../forms/ProcedureConsent';
import { PENDING } from '../../../util/strings';

jest.mock('redux-form/lib/Field', () => 'field');

describe('Procedure Consent form', () => {
    const mockProps = {
        computedMatch: {
            params: {
                patient_num: '0'
            }
        },
        handleSubmit: jest.fn(),
        submitting: false,
        patientProcedures: [
            {
                id: 'id',
                patientId: 'id',
                procedureNum: '0',
                dateCreated: '20180701',
                totalCost: 100,
                insuranceEstimate: 60,
                patientEstimate: 40,
                name: 'procedure_type',
                type: PENDING
            }
        ],
        auth: {
            id: '0'
        },
        queryPatientProcedure: jest.fn()
    };

    let component;

    beforeEach(() => {
        component = mount(<ProcedureConsent {...mockProps} />);
    });

    afterEach(() => {
        component = '';
    });

    it('should display a table of date, procedure, and fee', () => {
        const data = component.find('WithStyles(TableCell)');
        expect(data).toHaveLength(15);
        expect(data.at(5).text()).toEqual('07/01/2018');
        expect(data.at(6).text()).toEqual('procedure_type');
        expect(data.at(7).text()).toEqual('$1.00');
        expect(data.at(8).text()).toEqual('$0.60');
        expect(data.at(9).text()).toEqual('$0.40');
        expect(data.at(10).text()).toEqual('Total');
        expect(data.at(12).text()).toEqual('$1.00');
        expect(data.at(13).text()).toEqual('$0.60');
        expect(data.at(14).text()).toEqual('$0.40');
    });
});
