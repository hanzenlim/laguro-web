import React, { useEffect, useContext } from 'react';

import { AppContext } from '../../appContext';
import { Container } from '~/components';
import NewReview from '~/common/NewReview/view';

const NewReviewPage = ({ info }) => {
    const { isAuth, mounted } = useContext(AppContext);

    useEffect(() => {
        const redirectToHome = () => {
            if (!isAuth) {
                window.location.href = '/';
            }
        };

        redirectToHome();
    }, [isAuth]);

    if (!mounted) return null;
    return (
        <Container>
            <NewReview info={info} />
        </Container>
    );
};

export default NewReviewPage;
