import React, { Component } from 'react';
import moment from 'moment';
import { get } from 'lodash';
import queryString from 'query-string';
import CreateListing from './CreateListing';
import { Box, Button, Form, Flex, Text, Icon } from '../../../components';
import history from '../../../history';

const { SubmitButton, BackButton } = Form;

class AddOfficeListing extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);
        const {
            // cleaningFee,
            // chairHourlyPrice,
            // startTime,
            // endTime,
            // numChairsAvailable,
            // name,
            officeId,
        } = this.urlParams;

        // if officeId is defined, office exists, no need
        // to create a new office
        this.state = {
            isExistingOffice: officeId !== undefined,
            listings: [
                <CreateListing
                    active
                    key={0}
                    data-index={0}
                    onClick={this.handleClickListing}
                />,
            ],
            activeListingIndex: 0,
        };

        // this.props.initialize({
        //     office: name,
        //     cleaningFee: cleaningFee || 1500,
        //     chairHourlyPrice: chairHourlyPrice || 5000,
        //     startTime: startTime ? moment(startTime) : getNextHalfHour(),
        //     endTime: endTime
        //         ? moment(endTime)
        //         : getNextHalfHour().add(2, 'hours'),
        //     numChairsAvailable: numChairsAvailable
        //         ? Number(numChairsAvailable)
        //         : 1,
        // });
    }

    async componentWillMount() {
        document.title = 'Laguro - New Listing';
    }

    handleBack = () => {
        const {
            chairHourlyPrice,
            cleaningFee,
            numChairsAvailable,
            endTime,
            startTime,
        } = this.props;

        const params = queryString.stringify({
            ...this.urlParams,
            startTime: moment(startTime).format(),
            endTime: moment(endTime).format(),
            chairHourlyPrice: chairHourlyPrice || 0,
            cleaningFee: cleaningFee || 0,
            numChairsAvailable,
        });

        history.push(`/landlord-onboarding/add-equipments?${params}`);
    };

    // async onSubmit(values) {
    // if (
    //     // if chosen duration is less than 2 hrs
    //     moment(values.startTime)
    //         .add(2, 'hours')
    //         .isAfter(values.endTime)
    // ) {
    //     throw new SubmissionError({
    //         endTime: 'Minimum reservation is 2 hours',
    //     });
    // } else if (!values.office) {
    //     throw new SubmissionError({
    //         office: 'Please select an office',
    //         _error: 'Please select an office above',
    //     });
    // } else {
    //     delete values.office;
    //     const {
    //         name,
    //         location,
    //         imageUrls,
    //         equipment,
    //         description,
    //         officeId,
    //     } = this.urlParams;
    //     if (!this.state.isExistingOffice) {
    //         await this.props.createOffice({
    //             name,
    //             location,
    //             hostId: this.props.auth.dentistId,
    //             imageUrls: JSON.parse(imageUrls),
    //             equipment: JSON.parse(equipment),
    //             description,
    //         });
    //     }
    //     // if opened from an existing office, use that officeId, else use
    //     // the newly created office's id
    //     await this.props.createListing({
    //         ...values,
    //         chairHourlyPrice: values.chairHourlyPrice,
    //         cleaningFee: values.cleaningFee,
    //         officeId: this.state.isExistingOffice
    //             ? officeId
    //             : this.props.offices[0].id,
    //     });
    // }
    // }

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
        if (!listingIndex) {
            return;
        }
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
                <Form>
                    {listings}
                    <BackButton
                        position="absolute"
                        type="primary"
                        ghost
                        width={188}
                        height={60}
                        top={230}
                        right={484}
                        buttonText="Previous"
                    />

                    <SubmitButton
                        position="absolute"
                        width={188}
                        height={60}
                        top={230}
                        left={422}
                        buttonText="Next"
                    />
                </Form>

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
