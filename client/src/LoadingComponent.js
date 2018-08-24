import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <LinearProgress />;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    return null;
};
