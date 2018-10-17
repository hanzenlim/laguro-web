// city name needs to have "_" ie 'San_Francisco', state name should be standard capitalization ie 'North Dakota'
// Included are all US Cities over 500k pop.
// https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population

const MajorCities = [
    {
        name: 'San_Francisco',
        state: 'California',
        origin: { lon: -123.0322, lat: 37.7272 },
    },
    {
        name: 'Oakland',
        state: 'California',
        origin: { lon: -122.2257, lat: 37.7698 },
    },
    {
        name: 'Los_Angeles',
        state: 'California',
        origin: { lon: -118.4108, lat: 34.0194 },
    },
    {
        name: 'San_Jose',
        state: 'California',
        origin: { lon: -121.8189, lat: 37.2967 },
    },
    {
        name: 'Fresno',
        state: 'California',
        origin: { lon: -119.7934, lat: 36.7836 },
    },
    {
        name: 'Sacramento',
        state: 'California',
        origin: { lon: -121.4686, lat: 38.5666 },
    },
    {
        name: 'Long_Beach',
        state: 'California',
        origin: { lon: -118.1553, lat: 33.8092 },
    },
    {
        name: 'New_York',
        state: 'New York',
        origin: { lon: -73.9387, lat: 40.6635 },
    },
    {
        name: 'Chicago',
        state: 'Illinois',
        origin: { lon: -87.6818, lat: 41.8376 },
    },
    {
        name: 'Houston',
        state: 'Texas',
        origin: { lon: -95.3909, lat: 29.7866 },
    },
    {
        name: 'Phoenix',
        state: 'Arizona',
        origin: { lon: -112.0901, lat: 33.5722 },
    },
    {
        name: 'Philadelphia',
        state: 'Pennsylvania',
        origin: { lon: -75.1333, lat: 40.0094 },
    },
    {
        name: 'San_Antonio',
        state: 'Texas',
        origin: { lon: -98.5251, lat: 29.4724 },
    },
    {
        name: 'Dallas',
        state: 'Texas',
        origin: { lon: -96.7665, lat: 32.7933 },
    },
    {
        name: 'Austin',
        state: 'Texas',
        origin: { lon: -97.7544, lat: 30.3039 },
    },
    {
        name: 'Jacksonville',
        state: 'Florida',
        origin: { lon: -81.6616, lat: 30.3369 },
    },
    {
        name: 'Columbus',
        state: 'Ohio',
        origin: { lon: -82.9848, lat: 39.9852 },
    },
    {
        name: 'Fort_Worth',
        state: 'Texas',
        origin: { lon: -97.3467, lat: 32.7815 },
    },
    {
        name: 'Indianapolis',
        state: 'Indiana',
        origin: { lon: -86.1459, lat: 39.7767 },
    },
    {
        name: 'Charlotte',
        state: 'North Carolina',
        origin: { lon: -80.831, lat: 35.2078 },
    },
    {
        name: 'Seattle',
        state: 'Washington',
        origin: { lon: -122.3509, lat: 47.6205 },
    },
    {
        name: 'Denver',
        state: 'Colorado',
        origin: { lon: -104.8811, lat: 39.7619 },
    },
    {
        name: 'Washington',
        state: 'District of Columbia',
        origin: { lon: -77.0172, lat: 38.9041 },
    },
    {
        name: 'Boston',
        state: 'Massachusetts',
        origin: { lon: -71.0202, lat: 42.332 },
    },
    {
        name: 'El_Paso',
        state: 'Texas',
        origin: { lon: -106.427, lat: 31.8484 },
    },
    {
        name: 'Detroit',
        state: 'Michigan',
        origin: { lon: -83.1022, lat: 42.383 },
    },
    {
        name: 'Nashville',
        state: 'Tennessee',
        origin: { lon: -86.785, lat: 36.1718 },
    },
    {
        name: 'Memphis',
        state: 'Tennessee',
        origin: { lon: -89.9774, lat: 35.1028 },
    },
    {
        name: 'Portland',
        state: 'Oregon',
        origin: { lon: -122.65, lat: 45.537 },
    },
    {
        name: 'Oklahoma_City',
        state: 'Oklahoma',
        origin: { lon: -97.5137, lat: 35.4671 },
    },
    {
        name: 'Las_Vegas',
        state: 'Nevada',
        origin: { lon: -115.2601, lat: 36.2292 },
    },
    {
        name: 'Louisville',
        state: 'Kentucky',
        origin: { lon: -85.6474, lat: 38.1654 },
    },
    {
        name: 'Baltimore',
        state: 'Maryland',
        origin: { lon: -76.6105, lat: 39.3 },
    },
    {
        name: 'Milwaukee',
        state: 'Wisconsin',
        origin: { lon: -87.9667, lat: 43.0633 },
    },
    {
        name: 'Albuquerque',
        state: 'New Mexico',
        origin: { lon: -106.6474, lat: 35.1056 },
    },
    {
        name: 'Tucson',
        state: 'Arizona',
        origin: { lon: -110.8706, lat: 32.1531 },
    },
];

export default MajorCities;
