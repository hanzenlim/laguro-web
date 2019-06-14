import React, { useState, useCallback } from 'react';

import BannerContentView from './view';

const BannerContent = () => {
    const [isQuizVisible, setQuizVisible] = useState(false);
    const [isQuizDone, setQuizDone] = useState(false);
    const [bundleGroupCoverageData, setBundleGroupCoverageData] = useState([]);

    const toggleQuizVisibility = useCallback(() => {
        setQuizVisible(!isQuizVisible);
    }, [isQuizVisible]);

    return (
        <BannerContentView
            isQuizVisible={isQuizVisible}
            isQuizDone={isQuizDone}
            bundleGroupCoverageData={bundleGroupCoverageData}
            toggleQuizVisibility={toggleQuizVisibility}
            setQuizDone={setQuizDone}
            setBundleGroupCoverageData={setBundleGroupCoverageData}
        />
    );
};

export default BannerContent;
