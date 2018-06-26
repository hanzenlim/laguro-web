import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { Flex } from '../common';
import Autocomplete from '../filters/Autocomplete';
import * as actions from '../../actions';
import { DENTIST } from '../../util/strings';
import { required } from './formValidation';
import {
    renderField,
    durationOptions,
    procedureOptions,
    renderSelect
} from './sharedComponents';

const StyledBox = styled(Flex)`
    line-height: 36px;
`;

class CreateDentistProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
    }

    async componentWillMount() {
        this.props.initialize({
            specialty: 'General Dentist'
        });
    }

    onAutocomplete = location => {
        this.setState({
            location
        });
    };

    async onSubmit(values) {
        const { auth } = this.props;

        if (
            // if no procedures
            !values.procedures ||
            values.procedures.length === 0
        ) {
            throw new SubmissionError({
                _error: 'You must add at least 1 procedure'
            });
        } else {
            values.location = this.state.location;

            await this.props.createDentist({
                ...values,
                bio: ' ',
                userId: auth.id
            });

            await this.props.fetchUser(DENTIST);
            this.props.closeModal();
        }
    }

    renderProcedureSelector = ({ fields, className, meta: { error } }) => (
        <ul className={className}>
            <label>Procedures Offered</label>
            {fields.map((procedure, index) => (
                <li key={index} className="multiRowAdd">
                    <Field
                        name={`${procedure}.name`}
                        component={renderSelect}
                        children={procedureOptions}
                        validate={required}
                    />
                    <Field
                        name={`${procedure}.duration`}
                        component={renderSelect}
                        children={durationOptions}
                    />
                    <button
                        type="button"
                        title="Remove Procedure"
                        className="red lighten-3 waves-effect btn"
                        onClick={() => fields.remove(index)}
                    >
                        <i className="material-icons tiny">delete_forever</i>
                    </button>
                </li>
            ))}
            <li>
                <Flex mt={1}>
                    <button
                        type="button"
                        className="waves-effect btn light-blue lighten-2"
                        onClick={() =>
                            fields.push({ name: 'Exam/Cleaning', duration: 60 })
                        }
                    >
                        Add Procedure
                    </button>
                    {error && (
                        <StyledBox ml={2} className="red-text">
                            {error}
                        </StyledBox>
                    )}
                </Flex>
            </li>
        </ul>
    );

    handleSubmission(e) {
        e.preventDefault();
        const { handleSubmit } = this.props;
        handleSubmit(this.onSubmit.bind(this))();
        this.props.handleSubmission();
    }

    render() {
        const { submitting, error } = this.props;
        return (
            <form
                className="lighten-5"
                onSubmit={this.handleSubmission.bind(this)}
            >
                <div className="form_title">
                    <h4>Create a dentist profile</h4>
                </div>

                <div className="row">
                    <Field
                        name="specialty"
                        label="Dental Specialty"
                        className="col s12 m6"
                        placeholder="General Dentist"
                        component={renderField}
                        validate={required}
                    />
                </div>
                <div className="row">
                    <div className="col s12 m12">
                        <Autocomplete onAutocomplete={this.onAutocomplete} />
                    </div>
                </div>

                <div className="row">
                    <FieldArray
                        name="procedures"
                        className="col s12"
                        component={this.renderProcedureSelector}
                        validate={required}
                    />
                </div>

                <div className="form-buttons col s6 right-align">
                    {error && <strong className="red-text">{error}</strong>}
                    <button
                        className="waves-effect btn light-blue lighten-2"
                        type="submit"
                        disabled={submitting}
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

// const required = value => (value && value !== '' ? undefined : 'Required');

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentists: state.dentists.dentists
    };
}

export default reduxForm({
    form: 'createDentistProfile'
})(connect(mapStateToProps, actions)(CreateDentistProfile));
