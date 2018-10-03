import styled from 'styled-components';
import { Form } from '../../../../../components';

// TODO: use components/Form
export const StyledForm = styled(Form)`
    .ant-input {
        height: 50px;
    }

    .ant-form-item {
        margin-bottom: 24px;
    }

    .ant-form-item-label {
        margin-bottom: 12px;
    }

    .ant-form-explain {
        margin-top: 2px;
    }

    .ant-form-item-label label {
        font-size: 18px;
    }

    .ant-form-item-control {
        text-align: left;

        .ant-btn {
            padding: 18px 22px;
            height: auto;

            > span {
                font-weight: bold;
            }
        }
    }
`;

export const VerificationFormContainer = styled.div`
    .ant-form {
        .ant-form-item-label {
            margin-bottom: 16px;
        }

        .ant-form-item {
            margin-bottom: 50px;
        }
    }
`;

export { default as PatientVerificationForm } from '../PatientVerificationForm';
export {
    default as ProviderVerificationForm,
} from '../ProviderVerificationForm';
export { default as HostVerificationForm } from '../HostVerificationForm';

export {
    PreText,
    FrontBackDocumentsSelector,
    SingleDocumentSelector,
} from './form';
