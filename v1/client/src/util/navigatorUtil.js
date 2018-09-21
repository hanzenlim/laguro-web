import get from 'lodash/get';

// eslint-disable-next-line
export const getMyPosition = () => {
    let fPosition = { lon: 122.1561, lat: 37.7249 }; // SanLeandro is the default location
    if (get(window, 'navigator.geolocation'))
        navigator.geolocation.getCurrentPosition(position => {
            fPosition = {
                lon: position.coords.longitude,
                lat: position.coords.latitude,
            };
        });

    return fPosition;
};
