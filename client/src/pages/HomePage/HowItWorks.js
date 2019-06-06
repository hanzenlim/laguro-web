import React, { Fragment } from 'react';
import _range from 'lodash/range';
import { Helmet } from 'react-helmet';

import { Box, Flex, Grid, Responsive } from '../../components';
import { DesktopHowItWorksStep } from './DesktopHowItWorksStep';
import { MobileHowItWorksStep } from './MobileHowItWorksStep';
import { TabletHowItWorksStep } from './TabletHowItWorksStep';
import {
    MOBILE_SCREEN_WIDTH_IN_PIXELS,
    containerPaddings,
} from '../../components/theme';
import { SectionHeading } from './common';

const { withScreenSizes } = Responsive;

const HOW_IT_WORKS_NUM_STEPS = 5;
const HOW_IT_WORKS_COLUMN_GAP_IN_PIXELS = 26;

// title1 and title2 are on separate lines
const HOW_IT_WORKS_TEXTS = [
    {
        title1: 'TELL US',
        title2: 'ABOUT YOURSELF',
        description:
            'Complete a few medical and insurance questionnaires, and tell us about your dental problems when you sign up. We’ll take care of the rest.',
    },
    {
        title1: 'FIND',
        title2: 'YOUR MATCH',
        description:
            "We’ll match you with the dentists whose prices, insurance coverage, locations, and times you’ll like most. We’ll do everything to ensure you'll find the best!",
    },
    {
        title1: 'MEET',
        title2: 'YOUR DENTIST',
        description:
            'Meet your dentist to create a customized treatment plan that will solve your oral health concerns.',
    },
    {
        title1: 'SMILE AGAIN',
        description:
            'Sit back, relax, and receive the best dental treatment you’ve always deserved. Now, you can smile again!',
    },
    {
        title1: "IT'S",
        title2: 'ALL YOURS',
        description:
            'After your first visit, you’re now a Laguro Patient! You’ll be able to access and share your dental records anytime, anywhere.',
    },
];

const TabletGridProps = {
    width: '100%',
    gridRowGap: 106,
    gridTemplateRows: `repeat(${HOW_IT_WORKS_NUM_STEPS / 2}, 252px)`,
};

const getHowItWorksStepProps = num => ({
    num: num + 1,
    title1: HOW_IT_WORKS_TEXTS[num].title1,
    title2: HOW_IT_WORKS_TEXTS[num].title2,
    description: HOW_IT_WORKS_TEXTS[num].description,
});

const descriptionContent =
    "Learn more about Laguro Patient's five-step on-boarding process and how it works";

export const HowItWorks = withScreenSizes(props => (
    <Fragment>
        <Helmet>
            <title>How It Works - Laguro</title>
            <link rel="canonical" href="https://www.laguro.com/#how-it-works" />
            <meta name="description" content={descriptionContent} />
        </Helmet>
        <SectionHeading heading="How it works" />
        <Box mt={-30} mb={[73, 105, 73]}>
            {props.desktopOnly || props.mobileOnly ? (
                // desktop and mobile
                <Flex justifyContent="center">
                    <Grid
                        width={
                            props.desktopOnly
                                ? '100%'
                                : `${MOBILE_SCREEN_WIDTH_IN_PIXELS -
                                      containerPaddings}px`
                        }
                        gridTemplateColumns={
                            props.desktopOnly
                                ? `repeat(${HOW_IT_WORKS_NUM_STEPS}, 1fr)`
                                : ''
                        }
                        gridColumnGap={HOW_IT_WORKS_COLUMN_GAP_IN_PIXELS}
                        gridRowGap={props.mobileOnly ? 30 : 0}
                    >
                        {_range(HOW_IT_WORKS_NUM_STEPS).map((num, index) =>
                            props.desktopOnly ? (
                                <DesktopHowItWorksStep
                                    key={index}
                                    {...getHowItWorksStepProps(num)}
                                />
                            ) : (
                                <MobileHowItWorksStep
                                    key={index}
                                    {...getHowItWorksStepProps(num)}
                                />
                            )
                        )}
                    </Grid>
                </Flex>
            ) : (
                // tablet
                // steps form a two-column zig-zag
                <Flex
                    mt={70}
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Grid
                        gridColumnGap={55}
                        gridTemplateColumns="repeat(2, auto)"
                    >
                        <Grid {...TabletGridProps}>
                            {_range(0, HOW_IT_WORKS_NUM_STEPS, 2).map(
                                (num, index) => (
                                    <TabletHowItWorksStep
                                        key={index}
                                        {...getHowItWorksStepProps(num)}
                                    />
                                )
                            )}
                        </Grid>
                        <Box mt={106}>
                            <Grid {...TabletGridProps}>
                                {_range(1, HOW_IT_WORKS_NUM_STEPS, 2).map(
                                    (num, index) => (
                                        <TabletHowItWorksStep
                                            key={index}
                                            {...getHowItWorksStepProps(num)}
                                        />
                                    )
                                )}
                            </Grid>
                        </Box>
                    </Grid>
                </Flex>
            )}
        </Box>
    </Fragment>
));
