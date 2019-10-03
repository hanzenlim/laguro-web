import Router from 'next/router';
import queryString from 'query-string';
import _isEmpty from 'lodash/isEmpty';

export const redirectWithSearchParams = url => {
    const urlParams = Router.query;
    Router.push(`${url}?${queryString.stringify(urlParams)}`);
    window.scrollTo(0, 0);
};

// new redirectTo
export const redirectWithRedirectTo = url => {
    const urlParams = {};
    urlParams.redirectTo = Router.asPath;
    if (Router.asPath !== url) {
        Router.push(`${url}?${queryString.stringify(urlParams)}`);
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
        urlParams = queryString.parse(Router.query);
    }
    if (includeNewRedirectTo) {
        urlParams.redirectTo = Router.asPath;
    }
    if (!_isEmpty(newSearchParamKey)) {
        urlParams[newSearchParamKey] = newSearchParamValue;
    }
    urlParams = { ...urlParams, ...newSearchParams };
    if (Router.asPath !== url) {
        Router.push(`${url}?${queryString.stringify(urlParams)}`);
    }
    window.scrollTo(0, 0);
};

// used for only adding new search params to url
// used in dashboard pages
export const addSearchParams = newSearchParams => {
    const urlParams = {
        ...queryString.parse(Router.query),
        ...newSearchParams,
    };
    window.history.pushState('', '', `?${queryString.stringify(urlParams)}`);
};

export const attemptToRedirectBack = () => {
    const urlParams = queryString.parse(Router.query);
    // dropping referer when redirecting back to referer
    const { redirectTo, referer, ...restOfUrlParams } = urlParams;
    if (!_isEmpty(redirectTo)) {
        Router.push(`${redirectTo}?${queryString.stringify(restOfUrlParams)}`);
        return true;
    }
    window.scrollTo(0, 0);
};

export const getRedirectUrl = () => {
    const urlParams = queryString.parse(Router.query);
    const { redirectTo } = urlParams;

    return redirectTo || '';
};

export const getSearchParamValueByKey = key => {
    const urlParams = queryString.parse(Router.query);
    const value = urlParams[key];

    return value || '';
};
