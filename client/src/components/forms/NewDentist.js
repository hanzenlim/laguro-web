import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import procedureList from '../../staticData/procedureList';
import * as actions from '../../actions';

class NewDentist extends Component {
    async onSubmit(values) {
        const { auth, reset } = this.props;
        values.procedures = values.procedures || [];
        this.props.createDentist({ ...values, bio: ' ', userId: auth.id });
        reset();
    }

    async componentWillMount() {
        document.title = 'Laguro - New Profile';

        this.props.initialize({
            specialty: 'General Dentist'
        });
        await this.props.fetchUser();
    }

    renderField = ({
        input,
        label,
        className,
        placeholder,
        meta: { touched, error }
    }) => (
        <div className={className}>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={placeholder} />
            </div>
            {touched && error && <span className="red-text">{error}</span>}
        </div>
    );

    renderProcedures() {
        let procedureOptions = procedureList.map(procedure => {
            return (
                <option value={procedure.name} key={procedure.id}>
                    {procedure.name}
                </option>
            );
        });
        procedureOptions = [
            <option value="" key={0}>
                Please select a procedure...
            </option>,
            ...procedureOptions
        ];
        return procedureOptions;
    }

    renderDurations() {
        return [
            <option value={30} key={30}>
                30 minutes
            </option>,
            <option value={60} key={60}>
                60 minutes
            </option>
        ];
    }

    renderSelect = ({ input, children, meta: { touched, error } }) => {
        return (
            <div className="col s4">
                <select {...input} className="browser-default">
                    {children}
                </select>
                {touched &&
                    (error && <span className="red-text">{error}</span>)}
            </div>
        );
    };

    renderProcedureSelector = ({ fields, className, meta: { error } }) => (
        <ul className={className}>
            <label>Procedures Offered</label>
            {fields.map((procedure, index) => (
                <li key={index} className="multiRowAdd">
                    <Field
                        name={`${procedure}.name`}
                        component={this.renderSelect}
                        children={this.renderProcedures()}
                        validate={required}
                    />
                    <Field
                        name={`${procedure}.duration`}
                        component={this.renderSelect}
                        children={this.renderDurations()}
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
                <button
                    type="button"
                    className="waves-effect btn-flat"
                    onClick={() => fields.push({ duration: 60 })}
                >
                    Add Procedure
                </button>
                {error && <span>{error}</span>}
            </li>
        </ul>
    );

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <form
                className="bigForm light-blue lighten-5"
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
            >
                <div className="form_title">
                    <h4>Create a dentist profile</h4>
                    <Link
                        className="btn light-blue lighten-2 waves-effect"
                        to={'/profile'}
                    >
                        Go back to profile
                    </Link>
                </div>

                <div className="row">
                    <Field
                        name="specialty"
                        label="Dental Specialty"
                        className="col s12 m6"
                        placeholder="General Dentist"
                        component={this.renderField}
                        validate={required}
                    />
                    <Field
                        name="location"
                        label="Location of practice"
                        className="col s12 m6"
                        placeholder="Oakland, CA"
                        component={this.renderField}
                        validate={required}
                    />
                </div>

                <div className="row">
                    <FieldArray
                        name="procedures"
                        className="col s12"
                        component={this.renderProcedureSelector}
                    />
                </div>

                <div className="form-buttons">
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

const required = value => (value && value !== '' ? undefined : 'Required');

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentists: state.dentists.dentists
    };
}

export default reduxForm({
    form: 'newDentist'
})(connect(mapStateToProps, actions)(NewDentist));
