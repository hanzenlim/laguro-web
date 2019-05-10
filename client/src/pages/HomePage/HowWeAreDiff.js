import React, { Fragment } from 'react';
import _range from 'lodash/range';
import _uppercase from 'lodash/upperCase';
import { Collapse } from 'antd';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { Text, Box, Flex, Grid, Responsive, Image } from '../../components';
import { SectionHeading } from './common';
import FlexibleTime from '../../components/Icon/flexible-time.svg';
import ConvenienceOfLoc from '../../components/Icon/conveniency-of-location.svg';
import PriceTransparency from '../../components/Icon/pricetransparency.svg';
import Maximize from '../../components/Icon/maximize.svg';
import Personalized from '../../components/Icon/personalize.svg';
import Ownership from '../../components/Icon/own-your-data.svg';
import { APPLE_SD_GOTHIC_NEO } from '../../components/theme';

const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)`
    &&.ant-collapse {
        background-color: transparent;
        border: none;

        .ant-collapse-item .ant-collapse-header {
            padding: 22px 25px;
            .arrow {
                transform: translateY(-50%);
                top: 50%;
                left: unset;
                right: 12px;
                line-height: 12px;
                width: 12px;
            }
        }

        .ant-collapse-content-active {
            background-color: #fbfbfb;
        }

        .ant-collapse-content-box {
            padding: 22px 25px;
        }
    }
`;

const { withScreenSizes } = Responsive;

const HOW_WE_ARE_DIFF_NUM_STEPS = 6;
const HOW_WE_ARE_DIFF_COLUMN_GAP_IN_PIXELS = 14;

const WHAT_MAKES_US_DIFF_TEXTS = [
    {
        icon: <Image src={PriceTransparency} alt="" />,
        title: 'PRICE TRANSPARENCY',
        description: `People deserve to know how much something will cost before committing, especially this day in age.

Our platform brings transparency by providing price estimates for your treatment up-front so you know how much it’ll cost before you commit. We calculate this by using a real-time price comparison database managed by Laguro Dentists.`,
    },

    {
        icon: <Image src={Personalized} alt="" />,
        title: 'PERSONALIZED APPOINTMENT',
        description: `Every smile is unique. That’s why we believe you deserve care specially designed for you.

Based on your dental problem, location, time, and preferred language, we will curate the best appointment options. Our personalized appointments technology is powered by our own cutting-edge matching engine that brings you the right dentist for your specific needs.`,
    },
    {
        icon: <Image src={Ownership} alt="" />,
        title: 'OWNERSHIP OF YOUR DENTAL RECORDS',
        description: `We believe you should be in charge of your oral health records.

As a Laguro Patient, you will have complete access to your oral health records, including being able to view your appointment history, detailed treatment plans and notes, payments, x-rays, and more. Your records are securely stored in compliance with HIPAA. We respect  your privacy, so we promise to never share your information.`,
    },
    {
        icon: <Image src={Maximize} alt="" />,
        title: 'MAXIMIZE YOUR DENTAL BENEFITS',
        description: `Trying to understand your coverages and handling insurance claims paperwork can be a headache.

Our platform provides an up-front and easy-to-understand calculation of coverage and out-of-pocket payments based on your insurance. If you want to see an out-of-network dentist, then we will help you and your dentist to file your claim.`,
    },
    {
        icon: <Image src={ConvenienceOfLoc} alt="" />,
        title: 'Convenient locations',
        description: `We know it's hard and time-consuming to find the right dentist near you.

Laguro helps alleviate this problem by providing a dental platform that not only allows you to find a local dental center that is fully equipped with the latest technologies, but also providing you access to different dental offices so you can have more options to choose from.`,
    },
    {
        icon: <Image src={FlexibleTime} alt="" />,
        title: 'Flexible Scheduling',
        description: `We live busy lives so fitting in dental appointments six months from now can be tricky.

Laguro makes it super easy for you to search and review dentists, and instantly book the next available appointment. Rescheduling is not a problem; we believe this process should be fast, simple, and hassle-free.`,
    },
];

const StyledPanel = styled(Panel)`
    &&&& {
        width: 100%;
        margin-bottom: 6px;
        border: 1px solid rgba(52, 129, 248, 0.6);
        background-color: #ffffff;
        box-shadow: 0 2px 11px 0 #f5f5f5;
        border-radius: 4px;

        .ant-collapse-header {
            border-color: rgba(52, 129, 248, 0.6);
        }
        .ant-collapse-content {
            border-color: rgba(52, 129, 248, 0.6);
        }
    }
`;

const StyledFlex = styled(Flex)`
    && {
        .how-we-are-diff-on-hover {
            display: none;
        }
        :hover {
            .how-we-are-diff-default {
                display: none;
            }
            .how-we-are-diff-on-hover {
                display: unset;
            }
        }
        transition: 0.3s;
    }
`;

const WhatMakesUsDifferentCard = props => (
    <StyledFlex
        py={39}
        px={32}
        borderRadius="4px"
        border="solid 1px rgba(52, 129, 248, 0.6)"
        boxShadow="0 2px 11px 0 #f5f5f5"
        justifyContent="center"
        alignItems="center"
        height="403px"
        bg="background.white"
    >
        <Flex
            className="how-we-are-diff-default"
            justifyContent="center"
            flexDirection="column"
        >
            {props.icon}
            <Text
                mt={20}
                color="#245197"
                fontWeight="bold"
                fontSize={3}
                letterSpacing="-0.39px"
                textAlign="center"
            >
                {_uppercase(props.title)}
            </Text>
        </Flex>
        <Flex
            className="how-we-are-diff-on-hover"
            justifyContent="center"
            flexDirection="column"
        >
            <Text
                color="#245197"
                fontWeight="bold"
                fontSize={2}
                letterSpacing="-0.39px"
                textAlign="center"
                mb={30}
            >
                {_uppercase(props.title)}
            </Text>
            <Text
                fontFamily={APPLE_SD_GOTHIC_NEO}
                fontWeight="bold"
                fontSize={2}
                lineHeight="23px"
                letterSpacing="-0.26px"
                color="#686f91"
            >
                {props.description.split('\n').map((item, key) => (
                    <span key={key}>
                        {item}
                        <br />
                    </span>
                ))}
            </Text>
        </Flex>
    </StyledFlex>
);

const descriptionContent =
    "Discover what makes us different from our competitors and see how we're reinventing dentistry";

export const HowWeAreDiff = withScreenSizes(props => (
    <Fragment>
        <Helmet>
            <title>Our Features - Laguro</title>
            <link
                rel="canonical"
                href="https://www.laguro.com/#our-features "
            />
            <meta name="description" content={descriptionContent} />
        </Helmet>
        <SectionHeading heading="What makes us different" />
        <Box mb={73}>
            {props.desktopOnly ? (
                // desktop
                <Flex justifyContent="center">
                    <Grid
                        width="100%"
                        gridTemplateColumns={
                            props.desktopOnly
                                ? `repeat(${HOW_WE_ARE_DIFF_NUM_STEPS /
                                      2}, 1fr)`
                                : ''
                        }
                        gridColumnGap={HOW_WE_ARE_DIFF_COLUMN_GAP_IN_PIXELS}
                        gridRowGap={15}
                    >
                        {_range(HOW_WE_ARE_DIFF_NUM_STEPS).map(num => (
                            <WhatMakesUsDifferentCard
                                {...WHAT_MAKES_US_DIFF_TEXTS[num]}
                            />
                        ))}
                    </Grid>
                </Flex>
            ) : (
                <StyledCollapse>
                    {_range(HOW_WE_ARE_DIFF_NUM_STEPS).map((num, index) => (
                        <StyledPanel
                            header={
                                <Flex
                                    className="how-we-are-diff-default"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    {WHAT_MAKES_US_DIFF_TEXTS[num].icon}
                                    <Text
                                        width={[188, 500, 188]}
                                        color="#245197"
                                        fontWeight="medium"
                                        fontSize={2}
                                        letterSpacing="-0.39px"
                                    >
                                        {_uppercase(
                                            WHAT_MAKES_US_DIFF_TEXTS[num].title
                                        )}
                                    </Text>
                                    <Box />
                                </Flex>
                            }
                            key={index}
                        >
                            {WHAT_MAKES_US_DIFF_TEXTS[num].description
                                .split('\n')
                                .map((item, key) => (
                                    <span key={key}>
                                        {item}
                                        <br />
                                    </span>
                                ))}
                        </StyledPanel>
                    ))}
                </StyledCollapse>
            )}
        </Box>
    </Fragment>
));
