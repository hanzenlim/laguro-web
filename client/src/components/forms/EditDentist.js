import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import ReactFilestack from "filestack-react";
import { Link } from "react-router-dom";

import procedureList from "../../staticData/procedureList";
import * as actions from "../../actions";

class EditDentist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dentist: {},
      img_url: ""
    };
  }

  componentWillMount() {
    document.title = "Laguro - Edit Profile";

    this.getDentist().then(dentist => {
      this.setState({
        dentist: dentist,
        img_url: dentist.img_url
      });

      this.props.initialize({
        name: dentist.name,
        location: dentist.location,
        specialty: dentist.specialty,
        procedures: dentist.procedures
      });
    });
  }

  onSubmit(values) {
    const { reset, auth } = this.props;
    const { img_url } = this.state;
    this.props.editDentist({ ...values, img_url, id: auth._id });
    reset();
  }

  // get all dentists and find the dentist profile that matches logged in user
  async getDentist() {
    await this.props.fetchDentists();

    const { dentists, auth } = this.props;
    if (dentists.length) {
      const dentist = dentists.filter(dentist => dentist.user_id === auth._id);
      return dentist[0];
    } else {
      return {};
    }
  }

  extractUrlToState(result) {
    let upload = result.filesUploaded;
    if (upload.length) {
      this.setState({ img_url: upload[0].url });
    }
  }

  renderUploadedImages() {
    const { img_url } = this.state;
    return <img src={img_url} alt="dentist" />;
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

  renderSelect = ({ input, label, children, meta: { touched, error } }) => {
    return (
      <div className="col s4">
        <select {...input} className="browser-default">
          {children}
        </select>
        {touched && (error && <span className="red-text">{error}</span>)}
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
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        className="bigForm light-blue lighten-5"
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      >
        <div className="form_title">
          <h4>Edit Dentist Profile</h4>
          <Link
            className="btn light-blue lighten-2 waves-effect"
            to={"/profile"}
          >
            Go back to profile
          </Link>
        </div>

        <div className="row">
          <Field
            name="name"
            label="Name"
            className="col s12 m4"
            placeholder="Stephen Curry"
            validate={required}
            component={this.renderField}
          />
          <Field
            name="specialty"
            label="Dental Specialty"
            className="col s12 m4"
            placeholder="General Dentist"
            validate={required}
            component={this.renderField}
          />
          <Field
            name="location"
            label="Location of practice"
            className="col s12 m4"
            placeholder="Oakland, CA"
            validate={required}
            component={this.renderField}
          />
        </div>

        <div className="image_upload">
          <div className="image_display">{this.renderUploadedImages()}</div>
          <ReactFilestack
            apikey={"Aj4gwfCaTS2Am35P0QGrbz"}
            buttonText="Upload New Image"
            buttonClass="btn light-blue lighten-2"
            options={{
              accept: ["image/*"],
              imageMin: [300, 300],
              maxFiles: 1,
              fromSources: [
                "local_file_system",
                "url",
                "imagesearch",
                "facebook",
                "instagram"
              ],
              storeTo: { container: "office-photos" }
            }}
            onSuccess={result => this.extractUrlToState(result)}
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

const required = value => (value && value !== "" ? undefined : "Required");

function mapStateToProps(state) {
  return {
    auth: state.auth.data,
    dentists: state.dentists.dentists
  };
}

export default reduxForm({
  form: "editDentist"
})(connect(mapStateToProps, actions)(EditDentist));
