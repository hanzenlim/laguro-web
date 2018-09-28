import React from 'react';
import { bool, func, string, shape, number } from 'prop-types';
import { Alert } from 'antd';
import defaultUserImage from '../../../../components/Image/defaultUserImage.svg';
import officePlaceholder from '../../../../components/Image/office-placeholder.png';

import {
    Modal,
    Text,
    TextArea,
    Box,
    Form,
    Rating,
    Image,
    Flex,
} from '../../../../components';
import { DENTIST } from '../../../../util/strings';

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
                height={73}
                width={73}
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
    return (
        <Flex mt={24}>
            <Box width="33.33%">
                <Image
                    src={imageUrl || officePlaceholder}
                    height="100%"
                    width="100%"
                    objectFit="cover"
                    alt="office-image"
                    borderRadius="4px"
                />
            </Box>
            <Box width="66.66%" pl={16}>
                <Text
                    fontSize={0}
                    fontWeight="bold"
                    color="text.gray"
                    css="text-transform: uppercase;"
                >
                    Dental Hospital
                </Text>
                <Text fontSize={3} lineHeight={1.89}>
                    {name}
                </Text>
            </Box>
        </Flex>
    );
};

const NewReviewModal = props => {
    const {
        visible,
        onCancel,
        setRating,
        info,
        onSuccess,
        rating,
        error,
        mutationLoading,
    } = props;

    const isDentist = info.type === DENTIST;

    return (
        <Modal visible={visible} onCancel={onCancel} destroyOnClose>
            <Text textAlign="center" fontSize={4} lineHeight="1.7">
                leave a review
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
                    my={20}
                    size="28px"
                    onChange={setRating}
                    allowHalf={false}
                    value={rating}
                />
            </Box>
            <Text fontSize={3}>how was your experience with {info.name}?</Text>
            <Box mt={10}>
                <Form layout="vertical" onSuccess={onSuccess}>
                    <FormItem name="text" input={<TextArea />} />
                    <SubmitButton
                        px={14}
                        width="188px"
                        textAlign="right"
                        buttonText="Submit"
                        disabled={rating === 0 || mutationLoading}
                        loading={mutationLoading}
                    />
                </Form>
                {error && <Alert message={error} type="error" />}
            </Box>
        </Modal>
    );
};

NewReviewModal.defaultProps = {
    onSuccess: () => {},
    onCancel: () => {},
    setRating: () => {},
};

NewReviewModal.propTypes = {
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

export default NewReviewModal;
