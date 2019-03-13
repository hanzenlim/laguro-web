import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';
import PatientCard from './view';
import { updatePatientImagesMutation } from './queries';
import { getPatientsQuery } from '../queries';

class PatientCardContainer extends PureComponent {
    state = {
        isDocumentListOpen: false,
        patientImages: this.props.patientImages,
        modalVisible: false,
        clickedImgUrl: '',
    };

    toggleDocumentList = () => {
        this.setState(({ isDocumentListOpen }) => ({
            isDocumentListOpen: !isDocumentListOpen,
        }));
    };

    updatePatientImages = async variables => {
        try {
            await this.props.updatePatientImages({
                variables,
                update: (proxy, { data }) => {
                    const patientImages = get(
                        data,
                        'updatePatientImages.patientImages'
                    );
                    this.setState({ patientImages });

                    const dentistData = proxy.readQuery({
                        query: getPatientsQuery,
                        variables: { id: this.props.dentistId },
                    });

                    return proxy.writeQuery({
                        query: getPatientsQuery,
                        variables: { id: this.props.dentistId },
                        data: dentistData,
                    });
                },
            });
        } catch (e) {
            this.props.history.push('/error');
        }
    };

    loadPhotos = result => {
        const { patientImages } = this.state;
        const { dentistId, patientId } = this.props;

        const upload = result.filesUploaded;

        let allUrls = [];
        if (upload.length) {
            allUrls = upload.map(file => file.url);
        }

        const newPatientImages = [
            ...patientImages.map(p => p.imageUrl),
            ...allUrls,
        ];

        const variables = {
            input: {
                dentistId,
                patientId,
                patientImages: newPatientImages,
            },
        };

        this.updatePatientImages(variables);
    };

    removeImage = e => {
        const { url } = e.currentTarget.dataset;
        const { patientImages } = this.state;
        const { dentistId, patientId } = this.props;

        const newPatientImages = patientImages
            .filter(item => item.signedImageUrl !== url)
            .map(item => item.imageUrl);

        const variables = {
            input: {
                dentistId,
                patientId,
                patientImages: newPatientImages,
            },
        };

        this.updatePatientImages(variables);
    };

    handleImageClick = e => {
        const { url } = e.currentTarget.dataset;
        this.setState({ clickedImgUrl: url, modalVisible: true });
    };

    handleOnCancel = () => {
        this.setState({ modalVisible: false });
    };

    render() {
        const {
            name,
            imageUrl,
            visitDate,
            hasNextAppointment,
            uploadPolicySignature,
        } = this.props;
        const {
            patientImages,
            isDocumentListOpen,
            modalVisible,
            clickedImgUrl,
        } = this.state;
        return (
            <PatientCard
                toggleDocumentList={this.toggleDocumentList}
                loadPhotos={this.loadPhotos}
                removeImage={this.removeImage}
                signedPatientImages={patientImages.map(p => p.signedImageUrl)}
                uploadPolicySignature={uploadPolicySignature}
                isDocumentListOpen={isDocumentListOpen}
                name={name}
                imageUrl={imageUrl}
                visitDate={visitDate}
                hasNextAppointment={hasNextAppointment}
                modalVisible={modalVisible}
                onImageClick={this.handleImageClick}
                clickedImgUrl={clickedImgUrl}
                onCancel={this.handleOnCancel}
            />
        );
    }
}

export default compose(
    withRouter,
    graphql(updatePatientImagesMutation, { name: 'updatePatientImages' })
)(PatientCardContainer);
