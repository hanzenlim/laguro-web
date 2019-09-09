import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { withRouter } from 'react-router-dom';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';
import queryString from 'query-string';

import { Box, Button } from '../../../components';
import { Select } from './CustomInputs';

import { allInsuranceList, supportedInsuranceList } from '../../../staticData';
import { FORM_LOADERS } from '.';

const { Option, OptGroup } = AntdSelect;

const StyledButton = styled(Button)`
    &&.ant-btn {
        border-radius: 32px;
    }
`;

const InsuranceProvider = ({ setFormStep, history }) => (
    <Box mt={38} textAlign="center">
        <Field
            name="insuranceProvider"
            render={({ form }) => (
                <Fragment>
                    <Box
                        id="insurance-provider-input"
                        mx="auto"
                        mb={20}
                        maxWidth={320}
                    >
                        <Select
                            placeholder="Select your insurance"
                            onChange={value =>
                                form.setFieldValue('insuranceProvider', value)
                            }
                            getPopupContainer={() =>
                                document.getElementById(
                                    'insurance-provider-input'
                                )
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
                            <OptGroup label="Popular">
                                {supportedInsuranceList.map(insurance => (
                                    <Option
                                        key={insurance.id}
                                        value={insurance.id}
                                    >
                                        {insurance.name}
                                    </Option>
                                ))}
                            </OptGroup>
                            <OptGroup label="All insurance">
                                {allInsuranceList
                                    .filter(insurance => {
                                        const supportedInsuranceIdList = supportedInsuranceList.map(
                                            i => i.id
                                        );

                                        return !supportedInsuranceIdList.includes(
                                            insurance.id
                                        );
                                    })
                                    .map(insurance => (
                                        <Option
                                            key={insurance.id}
                                            value={insurance.id}
                                        >
                                            {insurance.name}
                                        </Option>
                                    ))}
                            </OptGroup>
                        </Select>
                    </Box>
                    <Box width={320} maxWidth="100%" mb={15} mx="auto">
                        <Field
                            render={() => (
                                <StyledButton
                                    type="primary"
                                    width="100%"
                                    height={60}
                                    fontWeight="bold"
                                    fontSize={1}
                                    onClick={() => {
                                        setFormStep(
                                            FORM_LOADERS.MATCH_DENTIST_AVAILABLE
                                        );
                                        setTimeout(() => {
                                            const searchParams = queryString.stringify(
                                                {
                                                    bundleGroup:
                                                        form.values.bundleGroup,
                                                    dayAvailability:
                                                        form.values
                                                            .dayAvailability,
                                                    timeAvailability:
                                                        form.values
                                                            .timeAvailability,
                                                    age: form.values.age,
                                                    insuranceProvider:
                                                        form.values
                                                            .insuranceProvider,
                                                }
                                            );

                                            if (window && window.localStorage) {
                                                window.localStorage.setItem(
                                                    'hasFinishedSurvey',
                                                    true
                                                );
                                            }

                                            history.push(
                                                `/dentist/search?${searchParams}`
                                            );
                                        }, 3000);
                                    }}
                                >
                                    Find my matches
                                </StyledButton>
                            )}
                        />
                    </Box>
                </Fragment>
            )}
        />
    </Box>
);

InsuranceProvider.propTypes = {
    setFormStep: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(InsuranceProvider);
