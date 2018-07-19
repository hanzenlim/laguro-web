import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    SubmissionError,
    formValueSelector
} from 'redux-form';
import { Modal } from '../common';
import Autocomplete from '../filters/Autocomplete';
import * as actions from '../../actions';
import { DENTIST } from '../../util/strings';
import { required } from './formValidation';
import { renderField, renderProcedureSelector } from './sharedComponents';
import dentistProfileExists from '../../util/userInfo';

class NewDentist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    async componentWillMount() {
        this.props.initialize({
            specialty: 'General Dentist',
            procedures: [{ name: 'Exam/Cleaning', duration: 60 }]
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
            this.props.onSuccess();
        }
    }

    render() {
        const {
            submitting,
            error,
            auth,
            message,
            handleSubmit,
            open,
            closeModal
        } = this.props;
        if (dentistProfileExists(auth)) {
            return null;
        } else {
            return (
                <Modal closable open={open} closeModal={closeModal}>
                    <form
                        className="lighten-5"
                        onSubmit={handleSubmit(this.onSubmit)}
                    >
                        <div className="form_title">
                            <h4>
                                {message ? message : 'Create a dentist profile'}
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
                                <Autocomplete
                                    tooltip="This is the location patients will find you at in search if you do not have any reservations."
                                    onAutocomplete={this.onAutocomplete}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <FieldArray
                                name="procedures"
                                className="col s12"
                                component={renderProcedureSelector}
                                selected={this.props.procedures}
                                validate={required}
                            />
                        </div>

                        <div className="form-buttons col s6 right-align">
                            {error && (
                                <strong className="red-text">{error}</strong>
                            )}
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
}

const mapStateToProps = state => {
    const selector = formValueSelector('newDentist');
    return {
        procedures: selector(state, 'procedures')
    };
};

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { NewDentist as NoReduxNewDentist };
export default reduxForm({
    form: 'newDentist'
})(connect(mapStateToProps, actions)(NewDentist));
