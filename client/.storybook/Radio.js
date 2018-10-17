import React from 'react';
import { storiesOf } from '@storybook/react';
import Radio from '../src/components/Radio';

const RadioGroup = Radio.Group;

storiesOf('RadioGroup', module)
    .add('default', () => (<RadioGroup>
        <Radio value={1}>Options A</Radio>
        <Radio value={2}>Options B</Radio>
        <Radio value={3}>Options C</Radio>
  </RadioGroup>))
