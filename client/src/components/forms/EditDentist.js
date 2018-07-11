import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { isEmpty } from 'lodash';
import { Flex, Modal } from '../common';
import Autocomplete from '../filters/Autocomplete';
import { required } from './formValidation';
import * as actions from '../../actions';
import {
    renderField,
    durationOptions,
    procedureOptions,
    renderSelect
} from './sharedComponents';
import dentistProfileExists from '../../util/userInfo';

const StyledBox = styled(Flex)`
    line-height: 36px;
`;

class EditDentist extends Component {
    constructor(props) {
        super(props);
        this.state = { location: '' };
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentWillMount() {
        const { dentist } = this.props;
        if (!isEmpty(dentist)) {
            const { location, specialty, procedures } = dentist;

            this.props.initialize({
                location,
                specialty,
                procedures
            });
        }
    }

    async onSubmit(values) {
        const { auth } = this.props;
        const dentistId = auth.dentistId;

        if (
            // if no procedures
            !values.procedures ||
            values.procedures.length === 0
        ) {
            throw new SubmissionError({
                _error: 'You must add at least 1 procedure'
            });
        } else {
            this.props.editDentist({ ...values, id: dentistId });
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

    render() {
        const {
            handleSubmit,
            submitting,
            error,
            message,
            open,
            closeModal,
            auth
        } = this.props;

        if (!dentistProfileExists(auth)) {
            return null;
        }

        return (
            <Modal closable open={open} closeModal={closeModal}>
                <form
                    className="lighten-5"
                    onSubmit={handleSubmit(this.onSubmit)}
                >
                    <div className="form_title">
                        <h4>
                            {message ? message : 'Edit your dentist profile'}
                        </h4>
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
                            <Field
                                name="location"
                                component={props => {
                                    const { onChange, value } = props.input;
                                    return (
                                        <Autocomplete
                                            onAutocomplete={location =>
                                                onChange(location)
                                            }
                                            location={value}
                                        />
                                    );
                                }}
                            />
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
            </Modal>
        );
    }
}

export default reduxForm({
    form: 'editDentist'
})(connect(null, actions)(EditDentist));
