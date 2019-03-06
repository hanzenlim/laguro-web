import React, { Component } from 'react';
import _get from 'lodash/get';
import { gql } from 'apollo-boost';
import { Box, Text } from '../../../../components';
import { getFileStackPolicySignatureQuery } from './queries';
import HostVerificationForm from './HostVerificationForm';

class AddDocument extends Component {
    constructor(props) {
        super(props);

        this.signedURLs = {};
    }

    state = {
        isLoading: true,
        uploadPolicySignature: null,
    };

    async componentWillMount() {
        document.title = 'Laguro - Add Document';
    }

    async componentDidMount() {
        const uploadFileStackKeys = await this.getUploadPolicySignature();

        this.setState({
            isLoading: false,
            ...uploadFileStackKeys,
        });
    }

    async getUploadPolicySignature() {
        const { client } = this.props;
        const {
            data: { getFileStackPolicySignature },
        } = await client.query({
            query: gql(getFileStackPolicySignatureQuery),
            variables: {
                type: 'upload',
            },
        });

        return {
            uploadPolicySignature: getFileStackPolicySignature,
        };
    }

    async getViewPolicySignature(handle) {
        const { client } = this.props;
        const viewPolicySignature = await client.query({
            query: gql(getFileStackPolicySignatureQuery),
            variables: {
                type: 'view',
                handle,
            },
        });

        return _get(viewPolicySignature, 'data');
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

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const { persona, form, client, header, ...rest } = this.props;

        return (
            <Box>
                <Text
                    fontWeight="bold"
                    fontSize={[2, '', 5]}
                    lineHeight={['1.88', '', '1']}
                    letterSpacing="-0.6px"
                    color="text.gray"
                    mt={[0, '', 140]}
                    mb={[0, '', 18]}
                >
                    Step 3
                </Text>

                <Text
                    fontWeight="bold"
                    fontSize={[2, '', 5]}
                    lineHeight="1"
                    letterSpacing="-0.6px"
                    color="text.trueBlack"
                    mb={[21, '', 54]}
                >
                    {header}
                </Text>
                <Text
                    fontWeight="bold"
                    fontSize={[0, '', 4]}
                    lineHeight="1"
                    letterSpacing="0px"
                    color="text.blue"
                    mb={20}
                >
                    Office Documentations
                </Text>
                <HostVerificationForm
                    {...this.state}
                    form={form}
                    {...rest}
                    wrappedComponentRef={this.saveFormRef}
                    fetchSignedURL={this.fetchSignedURL}
                />
            </Box>
        );
    }
}

export default AddDocument;
