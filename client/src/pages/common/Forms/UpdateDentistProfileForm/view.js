import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import {
    Form,
    Box,
    Alert,
    TextArea,
    Select,
    Text,
    Radio,
    Checkbox,
} from '../../../../components';

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const StyledCheckboxGroup = styled(CheckboxGroup)`
    && {
        display: grid;
        grid-row-gap: 6px;
        .ant-checkbox-inner {
            border-color: ${props => props.theme.colors.divider.blue};
        }

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            grid-template-columns: 1fr 1fr 1fr;
            grid-row-gap: 8px;
        }
    }
`;

const PROCEDURE_GROUP_LIST = [
    'Adjunctive General',
    'Diagnostic',
    'Preventative',
    'Restorative',
    'Oral Surgery',
    'Maxillofacial Prosthetics',
    'Prosthetics',
    'Orthodontics',
    'Periodontics',
    'Prosthodontics',
    'Endodontics',
    'Implantology',
];

const { FormItem, SubmitButton } = Form;
const { Option } = Select;

const StyledFormItem = styled(FormItem)`
    && {
        label:after {
            margin: 0;
        }
    }
`;

const StyledForm = styled.div`
    && .ant-btn-ghost {
        background: ${props => props.theme.colors.button.ghost};
    }

    && .form-item-custom-name {
        display: flex;

        .ant-form-item-label {
            margin: 0 15px 0 0;
            padding: 0;
            width: 225px;

            label {
                line-height: 50px;
            }
        }

        .ant-form-item-control-wrapper {
            width: 100%;
        }
    }
`;

const SPECIALTIES = [
    'General Dentist',
    'Endodontics',
    'Oral Surgery',
    'Orthodontics',
    'Pedodontics',
    'Periodontics',
    'Prosthodontics',
];

const SpecialtyOptions = SPECIALTIES.map(s => <Option value={s}>{s}</Option>);
const DEFAULT_FIRST_APPOINTMENT_DURATION = '30min';

const UpdateDentistProfileForm = props => {
    const {
        data,
        error,
        isUpdated,
        onSuccess,
        procedures,
        isSubmitting,
    } = props;

    const options = PROCEDURE_GROUP_LIST.map(p => ({
        label: p,
        value: p,
    }));

    let firstAppointmentDuration = DEFAULT_FIRST_APPOINTMENT_DURATION;
    if (data.firstAppointmentDuration === 30) {
        firstAppointmentDuration = '30min';
    } else if (data.firstAppointmentDuration === 60) {
        firstAppointmentDuration = '1hr';
    }

    return (
        <StyledForm>
            <Box mt={[18, '', 0]}>
                {(error || isUpdated) && (
                    <Box mb={20}>
                        <Alert
                            showIcon
                            message={error ? 'Error' : 'Success'}
                            description={
                                error || 'Dentist profile successfully updated!'
                            }
                            type={error ? 'error' : 'success'}
                        />
                    </Box>
                )}

                <Form onSuccess={onSuccess} debounce="false">
                    <FormItem
                        name="specialty"
                        label="Title"
                        initialValue={data.specialty || 'General Dentist'}
                        mb={[18, '', 32]}
                        height={50}
                        input={<Select>{SpecialtyOptions}</Select>}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please select your title...',
                            },
                        ]}
                    />

                    <FormItem
                        name="bio"
                        label="About you"
                        initialValue={data.bio}
                        mb={[18, '', 32]}
                        height={200}
                        tooltip={`Laguro believes in establishing great connections and developing fundamental relationships. Use this space to introduce yourself to your prospective patients and other dentists.

Tell them about your professional background: Where did you obtain your credentials? When/where did you start your practice?

Tell them about you: Where are you currently practicing? What kind of procedures do you offer? What do you like to do on your spare time?`}
                        input={<TextArea p={11} />}
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please write something about you...',
                            },
                        ]}
                    />

                    <StyledFormItem
                        name="firstAppointmentDuration"
                        label={
                            <span>
                                <Text>Default Appointment Time Selection</Text>
                                <Text fontSize={[0, '', 1]} color="text.gray">
                                    This selection is for your patients to
                                    choose their desired time increments when
                                    they book their appointment
                                </Text>
                            </span>
                        }
                        initialValue={firstAppointmentDuration || '30min'}
                        mb={[18, '', 32]}
                        input={
                            <RadioGroup buttonStyle="solid">
                                <RadioButton
                                    fontSize={[0, '', 3]}
                                    width={135}
                                    height={50}
                                    value="30min"
                                >
                                    30 mins
                                </RadioButton>
                                <RadioButton
                                    fontSize={[0, '', 3]}
                                    width={135}
                                    height={50}
                                    value="1hr"
                                >
                                    1 hour
                                </RadioButton>
                            </RadioGroup>
                        }
                    />
                    <FormItem
                        name="procedures"
                        label="Which of the following describe your procedures?"
                        type="array"
                        initialValue={
                            !_isEmpty(procedures)
                                ? procedures.map(p => p.group)
                                : []
                        }
                        mb={[18, '', 32]}
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please select at least one description for your procedures...',
                            },
                        ]}
                        input={<StyledCheckboxGroup options={options} />}
                    />

                    <SubmitButton
                        px={14}
                        mb={[18, '', 0]}
                        buttonText="Save changes"
                        fontSize={[1, '', 3]}
                        textAlign="left"
                        width="100%"
                        height={60}
                        loading={isSubmitting}
                    />
                </Form>
            </Box>
        </StyledForm>
    );
};

UpdateDentistProfileForm.defaultProps = {
    onSuccess: () => {},
    isSubmitting: false,
};

UpdateDentistProfileForm.propTypes = {
    data: PropTypes.shape({
        specialty: PropTypes.string,
        bio: PropTypes.string,
    }).isRequired,
    error: PropTypes.string,
    isUpdated: PropTypes.bool,
    onSuccess: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool,
};

export default UpdateDentistProfileForm;
