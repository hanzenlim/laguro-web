import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    Form,
    Box,
    Text,
    Alert,
    TextArea,
    Select,
    Flex,
    Icon,
    Button,
} from '../../../../components';
import ProcedureFilter from './ProcedureFilter';

const { FormItem, SubmitButton } = Form;
const { Option } = Select;

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

const StyledButton = styled(Button)`
    && {
        border-width: 0;
        border-radius: 2px;
    }
`;

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const SPECIALTIES = [
    'General Dentist',
    'Endodontics',
    'Oral',
    'Orthodontics',
    'Pedodontics',
    'Periodontics',
    'Prosthodontics',
    'Surgery',
];

const SpecialtyOptions = SPECIALTIES.map(s => <Option value={s}>{s}</Option>);

const ProcedureTag = ({ procedure, closeFunction, index }) => (
    <Button type="ghost" mr={20}>
        <Box
            px={24}
            py={10}
            bg={TAG_COLORS[index % 4]}
            borderRadius="25px"
            mr="6px"
            mb="6px"
        >
            <Text
                textTransform="lowercase"
                color="text.white"
                lineHeight="22px"
                fontSize={1}
                letterSpacing="-0.4px"
            >
                {procedure.group}
            </Text>
            <Box
                position="absolute"
                top="-3px"
                right="-3px"
                bg="background.gray"
                borderRadius="25px"
                width="23.2px"
                height="23.2px"
                onClick={event => closeFunction(event, procedure.group)}
                code={procedure.group}
            >
                x
            </Box>
        </Box>
    </Button>
);

const UpdateDentitstProfileForm = props => {
    const {
        data,
        error,
        isUpdated,
        loading,
        onSuccess,
        addProcedureTag,
        removeProcedureTag,
        procedures,
    } = props;

    return (
        <StyledForm>
            <Box>
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

                <Form layout="vertical" onSuccess={onSuccess}>
                    <FormItem
                        name="specialty"
                        label="Title"
                        initialValue={data.specialty || 'general_dentist'}
                        mb={32}
                        height={50}
                        input={<Select>{SpecialtyOptions}</Select>}
                        rules={[
                            {
                                required: true,
                                message: 'Please select your title...',
                            },
                        ]}
                    />
                    <FormItem
                        name="bio"
                        label="About you"
                        initialValue={data.bio}
                        mb={32}
                        height={200}
                        input={<TextArea />}
                        rules={[
                            {
                                required: true,
                                message: 'Please write something about you...',
                            },
                        ]}
                    />
                    <Flex alignItems="center" mb={20}>
                        <ProcedureFilter
                            height={50}
                            handleSuggestionSelect={addProcedureTag}
                        />
                        <StyledButton
                            height="50px"
                            width={'60px'}
                            type="default"
                            bg="background.blue"
                            pl={20}
                            ml={10}
                        >
                            <Flex alignItems="center" justifyContent={'center'}>
                                <Icon
                                    fontSize={3}
                                    style={{ fontWeight: 'bold' }}
                                    color="white"
                                    type="search"
                                    mr={15}
                                />
                            </Flex>
                        </StyledButton>
                    </Flex>

                    <Flex alignItems="left" mb={20} flexWrap="wrap">
                        {Object.keys(procedures).map((key, index) => (
                            <ProcedureTag
                                procedure={procedures[key]}
                                closeFunction={removeProcedureTag}
                                index={index}
                                key={procedures[key]}
                            />
                        ))}
                    </Flex>

                    <SubmitButton
                        px={14}
                        buttonText={
                            <Text
                                color="text.white"
                                display="inline"
                                ml={loading}
                            >
                                Save changes
                            </Text>
                        }
                        loading={loading}
                        textAlign="left"
                        width="100%"
                        height={60}
                    />
                </Form>
            </Box>
        </StyledForm>
    );
};

UpdateDentitstProfileForm.defaultProps = {
    onSuccess: () => {},
};

UpdateDentitstProfileForm.propTypes = {
    data: PropTypes.shape({
        specialty: PropTypes.string,
        bio: PropTypes.string,
    }).isRequired,
    error: PropTypes.string,
    isUpdated: PropTypes.bool,
    loading: PropTypes.bool,
    onSuccess: PropTypes.func.isRequired,
};

export default UpdateDentitstProfileForm;
