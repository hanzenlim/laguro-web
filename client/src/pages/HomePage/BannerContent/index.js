import React, { useState, useCallback, useEffect } from 'react';
import { trackPriceEstimationQuizAttempt } from '../../../util/trackingUtils';

import BannerContentView from './view';

const BannerContent = () => {
    const [isQuizVisible, setQuizVisible] = useState(false);

    useEffect(() => {
        if (window && window.location.search.includes('isQuizVisible=true')) {
            setQuizVisible(true);
            trackPriceEstimationQuizAttempt();
        }
    }, []);

    const toggleQuizVisibility = useCallback(() => {
        setQuizVisible(!isQuizVisible);
        trackPriceEstimationQuizAttempt();
    }, [isQuizVisible]);

    return (
        <BannerContentView
            isQuizVisible={isQuizVisible}
            toggleQuizVisibility={toggleQuizVisibility}
        />
    );
};

export default BannerContent;
