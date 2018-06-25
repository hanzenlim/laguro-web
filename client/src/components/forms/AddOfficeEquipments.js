import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import styled from 'styled-components';
import queryString from 'query-string';
import * as actions from '../../actions';
import history from '../../history';
import {
    addCentsToEquipment,
    removeCentsFromEquipment
} from '../../util/paymentUtil';

import {
    renderField,
    renderSelect,
    charCount,
    equipmentOptions
} from './sharedComponents';
import { required, isNum } from './formValidation';

import { Box, Typography, Grid, Button } from '../common';
import { Padding } from '../common/Spacing';

import exitSVG from '../icons/exit.svg';
import equipmentSVG from '../icons/equipment.svg';

const StyledContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    max-width: 1080px;
    padding: 5em 10px;
    margin: 0 auto;
`;

const StyledRemoveStaffIcon = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const StyledImage = styled.img`
    padding-top: 10em;
`;

class NewOffice extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);

        let { equipment } = this.urlParams;

        equipment = equipment
            ? removeCentsFromEquipment(JSON.parse(equipment))
            : [];

        this.props.initialize({
            numChairs: this.urlParams.numChairs,
            description: this.urlParams.description,
            equipment
        });
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
    }

    onSubmit(values) {
        values.equipment = values.equipment
            ? JSON.stringify(addCentsToEquipment(values.equipment))
            : [];

        const params = queryString.stringify({
            ...this.urlParams,
            ...values
        });

        history.push(`/landlord-onboarding/add-listing?${params}`);
    }

    handleBack = () => {
        const params = queryString.stringify({
            ...this.urlParams,
            numChairs: this.props.numChairs,
            description: this.props.description,
            equipment: this.props.equipment
                ? JSON.stringify(addCentsToEquipment(this.props.equipment))
                : []
        });

        history.push(`/landlord-onboarding/add-office?${params}`);
    };

    renderEquipmentSelector = ({ fields, className }) => {
        return (
            <ul className={className}>
                {fields.map((equipment, index) => (
                    <li key={index}>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={4}>
                                <Field
                                    name={`${equipment}.name`}
                                    label="Equipment Available"
                                    component={renderSelect}
                                    validate={required}
                                    children={equipmentOptions}
                                />

                                <Padding bottom="16" />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={4}>
                                <label>Usage Price</label>
                                <Field
                                    name={`${equipment}.price`}
                                    type="text"
                                    placeholder="15"
                                    component={renderField}
                                    validate={[required, isNum]}
                                />
                                <Padding bottom="16" />
                            </Grid>
                            <Grid item xs={1} />
                            <Grid item xs={2}>
                                <StyledRemoveStaffIcon
                                    type="button"
                                    title="Remove Equipment"
                                    onClick={() => fields.remove(index)}
                                >
                                    <img src={exitSVG} alt="Remove Equipment" />
                                </StyledRemoveStaffIcon>
                                <Padding bottom="16" />
                            </Grid>
                        </Grid>
                    </li>
                ))}
                <li>
                    <Button
                        type="button"
                        color="primary"
                        onClick={() => fields.push({})}
                    >
                        Add Equipment
                    </Button>
                </li>
                <Padding bottom="16" />
            </ul>
        );
    };

    render() {
        const { handleSubmit, submitting } = this.props;
        const { location } = this.urlParams;
        return (
            <StyledContainer>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontSize={5}>
                                        Next, tell us a little bit about your
                                        office and your equipments
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontSize={3}>Step 2</Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="16" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontSize={3} fontWeight="bold">
                                        Office Details
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box mb={24} />

                            <Box className="row">
                                <Field
                                    name="description"
                                    label="Description (optional)"
                                    component={renderField}
                                    multiline={true}
                                    rows={2}
                                    charCount={true}
                                    inputProps={{
                                        maxLength: 500
                                    }}
                                />
                            </Box>

                            {charCount(
                                this.props.description
                                    ? this.props.description.length
                                    : 0,
                                500
                            )}

                            <Box mb={16} />

                            <div className="row">
                                <Field
                                    name="numChairs"
                                    label="Number of Chairs"
                                    placeholder={'3'}
                                    component={renderField}
                                    validate={[required, isNum]}
                                />
                                <Padding bottom="16" />
                            </div>

                            <div className="row">
                                <FieldArray
                                    name="equipment"
                                    component={this.renderEquipmentSelector}
                                />
                            </div>

                            <Grid container justify="space-between">
                                <Grid item>
                                    <Button
                                        color="default"
                                        onClick={this.handleBack}
                                    >
                                        <Typography
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Previous
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="secondary"
                                        type="submit"
                                        disabled={submitting || !location}
                                    >
                                        <Typography
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Next
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify="center">
                            <StyledImage src={equipmentSVG} />
                        </Grid>
                    </Grid>
                </Grid>
            </StyledContainer>
        );
    }
}

const mapStateToProps = state => {
    const selector = formValueSelector('addOfficeEquipments');
    return {
        numChairs: selector(state, 'numChairs'),
        equipment: selector(state, 'equipment'),
        description: selector(state, 'description')
    };
};

export default reduxForm({
    form: 'addOfficeEquipments'
})(connect(mapStateToProps, actions)(NewOffice));
