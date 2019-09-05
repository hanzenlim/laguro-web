import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

import { Box, Flex, Responsive, Text } from '../../../components';
import { getInsuranceText, getInsuranceId } from '../../../util/insuranceUtil';
import { supportedInsuranceList } from '../../../staticData';
import {
    PROCEDURE_LIST,
    LANGUAGE_LIST,
    DAY_AVAILABILITY_LIST,
    TIME_AVAILABILITY_LIST,
    INSURANCE_LIST,
} from '../../../util/dentistUtils';

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

const SearchFilterView = ({ onSelect, data }) => (
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
                width={['100%', '', '167px']}
                mb={[10, '', 0]}
                mr={[0, '', 10]}
            >
                <Field
                    name="procedure"
                    component={fieldProps => (
                        <Select
                            placeholder="Procedures"
                            value={fieldProps.form.values.procedure}
                            onChange={value => {
                                onSelect(fieldProps.field.name, value);
                            }}
                        >
                            {PROCEDURE_LIST.map(i => (
                                <Option value={i} key={i}>
                                    {i}
                                </Option>
                            ))}
                        </Select>
                    )}
                />
            </Box>
            <Box
                width={['100%', '', '167px']}
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
                width={['100%', '', '171px']}
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
                width={['100%', '', '181px']}
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
                width={['100%', '', '189px']}
                mb={[10, '', 0]}
                mr={[0, '', 10]}
            >
                <Field
                    name="insuranceProvider"
                    component={fieldProps => (
                        <Select
                            placeholder="Insurance"
                            value={
                                supportedInsuranceList
                                    .map(i => i.id)
                                    .includes(
                                        fieldProps.form.values.insuranceProvider
                                    )
                                    ? getInsuranceText(
                                          fieldProps.form.values
                                              .insuranceProvider
                                      )
                                    : 'All procedures'
                            }
                            onChange={value => {
                                onSelect(fieldProps.field.name, value);
                            }}
                        >
                            {INSURANCE_LIST.map(i => (
                                <Option value={getInsuranceId(i)} key={i}>
                                    {i}
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
