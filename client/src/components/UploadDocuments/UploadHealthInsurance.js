import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';

import { Button, Container, Box, Typography } from '../common';
import {
    queryPatientDocumentQuery,
    saveUploadedImagesUrlQuery,
    createPatientDocumentQuery,
    getFileStackPolicySignature,
} from './queries';
import makeApiCall from '../../util/clientDataLoader';
import { secureFilestackKey } from '../../config/keys';

const StyledDeleteIcon = styled.div`
    position: absolute;
    top: 0;
    left: 604px;
`;

const StyledImageContainer = styled.div`
    position: relative;
`
const StyledUploadedImage = styled.img`
    width: 600px;
    margin: 0 8px 8px 0;
    object-fit: contain;
`;

class UploadHealthInsurance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadPolicySignature: '',
            isLoading: true,
            signedUrlArr: [],
            urlArr: [],
        };
    }

    async componentDidMount() {
        if (this.props.auth) {
            const patientDocuments = await this.getPatientDocuments(this.props.auth.id);
            const uploadFileStackKeys = await this.getUploadPolicySignature();

            this.setState({
                isLoading: false,
                ...patientDocuments,
                ...uploadFileStackKeys,
            })
        }
    }

    async componentDidUpdate() {
        // if auth is loaded and we haven't loaded any patient document
        if (this.props.auth && this.state.isLoading) {
            const patientDocuments = await this.getPatientDocuments(this.props.auth.id);
            const uploadFileStackKeys = await this.getUploadPolicySignature();

            this.setState({
                isLoading: false,
                ...patientDocuments,
                ...uploadFileStackKeys,
            })
        }
    }

    async getUploadPolicySignature() {
        const uploadPolicySignature = await makeApiCall(getFileStackPolicySignature, {
            type: 'upload',
        });

        const policySignature = uploadPolicySignature 
            && uploadPolicySignature.data 
            && uploadPolicySignature.data.getFileStackPolicySignature;

        return {
            uploadPolicySignature: policySignature,
        };
    }

    async getViewPolicySignature(handle) {
        const viewPolicySignature = await makeApiCall(getFileStackPolicySignature, {
            type: 'view',
            handle,
        });

        return viewPolicySignature && viewPolicySignature.data;
    }

    async getPatientDocuments(id) {
        let patientDocument = await makeApiCall(queryPatientDocumentQuery, {
            "input": {
                "partitionKey": "patientId",
                "partitionValue": id,
            }
        });

        patientDocument = patientDocument 
            && patientDocument.data 
            && patientDocument.data.queryPatientDocument[0];

        let signedUrlArr = [];
        let urlArr = [];

        if (patientDocument && patientDocument.healthInsuranceImages 
            && patientDocument.healthInsuranceImages.length > 0) {
            for (let obj of patientDocument.healthInsuranceImages) {
                const result = await this.generateImageSignature(obj); 
                signedUrlArr.push(result);
                urlArr.push(obj)
            }
            
            return {
                signedUrlArr,
                urlArr
            };
        }

        return null;
    }

    async generateImageSignature(urlArr) {
        debugger;
        // Extracting the file handle from the urlArr. The urlArr has this format https://cdn.filestackcontent.com/yF9AgWbSTHyWbMGZDiow
        const viewPolicySignature = await this.getViewPolicySignature(urlArr.split('/')[3]);

        return `${urlArr}?policy=${viewPolicySignature.getFileStackPolicySignature.policy}&signature=${viewPolicySignature.getFileStackPolicySignature.signature}`;
    }

    extractUrlToState = async (result) => {

        let uploadImages = result.filesUploaded;
        let signedUrlArr = [...this.state.signedUrlArr];
        let urlArr = [...this.state.urlArr];

        for (let value of uploadImages) {
            const generatedSignedUrl = await this.generateImageSignature(value.url); 
            signedUrlArr.push(generatedSignedUrl);
            urlArr.push(value.url);
        }
 
        this.setState({ 
            signedUrlArr,
            urlArr
        });
    }

    renderUploadedImages() {
        if (this.state.signedUrlArr.length <= 0) {
            return '';
        }

        return this.state.signedUrlArr.map((value, key) => {
            return (
                <StyledImageContainer key={key}>
                    <StyledUploadedImage
                        data-name="styledUploadedImage"
                        src={value}
                        key={`img-${key}`}
                        alt="uploadedImage"
                    />
                    <StyledDeleteIcon data-imageindex={key} onClick={this.deleteImage}>
                        <DeleteIcon style={{"fontSize": "40px"}}/>
                    </StyledDeleteIcon>
                </StyledImageContainer>
            )
        });
    }

    deleteImage = (e) => {
        const { imageindex } = e.currentTarget.dataset;
        const tempSignedUrl = [...this.state.signedUrlArr];
        const tempUrl = [...this.state.urlArr];

        tempSignedUrl.splice(imageindex, 1);
        tempUrl.splice(imageindex, 1);

        this.setState({
            signedUrlArr: tempSignedUrl,
            urlArr: tempUrl,
        });
    }

    handleSubmit = async () => {
        debugger;
        const { auth } = this.props;
        // In order to update the patient document table, we need to get the primary key
        // so we get the patient document by patient id and extract the primary key. We will
        // use the primary key to update the patient document.
        const patientDocResponse = await makeApiCall(queryPatientDocumentQuery, {
            "input": {
                "partitionKey": "patientId",
                "partitionValue": auth && auth.id,
            }
        });

        const id = patientDocResponse 
            && patientDocResponse.data 
            && patientDocResponse.data.queryPatientDocument[0] 
            && patientDocResponse.data.queryPatientDocument[0].id;

        let response;
        // There is no patient document for this user yet. Let's go ahead and create it
        if (!id) {
            response = await makeApiCall(createPatientDocumentQuery, {
                "input": {
                    "patientId": auth && auth.id,
                    "healthInsuranceImages": this.state.urlArr
                }
            });

        } else {
            const params = {
                id,
                healthInsuranceImages: this.state.urlArr,
            };

            response = await makeApiCall(saveUploadedImagesUrlQuery, {
                input: params
            });
        }

        if (response && !response.errors) {
            alert('Successfully saved images');
        } else {
            alert('Something went wrong. Please try again later');
        }

    }

    render () {
        return (
            <Container>
                <Box pt={50}>
                    <div>
                        <Typography fontSize={5} fontWeight="regular" color="black">
                            Health insurance card
                        </Typography>
                    </div>
                    <div>
                        <Typography fontSize={3} >
                            Please upload a picture of your health insurance card front and back.
                        </Typography>
                    </div>
                    <Box pt={10}>
                        {this.renderUploadedImages()}
                    </Box>
                    
                    {!this.state.isLoading &&
                        <ReactFilestack
                            apikey={secureFilestackKey}
                            security={{
                                policy: this.state.uploadPolicySignature.policy,
                                signature: this.state.uploadPolicySignature.signature,
                            }}
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
                            onSuccess={this.extractUrlToState}
                            render={({ onPick }) => (
                                <Button
                                    onClick={onPick}
                                    color="primary"
                                >
                                    Upload Images
                                </Button>
                            )}
                        />
                    }

                    <Box pt={10}>
                        <Button
                            onClick={this.handleSubmit}
                            color="secondary"
                            type="submit"
                        >
                            Save        
                        </Button>
                    </Box>
                </Box>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
}

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { UploadHealthInsurance };
export default connect(mapStateToProps, null)(UploadHealthInsurance);
