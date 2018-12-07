import React, { PureComponent } from 'react';
import moment from 'moment';
import ProcedureSummaryView from './view';
import { renderPrice } from './../../../util/paymentUtil';

class ProcedureSummary extends PureComponent {
    getTotalPrice = patientProcedures => {
        let totalPrice = 0;
        const { rejectedIds } = this.props;

        patientProcedures.forEach(item => {
            if (!rejectedIds.includes(item.id)) totalPrice += item.totalCost;
        });

        return `${renderPrice(totalPrice)}`;
    };

    getProcedures = patientProcedures =>
        patientProcedures.map(item => ({
            id: item.id,
            name: item.name,
            date: moment(item.dateCreated).format('LT MMMM D, YYYY'),
            price: `$${item.totalCost}`,
            rejected: this.props.rejectedIds.includes(item.id),
        }));

    render() {
        const { patientProcedures, rejectProcedure } = this.props;

        const installmentPlan = {
            interval: 'monthly',
            numChargePeriods: 10,
            recurringPaymentAmount: 10000,
            outstandingAmount: 100000,
        };

        const procedures = this.getProcedures(patientProcedures);
        const totalPrice = this.getTotalPrice(patientProcedures);

        return (
            <ProcedureSummaryView
                procedures={procedures}
                installmentPlan={installmentPlan}
                totalPrice={totalPrice}
                rejectProcedure={rejectProcedure}
            />
        );
    }
}

export default ProcedureSummary;
