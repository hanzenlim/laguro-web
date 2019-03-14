import React from 'react';
import { Text, Container, Form, Input } from '../../../../components';
import styled from 'styled-components';

const { FormItem, SubmitButton } = Form;

const StyledForm = styled(Form)`
    && {
        margin-top: 34px;
        width: 100%;
        text-align: center;
    }

    && .ant-form-item {
        display: inline-block;

        .ant-input {
            height: 50px;
            width: 432px;
            background: white;
            color: black;
            font-size: 16px;
            padding: 15px 25px;
        }
    }
`;

const StyledSubmitButton = styled(SubmitButton)`
    && {
        border: none;
    }
`;

const NewsletterView = props => {
    return (
        <Container>
            <Text
                fontWeight="bold"
                color="text.white"
                fontSize={[3, '', 5]}
                mt="37px"
                textAlign="center"
            >
                Subscribe to our newsletter
            </Text>
            <Text
                fontWeight="300"
                color="text.white"
                fontSize={[1, '', 2]}
                mt="12px"
                textAlign="center"
            >
                Join our newsletter for latest updates and special offers.
            </Text>
            <StyledForm layout="vertical" onSuccess={props.onSuccess}>
                <FormItem
                    name="email"
                    input={
                        <Input
                            type="email"
                            required
                            placeholder="Email address"
                        />
                    }
                    mr={18}
                />
                <StyledSubmitButton
                    buttonText="Join"
                    height="50px"
                    minWidth="94px"
                />
            </StyledForm>
        </Container>
    );
};

export default NewsletterView;
