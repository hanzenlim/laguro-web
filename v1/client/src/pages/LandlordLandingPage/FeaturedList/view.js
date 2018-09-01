import React from 'react';
import { Box, Button, Container, Image, Flex, Text } from '../../../components';
import hero1 from '../../../images/Hero-img.jpg';

const FeaturedListView = () => (
    <Container>
        <Text
            color="black"
            fontSize={5}
            lineHeight="34px"
            letterSpacing="-0.8px"
            textAlign="center"
            mt={40}
        >
            rent your dental office
        </Text>
        <Text
            color="black"
            fontSize={4}
            lineHeight="34px"
            fontWeight="light"
            textAlign="center"
        >
            Have free space to share or have an open office? Rent your dental
            office with Laguro.
        </Text>
        <Text
            color="black"
            fontSize={4}
            lineHeight="30px"
            fontWeight="light"
            textAlign="center"
            mt={100}
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            vestibulum felis eu malesuada pulvinar. Aliquam sodales, sem nec
            mollis, magna ante porta tortor, vitae pellentesque odio dui tempus
            mi.
        </Text>
        <Flex justifyContent="center">
            <Button width="186px" mt={40}>
                rent your office
            </Button>
        </Flex>
        <Text
            color="black"
            fontSize={5}
            lineHeight="30px"
            letterSpacing="-0.8px"
            mt={40}
        >
            featured offices{' '}
        </Text>
        <Box pb={28} />
        <Flex data-name="featured-offices" justifyContent="space-between">
            <Box width="48%" position="relative">
                <Image width="100%" height="300px" src={hero1} alt="hero1" />{' '}
                <Box pb={18} />
                <Text color="black" fontSize={4} lineHeight="30px">
                    rent a large office with a complete set of implant equipment
                </Text>
            </Box>
            <Box width="48%" position="relative">
                <Image width="100%" height="300px" src={hero1} alt="hero1" />{' '}
                <Box pb={18} />
                <Text color="black" fontSize={4} lineHeight="30px">
                    rent an office near Bart
                </Text>
            </Box>
        </Flex>
        <Text
            color="black"
            fontSize={5}
            lineHeight="34px"
            letterSpacing="-0.8px"
            textAlign="center"
            mt={40}
        >
            Lorem ipsum
        </Text>
        <Text
            color="black"
            fontSize={4}
            lineHeight="34px"
            fontWeight="light"
            textAlign="center"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            vestibulum felis eu malesuada pulvinar. Aliquam sodales, sem nec
            mollis dapibus, magna ante porta tortor, vitae pellentesque odio dui
            tempus mi. Suspendisse potenti. Pellentesque vitae semper augue.
            Phasellus fermentum, convallis fermentum ex sollicitudin tincidunt.
            Curabitur vitae dapibus nibh. Nam condimentum dolor eget massa
            fermentum elementum. Fusce accumsan vel nulla quis tristique. Sed
            fermentum non libero mattis molestie. Fusce at metus vitae enim
            semper vestibulum.
        </Text>
        <Text
            color="black"
            fontSize={4}
            lineHeight="30px"
            fontWeight="light"
            textAlign="center"
            mt={40}
        >
            Aliquam molestie pharetra metus, eu imperdiet ipsum mattis nec.
            Vestibulum urna justo, molestie at tincidunt ac, auctor vitae leo.
            Suspendisse malesuada sem at arcu pharetra aliquet. Nunc vestibulum
            porta augue, a tempor velit ullamcorper in. Vivamus eget tellus
            tincidunt ante cursus ullamcorper at id ligula. Suspendisse potenti.
        </Text>
    </Container>
);

export default FeaturedListView;
