import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import { Form } from '../../../../../components';
import DocumentUploaderInput from './DocumentUploaderInput';

const { FormItem } = Form;

export const PreText = styled.div`
    font-size: 20px;
    color: #303549;
    margin-bottom: 40px;
`;

export const SingleDocumentSelector = props => {
    const validator = (_rule, value, callback) => {
        if (
            value.filter(document => Object.keys(document).includes('url'))
                .length < 1
        ) {
            return callback('Document must be uploaded');
        }

        return callback();
    };

    const initialValue = isEmpty(props.initialValue)
        ? [{}]
        : [props.initialValue[0]];

    return (
        <FormItem
            {...props}
            input={<DocumentUploaderInput {...props} />}
            rules={[
                {
                    validator,
                },
            ]}
            initialValue={initialValue}
            validateTrigger={null}
        />
    );
};

export const FrontBackDocumentsSelector = props => {
    const validator = (_rule, value, callback) => {
        const _goodDocuments = value.filter(
            document =>
                ['front', 'back'].includes(document.side) && document.url
        );

        if (_goodDocuments.length >= 2) {
            return callback();
        }

        return callback('Front and Back documents must be uploaded');
    };

    const _initialValue = [{ side: 'front' }, { side: 'back' }];
    const initialValue = _initialValue.map(fv =>
        Object.assign(
            fv,
            get(props, 'initialValue', []).find(tv => tv.side === fv.side)
        )
    );

    return (
        <FormItem
            {...props}
            input={<DocumentUploaderInput {...props} />}
            rules={[
                {
                    validator,
                },
            ]}
            validateTrigger={null}
            initialValue={initialValue}
        />
    );
};
