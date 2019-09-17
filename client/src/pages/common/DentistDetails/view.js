import React, { PureComponent } from 'react';
import _isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import {
    Flex,
    FilestackImage,
    Image,
    Box,
    Text,
    Rating,
    Button,
    Icon,
} from '../../../components';
import theme from '../../../components/theme';
import { withScreenSizes } from '../../../components/Responsive';
import { getIdFromFilestackUrl } from '../../../util/imageUtil';
import { getInsuranceText } from '../../../util/insuranceUtil';
import { getProcedureColor } from '../../../util/dentistUtils';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

const DefaultCursorButton = styled(Button)`
    && {
        cursor: default;
    }
`;

class DentistDetailsView extends PureComponent {
    render() {
        const { data } = this.props;

        return (
            <Box>
                <Box width="100vw" position="fixed" left={0} />
                <Flex
                    mb={[48, '', 56]}
                    flexDirection={['column', '', 'row']}
                    textAlign={['center', '', 'left']}
                >
                    <Box
                        width={[102, '', 143]}
                        height={[102, '', 143]}
                        borderRadius="50%"
                        mr={['auto', '', 20]}
                        ml={['auto', '', 0]}
                        mb={[15, '', 0]}
                        overflow="hidden"
                    >
                        {data.image && data.image.includes('filestack') ? (
                            <FilestackImage
                                handle={getIdFromFilestackUrl(data.image)}
                                alt={data.name}
                                sizes={{
                                    [`(min-width: ${
                                        theme.breakpoints[1]
                                    })`]: '143px',
                                    [`(min-width: ${
                                        theme.breakpoints[0]
                                    }px)`]: '102px',
                                    fallback: '102px',
                                }}
                                formats={['webp', 'pjpg']}
                            />
                        ) : (
                            <Image
                                src={defaultUserImage}
                                alt={data.name}
                                width="100%"
                                height="100%"
                            />
                        )}
                    </Box>
                    <Box>
                        <Text
                            textTransform="uppercase"
                            fontSize={[1, '', 3]}
                            color="#adadad"
                            lineHeight={['14px', '', '34px']}
                            fontWeight="bold"
                            letterSpacing={['-0.3px', '', '-0.46px']}
                            mb={[3, '', 0]}
                        >
                            {data.specialization}
                        </Text>
                        <Text
                            is="h1"
                            color="text.black"
                            fontSize={[4, '', 5]}
                            lineHeight={['24px', '', '34px']}
                            letterSpacing={['-0.51px', '', '-0.76px']}
                            mb={0}
                        >
                            {data.name}
                        </Text>

                        <Flex
                            alignItems="center"
                            flexDirection={['column', '', 'row']}
                        >
                            <Rating
                                fontSize={[15, '', 18]}
                                value={data.rating}
                                disabled
                            />
                            <Text
                                mt={[8, '', 0]}
                                mb={[6, '', 0]}
                                ml={[0, '', 10]}
                                lineHeight={['14px', '', '16px']}
                                color="text.black"
                                fontSize={[0, '', 1]}
                            >
                                {data.numReviews} reviews
                            </Text>
                        </Flex>
                        <Text
                            fontSize={0}
                            color="text.lightGray"
                            letterSpacing="-0.34px"
                        >
                            {`NPI: ${data.npiNumber}`}
                        </Text>
                        {!_isEmpty(data.acceptedInsurances) && (
                            <Flex
                                mt={5}
                                mb={4}
                                alignItems="center"
                                flexDirection={['column', '', 'row']}
                            >
                                <Flex alignItems="center">
                                    <Icon type="insurance" />
                                    <Text
                                        fontSize={1}
                                        ml="8px"
                                        lineHeight="17px"
                                    >
                                        In-Network:{' '}
                                        {data.acceptedInsurances.length > 1 ? (
                                            data.acceptedInsurances.map(
                                                (sp, index) =>
                                                    index !==
                                                    data.acceptedInsurances
                                                        .length -
                                                        1
                                                        ? `${getInsuranceText(
                                                              sp
                                                          )}, `
                                                        : `and ${getInsuranceText(
                                                              sp
                                                          )}`
                                            )
                                        ) : (
                                            <Text
                                                is="span"
                                                textTransform="capitalize"
                                            >
                                                {data.acceptedInsurances[0].toLowerCase()}
                                            </Text>
                                        )}
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                        {!_isEmpty(data.languages) && (
                            <Flex
                                alignItems="center"
                                flexDirection={['column', '', 'row']}
                            >
                                <Flex alignItems="center">
                                    <Icon type="languages" />
                                    <Text
                                        fontSize={1}
                                        ml="8px"
                                        lineHeight="17px"
                                    >
                                        Speaks{' '}
                                        {data.languages.length > 1 ? (
                                            data.languages.map((sp, index) =>
                                                index !==
                                                data.languages.length - 1 ? (
                                                    <Text
                                                        is="span"
                                                        textTransform="capitalize"
                                                    >{`${sp.toLowerCase()}, `}</Text>
                                                ) : (
                                                    <>
                                                        {`and `}
                                                        <Text
                                                            is="span"
                                                            textTransform="capitalize"
                                                        >
                                                            {sp.toLowerCase()}
                                                        </Text>
                                                    </>
                                                )
                                            )
                                        ) : (
                                            <Text
                                                is="span"
                                                textTransform="capitalize"
                                            >
                                                {data.languages[0].toLowerCase()}
                                            </Text>
                                        )}
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Box>
                </Flex>

                <Text
                    fontSize={[1, '', 2]}
                    letterSpacing={['0.05px', '', '-0.4px']}
                    lineHeight="30px"
                    fontWeight="medium"
                    mb={12}
                >
                    Available procedures
                </Text>

                {data.procedures.length ? (
                    <Flex flexWrap="wrap" mb={[18, '', 38]}>
                        {data.procedures.map(procedure => (
                            <DefaultCursorButton type="ghost" height="auto">
                                <Box
                                    px={[12, '', 24]}
                                    bg={getProcedureColor(procedure)}
                                    borderRadius="25px"
                                    mr="6px"
                                    mb="6px"
                                >
                                    <Text
                                        textTransform="lowercase"
                                        fontWeight="medium"
                                        color="text.white"
                                        lineHeight="22px"
                                        fontSize={[0, '', 1]}
                                        letterSpacing={[
                                            '-0.38px',
                                            '',
                                            '-0.4px',
                                        ]}
                                    >
                                        {procedure}
                                    </Text>
                                </Box>
                            </DefaultCursorButton>
                        ))}
                    </Flex>
                ) : (
                    <Text mb={34}>No procedures selected.</Text>
                )}

                {data.bio && (
                    <Box pb={[22, '', 42]}>
                        <Text
                            fontSize={[1, '', 2]}
                            letterSpacing={['0.05px', '', '-0.4px']}
                            lineHeight="30px"
                            fontWeight="medium"
                            mb={[3, '', 5]}
                        >
                            About the dentist
                        </Text>
                        <Text
                            fontSize={1}
                            lineHeight="26px"
                            letterSpacing="-0.51px"
                            style={{ 'white-space': 'pre-line' }}
                        >
                            {data.bio}
                        </Text>
                    </Box>
                )}
            </Box>
        );
    }
}

export default withScreenSizes(DentistDetailsView);
