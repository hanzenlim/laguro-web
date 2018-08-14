import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from '../src/components/Text';

storiesOf('Text', module).add('fontSize', () => (
    <div>
        <Text fontSize={11}>Hello 11</Text>
        <Text fontSize={10}>Hello 10</Text>
        <Text fontSize={9}>Hello 9</Text>
        <Text fontSize={8}>Hello 8</Text>
        <Text fontSize={7}>Hello 7</Text>
        <Text fontSize={6}>Hello 6</Text>
        <Text fontSize={5}>Hello 5</Text>
        <Text fontSize={4}>Hello 4</Text>
        <Text fontSize={3}>Hello 3</Text>
        <Text fontSize={2}>Hello 2</Text>
        <Text fontSize={1}>Hello 1</Text>
        <Text fontSize={0}>Hello 0</Text>
    </div>
));
