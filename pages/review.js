import React from 'react';
import _get from 'lodash/get';
import dynamic from 'next/dynamic';

const NewReview = dynamic(() => import('../routes/NewReview'), { ssr: false });

const Review = ({ info }) => <NewReview info={info} />;

Review.getInitialProps = async ({ req }) => {
    const params = _get(req, 'params', {});
    const query = _get(req, 'query', {});

    const info = { ...params, ...query };

    return { info };
};

export default Review;
