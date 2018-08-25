import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from '../src/components/Text';

storiesOf('Text', module).add('fontSize', () => (
    <div>
        <Text fontSize={5}>Hello 5</Text>
        <Text fontSize={4}>Hello 4</Text>
        <Text fontSize={3}>Hello 3</Text>
        <Text fontSize={2}>Hello 2</Text>
        <Text fontSize={1}>Hello 1</Text>
        <Text fontSize={0}>Hello 0</Text>
    </div>
));
