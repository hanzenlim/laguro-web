import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import styled from 'styled-components';
import queryString from 'query-string';
import * as actions from '../../actions';
import { DENTIST } from '../../util/strings';
import history from '../../history';

import {
    renderField,
    renderSelect,
    equipmentOptions
} from './sharedComponents';
import { required, isNum } from './formValidation';

import { Typography, Grid, Button } from '../common';
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
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
        this.props.fetchUser(DENTIST);
    }

    onSubmit(values) {
        const { reset, auth } = this.props;
        const { imageUrls, location, name } = this.urlParams;

        values.equipment = values.equipment || [];

        this.props.createOffice({
            ...values,
            imageUrls: JSON.parse(imageUrls),
            hostId: auth.dentist.id,
            name,
            location
        });
        reset();

        history.push('/landlord-onboarding/add-listing');
    }

    handleBack = () => {
        history.push(
            `/landlord-onboarding/add-office${history.location.search}`
        );
    };

    extractUrlToState(result) {
        let upload = result.filesUploaded;
        let allUrls = [];
        if (upload.length) {
            allUrls = upload.map(file => {
                return file.url;
            });
        }
        this.setState({ imageUrls: allUrls });
    }

    renderEquipmentSelector = ({ fields, className }) => {
        return (
            <ul className={className}>
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
                {fields.map((equipment, index) => (
                    <li key={index}>
                        <Grid container alignItems="flex-end">
                            <Grid item xs={4}>
                                <label>Equipment Available</label>
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
                                    <Typography size="t1">
                                        Next, add the equipment that you have in
                                        the office
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t3">Step 2</Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="16" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t3" weight="bold">
                                        Office Equipment Details
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

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
                                        <Typography size="t2" weight="medium">
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
                                        <Typography size="t2" weight="medium">
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

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default reduxForm({
    form: 'addOfficeEquipments'
})(connect(mapStateToProps, actions)(NewOffice));
