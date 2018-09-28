import React, { Component } from 'react';
import ReactFilestack from 'filestack-react';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { filestackKey } from '../../../config/keys';
import { officeImageRatio } from '../../../util/uiUtil';
import {
    Box,
    Button,
    Flex,
    InnerForm,
    Grid,
    Icon,
    Image,
    Input,
    Text,
} from '../../../components';
import LocationFilter from '../LocationFilter';

const { GridItem } = Grid;

const { FormItem } = InnerForm;
const imageBoxHeight = '94px';
const maxImageNum = 5;

class AddOfficeInfo extends Component {
    constructor(props) {
        super(props);
        const { imageUrls } = props;
        const imageUrlsForState =
            (!isEmpty(imageUrls) && JSON.parse(imageUrls)) || [];

        this.state = {
            autoCompleteHasError: false,
            imageUrls: imageUrlsForState,
        };

        props.onImageChange(imageUrlsForState.length);
    }

    // this is to trigger an update of add-office step when getOffice data arrives
    componentDidUpdate(prevProps) {
        if (this.props.officeName !== prevProps.officeName) {
            const { imageUrls, form, onImageChange } = this.props;
            form.setFieldsValue(this.props);
            this.setState({ imageUrls });

            onImageChange(imageUrls.length);
        }
    }

    componentWillMount() {
        document.title = 'Laguro - New Office';
    }

    handleLocationChange = location => {
        const { handleSelect } = this.props;
        this.setState({
            locationLat: get(location, 'lat'),
            locationLong: get(location, 'long'),
        });

        if (handleSelect && !isEmpty(location)) {
            handleSelect();
        }

        this.checkIfAutoCompleteHasError();
    };

    handleBlur = () => {
        this.checkIfAutoCompleteHasError();
    };

    handleChange = () => {
        this.setState({ autoCompleteHasError: false });
    };

    checkIfAutoCompleteHasError = () => {
        const hasError = this.autoCompleteHasError();
        this.setState({
            autoCompleteHasError: hasError,
        });
    };

    loadPhotos = result => {
        const { imageUrls } = this.state;

        const upload = result.filesUploaded;
        let allUrls = [];
        if (upload.length) {
            allUrls = upload.map(file => file.url);
        }
        allUrls = allUrls.slice(0, maxImageNum - imageUrls.length);

        const newImageUrls = imageUrls.concat(allUrls);
        this.setState({ imageUrls: newImageUrls });
        this.props.onImageChange(newImageUrls.length);
    };

    canUploadPhotos = () => {
        const { imageUrls } = this.state;
        return imageUrls.length < maxImageNum;
    };

    removeImage = e => {
        const { url } = e.currentTarget.dataset;
        const { imageUrls } = this.state;
        this.setState({
            imageUrls: imageUrls.filter(item => item !== url),
        });

        this.props.onImageChange(imageUrls.length - 1);
    };

    renderUploadedImages = () => {
        const { imageUrls } = this.state;
        return (
            !isEmpty(imageUrls) &&
            imageUrls.map((url, index) => (
                <Box
                    position="relative"
                    width={imageBoxHeight}
                    height={imageBoxHeight}
                >
                    <Image
                        src={url}
                        key={`img${index}`}
                        alt="office"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />
                    <Button
                        type="ghost"
                        position="absolute"
                        top="-9px"
                        right="-9px"
                        data-url={url}
                        onClick={this.removeImage}
                    >
                        <Box bg="background.white" borderRadius="9px">
                            <Icon
                                fontSize={3}
                                color="icon.lightGray"
                                type="close-circle"
                            />
                        </Box>
                    </Button>
                </Box>
            ))
        );
    };

    handleSearch = options => {
        this.setState({ options });
    };

    autoCompleteHasError = () => {
        const { options } = this.state;
        const { form } = this.props;
        const locationFormValue = form.getFieldValue('location');

        // if options is not empty and the location field is not found in the dropdown options and if location form input is not empty, autocomplete has error
        return (
            options &&
            !options.map(item => item.text).includes(locationFormValue) &&
            !isEmpty(locationFormValue)
        );
    };

    renderError = () => (
        <Box className="has-error">
            <Text className="ant-form-explain">
                Please select an address from the dropdown!
            </Text>
        </Box>
    );

    // {addTooltip('Upload images of your office. The first image will show up on search results.')}
    render() {
        const {
            form,
            locationDisabled,
            firstName,
            lastName,
            header,
            ...rest
        } = this.props;
        const { autoCompleteHasError } = this.state;

        return (
            <InnerForm form={form} {...rest}>
                <Grid
                    gtc="294px 36px 294px"
                    gtr="auto auto auto auto auto auto auto auto"
                >
                    <GridItem gc="all">
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
                    </GridItem>
                    {header !== 'Edit' && (
                        <GridItem gc="all">
                            <Text
                                fontWeight="bold"
                                fontSize={5}
                                lineHeight="1"
                                letterSpacing="-0.6px"
                                color="text.trueBlack"
                                mr={8}
                            >
                                {`Hi ${firstName} ${lastName},`}
                            </Text>
                        </GridItem>
                    )}
                    <GridItem gc="all">
                        <Text
                            fontWeight="bold"
                            fontSize={5}
                            lineHeight="1"
                            letterSpacing="-0.6px"
                            color="text.trueBlack"
                            mb={54}
                        >
                            {header}
                        </Text>
                    </GridItem>

                    <GridItem gc="all">
                        <Text
                            fontWeight="bold"
                            fontSize={4}
                            lineHeight="1"
                            letterSpacing="0px"
                            color="text.green"
                            mb={20}
                        >
                            OFFICE DETAILS
                        </Text>
                    </GridItem>
                    <GridItem gc="all">
                        <FormItem
                            name="officeName"
                            label="Office Name"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Please enter the name of your office',
                                },
                            ]}
                            input={
                                <Input
                                    height="50px"
                                    placeHolder="Bell Dental Center"
                                />
                            }
                        />
                    </GridItem>
                    {/* for edit office mode, location is disabled */}
                    {!locationDisabled && (
                        <GridItem gc="all">
                            <FormItem
                                name="location"
                                label="Address"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please enter the address of your office',
                                    },
                                ]}
                                input={
                                    <LocationFilter
                                        withDentists={false}
                                        onLocationChange={
                                            this.handleLocationChange
                                        }
                                        onBlur={this.handleBlur}
                                        onChange={this.handleChange}
                                        onSearch={this.handleSearch}
                                        height={50}
                                        placeHolder={
                                            '1598 Washington Ave San Leandro, CA 94577'
                                        }
                                        type="hostOnboarding"
                                    />
                                }
                            />
                            <Box>
                                {autoCompleteHasError && (
                                    <Box mt={-18} mb={20}>
                                        {this.renderError()}
                                    </Box>
                                )}
                            </Box>
                        </GridItem>
                    )}
                    {!locationDisabled && (
                        <GridItem gc="1/2">
                            <FormItem
                                name="addressDetail"
                                label="Suite, unit, building, etc. (optional)"
                                input={<Input height="50px" placeHolder="" />}
                            />
                        </GridItem>
                    )}
                    <GridItem gc="all">
                        <FormItem
                            name="photos"
                            label={`Featured Images (up to ${maxImageNum})`}
                            input={
                                <Grid
                                    gcg="10px"
                                    grg="10px"
                                    gtc="repeat(6, 94px)"
                                    gc="all"
                                    mt={10}
                                >
                                    {this.renderUploadedImages()}
                                    <ReactFilestack
                                        apikey={filestackKey}
                                        options={{
                                            accept: ['image/*'],
                                            imageMin: [300, 300],
                                            maxFiles: maxImageNum,
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
                                            this.loadPhotos(result)
                                        }
                                        render={({ onPick }) =>
                                            this.canUploadPhotos() && (
                                                <Button type="ghost">
                                                    <Box
                                                        width={imageBoxHeight}
                                                        height={imageBoxHeight}
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
                                                                fontSize={5}
                                                                color="icon.gray"
                                                                fontWeight="bold"
                                                            />
                                                        </Flex>
                                                    </Box>
                                                </Button>
                                            )
                                        }
                                    />
                                </Grid>
                            }
                        />
                    </GridItem>
                </Grid>
            </InnerForm>
        );
    }
}

export default AddOfficeInfo;
