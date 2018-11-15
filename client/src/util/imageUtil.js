export const setImageSizeToUrl = (imageUrl, height, width) => {
    const cdnUrl = 'https://cdn.filestackcontent.com/';

    if (!imageUrl.includes(cdnUrl)) return imageUrl;

    const urlParams = imageUrl.replace(cdnUrl, '');
    return height
        ? `${cdnUrl}resize=height:${height}/${urlParams}`
        : `${cdnUrl}resize=width:${width}/${urlParams}`;
};
