import React, { PureComponent } from 'react';
import _get from 'lodash/get';
import { Query } from 'react-apollo';
import DocumentUploaderInput from '~/common/Forms/DocumentUploader/DocumentUploaderInput';
import RedirectErrorPage from '~/routes/GeneralErrorPage';
import { getFileStackPolicySignatureQuery } from './queries';

class DocumentUploaderInputContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.signedURLs = {};
    }

    fetchSignedURL = async url => {
        const { signedURLs } = this;
        if (signedURLs[url]) {
            return signedURLs[url];
        }

        this.signedURLs[url] = await this.generateImageSignature(url);

        return this.signedURLs[url];
    };

    async generateImageSignature(url) {
        // Extracting the file handle from the urlArr. The urlArr has this format https://cdn.filestackcontent.com/yF9AgWbSTHyWbMGZDiow
        const viewPolicySignature = await this.getViewPolicySignature(
            url.split('/')[3]
        );

        const {
            policy,
            signature,
        } = viewPolicySignature.getFileStackPolicySignature;

        return `${url}?policy=${policy}&signature=${signature}`;
    }

    async getViewPolicySignature(handle) {
        const { client } = this.props;
        const viewPolicySignature = await client.query({
            query: getFileStackPolicySignatureQuery,
            variables: {
                type: 'view',
                handle,
            },
        });

        return _get(viewPolicySignature, 'data');
    }

    render() {
        return (
            <Query
                query={getFileStackPolicySignatureQuery}
                variables={{
                    type: 'upload',
                }}
            >
                {({ error, data: filestackData }) => {
                    if (error) return <RedirectErrorPage />;
                    const uploadPolicySignature = filestackData.getFileStackPolicySignature || {
                        policy: '',
                    };
                    return (
                        <DocumentUploaderInput
                            fetchSignedURL={this.fetchSignedURL}
                            uploadPolicySignature={uploadPolicySignature}
                            {...this.props}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default DocumentUploaderInputContainer;
