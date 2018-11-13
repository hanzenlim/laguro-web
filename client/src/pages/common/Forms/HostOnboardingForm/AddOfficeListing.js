import React, { Component } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import CreateListing from './CreateListing';
import { Box, Button, Flex, Text, Icon } from '../../../../components';

class AddOfficeListing extends Component {
    constructor(props) {
        super(props);
        const { form, ...rest } = this.props;
        // inspect how many numChairsFields are currently in the url to know how many cards to initialize
        const numCards = Object.keys(props).filter(key =>
            key.startsWith('numChairs')
        );

        const listings = numCards.map((item, index) => (
            <CreateListing
                active={false}
                {...rest}
                form={form}
                key={index}
                data-index={index}
                onDelete={this.handleDeleteListing}
                onClick={this.handleClickListing}
            />
        ));

        this.state = {
            listings: !isEmpty(listings)
                ? listings
                : [
                      <CreateListing
                          active
                          {...rest}
                          form={form}
                          key={0}
                          data-index={0}
                          onDelete={this.handleDeleteListing}
                          onClick={this.handleClickListing}
                      />,
                  ],
            activeListingIndex: '0',
        };

        this.showListing(0);
    }

    async componentWillMount() {
        document.title = 'Laguro - New Listing';
    }

    hideListing = () => {
        const { activeListingIndex, listings } = this.state;
        listings[activeListingIndex] = React.cloneElement(
            listings[activeListingIndex],
            { active: false }
        );
    };

    handleAddListing = () => {
        const { listings } = this.state;
        this.hideListing();
        this.setState({
            listings: listings.concat([
                <CreateListing
                    {...this.props}
                    key={listings.length}
                    data-index={listings.length}
                    active
                    onDelete={this.handleDeleteListing}
                    onClick={this.handleClickListing}
                />,
            ]),
            activeListingIndex: listings.length,
        });
    };

    handleDeleteListing = e => {
        e.stopPropagation();

        const index = get(e, 'currentTarget.dataset.index');

        const { listings } = this.state;
        listings.splice(index, 1);

        this.setState({
            listings,
        });

        this.showListing(this.state.activeListingIndex - 1);
    };

    handleClickListing = e => {
        const { activeListingIndex } = this.state;
        if (get(e, 'currentTarget.dataset.index') === activeListingIndex) {
            return;
        }
        this.hideListing();
        this.showListing(get(e, 'currentTarget.dataset.index'));
    };

    showListing = listingIndex => {
        const { listings } = this.state;

        listings[listingIndex] = React.cloneElement(listings[listingIndex], {
            active: true,
        });

        this.setState({ listings, activeListingIndex: listingIndex });
    };

    calcTime() {
        const { startTime, endTime } = this.props;

        const minutes = endTime.diff(startTime, 'minutes');
        this.hours = minutes / 60;
    }

    render() {
        const { isOnboarding } = this.props;
        const { listings } = this.state;

        return (
            <Box>
                <Text
                    fontWeight="bold"
                    fontSize={[2, '', 5]}
                    lineHeight={['1.88', '', '1']}
                    letterSpacing="-0.6px"
                    color="text.gray"
                    mt={[0, '', 140]}
                    mb={[0, '', 18]}
                >
                    {isOnboarding && 'Step 3'}
                </Text>

                <Text
                    fontWeight="bold"
                    fontSize={[2, '', 5]}
                    lineHeight="1"
                    letterSpacing="-0.6px"
                    color="text.trueBlack"
                    mb={[21, '', 54]}
                >
                    {isOnboarding
                        ? "It's time to create your first listing!"
                        : 'Add a new listing'}
                </Text>
                <div>{listings}</div>

                <Button type="ghost" mt={16} ml={30}>
                    <Flex
                        height="22px"
                        onClick={this.handleAddListing}
                        alignItems="center"
                    >
                        <Icon
                            mr={16}
                            type="plus"
                            fontSize="14px"
                            color="icon.black"
                        />
                        <Text fontSize={[1, '', 3]} letterSpacing="-0.5px">
                            Add another listing
                        </Text>
                    </Flex>
                </Button>
            </Box>
        );
    }
}

export default AddOfficeListing;
