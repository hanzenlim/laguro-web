import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import ReactFilestack from 'filestack-react';
import { secureFilestackKey } from '../../../../config/keys';
import { Text } from '../../../../components';

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

const UploadIconSvg = () => (
    <svg width="20" height="20" viewBox="0 0 158 158">
        <defs>
            <style
                dangerouslySetInnerHTML={{
                    __html: `.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:10px;`,
                }}
            />
        </defs>
        <path
            class="cls-1"
            d="M151.65,96.27v44.18a12,12,0,0,1-12,12H18a12,12,0,0,1-12-12V96.27"
        />
        <polyline class="cls-1" points="77.84 110.76 77.84 5.35 29.04 57.91" />
        <line class="cls-1" x1="77.84" y1="5.35" x2="128.65" y2="56.15" />
    </svg>
);

const UploadIcon = props => <Icon component={UploadIconSvg} {...props} />;

const DocumentUploadSelector = styled.div`
    border: 1px solid #d3d3d3;
    background: #fbfbfb;

    margin-right: 14px;

    font-size: 16px;
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

const label = styled(Text)``;

label.defaultProps = {
    fontSize: [0, '', 2],
    lineHeight: ['normal', '', '16px'],
    mt: [8, '', 6],
};

DocumentUploadSelector.Label = label;

const DocumentPreview = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    overflow: hidden;
    justify-content: center;

    width: 140px;
    height: 110px;
`;

const DocumentImagePreview = styled.img`
    max-width: 100%;
`;

class SelectDocument extends React.Component {
    render() {
        const {
            document: { side, url, signedUrl },
            onClick,
            onDeleteDocument,
        } = this.props;

        return (
            <DocumentUploadSelector
                className="documentSelect-documentUploadSelector"
                onClick={onClick}
            >
                {signedUrl || url ? (
                    <DocumentPreview className="documentSelect-documentPreview">
                        <DeleteIcon onClick={onDeleteDocument} />
                        <DocumentImagePreview src={signedUrl ? signedUrl : url} />
                    </DocumentPreview>
                ) : (
                    <DocumentPreview className="documentSelect-documentPreview">
                        <UploadIcon />
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
