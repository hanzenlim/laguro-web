import React, { Component } from 'react';
import queryString from 'query-string';
import ReactFilestack from 'filestack-react';
import styled from 'styled-components';
import { get } from 'lodash';
import history from '../../../history';
import { filestackKey } from '../../../config/keys';
import { officeImageRatio } from '../../../util/uiUtil';
import {
    Box,
    Container,
    Flex,
    Form,
    Icon,
    Image,
    Input,
    Text,
} from '../../../components';
import LocationFilter from '../LocationFilter';
// import { addTooltip } from './sharedComponents';
const { FormItem, SubmitButton } = Form;

const StyledImageBoxContainer = styled(Box)`
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: repeat(4, 94px [col-start]);
`;

const Grid = styled(Box)`
    display: grid;
    grid-template-columns: 188px 150px 942px;
`;

const imageBoxHeight = '94';

class AddOfficeInfo extends Component {
    constructor() {
        super();

        this.urlParams = queryString.parse(history.location.search);
        const { imageUrls, location } = this.urlParams;

        this.state = {
            currentLocation: location || '',
            imageUrls: imageUrls ? JSON.parse(imageUrls) : [],
        };
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
    }

    handleLocationChange = location => {
        this.setState({
            currentLocation: location,
        });
    };

    onSubmit = values => {
        const params = queryString.stringify({
            ...this.urlParams,
            ...values,
            imageUrls: JSON.stringify(this.state.imageUrls),
        });

        history.push(`/landlord-onboarding/add-equipments?${params}`);
    };

    extractUrlToState = result => {
        const upload = result.filesUploaded;
        let allUrls = [];
        if (upload.length) {
            allUrls = upload.map(file => file.url);
        }
        this.setState({ imageUrls: this.state.imageUrls.concat(allUrls) });
    };

    removeImage = e => {
        const { url } = e.target.dataset;
        this.setState({
            imageUrls: this.state.imageUrls.filter(item => item !== url),
        });
    };

    renderUploadedImages = () => {
        const { imageUrls } = this.state;

        return imageUrls.map((url, index) => (
            <Box
                position="relative"
                width={`${imageBoxHeight}px`}
                height={`${imageBoxHeight}px`}
            >
                <Image
                    src={url}
                    key={`img${index}`}
                    alt="office"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                />
                <Box
                    bg="background.white"
                    position="absolute"
                    top="-9px"
                    right="-9px"
                    lineHeight="1"
                    borderRadius="9px"
                >
                    <Icon
                        fontSize="18px"
                        data-url={url}
                        color="#b9b9b9"
                        type="close-circle"
                        onClick={this.removeImage}
                    />
                </Box>
            </Box>
        ));
    };
    // {addTooltip('Upload images of your office. The first image will show up on search results.')}
    render() {
        const { steps } = this.props;
        const { location, ...rest } = this.urlParams;
        const currentLocation = get(this, 'state.currentLocation');

        return (
            <Container>
                <Grid>
                    {steps}
                    <Box />
                    <Box maxWidth="620px">
                        <Form {...rest} onSuccess={this.onSubmit}>
                            <Text
                                fontWeight="bold"
                                fontSize={5}
                                lineHeight="1"
                                letterSpacing="-0.6px"
                                color="text.gray"
                                mt={140}
                                mb={18}
                            >
                                Step 1
                            </Text>
                            <Text
                                fontWeight="bold"
                                fontSize={5}
                                lineHeight="1"
                                letterSpacing="-0.6px"
                                color="text.trueBlack"
                                mr={8}
                            >
                                Hi Andrew
                            </Text>
                            <Text
                                fontWeight="bold"
                                fontSize={5}
                                lineHeight="1"
                                letterSpacing="-0.6px"
                                color="text.trueBlack"
                                mb={54}
                            >
                                let&#39;s start with some basic info about your
                                office
                            </Text>

                            <Text
                                fontWeight="bold"
                                fontSize={4}
                                lineHeight="1"
                                letterSpacing="0px"
                                color="text.green"
                                mb={20}
                            >
                                Office Details
                            </Text>

                            <FormItem
                                name="officeName"
                                label="Office name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input the name of your office',
                                    },
                                ]}
                                input={
                                    <Input
                                        height="50px"
                                        placeHolder="Bell Dental"
                                    />
                                }
                            />

                            <FormItem
                                name="location"
                                label="Location"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input the address of your office',
                                    },
                                ]}
                                input={
                                    <LocationFilter
                                        withDentists={false}
                                        onLocationChange={
                                            this.handleLocationChange
                                        }
                                        height={50}
                                        type="hostOnboarding"
                                    />
                                }
                            />

                            <FormItem
                                name="addressDetail"
                                label="Apartment, suite, unit, etc."
                                input={<Input height="50px" placeHolder="" />}
                            />
                            <FormItem
                                name="photos"
                                label="photos"
                                input={
                                    <StyledImageBoxContainer
                                        mb={75}
                                        display="grid"
                                    >
                                        {this.renderUploadedImages()}
                                        <ReactFilestack
                                            apikey={filestackKey}
                                            options={{
                                                accept: ['image/*'],
                                                imageMin: [300, 300],
                                                maxFiles: 5,
                                                fromSources: [
                                                    'local_file_system',
                                                    'url',
                                                    'imagesearch',
                                                    'facebook',
                                                    'instagram',
                                                ],
                                                transformations: {
                                                    crop: {
                                                        aspectRatio: officeImageRatio,
                                                        force: true,
                                                    },
                                                },
                                                uploadInBackground: false,
                                                storeTo: {
                                                    container: 'office-photos',
                                                },
                                            }}
                                            onSuccess={result =>
                                                this.extractUrlToState(result)
                                            }
                                            render={({ onPick }) => (
                                                <Box
                                                    width={`${imageBoxHeight}px`}
                                                    height={`${imageBoxHeight}px`}
                                                    onClick={onPick}
                                                    bg="rgba(96, 96, 96, 0.1)"
                                                >
                                                    <Flex
                                                        width="100%"
                                                        height="100%"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                    >
                                                        <Icon
                                                            type="plus"
                                                            fontSize="31px"
                                                            lineHeight="41px"
                                                            color="rgba(182, 182, 182, 0.7)"
                                                            fontWeight="bold"
                                                        />
                                                    </Flex>
                                                </Box>
                                            )}
                                        />
                                    </StyledImageBoxContainer>
                                }
                            />
                            <SubmitButton
                                position="absolute"
                                disabled={!currentLocation}
                                width={188}
                                height={60}
                                top={200}
                                left={470}
                                buttonText="Next"
                            />
                            <Box height={300} />
                        </Form>
                    </Box>
                </Grid>
            </Container>
        );
    }
}

export default AddOfficeInfo;
