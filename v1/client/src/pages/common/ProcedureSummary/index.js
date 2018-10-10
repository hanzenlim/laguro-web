import React, { PureComponent } from 'react';
import moment from 'moment';
import ProcedureSummaryView from './view';
import { renderPrice } from './../../../util/paymentUtil';

const SERVICE_FEE = 30;

class ProcedureSummary extends PureComponent {
    getTotalPrice = (patientProcedures, serviceFee) => {
        let totalPrice = 0;

        patientProcedures.forEach(item => {
            totalPrice += item.totalCost;
        });

        totalPrice += serviceFee;

        return `${renderPrice(totalPrice)}`;
    };

    getProcedures = patientProcedures =>
        patientProcedures.map(item => ({
            name: item.name,
            date: moment(item.dateCreated).format('LT MMMM D, YYYY'),
            price: `$${item.totalCost}`,
        }));

    formatServiceFee = serviceFee => `$${serviceFee}`;

    render() {
        const { patientProcedures } = this.props;

        const procedures = this.getProcedures(patientProcedures);
        const totalPrice = this.getTotalPrice(patientProcedures, SERVICE_FEE);
        const serviceFee = this.formatServiceFee(SERVICE_FEE);

        return (
            <ProcedureSummaryView
                procedures={procedures}
                serviceFee={serviceFee}
                totalPrice={totalPrice}
            />
        );
    }
}

export default ProcedureSummary;
