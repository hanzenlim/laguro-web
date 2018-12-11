import React from 'react';
import ProcedureSummaryView from './view';

const getProcedures = patientProcedures =>
    patientProcedures.map(item => ({
        name: item.name,
        price: `$${item.originalPrice}`,
    }));

const ProcedureSummary = ({
    patientProcedures,
    installmentPlan,
    originalPrice,
    nominalAmount,
    discountPrice,
}) => (
    <ProcedureSummaryView
        procedures={getProcedures(patientProcedures)}
        installmentPlan={installmentPlan}
        nominalAmount={nominalAmount}
        originalPrice={originalPrice}
        discountPrice={discountPrice}
    />
);

export default ProcedureSummary;
