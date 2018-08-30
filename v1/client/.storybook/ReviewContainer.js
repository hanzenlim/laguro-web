import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewContainer from '../src/pages/common/ReviewContainer/view';

const reviews = [
    {
        id: '1',
        reviewer: {
            id: '100',
            firstName: 'Paul Simon',
            lastName: 'Ongpin',
            imageUrl:
                'https://lh4.googleusercontent.com/-PKui8IQzV0U/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaM6RN8lgfFTL4bJGQIvmdMqcaFn-Q/mo/photo.jpg?sz=300',
        },
        text:
            'lorem ipsum blandit aptent phasellus viverra sollicitudin nostra netus fringilla, lobortis conubia eu auctor varius aliquam blandit faucibus donec, suspendisse nisl sapien turpis pretium diam arcu nostra, netus lectus faucibus rhoncus tellus ligula hendrerit vivamus. aenean hac ornare fermentum mi justo enim massa fames lorem ipsum blandit aptent phasellus viverra sollicitudin nostra netus fringilla, lobortis conubia eu auctor varius aliquam blandit faucibus donec, suspendisse nisl sapien turpis pretium diam arcu nostra, netus lectus faucibus rhoncus tellus ligula hendrerit vivamus. aenean hac ornare fermentum mi justo enim massa fames.',
        rating: 5,
        dateCreated: 'August 28, 2018',
    },
    {
        id: '2',
        reviewer: {
            id: '101',
            firstName: 'Jin',
            lastName: 'Lee',
            imageUrl:
                'https://lh4.googleusercontent.com/-PKui8IQzV0U/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaM6RN8lgfFTL4bJGQIvmdMqcaFn-Q/mo/photo.jpg?sz=300',
        },
        text:
            'lorem ipsum blandit aptent phasellus viverra sollicitudin nostra netus fringilla, lobortis conubia eu auctor varius aliquam blandit faucibus donec, suspendisse nisl sapien turpis pretium diam arcu nostra, netus lectus faucibus rhoncus tellus ligula hendrerit vivamus. aenean hac ornare fermentum mi justo enim massa fames lorem ipsum blandit aptent phasellus viverra sollicitudin nostra netus fringilla, lobortis conubia eu auctor varius aliquam blandit faucibus donec, suspendisse nisl sapien turpis pretium diam arcu nostra, netus lectus faucibus rhoncus tellus ligula hendrerit vivamus. aenean hac ornare fermentum mi justo enim massa fames.',
        rating: 4,
        dateCreated: 'August 28, 2018',
    },
]

storiesOf('ReviewContainer', module).add('With Reviews', () => (
    <ReviewContainer reviews={reviews} loading={false} totalRating={4} reviewsCount={2}/>
));
storiesOf('ReviewContainer', module).add('Data Loading', () => <ReviewContainer loading />);
