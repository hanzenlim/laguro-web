import rp from 'request-promise'

const getGeoPoint = async (location) => {
    const options = {
            json: true,
            uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/${
                location
            }.json?country=us&types=address%2Cplace&access_token=${'pk.eyJ1IjoibGFndXJvLWFkbWluIiwiYSI6ImNqaWc3enk2bDE0dDAzd3Blb2dyOXRvc2oifQ.Ketzla96PFhKDE8-VwAI5g'}`,
        };
        const loc = await rp(options);
        const [longitude, latitude] = loc.features[0].center;
        return { lat: latitude, lon: longitude };
}

const serializeLocation = async (location) => {
    const geoPoint = await getGeoPoint(location)
    const serializedLocation = {name: location, geoPoint}
    return serializedLocation
}

export default serializeLocation
