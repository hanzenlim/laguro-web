import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import history from '../~/util/history';
import {
    Box,
    Button,
    Flex,
    Text,
    Link,
    Form,
    Input,
} from '~/components';
import Checkmark from '~/components/CheckMarkAnimation';
import { withScreenSizes } from '~/components/Responsive';

const { FormItem, SubmitButton } = Form;

const PreSubmitContent = ({
    handleSubmit,
    openLoginModal,
    isSubmitting,
    search,
}) => (
    <Fragment>
        <Text fontSize={[1, '', 4]} mt={[0, '', 10]} mb={[30, '', 40]}>
            enter the email address associated with your account and we will
            send you a password reset link.
        </Text>

        <Form onSuccess={handleSubmit} debounce="false">
            <FormItem
                name="email"
                label="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    {
                        type: 'email',
                        message: 'Please input a valid email!',
                    },
                ]}
                input={<Input type="email" />}
            />
            <SubmitButton
                px={30}
                width={['100%', '', 'auto']}
                buttonText="send link"
                loading={isSubmitting}
            />
        </Form>

        <Flex mt={[15, '', 10]}>
            <Text fontSize={[0, '', 1]} color="text.black">
                know your password?&nbsp;
            </Text>
            <Link to={`/login${search}`} onClick={openLoginModal}>
                <Text fontSize={[0, '', 1]} color="text.blue" fontWeight="bold">
                    login
                </Text>
            </Link>
        </Flex>
    </Fragment>
);

class ForgotPassword extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { submitted: false };
        const { location } = props;
        this.search = _get(location, 'search');
    }

    onSuccessfulSend = () => {
        this.setState({ submitted: true });
    };

    handleSubmit = values => {
        this.props.sendPassResetLink(values, this.onSuccessfulSend);
    };

    backToLogin = () => {
        history.push(`/login${this.search}`);
    };

    render() {
        const { openLoginModal, isSubmitting, tabletMobileOnly } = this.props;

        return (
            <Flex
                flexDirection="column"
                justifyContent="space-around"
                alignItems="center"
                px={40}
                mt={[68, '', 0]}
            >
                <Text fontSize={[3, '', 5]} mb={[30, '', 0]} fontWeight="bold">
                    forgot password?
                </Text>
                {this.state.submitted ? (
                    <Fragment>
                        <Text
                            fontSize={[3, '', 4]}
                            mt={[0, '', 30]}
                            mb={[38, '', 30]}
                            color="text.black50"
                        >
                            THE LINK IS ON THE WAY!
                        </Text>
                        <Box mb={[30, '', 40]}>
                            <Checkmark />
                        </Box>
                        <Text
                            fontSize={[1, '', 3]}
                            mb={[104, '', 0]}
                            color="text.black"
                            textAlign="center"
                        >
                            We have sent you an email with the link to reset
                            your password. Please check your email.
                        </Text>
                        {tabletMobileOnly && (
                            <Button
                                width="100%"
                                mb={27}
                                onClick={this.backToLogin}
                            >
                                Back to Log in
                            </Button>
                        )}
                    </Fragment>
                ) : (
                    <PreSubmitContent
                        isSubmitting={isSubmitting}
                        search={this.search}
                        openLoginModal={openLoginModal}
                        handleSubmit={this.handleSubmit}
                    />
                )}
            </Flex>
        );
    }
}

ForgotPassword.defaultProps = {
    openLoginModal: () => {},
    closeModal: () => {},
    sendPassResetLink: () => {},
    visible: false,
    isSubmitting: false,
};

ForgotPassword.propTypes = {
    openLoginModal: PropTypes.func,
    closeModal: PropTypes.func,
    sendPassResetLink: PropTypes.func,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default withScreenSizes(ForgotPassword);
