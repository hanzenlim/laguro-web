import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactFilestack from 'filestack-react';

import {
    Box,
    Link,
    Text,
    Flex,
    Image,
    Button,
    Icon,
    Modal,
} from '~/components';
import { ContainerPaddingInPixels } from '~/components/Container';
import { withScreenSizes } from '~/components/Responsive';
import { secureFilestackKey } from '../../../keys';
import { resizeSecureImage } from '~/util/imageUtil';
import { getLTMBaseUrl } from '~/util/urls';

const imageBoxHeight = 94;
const maxImageNum = 4;

const StyledModal = styled(Modal)`
    && {
        width: 950px;
    }
`;

const StyledBox = styled(Box)`
    // using styled-system for borders was not working
    && {
        border: 1px solid;
        border-color: ${props => props.theme.colors.divider.gray};

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            border-left: 1px solid;
            border-right: 1px solid;
            border-color: ${props => props.theme.colors.divider.gray};
        }
    }
`;

const LTM_LINK_BASE_URL = getLTMBaseUrl();

class PatientCard extends PureComponent {
    renderUploadedImages = () => {
        const { signedPatientImages, removeImage, onImageClick } = this.props;
        return signedPatientImages.map((url, index) => (
            <Box
                key={index}
                position="relative"
                width={imageBoxHeight}
                height={imageBoxHeight}
                mr={10}
                mb={10}
            >
                <Button
                    type="ghost"
                    height="100%"
                    data-url={url}
                    onClick={onImageClick}
                >
                    <Image
                        src={resizeSecureImage(url, imageBoxHeight)}
                        key={`img${index}`}
                        alt="office"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />
                </Button>
                <Button
                    type="ghost"
                    position="absolute"
                    top="-9px"
                    right="-9px"
                    height="auto"
                    data-url={url}
                    onClick={removeImage}
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
        ));
    };

    render() {
        const {
            name,
            visitDate,
            imageUrl,
            isDocumentListOpen,
            toggleDocumentList,
            loadPhotos,
            signedPatientImages,
            clickedImgUrl,
            modalVisible,
            onCancel,
            hasNextAppointment,
            uploadPolicySignature,
            patientId,
        } = this.props;
        return (
            <StyledBox
                px={[ContainerPaddingInPixels, '', 15]}
                py={15}
                mb={[-1, '', 12]}
            >
                <Flex alignItems={['flex-start', '', 'center']}>
                    <Box width={[60, '', 88]} height={[60, '', 88]} mr={16}>
                        <Image
                            src={resizeSecureImage(imageUrl, 88)}
                            alt={name}
                            width="100%"
                            borderRadius="50%"
                            objectFit="cover"
                        />
                    </Box>
                    <Box flex="1">
                        <Link
                            isExternal
                            target="_blank"
                            rel="noopener"
                            to={`${LTM_LINK_BASE_URL}/go?to=/chart&patientId=${patientId}`}
                        >
                            <Text fontSize={[2, '', 4]} fontWeight="medium">
                                {name}
                            </Text>
                        </Link>
                        <Flex
                            justifyContent="space-between"
                            alignItems={['flex-start', '', 'center']}
                            flexDirection={['column', '', 'row']}
                        >
                            <Text fontSize={[1, '', 3]} fontWeight="light">
                                {hasNextAppointment
                                    ? 'Next visit:'
                                    : 'Last visit:'}{' '}
                                {visitDate}
                            </Text>
                            <Button
                                type="ghost"
                                ml={[0, '', 16]}
                                onClick={toggleDocumentList}
                                height={['40px', '', '50px']}
                            >
                                <Text fontSize={1} color="text.blue">
                                    {signedPatientImages.length
                                        ? `View ${signedPatientImages.length} Documents`
                                        : 'Add Documents'}
                                </Text>
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
                {isDocumentListOpen && (
                    <Box mt={15} pl={[76, '', 104]}>
                        <Text fontSize={1} mb={13}>
                            Patient Documents
                        </Text>
                        <Flex alignItems="center" flexWrap="wrap">
                            {this.renderUploadedImages()}
                            <ReactFilestack
                                apikey={secureFilestackKey}
                                security={{
                                    policy: uploadPolicySignature.policy,
                                    signature: uploadPolicySignature.signature,
                                }}
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
                                    uploadInBackground: false,
                                    storeTo: {
                                        location: 's3',
                                    },
                                }}
                                onSuccess={result => loadPhotos(result)}
                                render={({ onPick }) => (
                                    <Button
                                        type="ghost"
                                        height="auto"
                                        mb={10}
                                        onClick={onPick}
                                    >
                                        <Box
                                            width={imageBoxHeight}
                                            height={imageBoxHeight}
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
                                )}
                            />
                        </Flex>
                    </Box>
                )}
                <StyledModal
                    visible={modalVisible}
                    onCancel={onCancel}
                    width="1000px"
                >
                    <Flex width={952} p={20}>
                        <Image
                            src={clickedImgUrl}
                            alt="My patient's document"
                            width="100%"
                            height="100%"
                        />
                    </Flex>
                </StyledModal>
            </StyledBox>
        );
    }
}

PatientCard.propTypes = {
    toggleDocumentList: PropTypes.func,
    loadPhotos: PropTypes.func,
    removeImage: PropTypes.func,
    signedPatientImages: PropTypes.arrayOf(PropTypes.string.isRequired),
    isDocumentListOpen: PropTypes.bool,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    visitDate: PropTypes.string.isRequired,
    hasNextAppointment: PropTypes.bool,
};

export default withScreenSizes(PatientCard);
