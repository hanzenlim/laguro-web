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
    Responsive,
} from '../../../components';
import LocationFilter from '../LocationFilter';
import { EDIT_OFFICE_MODE } from '../../../util/strings';

const { Desktop, TabletMobile } = Responsive;
const { GridItem } = Grid;
const { FormItem } = InnerForm;
const maxImageNum = 5;

class AddOfficeInfo extends Component {
    constructor(props) {
        super(props);
        const { imageUrls, locationLat, locationLong, location } = props;
        const imageUrlsForState = imageUrls || [];

        this.state = {
            imageUrls: imageUrlsForState,
            locationLat,
            locationLong,
            options: [],
            location,
            isAutocompleteTouched: false,
        };

        props.onImageChange(imageUrlsForState.length);
    }

    // this is to trigger an update of add-office step when getOffice data arrives
    componentDidUpdate(prevProps) {
        if (this.props.officeName !== prevProps.officeName) {
            const { imageUrls = [], form, onImageChange } = this.props;
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

        this.setState({ location: get(location, 'name') });

        if (handleSelect && !isEmpty(location)) {
            handleSelect();
        }
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
        let { imageUrls } = this.state;

        // TODO standardize whether params at all strings or objects
        if (imageUrls.length > 5) {
            imageUrls = JSON.parse(imageUrls);
        }

        this.setState({
            imageUrls: imageUrls.filter(item => item !== url),
        });

        this.props.onImageChange(imageUrls.length - 1);
    };

    renderUploadedImages = () => {
        let { imageUrls } = this.state;

        // TODO standardize whether params at all strings or objects
        if (imageUrls.length > 5) {
            imageUrls = JSON.parse(imageUrls);
        }

        return (
            !isEmpty(imageUrls) &&
            imageUrls.map((url, index) => (
                <Box
                    key={index}
                    position="relative"
                    width="100%"
                    height={['calc(50vw - 31px)', '', '100%']}
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
                        width={[50, '', 'auto']}
                        top={[0, '', '-9px']}
                        right={[0, '', '-9px']}
                        data-url={url}
                        onClick={this.removeImage}
                    >
                        <TabletMobile>
                            <Icon
                                fontSize={5}
                                color="icon.lightGray"
                                type="close"
                            />
                        </TabletMobile>
                        <Desktop>
                            <Box bg="background.white" borderRadius="9px">
                                <Icon
                                    fontSize={3}
                                    color="icon.lightGray"
                                    type="close-circle"
                                />
                            </Box>
                        </Desktop>
                    </Button>
                </Box>
            ))
        );
    };

    handleSearch = options => {
        this.setState({ options });
    };

    validateLocation = (rule, value, callback) => {
        const { options } = this.state;
        const { form } = this.props;
        const location = form.getFieldValue('location');

        if (this.props.locationDisabled) {
            callback();
        }

        if (location === this.state.location) {
            callback();
        }

        // if options is not empty and the location field is not found in the dropdown options and if location form input is not empty, autocomplete has error
        const hasError =
            options &&
            !options.map(item => item.text).includes(location) &&
            !isEmpty(location);

        if (hasError) {
            callback('Please select an address from the dropdown!');
        }
    };

    render() {
        const {
            form,
            locationDisabled,
            firstName,
            lastName,
            header,
            mode,
        } = this.props;

        return (
            <InnerForm form={form} {...this.props}>
                <Grid
                    gridTemplateColumns={['100%', '', '294px 36px 294px']}
                    gtr="auto auto auto auto auto auto auto auto"
                >
                    <GridItem gc="all">
                        <Text
                            fontWeight="bold"
                            fontSize={[2, '', 5]}
                            lineHeight={['1.88', '', '1']}
                            letterSpacing="-0.6px"
                            color="text.gray"
                            mt={['', '', 140]}
                            mb={[0, '', 18]}
                        >
                            Step 1
                        </Text>
                    </GridItem>
                    {mode !== EDIT_OFFICE_MODE && (
                        <GridItem gc="all">
                            <Text
                                fontWeight="bold"
                                fontSize={[2, '', 5]}
                                lineHeight={[1.38, '', 1]}
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
                            fontSize={[2, '', 5]}
                            lineHeight="1"
                            letterSpacing="-0.6px"
                            color="text.trueBlack"
                            mb={[21, '', 54]}
                        >
                            {header}
                        </Text>
                    </GridItem>

                    <GridItem gc="all">
                        <Text
                            fontWeight="bold"
                            fontSize={[0, '', 4]}
                            lineHeight="1"
                            letterSpacing="0px"
                            color="text.blue"
                            mb={[10, '', 20]}
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
                                    placeholder="Bell Dental Center"
                                />
                            }
                        />
                    </GridItem>
                    {/* for edit office mode, location is disabled */}
                    <GridItem gc="all">
                        <FormItem
                            name="location"
                            label="Address"
                            rules={[
                                {
                                    required: mode !== EDIT_OFFICE_MODE,
                                    message:
                                        'Please enter the address of your office',
                                },
                                {
                                    validator: this.validateLocation,
                                },
                            ]}
                            input={
                                <LocationFilter
                                    withDentists={false}
                                    width="100%"
                                    locationType="address"
                                    onLocationChange={this.handleLocationChange}
                                    onSearch={this.handleSearch}
                                    placeholder="San Francisco, California"
                                    disabled={locationDisabled}
                                    height={50}
                                    type="hostOnboarding"
                                />
                            }
                        />
                    </GridItem>

                    <GridItem gc="1/2">
                        <FormItem
                            name="addressDetail"
                            label="Suite, unit, building, etc. (optional)"
                            input={
                                <Input
                                    disabled={locationDisabled}
                                    height="50px"
                                    placeholder=""
                                />
                            }
                        />
                    </GridItem>

                    <GridItem gc="all">
                        <FormItem
                            name="photos"
                            tooltip="Upload images of your office. The first image will show up on search results."
                            label={`Featured Images (up to ${maxImageNum})`}
                            input={
                                <Grid
                                    gcg="10px"
                                    grg="10px"
                                    gridTemplateRows={['auto', '', '94px']}
                                    gridTemplateColumns={[
                                        '1fr 1fr',
                                        '',
                                        'repeat(6, 94px)',
                                    ]}
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
                                                <Button
                                                    height={[
                                                        'calc(50vw - 31px)',
                                                        '',
                                                        '100%',
                                                    ]}
                                                    type="ghost"
                                                    onClick={onPick}
                                                >
                                                    <Box
                                                        width="100%"
                                                        height="100%"
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
