import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';
import { DENTIST } from '../../util/strings';
import Autocomplete from '../filters/Autocomplete';
import procedureList from '../../staticData/procedureList';
import * as actions from '../../actions';

class EditDentist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dentist: {}
        };
    }

    async componentWillMount() {
        await this.props.fetchUser(DENTIST);
        await this.getDentist();
        const { dentist } = this.props;
        document.title = 'Laguro - Edit Profile';

        this.setState({
            dentist: dentist,
            location: dentist.location
        });
        this.props.initialize({
            location: dentist.location,
            specialty: dentist.specialty,
            procedures: dentist.procedures
        });
    }

    onAutocomplete = location => {
        this.setState({
            location
        });
    };

    onSubmit(values) {
        const { auth } = this.props;
        const dentist = auth.dentist;
        values.location = this.state.location;

        if (
            // if no procedures
            !values.procedures ||
            values.procedures.length === 0
        ) {
            throw new SubmissionError({
                _error: 'You must add at least 1 procedure'
            });
        }

        this.props.editDentist({ ...values, id: dentist.id });
    }

    // get all dentists and find the dentist profile that matches logged in user
    async getDentist() {
        const { auth } = this.props;
        return await this.props.getDentist(auth.dentist.id);
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
                    onClick={() => fields.push({ duration: 30 })}
                >
                    Add Procedure
                </button>
                {error && <span>{error}</span>}
            </li>
        </ul>
    );

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

    render() {
        const { handleSubmit, submitting, dentist, error } = this.props;
        if (!dentist) {
            return <div />;
        }
        return (
            <form
                className="bigForm light-blue lighten-5"
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
            >
                <div className="form_title">
                    <h4>Edit Doctor Profile</h4>
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
                        validate={required}
                        component={this.renderField}
                    />
                    <div className="col s12 m6">
                        <Autocomplete
                            onAutocomplete={this.onAutocomplete}
                            location={this.props.dentist.location}
                        />
                    </div>
                </div>

                <div className="row">
                    <FieldArray
                        name="procedures"
                        className="col s12"
                        component={this.renderProcedureSelector}
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

const required = value => (value && value !== '' ? undefined : 'Required');

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentist: state.dentists.selectedDentist
    };
}

export default reduxForm({
    form: 'editDentist'
})(connect(mapStateToProps, actions)(EditDentist));
