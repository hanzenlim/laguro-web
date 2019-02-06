import React, { Component, PureComponent } from 'react';
import { Wizard, Numbers, Pictures } from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import _get from 'lodash/get';
import { gql } from 'apollo-boost';
import { Query, compose, withApollo } from 'react-apollo';
import * as Yup from 'yup';
import DocumentUploaderInput from '../../../../../src/pages/common/Forms/UserVerification/components/DocumentUploaderInput';
import { Loading } from '../../../../components';
import { RedirectErrorPage } from '../../../../pages/GeneralErrorPage';

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
            query: gql(getFileStackPolicySignatureQuery2),
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
                {({ loading, error, data: filestackData }) => {
                    if (error) return <RedirectErrorPage />;
                    if (!loading) {
                        const uploadPolicySignature =
                            filestackData.getFileStackPolicySignature;
                        return (
                            <DocumentUploaderInput
                                fetchSignedURL={this.fetchSignedURL}
                                uploadPolicySignature={uploadPolicySignature}
                                {...this.props}
                            />
                        );
                    }

                    return null;
                }}
            </Query>
        );
    }
}

const getFileStackPolicySignatureQuery = gql`
    query($type: String!, $handle: String) {
        getFileStackPolicySignature(type: $type, handle: $handle) {
            signature
            policy
        }
    }
`;

const getFileStackPolicySignatureQuery2 = `
    query($type: String!, $handle: String) {
        getFileStackPolicySignature(type: $type, handle: $handle) {
            signature
            policy
        }
    }
`;

const steps = [
    {
        id: '0',
        validationSchema: Yup.object().shape({
            // ssn: Yup.string().required('SSN is required'),
            // dea: Yup.string().required('DEA reg num is required'),
            // npiNum: Yup.string().required('NPI num is required'),
        }),
    },
    {
        id: '1',
        initialValues: {},
        validationSchema: Yup.object().shape({
            // driversLicense: Yup.string().required('SSN is required'),
            // malpractice: Yup.string().required('DEA reg num is required'),
            // dentalLicense: Yup.string().required('NPI num is required'),
        }),
    },
    {
        id: '2',
        initialValues: {},
    },
];

const Step0 = props => <Numbers {...props} />;
const Step1 = props => (
    <Pictures
        {...props}
        renderDocumentUploaderInput={innerProps => (
            <DocumentUploaderInputContainer {...innerProps} {...props} />
        )}
    />
);
const Step2 = props => <div />;

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case '0':
            step = Step0(props);
            break;
        case '1':
            step = Step1(props);
            break;
        case '2':
            step = Step2(props);
            break;
        default:
            step = Step1(props);
    }

    return (
        <Flex justifyContent="center" mt="100px">
            {step}
        </Flex>
    );
};

class RenderDentistOnboarding extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Wizard
                render={props =>
                    render({ ...props, client: this.props.client })
                }
                steps={steps}
            />
        );
    }
}

export default compose(withApollo)(RenderDentistOnboarding);
