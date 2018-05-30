/* eslint-disable import/prefer-default-export */
export const getDistances = (entities, filters) =>
    new Promise(resolve => {
        const { google } = window;

        const service = new google.maps.DistanceMatrixService();
        const officeAddresses = entities.map(loc => loc.location);

        service.getDistanceMatrix(
            {
                origins: [filters.location],
                destinations: officeAddresses,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL
            },
            (response, status) => {
                if (status !== 'OK') {
                    alert(`Distance Matrix failed: ${status}`);
                } else {
                    const results = response.rows[0].elements;

                    if (results[0].status !== 'ZERO_RESULTS') {
                        const locationsWithDistance = entities.map(
                            (office, index) => ({
                                ...office,
                                locationType: 'office',
                                distance: results[index].distance.text.split(
                                    ' '
                                )[0]
                            })
                        );

                        resolve(locationsWithDistance);
                    } else {
                        resolve([]);
                    }
                }
            }
        );
    });
