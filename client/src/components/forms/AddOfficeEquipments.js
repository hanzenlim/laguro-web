import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import styled from 'styled-components';
import queryString from 'query-string';
import * as actions from '../../actions';
import history from '../../history';
import {
    renderField,
    renderEquipmentSelector,
    charCount
} from './sharedComponents';

import { Box, Typography, Grid, Button } from '../common';
import { Padding } from '../common/Spacing';

import equipmentSVG from '../icons/equipment.svg';

const StyledContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    max-width: 1080px;
    padding: 5em 10px;
    margin: 0 auto;
`;

const StyledImage = styled.img`
    padding-top: 5em;
`;

class NewOffice extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);

        let { equipment } = this.urlParams;

        equipment = equipment
            ? JSON.parse(equipment)
            : [{ name: 'Digital X-Ray', price: 2000 }];

        this.props.initialize({
            description: this.urlParams.description,
            equipment
        });
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
    }

    onSubmit(values) {
        values.equipment = values.equipment
            ? JSON.stringify(values.equipment)
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
            description: this.props.description,
            equipment: this.props.equipment
                ? JSON.stringify(this.props.equipment)
                : []
        });

        history.push(`/landlord-onboarding/add-office?${params}`);
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
                                        office and equipment
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Box className="row">
                                <Field
                                    name="description"
                                    label="Description (optional)"
                                    tooltip="Describe a few notable things about your office."
                                    component={renderField}
                                    multiline={true}
                                    rows={2}
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
                                <FieldArray
                                    name="equipment"
                                    selected={this.props.equipment}
                                    component={renderEquipmentSelector}
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
        equipment: selector(state, 'equipment'),
        description: selector(state, 'description')
    };
};

export default reduxForm({
    form: 'addOfficeEquipments'
})(connect(mapStateToProps, actions)(NewOffice));
