import React, { PureComponent } from 'react';
import moment from 'moment';
import ProcedureSummaryView from './view';
import { renderPrice } from './../../../util/paymentUtil';

const SERVICE_FEE = 0;

class ProcedureSummary extends PureComponent {
    getTotalPrice = (patientProcedures, serviceFee) => {
        let totalPrice = 0;
        const { rejectedIds } = this.props;

        patientProcedures.forEach(item => {
            if (!rejectedIds.includes(item.id)) totalPrice += item.totalCost;
        });

        totalPrice += serviceFee;

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

    formatServiceFee = serviceFee => `$${serviceFee}`;

    render() {
        const { patientProcedures, rejectProcedure } = this.props;

        const procedures = this.getProcedures(patientProcedures);
        const totalPrice = this.getTotalPrice(patientProcedures, SERVICE_FEE);
        const serviceFee = this.formatServiceFee(SERVICE_FEE);

        return (
            <ProcedureSummaryView
                procedures={procedures}
                serviceFee={serviceFee}
                totalPrice={totalPrice}
                rejectProcedure={rejectProcedure}
            />
        );
    }
}

export default ProcedureSummary;
