import React, { Fragment } from 'react';
import { bool, func, string, shape, number } from 'prop-types';
import { Alert } from 'antd';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import officePlaceholder from '../../../components/Image/office-placeholder.png';
import {
    Text,
    TextArea,
    Box,
    Form,
    Rating,
    Image,
    Flex,
    Responsive,
} from '../../../components';
import { DENTIST } from '../../../util/strings';

const { TabletMobile, Desktop } = Responsive;

const { FormItem, SubmitButton } = Form;

const DentistInfo = props => {
    const { imageUrl, specialty, name } = props;
    return (
        <Box textAlign="center" mt={10}>
            <Image
                src={imageUrl || defaultUserImage}
                alt="dentist-image"
                mx="auto"
                mb={10}
                borderRadius="50%"
                height={[102, '', 73]}
                width={[102, '', 73]}
                objectFit="cover"
            />
            <Text
                lineHeight={2.83}
                fontSize={0}
                fontWeight="bold"
                color="text.gray"
                css="text-transform: uppercase;"
            >
                {specialty}
            </Text>
            <Text fontSize={3}>{name}</Text>
        </Box>
    );
};

const OfficeInfo = props => {
    const { imageUrl, name } = props;
    const contents = [
        <Flex justifyContent="center" width={['100%', '', '33.33%']} m="auto">
            <Image
                src={imageUrl || officePlaceholder}
                height={['102px', '', '100%']}
                width={['127px', '', '100%']}
                mb={[10, '', 0]}
                objectFit="cover"
                alt="office-image"
                borderRadius="4px"
            />
        </Flex>,
        <Flex
            justifyContent="center"
            width={['100%', '', '66.66%']}
            pl={[0, '', 16]}
            m="auto"
        >
            <Box>
                <Text
                    fontSize={0}
                    fontWeight="bold"
                    color="text.gray"
                    css="text-transform: uppercase;"
                    textAlign={['center', '', 'inherit']}
                >
                    Dental Office
                </Text>
                <Text
                    fontSize={[4, '', 3]}
                    lineHeight={1.89}
                    textAlign={['center', '', 'inherit']}
                >
                    {name}
                </Text>
            </Box>
        </Flex>,
    ];
    return (
        <Fragment>
            <Desktop>
                <Flex mt={[0, '', 24]}>{contents}</Flex>
            </Desktop>
            <TabletMobile>
                <Box mt={[0, '', 24]}>{contents}</Box>
            </TabletMobile>
        </Fragment>
    );
};

const NewReview = props => {
    const {
        setRating,
        info,
        onSuccess,
        rating,
        error,
        mutationLoading,
    } = props;

    const isDentist = info.type === DENTIST;

    return (
        <Fragment>
            <Text
                textAlign="center"
                fontSize={[1, '', 4]}
                fontWeight={['bold', '', 'regular']}
                lineHeight={['30px', '', '1.7']}
                mb={[8, '', 0]}
            >
                Leave a review
            </Text>
            {isDentist && (
                <DentistInfo
                    imageUrl={info.imageUrl}
                    specialty={info.specialty}
                    name={info.name}
                />
            )}
            {!isDentist && (
                <OfficeInfo imageUrl={info.imageUrl} name={info.name} />
            )}
            <Box textAlign="center">
                <Rating
                    mt={[0, '', 20]}
                    mb={[10, '', 20]}
                    size="28px"
                    onChange={setRating}
                    allowHalf={false}
                    value={rating}
                />
            </Box>
            <Text fontSize={[2, '', 3]}>
                how was your experience with {info.name}?
            </Text>
            <Box mt={10}>
                <Form layout="vertical" onSuccess={onSuccess}>
                    <FormItem name="text" input={<TextArea />} />
                    <SubmitButton
                        px={14}
                        mb={[10, '', 0]}
                        width={['100%', '', '188px']}
                        textAlign="right"
                        buttonText="Submit"
                        disabled={rating === 0 || mutationLoading}
                        loading={mutationLoading}
                    />
                </Form>
                {error && <Alert message={error} type="error" />}
            </Box>
        </Fragment>
    );
};

NewReview.defaultProps = {
    onSuccess: () => {},
    onCancel: () => {},
    setRating: () => {},
};

NewReview.propTypes = {
    info: shape({
        type: string.isRequired,
        name: string.isRequired,
        imageUrl: string.isRequired,
        specialty: string,
    }),
    onSuccess: func.isRequired,
    onCancel: func.isRequired,
    setRating: func.isRequired,
    rating: number.isRequired,
    visible: bool.isRequired,
    error: string,
    mutationLoading: bool,
};

export default NewReview;
