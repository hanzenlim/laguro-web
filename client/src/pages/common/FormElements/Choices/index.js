import React from 'react';
import { Radio } from 'antd';
import { Box } from '../../../../components';
import { Onboarding } from '../../the-bright-side-components';
import styled from 'styled-components';

const StyledRadioGroup = styled(Radio.Group)`
    &&.ant-radio-group {
        width: 100%;
        margin-bottom: 15px;
    }
    && .ant-radio-button-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 46px;
    }
`;

const VALUES = [{ key: 'yes', value: 'Yes' }, { key: 'no', value: 'No' }];

const Choices = props => {
    const { form, field, values = VALUES, defaultValue = '' } = props;

    return (
        <Box>
            <StyledRadioGroup
                defaultValue={defaultValue}
                value={field.value}
                onChange={e => form.setFieldValue(field.name, e.target.value)}
            >
                {values.map(value => (
                    <Radio.Button value={value.key}>{value.value}</Radio.Button>
                ))}
            </StyledRadioGroup>
            {form.touched[field.name] && form.errors[field.name] && (
                <Onboarding.ValidationMessage text={form.errors[field.name]} />
            )}
        </Box>
    );
};

export default Choices;
