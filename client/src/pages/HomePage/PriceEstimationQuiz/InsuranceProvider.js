import React from 'react';
import { Field } from 'formik';
import { Select as AntdSelect } from 'antd';

import { Box } from '../../../components';
import { Select } from './CustomInputs';

import insuranceList from '../../common/the-bright-side-components/components/Kiosk/KioskInsurance/insuranceList';

const { Option } = AntdSelect;

const InsuranceProvider = () => (
    <Box mt={38} textAlign="center">
        <Field
            name="insuranceProvider"
            render={({ form }) => (
                <Box
                    id="insurance-provider-input"
                    mx="auto"
                    mb={10}
                    maxWidth={320}
                >
                    <Select
                        placeholder="Select your insurance"
                        showSearch
                        onChange={value =>
                            form.setFieldValue('insuranceProvider', value)
                        }
                        getPopupContainer={() =>
                            document.getElementById('insurance-provider-input')
                        }
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        {...(form.values.insuranceProvider
                            ? { value: form.values.insuranceProvider }
                            : {})}
                    >
                        {insuranceList.map(insurance => (
                            <Option key={insurance.id} value={insurance.id}>
                                {insurance.name}
                            </Option>
                        ))}
                    </Select>
                </Box>
            )}
        />
    </Box>
);

export default InsuranceProvider;
