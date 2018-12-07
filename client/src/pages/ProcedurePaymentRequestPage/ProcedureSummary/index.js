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
    totalPrice,
    discountPrice,
}) => (
    <ProcedureSummaryView
        procedures={getProcedures(patientProcedures)}
        installmentPlan={installmentPlan}
        totalPrice={totalPrice}
        originalPrice={originalPrice}
        discountPrice={discountPrice}
    />
);

export default ProcedureSummary;
