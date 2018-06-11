import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styled from 'styled-components';
import { Field, FieldArray, reduxForm, SubmissionError } from 'redux-form';
import { Flex } from '../common'
import Autocomplete from '../filters/Autocomplete';
import procedureList from '../../staticData/procedureList';
import * as actions from '../../actions';
import { DENTIST } from '../../util/strings';
import { required } from './formValidation';

const StyledBox = styled(Flex)`
    line-height: 36px;
`;

class CreateDentistProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };
        const { location } = this.props;
        if (location) {
            this.urlParams = queryString.parse(location.search);
        }
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
    }

    async componentWillMount() {
        document.title = 'Laguro - New Profile';

        this.props.initialize({
            specialty: 'General Dentist'
        });
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
                <Flex mt={1}>
                    <button
                        type="button"
                        className="waves-effect btn light-blue lighten-2"
                        onClick={() => fields.push({ duration: 60 })}
                    >
                        Add Procedure
                    </button>
                    {error && <StyledBox ml={2} className="red-text">{error}</StyledBox>}
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
