import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Flex, Text, Form, Input, Image } from '../../components';

import countdownPageBg from '../../images/Comingsoon_background.jpg';
import dentistImage from '../../images/dentist_illustration.svg';

const { FormItem, SubmitButton } = Form;

const StyledForm = styled.div`
    && .ant-form-item {
        display: inline-block;

        .ant-input {
            height: 60px;
            width: 535px;
            background: ${props => props.theme.colors.background.transparent};
            color: ${props => props.theme.colors.text.white};
            font-size: 25px;
            border-color: ${props => props.theme.colors.divider.white};
            padding: 5px 33px;
        }
    }
`;

const CountdownPage = props => {
    const { days, hours, mins, secs, loading, onSuccess } = props;
    return (
        <Box
            background={`url(${countdownPageBg})`}
            backgroundRepeat="no-repeat"
            backgroundPosition="top center"
            backgroundSize="cover"
            position="fixed"
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={900}
            css="overflow: scroll;"
        >
            <Flex minHeight="100vh" alignItems="center" justifyContent="center">
                <Box
                    width={900}
                    maxWidth="100%"
                    textAlign="center"
                    px={15}
                    py={40}
                >
                    <Text
                        color="text.white"
                        fontWeight="medium"
                        fontSize={90}
                        mb={18}
                    >
                        COMING SOON
                    </Text>
                    <Text color="text.white" fontSize={25}>
                        We’re currently cleaning the equipment and dusting the
                        chairs..
                    </Text>
                    <Text color="text.white" fontSize={25}>
                        So hang on tight!
                    </Text>
                    <Flex mt={35} mb={70} justifyContent="center">
                        <Unit value={days} unit="days" />
                        <Unit value={hours} unit="hours" />
                        <Unit value={mins} unit="mins" />
                        <Unit value={secs} unit="secs" />
                    </Flex>
                    <Text color="text.white" fontSize={25} mb={28}>
                        Sign up to be on the waitlist and receive an update when
                        we’re ready.
                    </Text>
                    <Box>
                        <StyledForm>
                            <Form layout="vertical" onSuccess={onSuccess}>
                                <FormItem
                                    name="email"
                                    input={
                                        <Input
                                            type="email"
                                            placeholder="email address"
                                        />
                                    }
                                    mr={18}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email.',
                                        },
                                    ]}
                                />
                                <SubmitButton
                                    buttonText="Submit"
                                    height="60px"
                                    minWidth="125px"
                                    loading={loading}
                                />
                            </Form>
                        </StyledForm>
                    </Box>
                    <Box width={400} mx="auto" mt={85}>
                        <Image
                            src={dentistImage}
                            alt="dentist image"
                            width="100%"
                        />
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

const Unit = props => {
    const { value, unit } = props;
    return (
        <Flex
            mx={12}
            border="1px solid"
            borderColor="divider.white"
            borderRadius="4px"
            width={125}
            height={155}
            alignItems="center"
            justify-content="center"
            flexDirection="column"
            bg="rgba(255, 255, 255, 0.2)"
        >
            <Text
                color="text.white"
                fontWeight="medium"
                mt="10px"
                fontSize={60}
                height="80px"
            >
                {value}
            </Text>
            <Text mb="10px" color="text.blue" fontSize={25}>
                {unit}
            </Text>
        </Flex>
    );
};

Unit.propTypes = {
    value: PropTypes.string,
    unit: PropTypes.string,
};

CountdownPage.propTypes = {
    days: PropTypes.string,
    hours: PropTypes.string,
    mins: PropTypes.string,
    secs: PropTypes.string,
    onSuccess: PropTypes.func,
    loading: PropTypes.bool,
};

export default CountdownPage;
