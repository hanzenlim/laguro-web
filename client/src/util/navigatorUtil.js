import get from 'lodash/get';

export const DEFAULT_LOCATION = { lon: -122.463, lat: 37.7648 };

// eslint-disable-next-line
export const getMyPosition = async () => {
    let fPosition = DEFAULT_LOCATION; // San Francisco is the default location
    if (get(window, 'navigator.geolocation')) {
        try {
            const position = await new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej, {
                    timeout: 500,
                    maximumAge: 900000, // 15 min
                });
            });
            fPosition = {
                lon: position.coords.longitude,
                lat: position.coords.latitude,
            };
        } catch (err) {
            // do nothing
        }
    }

    return fPosition;
};
