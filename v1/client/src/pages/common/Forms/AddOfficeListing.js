import React, { Component } from 'react';
import moment from 'moment';
import queryString from 'query-string';
import styled from 'styled-components';
import CreateListing from './CreateListing';
import { Box, Button, Container, Flex, Text, Icon } from '../../../components';
import history from '../../../history';

const StyledContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    max-width: 1080px;
    padding: 5em 10px;
    margin: 0 auto;
`;

const Grid = styled(Box)`
    display: grid;
    grid-template-columns: 188px 150px 942px;

    > :nth-child(4) {
        grid-column: 1 / 4;
    }
`;

class NewListing extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);
        const {
            cleaningFee,
            chairHourlyPrice,
            startTime,
            endTime,
            numChairsAvailable,
            name,
            officeId,
        } = this.urlParams;

        // if officeId is defined, office exists, no need
        // to create a new office
        this.state = { isExistingOffice: officeId !== undefined };

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
    //     if (
    //         // if chosen duration is less than 2 hrs
    //         moment(values.startTime)
    //             .add(2, 'hours')
    //             .isAfter(values.endTime)
    //     ) {
    //         throw new SubmissionError({
    //             endTime: 'Minimum reservation is 2 hours',
    //         });
    //     } else if (!values.office) {
    //         throw new SubmissionError({
    //             office: 'Please select an office',
    //             _error: 'Please select an office above',
    //         });
    //     } else {
    //         delete values.office;

    //         const {
    //             name,
    //             location,
    //             imageUrls,
    //             equipment,
    //             description,
    //             officeId,
    //         } = this.urlParams;
    //         if (!this.state.isExistingOffice) {
    //             await this.props.createOffice({
    //                 name,
    //                 location,
    //                 hostId: this.props.auth.dentistId,
    //                 imageUrls: JSON.parse(imageUrls),
    //                 equipment: JSON.parse(equipment),
    //                 description,
    //             });
    //         }

    //         // if opened from an existing office, use that officeId, else use
    //         // the newly created office's id
    //         await this.props.createListing({
    //             ...values,
    //             chairHourlyPrice: values.chairHourlyPrice,
    //             cleaningFee: values.cleaningFee,
    //             officeId: this.state.isExistingOffice
    //                 ? officeId
    //                 : this.props.offices[0].id,
    //         });
    //     }
    // }

    calcTime() {
        const { startTime, endTime } = this.props;
        const minutes = endTime.diff(startTime, 'minutes');
        this.hours = minutes / 60;
    }

    render() {
        const { steps } = this.props;

        return (
            <Container>
                <Grid>
                    {steps}
                    <Box />
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
                            It's time to create your first listing!
                        </Text>
                        <CreateListing />
                        <Flex mt={26}>
                            <Icon
                                lineHeight="21px"
                                mr={16}
                                type="plus"
                                fontSize="14px"
                                color="icon.black"
                            />
                            <Box> Add more</Box>{' '}
                        </Flex>
                    </Box>

                    <Box height={180} />

                    <Button inverted type="ghost" width={188} height={60}>
                        Previous
                    </Button>

                    <Box />

                    <Flex justifyContent="flex-end">
                        <Button width={188} height={60}>
                            Next
                        </Button>
                    </Flex>
                </Grid>
            </Container>
        );
    }
}

export default NewListing;
