import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import ReactFilestack from 'filestack-react';
import { secureFilestackKey } from '../../../../../config/keys';

const DeleteIconWrapper = styled.div`
    position: absolute;
    top: -12px;
    right: -12px;
    width: 24px;
    height: 24px;
    background: #dddddd;
    font-size: 13px;
    line-height: 24px;
    text-align: center;
    border-radius: 12px;
    color: #9b9b9b;

    > span {
        display: block;
    }
`;

const DeleteIcon = ({ onClick }) => (
    <DeleteIconWrapper onClick={onClick}>
        <Icon type="close" />
    </DeleteIconWrapper>
);

const DocumentUploadSelector = styled.div`
    border: 1px solid #d9d9d9;
    background: #e7e7e7;

    width: 140px;
    height: 110px;

    margin-right: 20px;

    font-size: 20px;
    color: #303549;
    border-radius: 2px;
    cursor: pointer;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #ededed;
    }
`;

DocumentUploadSelector.Label = styled.span`
    font-weight: bold;
    margin-left: 8px;
    font-style: italic;
`;

const DocumentPreview = styled.div`
    display: flex;
    align-items: center;

    overflow: hidden;
    height: 100%;
`;

const DocumentImagePreview = styled.img`
    max-width: 100%;
`;

class SelectDocument extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedURL: null,
        };
    }

    render() {
        const {
            document: { side, url },
            onClick,
            onDeleteDocument,
        } = this.props;

        return (
            <DocumentUploadSelector onClick={onClick}>
                {url ? (
                    <DocumentPreview>
                        <DeleteIcon onClick={onDeleteDocument} />
                        <DocumentImagePreview src={url} />
                    </DocumentPreview>
                ) : (
                    <DocumentPreview>
                        <Icon type="picture" />
                        {side && (
                            <DocumentUploadSelector.Label>
                                {side}
                            </DocumentUploadSelector.Label>
                        )}
                    </DocumentPreview>
                )}
            </DocumentUploadSelector>
        );
    }
}

const DocumentSelect = props => {
    const { onDocumentUpload, uploadPolicySignature, isLoading } = props;

    return isLoading ? (
        <SelectDocument {...props} />
    ) : (
        <ReactFilestack
            apikey={secureFilestackKey}
            security={{
                policy: uploadPolicySignature.policy,
                signature: uploadPolicySignature.signature,
            }}
            options={{
                accept: ['image/*'],
                imageMin: [300, 300],
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
            onSuccess={onDocumentUpload}
            render={({ onPick }) => (
                <SelectDocument {...props} onClick={onPick} />
            )}
        />
    );
};

export default DocumentSelect;
