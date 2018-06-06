import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { Link } from 'react-router-dom';

import Autocomplete from '../filters/Autocomplete';
import procedureList from '../../staticData/procedureList';
import * as actions from '../../actions';
import history from '../../history';
import { DENTIST } from '../../util/strings';
import { required } from '../../util/formValidation';

class NewDentist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
        const { location } = this.props;
        this.urlParams = queryString.parse(location.search);
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
        }

        values.location = this.state.location;

        await this.props.createDentist({
            ...values,
            bio: ' ',
            userId: auth.id
        });
        // TODO address hacky way of making sure dentist is loaded
        await this.props.fetchUser(DENTIST);
        const referrerMap = { new_office: '/landlord-onboarding/add-office' };
        const referrer = referrerMap[this.urlParams.referrer];
        if (referrer) {
            history.push(referrer);
        } else {
            history.push('/profile');
        }
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
                {error && <span className="red-text">{error}</span>}
            </li>
        </ul>
    );

    render() {
        const { handleSubmit, submitting, error } = this.props;
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

function mapStateToProps(state) {
    return {
        auth: state.auth,
        dentists: state.dentists.dentists
    };
}

export default reduxForm({
    form: 'newDentist'
})(connect(mapStateToProps, actions)(NewDentist));
