import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Mutation } from 'react-apollo';
import { message } from 'antd';
import _get from 'lodash/get';
import PreferredLocationsView from './view';
import esClient from '~/lib/esClient';
import { updateDentist } from './queries';

class PreferredLocations extends Component {
    constructor(props) {
        super(props);

        const {
            preferredLocations,
            serializedPreferredLocations,
            zipCode,
        } = props;

        const officeMap = {};
        for (let i = 0; i < preferredLocations.length; i += 1) {
            const office = preferredLocations[i];
            officeMap[office.id] = office;
        }

        const preferredLocationOne = officeMap[serializedPreferredLocations[0]];
        const preferredLocationTwo = officeMap[serializedPreferredLocations[1]];

        this.state = {
            zipCode: zipCode || '',
            preferredLocationOne,
            preferredLocationTwo,
            selectedEmptyLocation:
                !_isEmpty(preferredLocations) &&
                !_isEmpty(preferredLocations[0])
                    ? 'two'
                    : 'one',
            showLocations: false,
            locations: [],
            loadingLocations: false,
            errorLocations: null,
        };
    }

    setLocalStateToPreferredLocations = () => {
        const { preferredLocations } = this.props;

        this.setState({
            preferredLocationOne: !_isEmpty(preferredLocations)
                ? preferredLocations[0]
                : null,
            preferredLocationTwo:
                !_isEmpty(preferredLocations) &&
                !_isEmpty(preferredLocations[1])
                    ? preferredLocations[1]
                    : null,
            selectedEmptyLocation:
                !_isEmpty(preferredLocations) &&
                !_isEmpty(preferredLocations[0])
                    ? 'two'
                    : 'one',
            showLocations: false,
            locations: [],
            loadingLocations: false,
            errorLocations: null,
        });
    };

    fetchLocations = async () => {
        const { zipCode } = this.state;
        try {
            const res = await esClient.search({
                index: 'offices',
                from: 0,
                body: {
                    query: {
                        bool: {
                            must: {
                                query_string: {
                                    default_field: 'location.name',
                                    query: zipCode.toString(),
                                },
                            },
                            filter: {
                                term: {
                                    isVerified: true,
                                },
                            },
                        },
                    },
                },
            });

            this.setState({ errorLocations: null });

            const result = res.hits.hits || [];
            return this.mapAndSaveLocations({ fetchedLocations: result });
        } catch (error) {
            this.setState({ errorLocations: 'Error fetching locations' });
            return [];
        }
    };

    getAverageRating = (numReviews, totalRating) => {
        if (numReviews === 0) {
            return 0;
        }

        return totalRating / numReviews;
    };

    mapAndSaveLocations = ({ fetchedLocations = [] }) => {
        if (_isEmpty(fetchedLocations)) {
            return fetchedLocations;
        }

        const formattedLocations = fetchedLocations.map(item => ({
            id: item._source.id,
            name: item._source.name,
            location: item._source.location,
            numReviews: item._source.numReviews,
            averageRating: this.getAverageRating(
                item._source.numReviews,
                item._source.totalRating
            ),
        }));

        this.setState({ locations: formattedLocations });
    };

    setPreferredLocation = ({ location = null, locationNumber = null }) => {
        const { preferredLocationOne, preferredLocationTwo } = this.state;

        if (!preferredLocationOne || !preferredLocationTwo || !location) {
            if (locationNumber === 'one') {
                this.setState({
                    preferredLocationOne: location,
                    selectedEmptyLocation: location ? 'two' : 'one',
                });
            }

            if (locationNumber === 'two') {
                this.setState({
                    preferredLocationTwo: location,
                    selectedEmptyLocation: location ? 'one' : 'two',
                });
            }
        }
    };

    selectEmptyLocation = ({ emptyLocation = null }) => {
        if (emptyLocation) {
            this.setState({ selectedEmptyLocation: emptyLocation });
        }
    };

    toggleShowLocations = async showLocations => {
        if (showLocations) {
            if (this.state.zipCode) {
                this.setState({ showLocations, loadingLocations: true });

                await this.fetchLocations();

                this.setState({ loadingLocations: false });
            }
        } else {
            this.setState({ showLocations });
            this.setLocalStateToPreferredLocations();
        }
    };

    handleZipCodeChange = e => {
        const { value } = e.target;
        this.setState({ zipCode: value });
    };

    render() {
        const {
            renderPanelHeader,
            offices,
            dentistId,
            hasPreferredDays,
        } = this.props;

        return (
            <Mutation mutation={updateDentist}>
                {(updateDentistMutation, { loading: updateLoading }) => (
                    <PreferredLocationsView
                        renderPanelHeader={renderPanelHeader}
                        searchLocations={this.state.locations}
                        ownLocations={offices}
                        setPreferredLocation={this.setPreferredLocation}
                        selectEmptyLocation={this.selectEmptyLocation}
                        toggleShowLocations={this.toggleShowLocations}
                        handleZipCodeChange={this.handleZipCodeChange}
                        hasPreferredDays={hasPreferredDays}
                        updateLoading={updateLoading}
                        handleOnSave={async () => {
                            try {
                                if (hasPreferredDays) {
                                    await updateDentistMutation({
                                        variables: {
                                            input: {
                                                id: dentistId,
                                                preferredLocations: [
                                                    _get(
                                                        this,
                                                        'state.preferredLocationOne.id',
                                                        null
                                                    ),
                                                    _get(
                                                        this,
                                                        'state.preferredLocationTwo.id',
                                                        null
                                                    ),
                                                ],
                                            },
                                        },
                                    });

                                    message.success(
                                        'Successfully saved preferred location(s)'
                                    );
                                } else {
                                    message.error(
                                        'Invalid recurring week day availability'
                                    );
                                }
                            } catch (error) {
                                message.error(
                                    'Error occurred, please try again'
                                );
                            }
                        }}
                        {...this.state}
                    />
                )}
            </Mutation>
        );
    }
}

export default PreferredLocations;
