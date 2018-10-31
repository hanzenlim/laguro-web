import React, { Fragment } from 'react';
import styled from 'styled-components';
import {
    Box,
    Button,
    Container,
    Flex,
    Icon,
    Link,
    Responsive,
    Text,
} from '../../components';
import { withScreenSizes } from '../../components/Responsive';
import aboutBannerImage from '../../images/about-page-banner.jpeg';

const { TabletMobile, Desktop } = Responsive;

const Pattern = styled(Box)`
    ${props =>
        props.patternorder && `transform: rotate(${props.patternorder}deg);`};
`;

const StyledBox = styled(Box)`
    overflow: hidden;
`;

const StyledBanner = styled(Box)`
    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.64);
    }
`;

const iframeHeightMap = {
    mobileOnly: '300px',
    tabletOnly: '450px',
    desktopOnly: '586px',
};

const AboutPage = props => {
    const { tabletOnly, desktopOnly } = props;

    let iframeHeight = iframeHeightMap.mobileOnly;
    if (tabletOnly) iframeHeight = iframeHeightMap.tabletOnly;
    else if (desktopOnly) iframeHeight = iframeHeightMap.desktopOnly;

    return (
        <TabletMobile>
            {isTabletMobile => (
                <Fragment>
                    <StyledBanner
                        position="relative"
                        height={[186, '', 586]}
                        background={`url(${aboutBannerImage})`}
                        backgroundRepeat="no-repeat"
                        backgroundPosition="center"
                        backgroundSize={isTabletMobile ? '600px' : 'cover'}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            height="100%"
                            position="relative"
                            zIndex={1}
                        >
                            <Text
                                color="text.white"
                                fontWeight="bold"
                                fontSize={[20, '', 50]}
                                width={720}
                                textAlign="center"
                            >
                                Welcome to the
                                <br />
                                new generation of dentistry.
                            </Text>
                        </Flex>
                    </StyledBanner>
                    <StyledBox>
                        <Container>
                            <Box pt={[62, '', 154]} maxWidth={1044} mx="auto">
                                <Box mb={[26, '', 50]} position="relative">
                                    <Box
                                        position="relative"
                                        zIndex={1}
                                        lineHeight={['26px', '', '50px']}
                                    >
                                        <Text
                                            fontSize={[20, '', 36]}
                                            fontWeight="bold"
                                            color="text.blue"
                                        >
                                            Our Mission –
                                        </Text>
                                        <Text
                                            fontSize={[20, '', 36]}
                                            fontWeight="bold"
                                        >
                                            To create efficiency and
                                            transparency in the provision of
                                            dental care to patients, one office
                                            at a time.
                                        </Text>
                                    </Box>
                                    <Pattern
                                        position="absolute"
                                        patternorder={
                                            isTabletMobile ? '-45' : 145
                                        }
                                        top={[0, '', -500]}
                                        right={[170, '', -300]}
                                    >
                                        <Icon
                                            type="macaroniPattern"
                                            fontSize={[198, '', 500]}
                                            opacity={0.05}
                                        />
                                    </Pattern>
                                    <Pattern
                                        position="absolute"
                                        patternorder={isTabletMobile ? 45 : -45}
                                        top={[150, '', -300]}
                                        left={[220, '', -400]}
                                    >
                                        <Icon
                                            type="macaroniPattern"
                                            fontSize={[149, '', 800]}
                                            opacity={0.05}
                                        />
                                    </Pattern>
                                </Box>

                                <Box mb={[56, '', 58]}>
                                    <Text
                                        mb={[30, '', 70]}
                                        fontSize={[1, '', 4]}
                                        lineHeight="30px"
                                    >
                                        At Laguro, we believe that there is a
                                        better way to provide service and care
                                        in dentistry. A mre transparent, less
                                        complicated way where patients are
                                        acknowledged and practitioners are
                                        recognized. It all starts with going
                                        back to the basics. By applying the
                                        right technology, Laguro has created a
                                        platform where practitioners no longer
                                        have to worry about slow office days,
                                        filling vacant clinical spaces, and
                                        ever-growing overhead costs.
                                    </Text>
                                    <Text
                                        fontSize={[1, '', 4]}
                                        lineHeight="30px"
                                    >
                                        Started by dentists and industry
                                        experts, Laguro’s mission is to provide
                                        thoughtfully-built tools to
                                        practitioners so they in turn can
                                        provide treatment that saves their
                                        patients’ time, money, and leads to
                                        better outcomes.
                                    </Text>
                                </Box>

                                <Box>
                                    <iframe
                                        width="100%"
                                        height={iframeHeight}
                                        src="https://www.youtube.com/embed/LyhkCU9BXFQ"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                        title="Laguro"
                                    />
                                </Box>

                                <Box
                                    textAlign={['left', '', 'center']}
                                    mb={[178, '', 200]}
                                    mt={84}
                                    position="relative"
                                >
                                    <Box position="relative" zIndex={1}>
                                        <Text
                                            fontSize={[20, '', 40]}
                                            fontWeight={[
                                                'medium',
                                                '',
                                                'regular',
                                            ]}
                                            mb={[18, '', 60]}
                                        >
                                            Ready to start using Laguro?
                                        </Text>
                                        <Flex
                                            mx="auto"
                                            width={854}
                                            justifyContent="space-between"
                                            flexDirection={[
                                                'column',
                                                '',
                                                'row',
                                            ]}
                                        >
                                            <Box
                                                width="33.33%"
                                                px={[0, '', 10]}
                                            >
                                                <Link to="/host-onboarding/add-office">
                                                    <Button type="ghost">
                                                        <Box>
                                                            <Text
                                                                is="span"
                                                                color="text.blue"
                                                                fontSize={[
                                                                    2,
                                                                    '',
                                                                    4,
                                                                ]}
                                                                fontWeight={[
                                                                    'bold',
                                                                    '',
                                                                    'medium',
                                                                ]}
                                                            >
                                                                Become a Host{' '}
                                                            </Text>
                                                            <TabletMobile>
                                                                <Text
                                                                    is="span"
                                                                    color="text.blue"
                                                                    fontSize={2}
                                                                    fontFamily="ZapfDingbatsITC"
                                                                    fontWeight="bold"
                                                                >
                                                                    &#8594;
                                                                </Text>
                                                            </TabletMobile>
                                                        </Box>
                                                    </Button>
                                                </Link>
                                            </Box>
                                            <Box
                                                width="33.33%"
                                                px={[0, '', 10]}
                                            >
                                                <Link to="/office/search">
                                                    <Button type="ghost">
                                                        <Box>
                                                            <Text
                                                                is="span"
                                                                color="text.blue"
                                                                fontSize={[
                                                                    2,
                                                                    '',
                                                                    4,
                                                                ]}
                                                                fontWeight={[
                                                                    'bold',
                                                                    '',
                                                                    'medium',
                                                                ]}
                                                            >
                                                                Become a Dentist{' '}
                                                            </Text>
                                                            <TabletMobile>
                                                                <Text
                                                                    is="span"
                                                                    color="text.blue"
                                                                    fontSize={2}
                                                                    fontFamily="ZapfDingbatsITC"
                                                                    fontWeight="bold"
                                                                >
                                                                    &#8594;
                                                                </Text>
                                                            </TabletMobile>
                                                        </Box>
                                                    </Button>
                                                </Link>
                                            </Box>
                                            <Box
                                                width="33.33%"
                                                px={[0, '', 10]}
                                            >
                                                <Link to="/dentist/search">
                                                    <Button type="ghost">
                                                        <Box>
                                                            <Text
                                                                is="span"
                                                                color="text.blue"
                                                                fontSize={[
                                                                    2,
                                                                    '',
                                                                    4,
                                                                ]}
                                                                fontWeight={[
                                                                    'bold',
                                                                    '',
                                                                    'medium',
                                                                ]}
                                                            >
                                                                Schedule an
                                                                appointment{' '}
                                                            </Text>
                                                            <TabletMobile>
                                                                <Text
                                                                    is="span"
                                                                    color="text.blue"
                                                                    fontSize={2}
                                                                    fontFamily="ZapfDingbatsITC"
                                                                    fontWeight="bold"
                                                                >
                                                                    &#8594;
                                                                </Text>
                                                            </TabletMobile>
                                                        </Box>
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </Flex>
                                    </Box>
                                    <Desktop>
                                        <Pattern
                                            position="absolute"
                                            patternorder={45}
                                            top={-60}
                                            right={-200}
                                        >
                                            <Icon
                                                type="macaroniPattern"
                                                fontSize={800}
                                                opacity={0.05}
                                            />
                                        </Pattern>
                                    </Desktop>
                                </Box>
                            </Box>
                        </Container>
                    </StyledBox>
                </Fragment>
            )}
        </TabletMobile>
    );
};

export default withScreenSizes(AboutPage);
