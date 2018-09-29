import get from 'lodash/get';

const DEFAULT_LOCATION = { lon: -122.1561, lat: 37.7249 };

// eslint-disable-next-line
export const getMyPosition = async () => {
    let fPosition = DEFAULT_LOCATION; // SanLeandro is the default location
    if (get(window, 'navigator.geolocation')) {
        try {
            const position = await new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej);
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
