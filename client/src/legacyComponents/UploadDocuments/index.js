import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react';
import styled from 'styled-components';
import { get, lowerCase } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';
import { updateUserProfile, editDentist, fetchUser } from '../../actions';
import { Button, Modal, Box, Flex, Typography } from '../common';
import {
    queryPatientDocumentQuery,
    saveUploadedImagesUrlQuery,
    createPatientDocumentQuery,
    getFileStackPolicySignature,
} from './queries';
import makeApiCall from '../../util/clientDataLoader';
import { secureFilestackKey } from '../../config/keys';
import { DENTIST, PATIENT } from '../../util/strings';
import DOCUMENT_TYPE_LIST from '../../staticData/documentTypeList';

const StyledContainer = styled.div`
    min-height: 80vh;
`;

const StyledDeleteIcon = styled.div`
    position: absolute;
    top: 0;
    left: 604px;
`;

const StyledImageContainer = styled.div`
    position: relative;
`;

const StyledUploadedImage = styled.img`
    width: 600px;
    margin: 0 8px 8px 0;
    object-fit: contain;
`;

class UploadDocuments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadPolicySignature: '',
            isLoading: true,
            signedUrlArr: [],
            urlArr: [],
            documentType: DOCUMENT_TYPE_LIST[props.userType][0],
        };
    }

    async componentDidMount() {
        if (this.props.auth) {
            const { userType } = this.props;

            const patientDocuments = await this.getPatientDocuments(
                this.props.auth.id,
                DOCUMENT_TYPE_LIST[userType][0]
            );
            const uploadFileStackKeys = await this.getUploadPolicySignature();

            this.setState({
                isLoading: false,
                ...patientDocuments,
                ...uploadFileStackKeys,
            });
        }
    }

    async componentDidUpdate() {
        // if auth is loaded and we haven't loaded any patient document
        if (this.props.auth && this.state.isLoading) {
            const { userType } = this.props;

            const patientDocuments = await this.getPatientDocuments(
                this.props.auth.id,
                DOCUMENT_TYPE_LIST[userType][0]
            );
            const uploadFileStackKeys = await this.getUploadPolicySignature();

            this.setState({
                isLoading: false,
                ...patientDocuments,
                ...uploadFileStackKeys,
            });
        }
    }

    async getUploadPolicySignature() {
        const uploadPolicySignature = await makeApiCall(
            getFileStackPolicySignature,
            {
                type: 'upload',
            }
        );

        const policySignature =
            uploadPolicySignature &&
            uploadPolicySignature.data &&
            uploadPolicySignature.data.getFileStackPolicySignature;

        return {
            uploadPolicySignature: policySignature,
        };
    }

    async getViewPolicySignature(handle) {
        const viewPolicySignature = await makeApiCall(
            getFileStackPolicySignature,
            {
                type: 'view',
                handle,
            }
        );

        return viewPolicySignature && viewPolicySignature.data;
    }

    async getPatientDocuments(id, type) {
        let patientDocument = await makeApiCall(queryPatientDocumentQuery, {
            input: {
                partitionKey: 'patientId',
                partitionValue: id,
            },
        });

        patientDocument =
            patientDocument &&
            patientDocument.data &&
            patientDocument.data.queryPatientDocument[0];

        let signedUrlArr = [];
        let urlArr = [];

        if (
            patientDocument &&
            patientDocument[type] &&
            patientDocument[type].length > 0
        ) {
            for (let obj of patientDocument[type]) {
                const result = await this.generateImageSignature(obj);
                signedUrlArr.push(result);
                urlArr.push(obj);
            }

            return {
                signedUrlArr,
                urlArr,
            };
        }

        return {
            signedUrlArr: [],
            urlArr: [],
        };
    }

    async generateImageSignature(urlArr) {
        // Extracting the file handle from the urlArr. The urlArr has this format https://cdn.filestackcontent.com/yF9AgWbSTHyWbMGZDiow
        const viewPolicySignature = await this.getViewPolicySignature(
            urlArr.split('/')[3]
        );

        return `${urlArr}?policy=${
            viewPolicySignature.getFileStackPolicySignature.policy
        }&signature=${
            viewPolicySignature.getFileStackPolicySignature.signature
        }`;
    }

    extractUrlToState = async result => {
        let uploadImages = result.filesUploaded;
        let signedUrlArr = [...this.state.signedUrlArr];
        let urlArr = [...this.state.urlArr];

        for (let value of uploadImages) {
            const generatedSignedUrl = await this.generateImageSignature(
                value.url
            );
            signedUrlArr.push(generatedSignedUrl);
            urlArr.push(value.url);
        }

        this.setState({
            signedUrlArr,
            urlArr,
        });
    };

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
                    <StyledDeleteIcon
                        data-imageindex={key}
                        onClick={this.deleteImage}
                    >
                        <DeleteIcon style={{ fontSize: '40px' }} />
                    </StyledDeleteIcon>
                </StyledImageContainer>
            );
        });
    }

    deleteImage = e => {
        const { imageindex } = e.currentTarget.dataset;
        const tempSignedUrl = [...this.state.signedUrlArr];
        const tempUrl = [...this.state.urlArr];

        tempSignedUrl.splice(imageindex, 1);
        tempUrl.splice(imageindex, 1);

        this.setState({
            signedUrlArr: tempSignedUrl,
            urlArr: tempUrl,
        });
    };

    handleSubmit = async () => {
        const { auth, userType } = this.props;
        // In order to update the patient document table, we need to get the primary key
        // so we get the patient document by patient id and extract the primary key. We will
        // use the primary key to update the patient document.
        const patientDocResponse = await makeApiCall(
            queryPatientDocumentQuery,
            {
                input: {
                    partitionKey: 'patientId',
                    partitionValue: auth && auth.id,
                },
            }
        );

        const id = get(patientDocResponse, 'data.queryPatientDocument[0].id');

        let response;
        // There is no patient document for this user yet. Let's go ahead and create it
        if (!id) {
            response = await makeApiCall(createPatientDocumentQuery, {
                input: {
                    patientId: auth && auth.id,
                    documentList: this.state.signedUrlArr,
                    documentType: this.state.documentType,
                    shouldUploadToEhr: userType === PATIENT
                },
            });
        } else {
            const params = {
                id,
                documentList: this.state.signedUrlArr,
                documentType: this.state.documentType,
                shouldUploadToEhr: userType === PATIENT
            };

            response = await makeApiCall(saveUploadedImagesUrlQuery, {
                input: params,
            });
        }

        if (response && !response.errors) {
            const documentTypeIndex = DOCUMENT_TYPE_LIST[userType].indexOf(this.state.documentType);

            const isLastStep = (documentTypeIndex + 1) === DOCUMENT_TYPE_LIST[userType].length;

            if (!isLastStep) {
                this.setState({ documentType: DOCUMENT_TYPE_LIST[userType][documentTypeIndex + 1] });

                if (this.props.auth) {
                    const patientDocuments = await this.getPatientDocuments(
                        this.props.auth.id,
                        DOCUMENT_TYPE_LIST[userType][documentTypeIndex + 1]
                    );

                    this.setState({
                        isLoading: false,
                        ...patientDocuments,
                    });
                }
            } else {
                if (userType === DENTIST) {
                    await this.props.editDentist({
                        ...this.props.auth.dentist,
                        isVerified: true
                    });
                }

                if (userType === PATIENT) {
                    await this.props.updateUserProfile(this.props.auth.id, {
                        isVerified: true,
                    })
                }

                await this.props.fetchUser(DENTIST);
                this.props.closeModal();

                if (this.props.onSuccess) {
                    this.props.onSuccess();
                }
            }

            alert('Successfully saved images');
        } else {
            alert('Something went wrong. Please try again later');
        }
    };

    handleBack = async () => {
        const { userType } = this.props;
        const documentTypeIndex = DOCUMENT_TYPE_LIST[userType].indexOf(this.state.documentType);

        const patientDocuments = await this.getPatientDocuments(
            this.props.auth.id,
            DOCUMENT_TYPE_LIST[userType][documentTypeIndex - 1]
        );

        this.setState({
            isLoading: false,
            ...patientDocuments,
            documentType: DOCUMENT_TYPE_LIST[userType][documentTypeIndex - 1]
        });
    }

    render() {
        const { userType } = this.props;
        const documentTypeIndex = DOCUMENT_TYPE_LIST[userType].indexOf(this.state.documentType);
        const isFirstStep = documentTypeIndex === 0;
        const isLastStep = (documentTypeIndex + 1) === DOCUMENT_TYPE_LIST[userType].length;

        return (
            <Modal
                closable
                open={this.props.open}
                closeModal={this.props.closeModal}
            >
                <StyledContainer>
                    <div>
                        <Typography
                            fontSize={5}
                            fontWeight="regular"
                            color="black"
                        >
                            {userType === DENTIST
                                ? 'Verify Dentist Profile'
                                : 'Verify Patient Profile'
                            }
                        </Typography>
                    </div>
                    <div>
                        <Typography fontSize={3}>
                            {userType === DENTIST
                                ? 'Before you can book a reservation, we need you to upload some documents for verification.'
                                : 'Before you can book an appointment, we need you to upload some documents for verification.'
                            }
                            {` Please upload a picture of your ${lowerCase(this.state.documentType)} card front and back.`}
                        </Typography>
                    </div>
                    <Box pt={10}>{this.renderUploadedImages()}</Box>

                    {!this.state.isLoading && (
                        <ReactFilestack
                            apikey={secureFilestackKey}
                            security={{
                                policy: this.state.uploadPolicySignature.policy,
                                signature: this.state.uploadPolicySignature
                                    .signature,
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
                                    'instagram',
                                ],
                                storeTo: {
                                    location: 's3',
                                },
                            }}
                            onSuccess={this.extractUrlToState}
                            render={({ onPick }) => (
                                <Button onClick={onPick} color="primary">
                                    Upload Images
                                </Button>
                            )}
                        />
                    )}


                    <Flex justify="space-between" pt={10}>
                        {
                            !isFirstStep && (<Button
                                onClick={this.handleBack}
                                color="default"
                            >
                                Previous
                            </Button>)
                        }

                        <Button
                            onClick={this.handleSubmit}
                            color="secondary"
                            type="submit"
                        >
                            {isLastStep ? 'Submit' : 'Next'}
                        </Button>
                    </Flex>
                </StyledContainer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};

// Exporting it as an object without the connect so we can unit test it properly. If you don't
// do this then you have to mock the store.
export { UploadDocuments as NoReduxUploadDocuments };
export default connect(
    mapStateToProps,
    { updateUserProfile, editDentist, fetchUser }
)(UploadDocuments);
