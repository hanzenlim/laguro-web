import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/components/Button';

storiesOf('Button', module)
    .add('default', () => <Button>Default</Button>)
    .add('disabled', () => <Button disabled>Disabled</Button>)
    .add('loading', () => (
        <Button size="large" loading>
            Loading
        </Button>
    ));
