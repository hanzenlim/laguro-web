import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import ReactFilestack from 'filestack-react';
import history from '../../history';
import Autocomplete from '../filters/Autocomplete';
import equipmentList from '../../staticData/equipmentList';
import * as actions from '../../actions';
import { filestackKey } from '../../config/keys';
import { DENTIST } from '../../util/strings';

class NewOffice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            imageUrls: []
        };
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
        this.props.fetchUser(DENTIST);
    }

    onAutocomplete = location => {
        this.setState({
            location
        });
    };

    onSubmit(values) {
        const { reset, auth } = this.props;
        const { imageUrls } = this.state;
        values.equipment = values.equipment || [];
        this.props.createOffice({
            ...values,
            imageUrls,
            hostId: auth.dentist.id,
            location: this.state.location
        });
        reset();
        history.push('/profile');
    }

    extractUrlToState(result) {
        let upload = result.filesUploaded;
        let allUrls = [];
        if (upload.length) {
            allUrls = upload.map(file => {
                return file.url;
            });
        }
        this.setState({ imageUrls: allUrls });
    }

    renderUploadedImages() {
        const { imageUrls } = this.state;
        return imageUrls.map((url, index) => {
            return <img src={url} key={'img' + index} alt="office" />;
        });
    }

    renderEquipment() {
        return equipmentList.map(equipment => {
            return (
                <option value={equipment.name} key={equipment.id}>
                    {equipment.name}
                </option>
            );
        });
    }

    renderSelect = ({ input, meta: { touched, error } }) => {
        return (
            <div className="col s4">
                <select {...input} className="browser-default">
                    <option value="">Please select equipment...</option>
                    {this.renderEquipment()}
                </select>
                {touched &&
                    (error && <span className="red-text">{error}</span>)}
            </div>
        );
    };

    renderEquipmentSelector = ({ fields, className }) => {
        return (
            <ul className={className}>
                <label>Equipment Available</label>
                <li>
                    <button
                        type="button"
                        className="waves-effect btn-flat"
                        onClick={() => fields.push({})}
                    >
                        Add Equipment
                    </button>
                </li>
                {fields.map((equipment, index) => (
                    <li key={index} className="multiRowAdd">
                        <Field
                            name={`${equipment}.name`}
                            component={this.renderSelect}
                            validate={required}
                        />
                        <div className="col s2">
                            <Field
                                name={`${equipment}.price`}
                                type="text"
                                placeholder="15"
                                component={this.renderField}
                                label="Usage Price"
                                validate={[required, isNum]}
                            />
                        </div>
                        <button
                            type="button"
                            title="Remove Equipment"
                            className="red lighten-3 waves-effect btn"
                            onClick={() => fields.remove(index)}
                        >
                            <i className="material-icons tiny">
                                delete_forever
                            </i>
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    renderField = ({
        input,
        label,
        placeholder,
        className,
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
                    <h4>Create a new office</h4>
                    <Link
                        className="btn light-blue lighten-2 waves-effect"
                        to={'/profile'}
                    >
                        Go back to profile
                    </Link>
                </div>

                <div className="row">
                    <Field
                        name="name"
                        label="Office Name"
                        placeholder="Bell Center"
                        component={this.renderField}
                        validate={required}
                        className="col s12 m9"
                    />
                    <Field
                        name="numChairs"
                        label="Number of Chairs"
                        placeholder={3}
                        component={this.renderField}
                        validate={[required, isNum]}
                        className="col s12 m3"
                    />
                </div>

                <div className="row">
                    <div className="col s12 m12">
                        <Autocomplete onAutocomplete={this.onAutocomplete} />
                    </div>
                </div>

                <div className="row">
                    <FieldArray
                        name="equipment"
                        className="col s12"
                        component={this.renderEquipmentSelector}
                    />
                </div>

                <div className="image_upload">
                    <ReactFilestack
                        apikey={filestackKey}
                        buttonText="Upload Images"
                        buttonClass="btn light-blue lighten-2"
                        options={{
                            accept: ['image/*'],
                            imageMin: [300, 300],
                            maxFiles: 5,
                            fromSources: [
                                'local_file_system',
                                'url',
                                'imagesearch',
                                'facebook',
                                'instagram'
                            ],
                            storeTo: { container: 'office-photos' }
                        }}
                        onSuccess={result => this.extractUrlToState(result)}
                    />
                    <div className="image_display">
                        {this.renderUploadedImages()}
                    </div>
                </div>
                <div className="form-buttons">
                    <button
                        className="waves-effect btn light-blue lighten-2"
                        type="submit"
                        disabled={submitting || !this.state.location}
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

const required = value => (value && value !== '' ? undefined : 'Required');
const isNum = value =>
    value && !isNaN(value) ? undefined : 'Must be a number';

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default reduxForm({
    form: 'newOffice'
})(connect(mapStateToProps, actions)(NewOffice));
