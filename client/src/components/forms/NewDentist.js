import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';

import procedureList from '../../staticData/procedureList';
import * as actions from '../../actions';

const required = value => (value && value !== '' ? undefined : 'Required');

class NewDentist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: [],
        };
    }

    onSubmit(values) {
        const { reset } = this.props;
        const { imgUrl } = this.state;
        this.props.createDentist({ ...values, imgUrl });
        reset();
    }

    componentWillMount() {
        document.title = 'Laguro - New Profile';

        this.props.initialize({
            specialty: 'General Dentist',
        });
    }

  renderField = ({
      input,
      label,
      className,
      placeholder,
      meta: { touched, error },
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
      let procedureOptions = procedureList.map(procedure => (
          <option value={procedure.name} key={procedure.id}>
              {procedure.name}
          </option>
      ));
      procedureOptions = [
          <option value="" key={0}>Please select a procedure...</option>,
          ...procedureOptions,
      ];
      return procedureOptions;
  }

  extractUrlToState(result) {
      const upload = result.filesUploaded;
      let allUrls = [];
      if (upload.length) {
          allUrls = upload.map(file => file.url);
      }
      this.setState({ imgUrl: allUrls });
  }

  renderUploadedImages() {
      const { imgUrl } = this.state;
      return imgUrl.map((url, index) => <img src={url} key={`img${index}`} alt="office" />);
  }

  renderDurations() {
      return [
          <option value={30} key={30}>30 minutes</option>,
          <option value={60} key={60}>60 minutes</option>,
      ];
  }

  renderSelect = ({
      input, children, meta: { touched, error },
  }) => (
      <div className="col s4">
          <select {...input} className="browser-default">
              {children}
          </select>
          {touched && (error && <span className="red-text">{error}</span>)}
      </div>
  );

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

              <div className="image_upload">
                  <div className="image_display">{this.renderUploadedImages()}</div>
                  <ReactFilestack
                      apikey={'Aj4gwfCaTS2Am35P0QGrbz'}
                      buttonText="Upload New Image"
                      buttonClass="btn light-blue lighten-2"
                      options={{
                          accept: ['image/*'],
                          imageMin: [300, 300],
                          maxFiles: 1,
                          fromSources: [
                              'local_file_system',
                              'url',
                              'imagesearch',
                              'facebook',
                              'instagram',
                          ],
                          storeTo: { container: 'dentist-photos' },
                      }}
                      onSuccess={result => this.extractUrlToState(result)}
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


export default reduxForm({
    form: 'newDentist',
})(connect(null, actions)(NewDentist));
