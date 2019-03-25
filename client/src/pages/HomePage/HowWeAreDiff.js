import React, { Fragment } from 'react';
import _range from 'lodash/range';
import _uppercase from 'lodash/upperCase';
import { Collapse } from 'antd';
import styled from 'styled-components';
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
        icon: <Image src={FlexibleTime} alt="" />,
        title: 'Flexible Scheduling',
        description: `We understand that you may not be able to commit to your future dentist appointment during business hours, as your work meetings and every day responsibilities are important.\nWe made it easier for you to now search and review dentists, and instantly book the next available appointment. If you are unable to make it to your next dentist appointment, then we can help you reschedule with no problems! We believe that scheduling dental visits should be fast, simple, and hassle-free`,
    },
    {
        icon: <Image src={ConvenienceOfLoc} alt="" />,
        title: 'Convenient locations',
        description:
            'We understand how time-consuming it can be to spend hours scrolling through the internet search pages and filtering out bars, restaurants, and salons just to find a dentist.\n We help you to alleviate this problem by providing a dental platform that allows you to find a local Dental Center that is fully equipped with x-ray machines, 3D scanners, 3d printers, and laboratory. We also partnered with different qualified dental offices to provide more location availabilities for you.',
    },
    {
        icon: <Image src={PriceTransparency} alt="" />,
        title: 'PRICE TRANSPARENCY',
        description:
            'We see the gimmicks and hidden fees for special dental offers on the internet and we understand how confusing this can be for you.\n Our platform helps to eliminate these blurred lines by providing estimates for the treatment prices up-front. We calculate by using a real price comparison database managed by Laguro dentists to show how much your treatment will cost before you commit.',
    },
    {
        icon: <Image src={Maximize} alt="" />,
        title: 'MAXIMIZE YOUR DENTAL BENEFITS',
        description:
            'We understand that taking care of post-treatment finances and handling insurance can be tough.\n We are committed to providing an up-front calculation of coverage and out-of-pocket payments based on your insurance, so that you can have one less thing to worry about. If you want to see a dentist that is out-of-network, then we will help you and your dentist to file your claim.',
    },
    {
        icon: <Image src={Personalized} alt="" />,
        title: 'PERSONALIZED APPOINTMENT',
        description:
            'We understand that every person is unique. That’s why we believe you deserve the best care especially designed for you.\n Based on your selection of the procedure, location, time, and preferred language, we will help you to create the best care options available. This is made possible with our cutting-edge algorithm technology supported by a pool of available places and dentists.',
    },
    {
        icon: <Image src={Ownership} alt="" />,
        title: 'OWNERSHIP OF YOUR DENTAL RECORDS',
        description:
            'We believe that all information generated for your dental treatments should belong to you.\n Being a Laguro patient, you will have access to your dental records, including being able to view your appointments, detailed treatment plans, payments, x-rays, dental charting, periochartings, and more. Our platform is in compliance with HIPAA and we respect your legal rights and privacy, so we promise to never share your valuable information.',
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
                        <br />
                    </span>
                ))}
            </Text>
        </Flex>
    </StyledFlex>
);

export const HowWeAreDiff = withScreenSizes(props => (
    <Fragment>
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
                            {WHAT_MAKES_US_DIFF_TEXTS[num].description}
                        </StyledPanel>
                    ))}
                </StyledCollapse>
            )}
        </Box>
    </Fragment>
));
