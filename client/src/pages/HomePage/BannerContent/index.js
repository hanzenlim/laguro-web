import React, { useState, useCallback } from 'react';

import BannerContentView from './view';

const BannerContent = () => {
    const [isQuizVisible, setQuizVisible] = useState(false);
    const [isQuizDone, setQuizDone] = useState(false);
    const [bundleGroupCoverageData, setBundleGroupCoverageData] = useState([]);
    const [formValues, setFormValues] = useState({});

    const toggleQuizVisibility = useCallback(() => {
        setQuizVisible(!isQuizVisible);
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
