import React, { useState, useCallback } from 'react';

import BannerContentView from './view';

const BannerContent = () => {
    const [isQuizVisible, setQuizVisible] = useState(false);
    const [isQuizDone, setQuizDone] = useState(false);

    const toggleQuizVisibility = useCallback(() => {
        setQuizVisible(!isQuizVisible);
    }, [isQuizVisible]);

    return (
        <BannerContentView
            isQuizVisible={isQuizVisible}
            isQuizDone={isQuizDone}
            toggleQuizVisibility={toggleQuizVisibility}
            setQuizDone={setQuizDone}
        />
    );
};

export default BannerContent;
