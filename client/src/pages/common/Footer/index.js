import React from 'react';
import _get from 'lodash/get';

import { Text, Flex, Link, Icon, Container } from '../../../components';

const Footer = () => {
    const pathname = _get(window, 'location.pathname');
    const shouldShowFooter =
        !pathname.startsWith('/host-onboarding') &&
        !pathname.includes('search');
    if (!shouldShowFooter) return null;

    return (
        <Flex
            is="footer"
            width={1}
            height={['auto', '', 345]}
            borderTop={window.location.pathname === '/' ? '' : '1px solid'}
            borderColor={'divider.gray'}
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
                display={['block', '', 'flex']}
                justifyContent="space-between"
                alignItems="center"
            >
                <Flex
                    flexDirection="column"
                    width={['auto', '', '70%']}
                    my={[10, '', 100]}
                >
                    <Text
                        color="text.black50"
                        fontSize={[1, '', 4]}
                        mb={[10, '', 36]}
                        fontWeight="bold"
                    >
                        LET&#39;S CONNECT
                    </Text>
                    <Text color="text.black" fontSize={[0, '', 1]}>
                        Laguro is here to provide support and answers for any
                        questions you may have. Send us your inquiries through
                        our chat box or to{' '}
                        <a href="mailto:support@laguro.com">
                            support@laguro.com
                        </a>
                        , and we will be in touch with lightning speed!
                    </Text>
                </Flex>

                <Flex
                    mt={[42, '', 30]}
                    mb={[20, '', 0]}
                    justifyContent={['center', '', 'flex-end']}
                >
                    <Link
                        isExternal
                        mr={25}
                        to={'https://www.facebook.com/LaguroDental/'}
                        target="_blank"
                    >
                        <Icon
                            color="icon.black"
                            fontSize="25px"
                            type="facebook"
                        />
                    </Link>
                    <Link
                        isExternal
                        mr={25}
                        to={'https://twitter.com/LaguroDental'}
                        target="_blank"
                    >
                        <Icon
                            color="icon.black"
                            fontSize="25px"
                            type="twitter"
                        />
                    </Link>
                    <Link
                        isExternal
                        mr={25}
                        to={'https://www.instagram.com/lagurodental/'}
                        target="_blank"
                    >
                        <Icon
                            color="icon.black"
                            fontSize="25px"
                            type="instagram"
                        />
                    </Link>
                    <Link
                        isExternal
                        to={'https://www.linkedin.com/company/lagurodental/'}
                        target="_blank"
                    >
                        <Icon
                            color="icon.black"
                            fontSize="25px"
                            type="linkedin"
                        />
                    </Link>
                </Flex>
            </Container>

            <Container
                display="flex"
                height={['auto', '', 64]}
                borderTop="1px solid"
                borderColor="divider.gray"
                justifyContent="space-between"
                alignItems="center"
                flexDirection={['column', '', 'row']}
                py={[20, '', 0]}
            >
                <Flex alignItems="center">
                    <Icon
                        width={20}
                        height={20}
                        mr={8}
                        type="locationPin"
                        alt="logo"
                    />
                    <Text fontSize={[0, '', 1]}>© 2018&nbsp;</Text>
                    <Text fontSize={[0, '', 1]} fontWeight="bold">
                        laguro.
                    </Text>
                    <Text fontSize={[0, '', 1]}>
                        &nbsp; all rights reserved.
                    </Text>
                </Flex>
                <Flex mt={[20, '', 0]}>
                    <Link ml={[0, '', 50]} to={'/terms'}>
                        <Text fontSize={[0, '', 1]} mb={2} color="black">
                            terms
                        </Text>
                    </Link>
                    <Link ml={50} to={'/privacy'}>
                        <Text fontSize={[0, '', 1]} mb={2} color="black">
                            privacy
                        </Text>
                    </Link>
                </Flex>
            </Container>
        </Flex>
    );
};

export default Footer;
