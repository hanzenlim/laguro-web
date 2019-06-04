import React from 'react';
import { Field } from 'formik';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

import { Box, Input as AntdInput } from '../../../components';

const { Option } = AntdSelect;

const Input = styled(AntdInput)`
    &.ant-input {
        text-align: center;
        height: 46px;
        font-size: ${props => props.theme.fontSizes[3]};
        border-radius: 32px;
    }
`;

const Select = styled(AntdSelect)`
    & .ant-select-selection {
        height: 46px;
        border-radius: 32px;
    }

    & .ant-select-selection__rendered {
        height: 46px;
    }

    & .ant-select-selection__placeholder {
        text-align: center;
        font-size: ${props => props.theme.fontSizes[3]};
        position: unset;
        margin-top: 0;
        height: 46px;
        line-height: 46px;
    }

    & .ant-select-selection-selected-value {
        float: none;
        padding-right: 0;
        font-size: 18px;
        line-height: 46px;
    }

    .ant-select-arrow {
        right: 30px;
    }
`;

const AskHolderInfo = () => (
    <Box mt={38} textAlign="center">
        <Field
            name="holderFirstName"
            render={({ field }) => (
                <Box mb={10} mx="auto" maxWidth={320}>
                    <Input type="text" placeholder="First Name" {...field} />
                </Box>
            )}
        />
        <Field
            name="holderLastName"
            render={({ field }) => (
                <Box mb={10} mx="auto" maxWidth={320}>
                    <Input type="text" placeholder="Last Name" {...field} />
                </Box>
            )}
        />

        <Field
            name="holderRelationship"
            render={({ form }) => (
                <Box id="holder-relationship" mx="auto" maxWidth={320}>
                    <Select
                        {...(form.values.holderRelationship
                            ? { value: form.values.holderRelationship }
                            : {})}
                        placeholder="Select relationship"
                        onChange={value =>
                            form.setFieldValue('holderRelationship', value)
                        }
                        getPopupContainer={() =>
                            document.getElementById('holder-relationship')
                        }
                    >
                        <Option value="Spouse">Spouse</Option>
                        <Option value="Child">Child</Option>
                        <Option value="Other Dependent">Other Dependent</Option>
                    </Select>
                </Box>
            )}
        />
    </Box>
);

export default AskHolderInfo;
