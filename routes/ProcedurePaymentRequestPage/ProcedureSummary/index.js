import React from 'react';
import ProcedureSummaryView from './view';

const getProcedures = patientProcedures =>
    patientProcedures.map(item => ({
        name: item.name,
        price: item.originalPrice,
    }));

const ProcedureSummary = ({
    patientProcedures,
    installmentPlan,
    originalPrice,
    laguroCredits,
    nominalAmount,
    discountPrice,
    insuranceCoverage,
}) => (
    <ProcedureSummaryView
        procedures={getProcedures(patientProcedures)}
        installmentPlan={installmentPlan}
        nominalAmount={nominalAmount}
        originalPrice={originalPrice}
        laguroCredits={laguroCredits}
        discountPrice={discountPrice}
        insuranceCoverage={insuranceCoverage}
    />
);

export default ProcedureSummary;
