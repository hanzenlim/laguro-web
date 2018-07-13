import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import styled from 'styled-components';
import ReactFilestack from 'filestack-react';
import * as actions from '../../actions';
import { filestackKey } from '../../config/keys';
import { renderPrice, removeSpecialChars } from '../../util/paymentUtil';
import { Typography, Grid, Button, Box } from '../common';
import { Padding } from '../common/Spacing';
import {
    renderField,
    charCount,
    renderSelect,
    equipmentOptions,
    addTooltip
} from './sharedComponents';
import { required } from './formValidation';

const StyledContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    max-width: 1080px;
    padding: 5em 10px;
    margin: 0 auto;
`;

class EditOffice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            office: {},
            imageUrls: []
        };
    }

    async componentWillMount() {
        document.title = 'Laguro - Edit Office';

        // id from URL
        this.office_id = this.props.computedMatch.params.office_id;
        await this.props.getOffice(this.office_id);
        const { office } = this.props;
        this.setState({
            office: office,
            imageUrls: office.imageUrls
        });

        this.props.initialize({
            name: office.name,
            equipment: office.equipment,
            description: office.description
        });
    }

    async onSubmit(values) {
        const { imageUrls } = this.state;
        await this.props.editOffice({
            ...values,
            imageUrls,
            id: this.office_id
        });
    }

    extractUrlToState(result) {
        let upload = result.filesUploaded;
        let allUrls = this.state.imageUrls;
        if (upload.length) {
            let newImgs = upload.map(file => {
                return file.url;
            });

            allUrls = [...allUrls, ...newImgs];
        }
        this.setState({ imageUrls: allUrls });
    }

    deleteImg(index) {
        let allUrls = this.state.imageUrls;
        allUrls.splice(index, 1);

        this.setState({ imageUrls: allUrls });
    }

    renderUploadedImages() {
        const { imageUrls } = this.state;
        return imageUrls.map((url, index) => {
            return (
                <div className="edit_img_container" key={'img' + index}>
                    <button
                        onClick={this.deleteImg.bind(this, index)}
                        type="button"
                        className="delete_img red lighten-2 btn"
                    >
                        <i className="material-icons">delete_forever</i>
                    </button>
                    <img src={url} alt="office" />
                </div>
            );
        });
    }

    renderEquipmentSelector = ({ fields, meta: { error } }) => (
        <ul>
            <label>{`Equipment Available`}</label>
            {fields.map((equipment, index) => (
                <li key={index} className="multiRowAdd">
                    <Field
                        name={`${equipment}.name`}
                        label="Equipment Type"
                        component={renderSelect}
                        validate={required}
                        children={equipmentOptions}
                    />
                    <Field
                        name={`${equipment}.price`}
                        type="text"
                        placeholder="15"
                        component={renderField}
                        label="Usage Price"
                        tooltip="How much do you want to charge dentists to use this equipment? (one-time charge)"
                        validate={[required]}
                        format={value => renderPrice(value)}
                        normalize={value => removeSpecialChars(value)}
                    />
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
            <li>
                <Box ml={4}>
                    <button
                        type="button"
                        className="waves-effect btn-flat"
                        onClick={() => fields.push({})}
                    >
                        Add Equipment
                    </button>
                </Box>
                {error && <span>{error}</span>}
            </li>
        </ul>
    );

    render() {
        const { handleSubmit, submitting, error } = this.props;

        if (!this.props.initialized) {
            return <div>Loading...</div>;
        }

        return (
            <StyledContainer>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontSize={5}>
                                        Edit Dentist Office
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Field
                                name="name"
                                label="Office Name"
                                tooltip="What do you want your office to be called?"
                                className="col s12"
                                component={renderField}
                                validate={required}
                            />

                            <Padding bottom="16" />

                            <Field
                                name="description"
                                label="Description (optional)"
                                component={renderField}
                                multiline={true}
                                rows={2}
                                charCount={true}
                                inputProps={{
                                    maxLength: 500
                                }}
                            />

                            {charCount(
                                this.props.description
                                    ? this.props.description.length
                                    : 0,
                                500
                            )}

                            <div className="row">
                                <FieldArray
                                    name="equipment"
                                    className="col s12"
                                    component={this.renderEquipmentSelector}
                                />
                            </div>

                            <div className="image_upload">
                                <label>
                                    {`Featured Office Image`}
                                    {addTooltip(
                                        'Upload images of your office. The first image will show up on search results.'
                                    )}
                                </label>
                                <div className="image_display">
                                    {this.renderUploadedImages()}
                                </div>
                                <ReactFilestack
                                    apikey={filestackKey}
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
                                            'instagram'
                                        ],
                                        transformations: {
                                            crop: {
                                                aspectRatio: 3 / 2,
                                                force: true
                                            }
                                        },
                                        uploadInBackground: false,
                                        storeTo: { container: 'office-photos' }
                                    }}
                                    onSuccess={result =>
                                        this.extractUrlToState(result)
                                    }
                                />
                            </div>

                            <Box pb={4} />

                            <Grid container justify="space-between">
                                <Grid item>
                                    {error && (
                                        <strong className="red-text">
                                            {error}
                                        </strong>
                                    )}
                                    <Button
                                        color="secondary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        <Typography
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Submit
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </StyledContainer>
        );
    }
}

const mapStateToProps = state => {
    const selector = formValueSelector('editOffice');
    return {
        auth: state.auth,
        office: state.offices.selected,
        description: selector(state, 'description')
    };
};

export default reduxForm({
    form: 'editOffice'
})(connect(mapStateToProps, actions)(EditOffice));
