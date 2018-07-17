import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { Box, Modal } from '../common';
import ReduxAutocomplete from '../filters/ReduxAutocomplete';
import { createDentist, fetchUser } from '../../actions';
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

    async onSubmit(values) {
        const { auth } = this.props;
        await this.props.createDentist({
            ...values,
            bio: ' ',
            userId: auth.id
        });

        await this.props.fetchUser(DENTIST);
        this.props.onSuccess();
    }

    render() {
        const {
            submitting,
            auth,
            message,
            handleSubmit,
            open,
            closeModal,
            closable
        } = this.props;
        if (dentistProfileExists(auth)) {
            return null;
        }

        return (
            <Modal closable={closable} open={open} closeModal={closeModal}>
                <form
                    className="lighten-5"
                    onSubmit={handleSubmit(this.onSubmit)}
                >
                    <div className="form_title">
                        <h4>
                            {message ? message : 'Create a dentist profile'}
                        </h4>
                    </div>

                    <Box pt={3} />

                    <Field
                        name="specialty"
                        label="Dental Specialty"
                        placeholder="General Dentist"
                        component={renderField}
                        validate={required}
                    />

                    <Box pt={3} />

                    <Field
                        name="location"
                        component={ReduxAutocomplete}
                        validate={required}
                        tooltip="This is the location patients will find you at in search if you do not have any reservations."
                    />

                    <Box pt={3} />

                    <FieldArray
                        name="procedures"
                        component={renderProcedureSelector}
                        validate={required}
                        selected={this.props.procedures}
                    />

                    <Box pt={3} />

                    <div className="form-buttons right-align">
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

export { NewDentist };
const mapStateToProps = state => {
    const selector = formValueSelector('newDentist');
    return {
        location: selector(state, 'location'),
        procedures: selector(state, 'procedures')
    };
};

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { NewDentist as NoReduxNewDentist };
export default reduxForm({
    form: 'newDentist',
    required
})(connect(mapStateToProps, { createDentist, fetchUser })(NewDentist));
