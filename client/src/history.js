import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import queryString from 'query-string';
import _isEmpty from 'lodash/isEmpty';
import { gaTrackingId } from './config/keys';

ReactGA.initialize(gaTrackingId, {
    debug: process.env.NODE_ENV !== 'production',
});

const history = createHistory();

// Tracks the page load.
ReactGA.set({ page: window.location.pathname + window.location.search });
ReactGA.pageview(window.location.pathname + window.location.search);

// Tracks the subsequest page navigation.
history.listen(location => {
    ReactGA.set({ page: location.pathname + location.search });
    ReactGA.pageview(location.pathname);
});

export const redirectWithSearchParams = url => {
    const urlParams = queryString.parse(history.location.search);
    history.push(`${url}?${queryString.stringify(urlParams)}`);
    window.scrollTo(0, 0);
};

// new redirectTo
export const redirectWithRedirectTo = url => {
    const urlParams = {};
    urlParams.redirectTo = history.location.pathname;
    if (history.location.pathname !== url) {
        history.push(`${url}?${queryString.stringify(urlParams)}`);
    }
    window.scrollTo(0, 0);
};

export const redirect = ({
    url = '/',
    includeNewRedirectTo = false,
    includeOldSearchParams = true,
    newSearchParamKey,
    newSearchParamValue,
    newSearchParams = {},
}) => {
    let urlParams = {};

    if (includeOldSearchParams) {
        urlParams = queryString.parse(history.location.search);
    }
    if (includeNewRedirectTo) {
        urlParams.redirectTo = history.location.pathname;
    }
    if (!_isEmpty(newSearchParamKey)) {
        urlParams[newSearchParamKey] = newSearchParamValue;
    }
    urlParams = { ...urlParams, ...newSearchParams };
    if (history.location.pathname !== url) {
        history.push(`${url}?${queryString.stringify(urlParams)}`);
    }
    window.scrollTo(0, 0);
};

export const attemptToRedirectBack = () => {
    const urlParams = queryString.parse(history.location.search);
    // dropping referer when redirecting back to referer
    const { redirectTo, referer, ...restOfUrlParams } = urlParams;
    if (!_isEmpty(redirectTo)) {
        history.push(`${redirectTo}?${queryString.stringify(restOfUrlParams)}`);
        return true;
    }
    window.scrollTo(0, 0);
};

export const getRedirectUrl = () => {
    const urlParams = queryString.parse(history.location.search);
    const { redirectTo } = urlParams;

    return redirectTo;
};

export const getSearchParamValueByKey = key => {
    const urlParams = queryString.parse(history.location.search);
    const value = urlParams[key];

    return value;
};

export default history;
