import React from 'react';
import Confetti from 'react-confetti';

import { Text, Box, Link, Button, Image } from '../../components';
import promo100Img from '../../images/promo100.png';

const SuccessScreen = () => (
    <Box width="100%" maxWidth={364} textAlign="center" px={[25, 0, 0]}>
        <Confetti recycle={false} />
        <Text fontSize={3} fontWeight="bold" color="#4f525e">
            Thanks for signing up!
        </Text>

        <Image
            src={promo100Img}
            mx="auto"
            my={40}
            maxWidth="100%"
            alt="$100 Laguro Credits"
        />

        <Text mb={34} color="#757575">
            A one time $100 credit has been added to your account and this can
            be used toward your upcoming procedures.
        </Text>

        <Box mb={6}>
            <Link to="/dentist/search">
                <Button
                    width={['100%', 288, 288]}
                    fontSize={1}
                    style={{
                        borderRadius: 26,
                        boxShadow: '0 2px 6px 1px rgba(0, 0, 0, 0.09)',
                    }}
                >
                    Start searching for dentists
                </Button>
            </Link>
        </Box>
        <Box>
            <Link to="/dashboard/patient?selectedTab=laguro%20wallet">
                <Button
                    type="ghost"
                    width={['100%', 288, 288]}
                    maxWidth="100%"
                    fontSize={1}
                    style={{
                        borderRadius: 26,
                        boxShadow: '0 2px 6px 1px rgba(0, 0, 0, 0.09)',
                        border: '1px solid #3481F8',
                    }}
                >
                    <Text color="text.blue" fontSize={1}>
                        Go to Laguro Wallet
                    </Text>
                </Button>
            </Link>
        </Box>
    </Box>
);

SuccessScreen.propTypes = {};

export default SuccessScreen;
