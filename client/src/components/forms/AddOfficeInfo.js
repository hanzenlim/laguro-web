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

import { Typography, Input, Grid, Button } from '../common';
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
        this.setState({
            location
        });
    };

    onSubmit = values => {
        const params = queryString.stringify({
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
            return <img src={url} key={'img' + index} alt="office" />;
        });
    }

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
                <Input {...input} placeholder={placeholder} />
            </div>
            {touched && error && <span className="red-text">{error}</span>}
        </div>
    );

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <StyledContainer>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t1">
                                        {`Hi ${
                                            this.props.auth
                                                ? this.props.auth.name
                                                : ''
                                        }, let’s get started on creating
                                        your office listing`}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t3">Step 1</Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="16" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t3" weight="bold">
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
                                        component={this.renderField}
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
                                            apikey={'Aj4gwfCaTS2Am35P0QGrbz'}
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

const required = value => (value && value !== '' ? undefined : 'Required');

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default reduxForm({
    form: 'addOfficeInfo'
})(connect(mapStateToProps, actions)(NewOffice));
