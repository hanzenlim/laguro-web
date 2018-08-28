import React from 'react';
import { Modal, Button, Box, Flex, Text, Link } from '..';
import LocalLoginForm from '../Form/LocalLoginForm';

const LoginModal = ({ login, visible, closeModal }) => (
    <Modal onCancel={closeModal} destroyOnClose={true} visible={visible}>
        <Flex
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
        >
            <Text fontWeight="bold">sign in</Text>
            <Flex width={1} my={20} justifyContent="space-around">
                <Flex
                    width={210}
                    flexDirection="column"
                    justifyContent="center"
                >
                    <Button
                        bg="button.facebookBlue"
                        height={50}
                        borderRadius={7}
                        mb={30}
                        type="default"
                        block
                        icon="facebook"
                        fontSize={1}
                    >
                        Login with Facebook
                    </Button>
                    <Button
                        bg="button.googleBlue"
                        height={50}
                        borderRadius="7px"
                        type="default"
                        block
                        icon="google"
                        fontSize={1}
                    >
                        Login with Google
                    </Button>
                </Flex>
                <Flex
                    border={'1px solid'}
                    borderColor="divider.gray"
                    width={0}
                    flexDirection="column"
                    justifyContent="center"
                    mx={40}
                >
                    <Flex
                        border={'1px solid'}
                        borderColor="divider.gray"
                        borderRadius={25}
                        height={50}
                        width={50}
                        ml={-25}
                        bg="background.white"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text fontWeight="bold">or</Text>
                    </Flex>
                </Flex>
                <Box width={210}>
                    <LocalLoginForm onSuccess={login} />
                </Box>
            </Flex>
            <Flex>
                <Link to={'#'} width={120}>
                    <Text
                        color="text.green"
                        textAlign="right"
                        fontWeight="bold"
                    >
                        register now
                    </Text>
                </Link>
                <Text color="text.black">&nbsp;|&nbsp;</Text>
                <Link to={'#'} width={120}>
                    <Text color="text.black" fontWeight="bold">
                        forgot password?
                    </Text>
                </Link>
            </Flex>
        </Flex>
    </Modal>
);

export default LoginModal;
