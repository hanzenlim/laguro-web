import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import styled from 'styled-components';

import { Box, Text, Container, Grid, Image, Flex } from '~/components';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
    & {
        .ant-tabs-ink-bar {
            background-color: ${({ theme }) => theme.colors.text.black};
        }

        .ant-tabs-tab-arrow-show:not(.ant-tabs-tab-btn-disabled) {
            color: black;
        }

        .ant-tabs-tab-prev-icon-target,
        .ant-tabs-tab-next-icon-target {
            transform: scale(1.233333) rotate(0deg);
        }
    }
`;

const tabContents = [
    {
        title: 'Price transparency',
        subtitle: 'You deserve to know how much it costs before committing.',
        description:
            'Our platform brings transparency by providing price estimates for your treatment up-front so you know how much it’ll cost before you commit. We calculate this by using a real-time price comparison database managed by Laguro Dentists.',
        videoUrl: '/static/images/price-transparency.mp4',
        isVideo: true,
    },
    {
        title: 'Best match',
        subtitle: 'Every smile is unique.',
        description:
            'Based on your dental problem, settings, and preferred language, we will curate the best appointment options for you. Our personalized appointments technology is powered by our own cutting-edge matching engine that brings you the right dentist for your specific needs.',
        imageUrl: '/static/images/personalized-appointments.png',
    },
    {
        title: 'Dental Records',
        subtitle: 'You are now in charge of your oral health records.',
        description:
            'As a Laguro Patient, you will have complete access to your oral health records, including being able to view your appointment history, detailed treatment plans and notes, payments, x-rays, and more. Your records are securely stored in compliance with HIPAA. We respect your privacy, so we promise to never share your information.',
        imageUrl: '/static/images/dental-records.png',
    },
    {
        title: 'Flexible time',
        subtitle:
            'We live busy lives, so fitting in dental appointments six months from now can be tricky.',
        description:
            'Laguro makes it super easy for you to search and review dentists, and instantly book the next available appointment. Rescheduling is not a problem; we believe this process should be fast, simple, and hassle-free.',
        videoUrl: '/static/images/flexible-time.mp4',
        isVideo: true,
    },
    {
        title: 'Dental benefits',
        subtitle:
            'Trying to understand your coverage and handling insurance claim paperwork can be a headache.',
        description:
            'Our platform provides an up-front and easy-to-understand calculation of coverage and out-of-pocket payments based on your insurance. If you want to see an out-of-network dentist, then we will help you and your dentist to file your claim.',
        imageUrl: '/static/images/dental-benefits.png',
    },
];

const FeatureTabs = () => {
    const [activeKey, setActiveKey] = useState('0');

    const onTabClick = key => setActiveKey(key);

    return (
        <Box
            id="our-features"
            pt={[66, '', 170]}
            pb={[70, '', 80]}
            bg="background.white"
            minHeight={['auto', '', 1090]}
        >
            <Container>
                <Text
                    fontSize={[28, '', 50]}
                    fontFamily="IowanOldStyle"
                    fontWeight="bold"
                    lineHeight={[1.21, '', 1]}
                    mb={[40, '', 66]}
                    width={630}
                    maxWidth="100%"
                >
                    How Laguro improves your dental experience
                </Text>

                <Box>
                    <StyledTabs
                        defaultActiveKey={activeKey}
                        tabBarGutter={0}
                        onTabClick={onTabClick}
                    >
                        {tabContents.map((content, index) => (
                            <TabPane
                                tab={
                                    <TabName
                                        name={content.title}
                                        active={index.toString() === activeKey}
                                    />
                                }
                                key={index.toString()}
                            >
                                <Box pt={[40, '', 70]}>
                                    <Grid
                                        gridTemplateColumns={[
                                            '1fr',
                                            '',
                                            '1fr 1fr',
                                        ]}
                                        gridColumnGap={40}
                                        gridRowGap={40}
                                    >
                                        <Flex alignItems="center">
                                            <Box maxWidth={518} width="100%">
                                                <Text
                                                    fontSize={[3, '', 26]}
                                                    fontFamily="IowanOldStyle"
                                                    fontWeight="bold"
                                                    mb={30}
                                                >
                                                    {content.subtitle}
                                                </Text>
                                                <Text fontSize={[1, '', 4]}>
                                                    {content.description}
                                                </Text>
                                            </Box>
                                        </Flex>

                                        <Box px={[0, '', 40]}>
                                            {content.isVideo ? (
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    style={{
                                                        maxWidth: '100%',
                                                        margin: '0 auto',
                                                    }}
                                                >
                                                    <source
                                                        src={content.videoUrl}
                                                        type="video/mp4"
                                                    />
                                                </video>
                                            ) : (
                                                <Image
                                                    src={content.imageUrl}
                                                    maxWidth="100%"
                                                    mx="auto"
                                                />
                                            )}
                                        </Box>
                                    </Grid>
                                </Box>
                            </TabPane>
                        ))}
                    </StyledTabs>
                </Box>
            </Container>
        </Box>
    );
};

const TabName = ({ name, active }) => (
    <Text fontSize={[1, '', 24]} fontWeight={active ? 'bold' : 'regular'}>
        {name}
    </Text>
);

TabName.propTypes = {
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
};

export default FeatureTabs;
