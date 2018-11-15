import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactFilestack from 'filestack-react';

import {
    Box,
    Text,
    Flex,
    Image,
    Button,
    Icon,
    Modal,
} from '../../../../components';
import { ContainerPaddingInPixels } from '../../../../components/Container';
import { withScreenSizes } from '../../../../components/Responsive';
import { filestackKey } from '../../../../config/keys';
import { setImageSizeToUrl } from '../../../../util/imageUtil';

const imageBoxHeight = 94;
const maxImageNum = 4;

const StyledModal = styled(Modal)`
    && {
        width: 950px;
    }
`;

class PatientCard extends PureComponent {
    renderUploadedImages = () => {
        const { patientImages, removeImage, onImageClick } = this.props;
        return patientImages.map((url, index) => (
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
                        src={setImageSizeToUrl(url, imageBoxHeight)}
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
            patientImages,
            documentUrl,
            clickedImgUrl,
            modalVisible,
            onCancel,
            hasNextAppointment,
        } = this.props;

        return (
            <Box
                px={[ContainerPaddingInPixels, '', 15]}
                py={15}
                mb={[-1, '', 12]}
                border="1px solid"
                borderLeft={['none', '', '1px solid']}
                borderRight={['none', '', '1px solid']}
                borderColor="divider.gray"
            >
                <Flex alignItems={['flex-start', '', 'center']}>
                    <Box width={[60, '', 88]} height={[60, '', 88]} mr={16}>
                        <Image
                            src={setImageSizeToUrl(imageUrl, 88)}
                            alt={name}
                            width="100%"
                            borderRadius="50%"
                            objectFit="cover"
                        />
                    </Box>
                    <Box flex="1">
                        <Text fontSize={[2, '', 4]} fontWeight="medium">
                            {name}
                        </Text>
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
                                    {patientImages.length
                                        ? `View ${
                                              patientImages.length
                                          } Documents`
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
                        {documentUrl && (
                            <Text fontSize={1} mt={15}>
                                Held History Form{' '}
                                <a href={documentUrl} target="_blank">
                                    <Text is="span" color="text.blue">
                                        View
                                    </Text>
                                </a>
                            </Text>
                        )}
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
            </Box>
        );
    }
}

PatientCard.propTypes = {
    toggleDocumentList: PropTypes.func,
    loadPhotos: PropTypes.func,
    removeImage: PropTypes.func,
    patientImages: PropTypes.arrayOf(PropTypes.string.isRequired),
    isDocumentListOpen: PropTypes.bool,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    visitDate: PropTypes.string.isRequired,
    documentUrl: PropTypes.string,
    hasNextAppointment: PropTypes.bool,
};

export default withScreenSizes(PatientCard);
