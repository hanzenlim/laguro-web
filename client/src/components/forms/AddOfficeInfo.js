import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import queryString from 'query-string';
import ReactFilestack from 'filestack-react';
import styled from 'styled-components';
import Autocomplete from '../filters/Autocomplete';
import * as actions from '../../actions';
import { DENTIST } from '../../util/strings';
import history from '../../history';
import { filestackKey } from '../../config/keys';

import { renderField } from './sharedComponents';
import { required } from './formValidation';

import { Typography, Grid, Button } from '../common';
import { Padding } from '../common/Spacing';

import officeSVG from '../icons/office.svg';

const StyledContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    max-width: 1080px;
    padding: 5em 10px;
    margin: 0 auto;
`;

const StyledImage = styled.img`
    padding-top: 10em;
`;

const StyledUploadedImage = styled.img`
    height: 100px;
    width: 100px;
    border: 5px solid #d8d8d8;
    margin: 0 8px 8px 0;
    object-fit: contain;
`;

class NewOffice extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);
        const { imageUrls, location } = this.urlParams;

        this.state = {
            location: location || '',
            imageUrls: imageUrls ? JSON.parse(imageUrls) : []
        };
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
        this.props.fetchUser(DENTIST);

        this.props.initialize({
            name: this.urlParams.name || ''
        });
    }

    onAutocomplete = location => {
        this.setState({ location });
    };

    onSubmit = values => {
        const params = queryString.stringify({
            ...this.urlParams,
            ...values,
            location: this.state.location,
            imageUrls: JSON.stringify(this.state.imageUrls)
        });

        history.push(`/landlord-onboarding/add-equipments?${params}`);
    };

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
            return (
                <StyledUploadedImage
                    src={url}
                    key={'img' + index}
                    alt="office"
                />
            );
        });
    }

    render() {
        const { auth, handleSubmit, submitting } = this.props;

        if (auth && !auth.dentistId) {
            history.push('/dentist/new?referrer=new_office');
        }

        return (
            <StyledContainer>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontSize={5}>
                                        {`Hi ${
                                            auth ? auth.name : ''
                                        }, let’s get started on creating
                                        your office listing`}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontSize={3}>Step 1</Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="16" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography fontSize={3} fontWeight="bold">
                                        Office Details
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Field
                                        name="name"
                                        label="Office Name"
                                        placeholder="Bell Center"
                                        component={renderField}
                                        validate={required}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        onAutocomplete={this.onAutocomplete}
                                        location={this.state.location}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <label>Featured Office Image</label>
                                    <div>
                                        <ReactFilestack
                                            apikey={filestackKey}
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
                                                storeTo: {
                                                    container: 'office-photos'
                                                }
                                            }}
                                            onSuccess={result =>
                                                this.extractUrlToState(result)
                                            }
                                            render={({ onPick }) => (
                                                <Button
                                                    onClick={onPick}
                                                    color="primary"
                                                >
                                                    Upload Images
                                                </Button>
                                            )}
                                        />
                                    </div>
                                    <Padding bottom="16" />
                                    <div className="image_display">
                                        {this.renderUploadedImages()}
                                    </div>
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <div className="image_upload" />

                            <div className="form-buttons">
                                <Button
                                    type="submit"
                                    color="primary"
                                    disabled={
                                        submitting || !this.state.location
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify="center">
                            <StyledImage src={officeSVG} />
                        </Grid>
                    </Grid>
                </Grid>
            </StyledContainer>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default reduxForm({
    form: 'addOfficeInfo'
})(
    connect(
        mapStateToProps,
        actions
    )(NewOffice)
);
