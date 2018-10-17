import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Modal, Form, Input, Flex, Box, Text, Link } from '../../../components';
import Checkmark from '../../../components/CheckMarkAnimation';

const { FormItem, SubmitButton } = Form;

const PreSubmitContent = ({ handleSubmit, openLoginModal, isSubmitting }) => (
    <Fragment>
        <Text fontSize={4} mt={10} mb={40}>
            enter the email address associated with your account and we will
            send you a password reset link.
        </Text>

        <Form onSuccess={handleSubmit} debounce="false">
            <FormItem
                name="email"
                label="your email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    {
                        type: 'email',
                        message: 'Please input a valid email!',
                    },
                ]}
                validateTrigger="onBlur"
                input={<Input type="email" />}
            />
            <SubmitButton
                px={30}
                buttonText="send link"
                loading={isSubmitting}
            />
        </Form>

        <Flex mt={10}>
            <Text color="text.black">know your password?&nbsp;</Text>
            <Link to={'#'} onClick={openLoginModal}>
                <Text color="text.blue" fontWeight="bold">
                    login
                </Text>
            </Link>
        </Flex>
    </Fragment>
);

class ForgotPassModal extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { submitted: false };
    }

    onSuccessfulSend = () => {
        this.setState({ submitted: true });
    };

    handleSubmit = values => {
        this.props.sendPassResetLink(values, this.onSuccessfulSend);
    };

    render() {
        const {
            visible,
            openLoginModal,
            closeModal,
            isSubmitting,
        } = this.props;
        return (
            <Modal
                onCancel={closeModal}
                destroyOnClose={true}
                visible={visible}
                width={650}
                afterClose={() => this.setState({ submitted: false })}
            >
                <Flex
                    flexDirection="column"
                    justifyContent="space-around"
                    alignItems="center"
                    px={40}
                >
                    <Text fontSize={5} fontWeight="bold">
                        forgot password?
                    </Text>
                    {this.state.submitted ? (
                        <Fragment>
                            <Text fontSize={4} my={30} color="text.black50">
                                THE LINK IS ON THE WAY!
                            </Text>
                            <Box mb={40}>
                                <Checkmark />
                            </Box>
                            <Text fontSize={3} color="text.black">
                                We have sent you an email with the link to reset
                                your password.
                            </Text>
                            <Text fontSize={3} color="text.black">
                                Please check your email.
                            </Text>
                        </Fragment>
                    ) : (
                        <PreSubmitContent
                            isSubmitting={isSubmitting}
                            openLoginModal={openLoginModal}
                            handleSubmit={this.handleSubmit}
                        />
                    )}
                </Flex>
            </Modal>
        );
    }
}

ForgotPassModal.defaultProps = {
    openLoginModal: () => {},
    closeModal: () => {},
    sendPassResetLink: () => {},
    visible: false,
    isSubmitting: false,
};

ForgotPassModal.propTypes = {
    openLoginModal: PropTypes.func,
    closeModal: PropTypes.func,
    sendPassResetLink: PropTypes.func,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default ForgotPassModal;
