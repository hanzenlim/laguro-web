import React from 'react';
import styled from 'styled-components';

import { Text, Box, Button, Link, Icon } from '../../components';

const Pattern = styled(Box)`
    ${props => props.order === 1 && `transform: rotate(145deg);`};
    ${props => props.order === 2 && `transform: rotate(-45deg);`};
    ${props => props.order === 3 && `transform: rotate(45deg);`};
`;

const StyledBox = styled(Box)`
    overflow: hidden;
`;

const AboutPage = () => (
    <StyledBox pb={300}>
        <Box pt={250} maxWidth={1102} mx="auto">
            <Box position="relative" mb={274}>
                <Box position="relative" zIndex={2}>
                    <Text fontSize={36} fontWeight="bold">
                        About us
                    </Text>
                    <Text fontSize={36}>
                        <Text color="text.blue" is="span">
                            Laguro has arrived
                        </Text>{' '}
                        — Read about how we are changing dentistry is
                        administered for both dentists and patients.
                    </Text>
                </Box>
                <Pattern position="absolute" top={-250} right={-300} order={1}>
                    <Icon type="macaroniPattern" fontSize={600} opacity={0.1} />
                </Pattern>
            </Box>

            <Box position="relative" mb={124}>
                <Box position="relative" zIndex={2}>
                    <Text mb={30} fontSize={5} fontWeight="bold">
                        For Dentists –
                    </Text>
                    <Box pl={216}>
                        <Box fontSize={2}>
                            <Text mb={30} lineHeight="30px">
                                Today, dentists are forced to juggle the
                                responsibilities of providing excellent
                                treatment while sustaining a business and
                                keeping their chairs consistently occupied. As
                                vacant clinical space gradually becomes the
                                norm, so has the increase in unexpected
                                cancellations, slow office days, and
                                ever-growing costs.
                            </Text>
                            <Text lineHeight="30px">
                                At Laguro, we are here to change and close that
                                gap. Laguro, an idea and vision thoughtfully
                                created, is{' '}
                                <Text is="span" fontWeight="medium">
                                    an online marketplace made by dentists, for
                                    dentists to provide a complete solution to
                                    an industry suffering from inefficiencies
                                </Text>
                                . When practitioners sign up with us, they will
                                have the options to either become a Laguro Host
                                (for practice owners) or Laguro Dentist (for
                                associates). Once registered, Hosts will have
                                opportunities to make passive income by listing
                                their{' '}
                                <Text is="span" fontWeight="medium">
                                    unused chairs and equipment for other
                                    providers to use on an hourly or daily basis
                                </Text>
                                . For Dentists, they will be able to operate a
                                virtual office, complete with a transferrable
                                patient management system, where he or she can
                                work whenever and wherever, without needing to
                                worry about the daunting business side of
                                dentistry. Additionally, Dentists can jumpstart
                                their Laguro practice immediately by utilizing
                                their network of family and friends.
                            </Text>
                            <Box textAlign="right" mt={36}>
                                <Link to="/office/search">
                                    <Button type="ghost" mr={100}>
                                        <Text
                                            color="text.blue"
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Book a chair ➞
                                        </Text>
                                    </Button>
                                </Link>
                                <Link to="/host-onboarding/add-office">
                                    <Button type="ghost">
                                        <Text
                                            color="text.blue"
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Become a host ➞
                                        </Text>
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Pattern position="absolute" top={-150} left={-600} order={2}>
                    <Icon
                        type="macaroniPattern"
                        fontSize={1000}
                        opacity={0.1}
                    />
                </Pattern>
            </Box>

            <Box position="relative">
                <Box position="relative" zIndex={2}>
                    <Text mb={30} fontSize={5} fontWeight="bold">
                        For Patients –
                    </Text>
                    <Box pl={216}>
                        <Box fontSize={2}>
                            <Text mb={30}>
                                Patients have always been the main priority in
                                the healthcare industry. However, that is not
                                always the case. Many patients have reported
                                repeated issues when it comes to finding the
                                right practitioner, understanding their own
                                health records, and receiving the appropriate
                                procedures at affordable costs. However, we
                                believe that those issues should be the least of
                                their concerns.
                            </Text>
                            <Text>
                                At Laguro, we provide dental patients an
                                increase in efficiency and transparency of care.
                                When patients sign up with us, they will have
                                access to the highest levels of treatment
                                available at reasonable rates, flexible
                                appointment schedulings, reviews of local
                                practitioners, and personal electronic dental
                                records-- all conveniently available for
                                whenever and wherever they want.
                            </Text>
                            <Box textAlign="right" mt={36}>
                                <Link to="/host-onboarding/add-office">
                                    <Button type="ghost">
                                        <Text
                                            color="text.blue"
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
                                            Book an appointment ➞
                                        </Text>
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Pattern position="absolute" top={80} right={-100} order={3}>
                    <Icon type="macaroniPattern" fontSize={800} opacity={0.1} />
                </Pattern>
            </Box>
        </Box>
    </StyledBox>
);

export default AboutPage;
