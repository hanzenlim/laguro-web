import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import ReactFilestack from 'filestack-react';
import { Link } from 'react-router-dom';

import equipmentList from '../../staticData/equipmentList';
import * as actions from '../../actions';

const required = value => (value && value !== '' ? undefined : 'Required');

class EditOffice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            office: {},
            imgUrl: [],
        };
    }

    componentWillMount() {
        document.title = 'Laguro - Edit Office';

        // id from URL
        this.office_id = this.props.computedMatch.params.office_id;

        this.getOffice().then((office) => {
            this.setState({
                office,
                imgUrl: office.imgUrl,
            });

            this.props.initialize({
                name: office.name,
                location: office.location,
                chairs: office.chairs,
                equipment: office.equipment,
            });
        });
    }

    onSubmit(values) {
        const { reset } = this.props;
        const { imgUrl } = this.state;
        this.props.editOffice({
            ...values,
            imgUrl,
            id: this.office_id,
        });
        reset();
    }

    // get all dentists and find the dentist profile that matches logged in user
    async getOffice() {
        await this.props.fetchOffices();

        const { offices } = this.props;
        if (offices.length) {
            const filteredOffice = offices.filter(office => office._id === this.office_id);
            return filteredOffice[0];
        }
        return {};
    }

    extractUrlToState(result) {
        const upload = result.filesUploaded;
        let allUrls = this.state.imgUrl;
        if (upload.length) {
            const newImgs = upload.map(file => file.url);

            allUrls = [...allUrls, ...newImgs];
        }
        this.setState({ imgUrl: allUrls });
    }

    deleteImg(index) {
        const allUrls = this.state.imgUrl;
        allUrls.splice(index, 1);

        this.setState({ imgUrl: allUrls });
    }

    renderUploadedImages() {
        const { imgUrl } = this.state;
		
        if (imgUrl && imgUrl.length > 0) {
            return imgUrl.map((url, index) => (
                <div className="edit_img_container" key={`img${index}`}>
                    <button
                        onClick={this.deleteImg.bind(this, index)}
                        type="button"
                        className="delete_img red lighten-2 btn"
                    >
                        <i className="material-icons">delete_forever</i>
                    </button>
                    <img src={url} alt="office" />
                </div>
            ));
        }

        return null;
    }

    renderEquipment() {
        return equipmentList.map(equipment => (
            <option value={equipment.name} key={equipment.id}>
                {equipment.name}
            </option>
        ));
    }

renderSelect = ({ input, meta: { touched, error } }) => (
    <div className="col s4">
        <select {...input} className="browser-default">
            <option value="">Please select equipment...</option>
            {this.renderEquipment()}
        </select>
        {touched && (error && <span className="red-text">{error}</span>)}
    </div>
);

renderEquipmentSelector = ({ fields, className, meta: { error } }) => (
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
            {error && <span>{error}</span>}
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
                        validate={required}
                    />
                </div>
                <button
                    type="button"
                    title="Remove Equipment"
                    className="red lighten-3 waves-effect btn"
                    onClick={() => fields.remove(index)}
                >
                    <i className="material-icons tiny">delete_forever</i>
                </button>
            </li>
        ))}
    </ul>
);

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

render() {
    const { handleSubmit, submitting } = this.props;

    return (
        <form
            className="bigForm light-blue lighten-5"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
            <div className="form_title">
                <h4>Edit Dentist Office</h4>
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
                    label="Name"
                    className="col s12 m4"
                    placeholder="Bell Dental"
                    component={this.renderField}
                    validate={required}
                />
                <Field
                    name="location"
                    label="Location"
                    className="col s12 m5"
                    placeholder="San Leandro, CA"
                    component={this.renderField}
                    validate={required}
                />
                <Field
                    name="chairs"
                    label="Number of Chairs"
                    className="col s12 m3"
                    placeholder="3"
                    component={this.renderField}
                    validate={required}
                />
            </div>

            <div className="row">
                <FieldArray
                    name="equipment"
                    className="col s12"
                    component={this.renderEquipmentSelector}
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
                        maxFiles: 5,
                        fromSources: [
                            'local_file_system',
                            'url',
                            'imagesearch',
                            'facebook',
                            'instagram',
                        ],
                        storeTo: { container: 'office-photos' },
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

const mapStateToProps = state => ({
    auth: state.auth.data,
    offices: state.offices.all,
});

export default reduxForm({
    form: 'editOffice',
})(connect(mapStateToProps, actions)(EditOffice));
