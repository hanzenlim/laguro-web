import React from 'react';
import { storiesOf } from '@storybook/react';
import { Carousel, Flex, Text } from '../src/components';

storiesOf('Carousel', module).add('default', () => (
    <Carousel>
        <div>
            <Flex
                bg="background.gray"
                height="400px"
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize={4}>1</Text>
            </Flex>
        </div>
        <div>
            <Flex
                bg="background.gray"
                height="400px"
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize={4}>2</Text>
            </Flex>
        </div>
        <div>
            <Flex
                bg="background.gray"
                height="400px"
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize={4}>3</Text>
            </Flex>
        </div>
        <div>
            <Flex
                bg="background.gray"
                height="400px"
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize={4}>4</Text>
            </Flex>
        </div>
        <div>
            <Flex
                bg="background.gray"
                height="400px"
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Text fontSize={4}>5</Text>
            </Flex>
        </div>
    </Carousel>
));
