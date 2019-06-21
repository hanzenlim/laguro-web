import React, { useState, useCallback, useEffect } from 'react';
import { trackPriceEstimationQuizAttempt } from '../../../util/trackingUtils';

import BannerContentView from './view';

const BannerContent = () => {
    const [isQuizVisible, setQuizVisible] = useState(false);
    const [isQuizDone, setQuizDone] = useState(false);
    const [bundleGroupCoverageData, setBundleGroupCoverageData] = useState([]);
    const [formValues, setFormValues] = useState({});

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
            isQuizDone={isQuizDone}
            bundleGroupCoverageData={bundleGroupCoverageData}
            formValues={formValues}
            toggleQuizVisibility={toggleQuizVisibility}
            setQuizDone={setQuizDone}
            setBundleGroupCoverageData={setBundleGroupCoverageData}
            setFormValues={setFormValues}
        />
    );
};

export default BannerContent;
