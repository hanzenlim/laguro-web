import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    SubmissionError,
    formValueSelector
} from 'redux-form';
import { isEmpty } from 'lodash';
import { Modal } from '../common';
import Autocomplete from '../filters/Autocomplete';
import { required } from './formValidation';
import * as actions from '../../actions';
import { renderField, renderProcedureSelector } from './sharedComponents';
import dentistProfileExists from '../../util/userInfo';

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
                                            tooltip="This is the location patients will find you at in search if you do not have any reservations."
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
                            className="col s12"
                            name="procedures"
                            selected={this.props.procedures}
                            component={renderProcedureSelector}
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

const mapStateToProps = state => {
    const selector = formValueSelector('editDentist');
    return {
        procedures: selector(state, 'procedures')
    };
};

export default reduxForm({
    form: 'editDentist'
})(connect(mapStateToProps, actions)(EditDentist));
