import React, { Fragment } from 'react';
import { Box, Container, Grid, Text, Image } from '~/components';

const steps = [
    {
        description: 'Make an appointment',
        imageUrl: '/static/images/how-it-works-step-1.png',
        headColor: '#245197',
    },
    {
        description: 'Meet with your dentist',
        imageUrl: '/static/images/how-it-works-step-2.png',
        headColor: '#785fff',
    },
    {
        description: 'Keep your dental records',
        imageUrl: '/static/images/how-it-works-step-3.png',
        headColor: '#fec46c',
    },
];

const HowItWorks = () => (
    <Fragment>
        <Box
            id="how-it-works"
            pt={[86, '', 400]}
            pb={[0, '', 172]}
            background="linear-gradient(to bottom, #ffffff, #f4f8ff 43%, #f4f2ff)"
        >
            <Container>
                <Text
                    fontSize={[28, '', 50]}
                    fontFamily="IowanOldStyle"
                    fontWeight="bold"
                    lineHeight={1}
                    mb={[44, '', 62]}
                    textAlign="center"
                >
                    How it works
                </Text>
                <Grid
                    gridTemplateColumns={['1fr', '', '1fr 1fr 1fr']}
                    gridColumnGap={60}
                    gridRowGap={50}
                    mx={[-25, '', 'auto']}
                >
                    {steps.map((step, index) => (
                        <Box key={step.description} textAlign="center">
                            <Text
                                textTransform="uppercase"
                                color={step.headColor}
                                fontWeight="medium"
                                fontSize={[3, '', 26]}
                            >{`Step ${index + 1}`}</Text>
                            <Text fontSize={[3, '', 26]} mb={[32, '', 36]}>
                                {step.description}
                            </Text>
                            <Image
                                src={step.imageUrl}
                                alt={step.description}
                                width="100%"
                            />
                        </Box>
                    ))}
                </Grid>
            </Container>
        </Box>
    </Fragment>
);

export default HowItWorks;
