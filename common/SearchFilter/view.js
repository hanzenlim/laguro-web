import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

import { Box, Flex, Responsive, Text } from '~/components';
import { supportedInsuranceList } from '~/data';
import {
    LANGUAGE_LIST,
    DAY_AVAILABILITY_LIST,
    TIME_AVAILABILITY_LIST,
} from '~/util/dentistUtils';

const { TabletMobile } = Responsive;

const { Option } = AntdSelect;

const StyledForm = styled(Form)`
    width: 100%;
`;

const Select = styled(AntdSelect)`
    & {
        .ant-select-selection {
            height: 50px;
            border-radius: 26px;
        }

        .ant-select-selection__rendered {
            line-height: 48px;
            margin: 0 20px;
            font-size: ${({ theme }) => theme.fontSizes[1]};

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                font-size: ${props => props.theme.fontSizes[2]};
            }
        }
    }
`;

const BUNDLE_GROUP_LIST = [
    { key: 'All procedures', value: 'All procedures' },
    { key: 'FIRST_VISIT', value: 'First Visit' },
    { key: 'GENERAL', value: 'General procedures' },
    { key: 'SURGERY', value: 'Surgery' },
    { key: 'SPECIAL', value: 'Special treatment' },
];

const INSURANCE_OPTIONS = [
    {
        id: 'All insurances',
        name: 'All insurances',
    },
    ...supportedInsuranceList,
];

const SearchFilterView = ({ onSelect }) => (
    <StyledForm>
        <Flex
            width="100%"
            flexDirection={['column', '', 'row']}
            bg={['#f7f8fc', '', 'transparent']}
            p={[30, '', 0]}
        >
            <TabletMobile>
                <Text fontSize={0} mb={8}>
                    Filters
                </Text>
            </TabletMobile>
            <Box
                width={['100%', '', '190px']}
                mb={[10, '', 0]}
                mr={[0, '', 10]}
            >
                <Field
                    name="bundleGroup"
                    component={fieldProps => (
                        <Select
                            placeholder="Procedures"
                            value={fieldProps.form.values.bundleGroup}
                            onChange={value => {
                                onSelect(fieldProps.field.name, value);
                            }}
                        >
                            {BUNDLE_GROUP_LIST.map(i => (
                                <Option value={i.key} key={i}>
                                    {i.value}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
            </Box>
            <Box
                width={['100%', '', '190px']}
                mb={[10, '', 0]}
                mr={[0, '', 10]}
            >
                <Field
                    name="language"
                    component={fieldProps => (
                        <Select
                            placeholder="Languages"
                            value={fieldProps.form.values.language}
                            onChange={value => {
                                onSelect(fieldProps.field.name, value);
                            }}
                        >
                            {LANGUAGE_LIST.map(i => (
                                <Option value={i} key={i}>
                                    {i}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
            </Box>
            <Box
                width={['100%', '', '190px']}
                mb={[10, '', 0]}
                mr={[0, '', 10]}
            >
                <Field
                    name="dayAvailability"
                    component={fieldProps => (
                        <Select
                            placeholder="Day availability"
                            value={fieldProps.form.values.dayAvailability}
                            onChange={value => {
                                onSelect(fieldProps.field.name, value);
                            }}
                        >
                            {DAY_AVAILABILITY_LIST.map(i => (
                                <Option value={i} key={i}>
                                    {i}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
            </Box>
            <Box
                width={['100%', '', '190px']}
                mb={[10, '', 0]}
                mr={[0, '', 10]}
            >
                <Field
                    name="timeAvailability"
                    component={fieldProps => (
                        <Select
                            placeholder="Time availability"
                            value={fieldProps.form.values.timeAvailability}
                            onChange={value => {
                                onSelect(fieldProps.field.name, value);
                            }}
                        >
                            {TIME_AVAILABILITY_LIST.map(i => (
                                <Option value={i} key={i}>
                                    {i}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
            </Box>
            <Box
                width={['100%', '', '190px']}
                mb={[10, '', 0]}
                mr={[0, '', 10]}
            >
                <Field
                    name="insuranceProvider"
                    component={fieldProps => (
                        <Select
                            placeholder="Insurance"
                            value={
                                INSURANCE_OPTIONS.find(
                                    i =>
                                        i.id ===
                                        fieldProps.form.values.insuranceProvider
                                )
                                    ? INSURANCE_OPTIONS.find(
                                          i =>
                                              i.id ===
                                              fieldProps.form.values
                                                  .insuranceProvider
                                      ).name
                                    : fieldProps.form.values.hasFinishedSurvey
                                    ? 'All insurances'
                                    : undefined
                            }
                            onChange={value => {
                                onSelect(fieldProps.field.name, value);
                            }}
                        >
                            {INSURANCE_OPTIONS.map(i => (
                                <Option value={i.id} key={i.id}>
                                    {i.name}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
            </Box>
        </Flex>
    </StyledForm>
);

SearchFilterView.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default withFormik({
    validationSchema: Yup.object().shape({}),
    enableReinitialize: true,
    mapPropsToValues: props => {
        const { data } = props;
        return { ...data };
    },
})(SearchFilterView);
