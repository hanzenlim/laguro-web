import qs from 'query-string';

const CDN_URL = 'https://cdn.filestackcontent.com/';

// assumes that url has no params
// Extracting the file handle from the urlArr. The urlArr has this format https://cdn.filestackcontent.com/yF9AgWbSTHyWbMGZDiow
const getFilestackHandle = url => url.split('/')[3];

export const setImageSizeToUrl = (imageUrl, height, width) => {
    if (!imageUrl.includes(CDN_URL)) return imageUrl;

    const urlParams = imageUrl.replace(CDN_URL, '');
    return height
        ? `${CDN_URL}resize=height:${height}/${urlParams}`
        : `${CDN_URL}resize=width:${width}/${urlParams}`;
};

// it seems that resize parameters aren't allowed to be url params
// and when used in conjunction with security parameters (policy, signature)
// the security parameters are not read
// expecting the image not to have an url params aside from security
export const resizeSecureImage = (secureImageUrl, height, width) => {
    if (!secureImageUrl.includes(CDN_URL)) return secureImageUrl;
    const { query, url } = qs.parseUrl(secureImageUrl);

    const { policy, signature } = query;
    const handle = getFilestackHandle(url);

    return height
        ? `${CDN_URL}resize=height:${height}/security=p:${policy},s:${signature}/${handle}`
        : `${CDN_URL}resize=width:${width}/security=p:${policy},s:${signature}/${handle}`;
};
