import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { withRouter } from 'react-router-dom';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

import { Box, Button } from '../../../components';
import { Select } from './CustomInputs';

import insuranceList from '../../common/the-bright-side-components/components/Kiosk/KioskInsurance/insuranceList';
import { FORM_LOADERS } from '.';

const { Option } = AntdSelect;

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
                            {insuranceList.map(insurance => (
                                <Option key={insurance.id} value={insurance.id}>
                                    {insurance.name}
                                </Option>
                            ))}
                        </Select>
                    </Box>
                    <Box width={320} maxWidth="100%" mb={15} mx="auto">
                        <Field
                            render={({ form }) => (
                                <StyledButton
                                    type="primary"
                                    width="100%"
                                    height={60}
                                    fontWeight="bold"
                                    fontSize={1}
                                    onClick={() => {
                                        // TODO: Add query params based on answers
                                        setFormStep(
                                            FORM_LOADERS.MATCH_DENTIST_AVAILABLE
                                        );
                                        setTimeout(() => {
                                            history.push(
                                                `/dentist/search?bundleGroup=${form.values.bundleGroup}&dayAvailability=${form.values.dayAvailability}&timeAvailability=${form.values.timeAvailability}&age=${form.values.age}&insuranceProvider=${form.values.insuranceProvider}`
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
