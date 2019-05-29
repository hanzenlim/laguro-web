import { Select } from '@laguro/basic-components';
import React from 'react';
import styled from 'styled-components';
import Onboarding from '../index';

export const LANGUAGES = [
    { value: 'ENGLISH', label: 'English' },
    { value: 'SPANISH', label: 'Spanish' },
    { value: 'CHINESE', label: 'Chinese' },
    { value: 'TAGALOG', label: 'Tagalog' },
    { value: 'VIETNAMESE', label: 'Vietnamese' },
    { value: 'KOREAN', label: 'Korean' },
    { value: 'ARMENIAN', label: 'Armenian' },
    { value: 'JAPANESE', label: 'Japanese' },
    { value: 'GERMAN', label: 'German' },
    { value: 'PERSIAN', label: 'Persian' },
    { value: 'PORTUGUESE', label: 'Portuguese' },
    { value: 'RUSSIAN', label: 'Russian' }
];

const Option = Onboarding.SelectOption;

const StyledSelect = styled(Select)`
    && .ant-select-selection--multiple {
        height: fit-content;
        padding: 8px 4px;
    }

    && .ant-select-selection__rendered {
        margin-bottom: 0;
        width: 100%;
    }

    && ul > li.ant-select-selection__choice {
        width: 92px;
        height: 35px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(207, 218, 235, 0.25);
        background-color: #f5f5f5;
        line-height: 32px;
        margin-top: 0;
    }

    && ul > li.ant-select-selection__choice:nth-child(n + 7) {
        margin-top: 4px;
    }
`;

const SelectLanguageView = ({ onSelect, value }) => {
    return (
        <StyledSelect
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select languages"
            value={value}
            onChange={onSelect}
        >
            {LANGUAGES.map(item => (
                <Option key={item.value}>{item.label}</Option>
            ))}
        </StyledSelect>
    );
};

export default SelectLanguageView;
