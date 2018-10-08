import React, { PureComponent } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';

import PatientCard from './view';
import { Loading } from '../../../../components';
import { RedirectErrorPage } from '../../../../pages/GeneralErrorPage';

import { updatePatientImagesMutation, getHistoryFormQuery } from './queries';
import { getPatientsQuery } from '../queries';

class PatientCardContainer extends PureComponent {
    state = {
        isDocumentListOpen: false,
        patientImages: this.props.patientImages,
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

                    const dentistData = proxy.readQuery({
                        query: getPatientsQuery,
                        variables: { id: this.props.dentistId },
                    });

                    dentistData.getDentist.patients.map(
                        patient =>
                            patient.id === this.props.patientId
                                ? { ...patient, patientImages }
                                : patient
                    );

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

        const newPatientImages = [...patientImages, ...allUrls];
        const variables = {
            input: {
                dentistId,
                patientId,
                patientImages: newPatientImages,
            },
        };

        this.updatePatientImages(variables);
        this.setState({ patientImages: newPatientImages });
    };

    removeImage = e => {
        const { url } = e.currentTarget.dataset;
        const { patientImages } = this.state;
        const { dentistId, patientId } = this.props;

        const newPatientImages = patientImages.filter(item => item !== url);
        const variables = {
            input: {
                dentistId,
                patientId,
                patientImages: newPatientImages,
            },
        };

        this.updatePatientImages(variables);
        this.setState({ patientImages: newPatientImages });
    };

    render() {
        const { name, imageUrl, lastVisit } = this.props;
        const { patientImages, isDocumentListOpen } = this.state;
        return (
            <Query
                query={getHistoryFormQuery}
                variables={{ id: this.props.patientId }}
            >
                {({ loading, error, data }) => {
                    if (error) return <RedirectErrorPage />;
                    if (loading) return <Loading />;

                    const documentUrl = get(
                        data,
                        'getHealthHistoryFormDownloadableUrl'
                    );

                    return (
                        <PatientCard
                            toggleDocumentList={this.toggleDocumentList}
                            loadPhotos={this.loadPhotos}
                            removeImage={this.removeImage}
                            patientImages={patientImages}
                            isDocumentListOpen={isDocumentListOpen}
                            name={name}
                            imageUrl={imageUrl}
                            lastVisit={lastVisit}
                            documentUrl={documentUrl}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default compose(
    withRouter,
    graphql(updatePatientImagesMutation, { name: 'updatePatientImages' })
)(PatientCardContainer);
