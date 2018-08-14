import React, { Component } from 'react';
import { isEmpty, orderBy, sumBy } from 'lodash';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import queryString from 'query-string';
import { queryPatientProcedure, updatePatientProcedure } from '../../actions';
import history from '../../history';
import {
    DATE_CREATED,
    PATIENT_ID,
    PENDING,
    PROCEDURE
} from '../../util/strings';
import { Box, Button, Flex, Table, Typography } from '../common';
import { renderPrice } from '../../util/paymentUtil';
import { checkBoxRequired } from './formValidation';
import { renderCheckbox } from './sharedComponents';

const StyledTableCell = styled(TableCell)`
    && {
        padding: 2px 24px 2px 8px;
        font-size: 12px;
    }
    @media screen and (min-width: 600px) {
        && {
            padding: 4px 48px 4px 16px;
            font-size: 14px;
        }
    }
`;

const StyledOptionalTableCell = StyledTableCell.extend`
    && {
        display: none;
    }

    @media screen and (min-width: 600px) {
        && {
            display: table-cell;
        }
    }
`;

const StyledTableRow = styled(TableRow)`
    border-top: 3px solid rgba(0, 0, 0, 0.36);
`;

const filterPatientProcedures = (patientProcedures, status) => {
    return orderBy(patientProcedures, [DATE_CREATED], ['asc']).filter(
        pc => pc.status === status
    );
};

const renderProcedureTable = patientProcedures => {
    if (isEmpty(patientProcedures)) {
        return (
            <div>
                <Box pb={3} />
                <Typography fontSize={3}>
                    There are no outstanding procedures.
                </Typography>
            </div>
        );
    }

    const rows = patientProcedures.map((pc, index) => (
        <TableRow key={index}>
            <StyledTableCell>
                {moment(pc.dateCreated).format('MM/DD/YYYY')}
            </StyledTableCell>
            <StyledTableCell>{pc.name}</StyledTableCell>
            <StyledOptionalTableCell numeric>
                {renderPrice(pc.totalCost)}
            </StyledOptionalTableCell>
            <StyledOptionalTableCell numeric>
                {renderPrice(pc.insuranceEstimate)}
            </StyledOptionalTableCell>
            <StyledTableCell numeric>
                {renderPrice(pc.patientEstimate)}
            </StyledTableCell>
        </TableRow>
    ));

    return (
        <Table mt={3}>
            <TableHead>
                <TableRow>
                    <StyledTableCell header="true">Date</StyledTableCell>
                    <StyledTableCell header="true">Procedure</StyledTableCell>
                    <StyledOptionalTableCell numeric>
                        Total Cost
                    </StyledOptionalTableCell>
                    <StyledOptionalTableCell numeric>
                        Insurance Estimate
                    </StyledOptionalTableCell>
                    <StyledTableCell numeric>Patient Estimate</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}
                <StyledTableRow>
                    <StyledTableCell>
                        <Typography fontWeight="bold">Total</Typography>
                    </StyledTableCell>
                    <StyledTableCell />
                    <StyledOptionalTableCell numeric>
                        {renderPrice(sumBy(patientProcedures, 'totalCost'))}
                    </StyledOptionalTableCell>
                    <StyledOptionalTableCell numeric>
                        {renderPrice(
                            sumBy(patientProcedures, 'insuranceEstimate')
                        )}
                    </StyledOptionalTableCell>
                    <StyledTableCell numeric>
                        <Typography fontSize={3} fontWeight="bold">
                            {renderPrice(
                                sumBy(patientProcedures, 'patientEstimate')
                            )}
                        </Typography>
                    </StyledTableCell>
                </StyledTableRow>
            </TableBody>
        </Table>
    );
};

const renderEmptyTable = () => {
    return (
        <Table mt={3}>
            <TableHead>
                <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Procedure</StyledTableCell>
                    <StyledOptionalTableCell numeric>
                        Total Cost
                    </StyledOptionalTableCell>
                    <StyledOptionalTableCell numeric>
                        Insurance Estimate
                    </StyledOptionalTableCell>
                    <StyledTableCell numeric>Patient Estimate</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell numeric />
                </TableRow>
                <TableRow>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell numeric />
                </TableRow>
                <TableRow>
                    <StyledTableCell />
                    <StyledTableCell />
                    <StyledTableCell numeric />
                </TableRow>
            </TableBody>
        </Table>
    );
};

class ProcedureConsent extends Component {
    componentDidMount() {
        const { auth } = this.props;
        this.props.queryPatientProcedure(PATIENT_ID, auth.id);
    }

    calcTotal() {
        const { patientProcedures } = this.props;
        return patientProcedures.map(pc => pc.fee).reduce((a, b) => a + b);
    }

    async onSubmit() {
        const { auth, patientProcedures } = this.props;
        const urlParams = {};
        urlParams.type = PROCEDURE;
        urlParams.patientId = auth.id;
        urlParams.procedureIds = JSON.stringify(
            patientProcedures.map(pc => pc.id)
        );
        urlParams.totalPaid = sumBy(patientProcedures, 'patientEstimate');
        urlParams.procedurePatientEstimate = sumBy(
            patientProcedures,
            'patientEstimate'
        );

        history.push(`/payment?${queryString.stringify(urlParams)}`);
    }

    render() {
        const {
            submitting,
            patientProcedures,
            isFetching,
            handleSubmit
        } = this.props;

        return (
            <Box mt={[3, 5]} mx={[3, 7]}>
                <Typography fontSize={5}>
                    Outstanding procedures for billing
                </Typography>
                {isFetching && renderEmptyTable()}
                {!isFetching && renderProcedureTable(patientProcedures)}
                <Box pb={3} />
                {!isFetching &&
                    !isEmpty(patientProcedures) && (
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                name="consent"
                                label="I agree upon the above procedures to be performed by the practitioner."
                                component={renderCheckbox}
                                validate={checkBoxRequired}
                            />
                            <Box pb={[4, 2]} />
                            <Flex justifyContent="flex-end">
                                <Button
                                    color="secondary"
                                    type="submit"
                                    disabled={submitting}
                                >
                                    <Typography
                                        fontSize={4}
                                        fontWeight="medium"
                                    >
                                        Proceed to checkout
                                    </Typography>
                                </Button>
                            </Flex>
                        </form>
                    )}
            </Box>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        patientProcedures: filterPatientProcedures(
            state.patientProcedures.all,
            PENDING
        ),
        isFetching: state.patientProcedures.isFetching
    };
};

export { ProcedureConsent };
export default reduxForm({
    form: 'treatmentConsent'
})(
    connect(mapStateToProps, {
        queryPatientProcedure,
        updatePatientProcedure
    })(ProcedureConsent)
);
