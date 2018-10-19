import React, { PureComponent } from 'react';
import queryString from 'query-string';

import { Flex, Text, Box, Grid, Responsive } from '../../../components';
import getOtherLocationResults from './queries';
import history from '../../../history';
import MajorCities from '../../../staticData/majorCities';

const { Desktop } = Responsive;

class NoResults extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { suggestedLocations: [] };
    }

    componentDidMount = async () => {
        const searchLocation = this.props.location;
        const { city, state } = this.parseSearch(searchLocation);

        const suggestedLocations = await getOtherLocationResults(
            state,
            this.props.type
        );

        this.setState({
            searchCity: city,
            searchState: state,
            suggestedLocations,
        });
    };

    componentDidUpdate = async prevProps => {
        if (prevProps.location !== this.props.location) {
            const { city, state } = this.parseSearch(this.props.location);

            const suggestedLocations = await getOtherLocationResults(
                state,
                this.props.type
            );

            this.setState({
                searchCity: city,
                searchState: state,
                suggestedLocations,
            });
        }
    };

    parseSearch = searchString => {
        // remove zipcode and split into array ie ['Oakland', 'California']
        const parsedSearchLocation = searchString
            ? this.props.location.replace(/ \d{5}/, '').split(', ')
            : [];
        const state = parsedSearchLocation[parsedSearchLocation.length - 2];
        const city = parsedSearchLocation[parsedSearchLocation.length - 3];

        return { state, city };
    };

    render() {
        const { suggestedLocations, searchCity, searchState } = this.state;
        const { type, text } = this.props;
        const extraText = text ? ` that match your search for ${text}` : '';

        return (
            <Flex flexDirection="column">
                {searchCity || searchState || text ? (
                    <Desktop>
                        <Flex mb={55}>
                            <Text fontSize={5} color="text.black">
                                Search Results for&nbsp;
                            </Text>
                            <Text
                                fontSize={5}
                                color="text.black"
                                fontWeight="bold"
                            >
                                {searchCity || searchState || text}
                            </Text>
                        </Flex>
                    </Desktop>
                ) : null}

                <Text fontSize={4} color="text.black" mb={10}>
                    {`Oh no! It seems like there are no ${type} near you${extraText}.`}
                </Text>
                <Text fontSize={4} color="text.black" mb={25}>
                    {suggestedLocations.length > 0
                        ? `We found some ${type} in other locations:`
                        : 'Please modify your search and try again.'}
                </Text>
                <Grid
                    gridColumnGap="14px"
                    gridRowGap="10px"
                    gridTemplateColumns={['1fr 1fr', '', '1fr 1fr 1fr']}
                >
                    {suggestedLocations.map((location, index) => (
                        <SuggestedSearchCard
                            key={index}
                            type={this.props.type}
                            location={MajorCities.find(
                                city => city.name === location.city
                            )}
                            docCount={location.docCount}
                        />
                    ))}
                </Grid>
            </Flex>
        );
    }
}

const SuggestedSearchCard = ({ location, docCount, type }) => {
    const urlParams = {};
    if (location) {
        urlParams.location = `${location.name}, ${
            location.state
        }, United States`;
        urlParams.lat = location.origin.lat;
        urlParams.long = location.origin.lon;
    }
    const search = queryString.stringify(urlParams);

    return (
        <Box
            px={[18, '', 30]}
            py={[11, '', 20]}
            border="1px solid"
            borderColor="divider.dustyGray"
            borderRadius="4px"
        >
            <Text fontWeight="bold" color="text.black" fontSize={4}>
                {location.name.replace(/_/g, ' ')}
            </Text>
            <Text color="text.black" fontSize={3}>
                {`${docCount} ${type}`}
            </Text>

            <Text
                color="text.blue"
                fontSize={3}
                fontWeight="medium"
                cursor="pointer"
                onClick={() => history.push({ search: `?${search}` })}
            >
                Search in this area ➞
            </Text>
        </Box>
    );
};

export default NoResults;
