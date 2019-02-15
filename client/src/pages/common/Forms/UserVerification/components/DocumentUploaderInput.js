import React from 'react';
import DocumentSelect from './DocumentSelect';
import { Flex } from '../../../../../components';

class DocumentUploaderInput extends React.Component {
    // strip url
    handleDeleteDocument = index => event => {
        event.stopPropagation();
        const { value } = this.props;

        const _updatedDocument = Object.assign({}, value[index]);
        delete _updatedDocument.url;

        this.props.onChange(undefined);
    };

    handleUploadSuccess = index => async filestackData => {
        const { value, fetchSignedURL } = this.props;
        const { url } = filestackData.filesUploaded[0];

        const signedURL = await fetchSignedURL(url);

        if (this.props.onChange) {
            this.props.onChange(
                Object.assign([], value, {
                    [index]: { ...value[index], url: signedURL },
                })
            );
        }
    };

    render() {
        const { value } = this.props;

        return (
            <Flex>
                {value.map((document, index) => (
                    <DocumentSelect
                        {...this.props}
                        key={index}
                        document={document}
                        onDeleteDocument={this.handleDeleteDocument(index)}
                        onDocumentUpload={this.handleUploadSuccess(index)}
                    />
                ))}
            </Flex>
        );
    }
}

export default DocumentUploaderInput;
