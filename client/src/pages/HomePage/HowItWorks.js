import React, { Fragment } from 'react';
import _range from 'lodash/range';
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
            'Answer the medical and insurance questions, and tell us about your dental problems when you sign up. We will take care of the rest.',
    },
    {
        title1: 'FIND',
        title2: 'YOUR MATCH',
        description:
            'We match you with the dentists whose prices, insurance coverages, locations, and times you’ll like most. Everything to ensure you find the best!',
    },
    {
        title1: 'MEET',
        title2: 'YOUR DENTIST',
        description:
            'It’s time to meet your dentist to prepare and create a treatment plan that will solve your concerns.',
    },
    {
        title1: 'SMILE AGAIN',
        description:
            'Sit, relax, and receive the appropriate treatment you’ve always deserved. Now, you can smile again!',
    },
    {
        title1: "IT'S",
        title2: 'ALL YOURS',
        description:
            'After your first treatment, you become a Laguro patient! And now you’ll be able to access and share your dental records anytime, anywhere.',
    },
];

const TabletGridProps = {
    width: 327,
    gridRowGap: 106,
    gridTemplateRows: `repeat(${HOW_IT_WORKS_NUM_STEPS / 2}, 252px)`,
};

const getHowItWorksStepProps = num => ({
    num: num + 1,
    title1: HOW_IT_WORKS_TEXTS[num].title1,
    title2: HOW_IT_WORKS_TEXTS[num].title2,
    description: HOW_IT_WORKS_TEXTS[num].description,
});

export const HowItWorks = withScreenSizes(props => (
    <Fragment>
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
                        gridRowGap={props.mobileOnly && 30}
                    >
                        {_range(HOW_IT_WORKS_NUM_STEPS).map(num =>
                            props.desktopOnly ? (
                                <DesktopHowItWorksStep
                                    {...getHowItWorksStepProps(num)}
                                />
                            ) : (
                                <MobileHowItWorksStep
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
                            {_range(0, HOW_IT_WORKS_NUM_STEPS, 2).map(num => (
                                <TabletHowItWorksStep
                                    {...getHowItWorksStepProps(num)}
                                />
                            ))}
                        </Grid>
                        <Box mt={106}>
                            <Grid {...TabletGridProps}>
                                {_range(1, HOW_IT_WORKS_NUM_STEPS, 2).map(
                                    num => (
                                        <TabletHowItWorksStep
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
