import React, { Component } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import CreateListing from './CreateListing';
import { Box, Button, Flex, Text, Icon } from '../../../components';

class AddOfficeListing extends Component {
    constructor(props) {
        super(props);
        const { form, ...rest } = this.props;

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
                onClick={this.handleClickListing}
            />
        ));

        this.state = {
            // isExistingOffice: officeId !== undefined,
            listings: !isEmpty(listings)
                ? listings
                : [
                      <CreateListing
                          active
                          {...rest}
                          form={form}
                          key={0}
                          data-index={0}
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
                    onClick={this.handleClickListing}
                />,
            ]),
            activeListingIndex: listings.length,
        });
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
        // if (!listingIndex) {
        //     return;
        // }
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
        const { listings } = this.state;

        return (
            <Box maxWidth="667px">
                <Text
                    fontWeight="bold"
                    fontSize={5}
                    lineHeight="1"
                    letterSpacing="-0.6px"
                    color="text.gray"
                    mt={140}
                    mb={18}
                >
                    Step 3
                </Text>

                <Text
                    fontWeight="bold"
                    fontSize={5}
                    lineHeight="1"
                    letterSpacing="-0.6px"
                    color="text.trueBlack"
                    mb={54}
                >
                    It&#39;s time to create your first listing!
                </Text>
                <div>{listings}</div>

                <Button type="ghost" mt={16} ml={30}>
                    <Flex width="100px" onClick={this.handleAddListing}>
                        <Icon
                            lineHeight="21px"
                            mr={16}
                            type="plus"
                            fontSize="14px"
                            color="icon.black"
                        />
                        <Text
                            fontSize={3}
                            lineHeight={1}
                            letterSpacing="-0.5px"
                        >
                            Add more
                        </Text>
                    </Flex>
                </Button>
            </Box>
        );
    }
}

export default AddOfficeListing;
