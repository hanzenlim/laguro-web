import React from 'react';

import { Text, Flex, Link, Icon, Container } from '../../../components';

const Footer = () => (
    <Flex
        is="footer"
        width={1}
        height={345}
        borderTop="1px solid"
        borderColor={
            window.location.pathname === '/'
                ? 'divider.transparent'
                : 'divider.gray'
        }
        bg={
            window.location.pathname === '/'
                ? 'background.lightBlue'
                : 'background.white'
        }
        flex="0 0 auto"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
    >
        <Container
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex flexDirection="column" width={900} my={100}>
                <Text color="text.black50" fontSize={4} mb={36}>
                    LET'S CONNECT
                </Text>
                <Text color="text.black" fontSize={4}>
                    Laguro is here to provide support and answers for any
                    questions you may have. Send us your inquiries through our
                    chat box or to support@laguro.com, and we will be in touch
                    with lightning speed!
                </Text>
            </Flex>

            <Flex alignSelf="center">
                <Link
                    mr={25}
                    to={'https://www.facebook.com/LaguroDental/'}
                    target="_blank"
                >
                    <Icon color="icon.black" fontSize={5} type="facebook" />
                </Link>
                <Link
                    mr={25}
                    to={'https://twitter.com/LaguroDental'}
                    target="_blank"
                >
                    <Icon color="icon.black" fontSize={5} type="twitter" />
                </Link>
                <Link
                    mr={25}
                    to={'https://www.instagram.com/lagurodental/'}
                    target="_blank"
                >
                    <Icon color="icon.black" fontSize={5} type="instagram" />
                </Link>
                <Link
                    to={'https://www.linkedin.com/company/lagurodental/'}
                    target="_blank"
                >
                    <Icon color="icon.black" fontSize={5} type="linkedin" />
                </Link>
            </Flex>
        </Container>

        <Container
            display="flex"
            height={64}
            borderTop="1px solid"
            borderColor="divider.gray"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex alignItems="center">
                <Icon
                    width={20}
                    height={20}
                    mr={8}
                    type="locationPin"
                    alt="logo"
                />
                <Text>© 2018&nbsp;</Text>
                <Text fontWeight="bold">laguro.</Text>
                <Text>&nbsp; all rights reserved.</Text>
            </Flex>
            <Flex>
                <Link ml={50} to={'/terms'}>
                    <Text fontSize={1} mb={2} color="black">
                        terms
                    </Text>
                </Link>
                <Link ml={50} to={'/privacy'}>
                    <Text fontSize={1} mb={2} color="black">
                        privacy
                    </Text>
                </Link>
            </Flex>
        </Container>
    </Flex>
);

export default Footer;
