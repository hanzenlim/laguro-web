import React, { PureComponent } from 'react';
import ReactFilestack from 'filestack-react';

import { Box, Text, Flex, Image, Button, Icon } from '../../../../components';
import { filestackKey } from '../../../../config/keys';

const imageBoxHeight = '94px';
const maxImageNum = 4;

class PatientCard extends PureComponent {
    renderUploadedImages = () => {
        const { patientImages, removeImage } = this.props;
        return patientImages.map((url, index) => (
            <Box
                key={index}
                position="relative"
                width={imageBoxHeight}
                height={imageBoxHeight}
                mr={10}
                mb={10}
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
            lastVisit,
            imageUrl,
            isDocumentListOpen,
            toggleDocumentList,
            loadPhotos,
            patientImages,
            documentUrl,
        } = this.props;
        return (
            <Box p={15} mb={12} border="1px solid" borderColor="divider.gray">
                <Flex alignItems="center">
                    <Box width={88} height={88} mr={16}>
                        <Image
                            src={imageUrl}
                            alt={name}
                            width="100%"
                            borderRadius="50%"
                            objectFit="cover"
                        />
                    </Box>
                    <Box flex="1">
                        <Text fontSize={4} fontWeight="medium">
                            {name}
                        </Text>
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text fontSize={3} fontWeight="light">
                                Last visit: {lastVisit}
                            </Text>
                            <Button
                                type="ghost"
                                ml={16}
                                onClick={toggleDocumentList}
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
                    <Box mt={15} pl={104}>
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
            </Box>
        );
    }
}

export default PatientCard;
