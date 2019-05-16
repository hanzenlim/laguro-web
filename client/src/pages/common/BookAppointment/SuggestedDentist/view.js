import _isEmpty from 'lodash/isEmpty';
import React from 'react';
import defaultUserImage from '../../../../components/Image/defaultUserImage.svg';
import {
    Box,
    Button,
    Text,
    Grid,
    Flex,
    Icon,
    Image,
    Rating,
    Link,
} from '../../../../components';
import { getInsuranceText } from '../../../../util/insuranceUtil';

const SuggestedDentistView = props => {
    const { onFindAnotherMatch, dentist, isFindAnotherMatchDisabled } = props;

    return (
        <Box mb="13px">
            <Flex width="100%">
                <Text fontSize={1} fontWeight="500" mb="12px" color="#303549">
                    Suggested dentist
                </Text>
            </Flex>

            <Grid gridTemplateColumn="auto" gridRowGap="7px">
                <Link target="_blank" to={`/dentist/${dentist.id}`} isExternal>
                    <Box
                        height="auto"
                        width="100%"
                        border="1px solid"
                        borderColor="#ececec"
                        p="18px"
                    >
                        <Box width="100%">
                            <Flex flexDirection="column">
                                <Flex mb="14px">
                                    <Box display="block" width={'46px'} mr={17}>
                                        <Image
                                            src={
                                                dentist.imageUrl ||
                                                defaultUserImage
                                            }
                                            width="100%"
                                            height="auto"
                                            borderRadius="50%"
                                        />
                                    </Box>
                                    <Flex
                                        flex="1"
                                        flexDirection="column"
                                        alignItems="flex-start"
                                    >
                                        <Text
                                            fontSize={0}
                                            color="#c7c7c7"
                                            lineHeight="13px"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                        >
                                            {dentist.specialty}
                                        </Text>
                                        <Flex
                                            mb={4}
                                            alignItems={'flex-start'}
                                            flexDirection={'column'}
                                        >
                                            <Text
                                                style={{
                                                    'white-space': 'pre-line',
                                                }}
                                                fontWeight="bold"
                                                fontSize={1}
                                                lineHeight="17px"
                                                mr={14}
                                                color="#303449"
                                                textAlign="left"
                                            >
                                                {dentist.name}
                                            </Text>
                                            <Flex
                                                alignItems="flex-end"
                                                lineHeight="15px"
                                            >
                                                <Rating
                                                    disabled={true}
                                                    fontSize={['12px', '15px']}
                                                    value={dentist.rating}
                                                />
                                                <Text ml={6} fontSize="12px">
                                                    {dentist.reviewCount &&
                                                    dentist.reviewCount !== 0
                                                        ? `(${
                                                              dentist.reviewCount
                                                          })`
                                                        : ''}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>

                                {!_isEmpty(dentist.insurance) && (
                                    <Flex alignItems="center">
                                        <Icon type="insurance" />
                                        <Text fontSize="12px" ml="8px">
                                            Accepts{' '}
                                            {dentist.insurance.length > 1
                                                ? dentist.insurance.map(
                                                      (sp, index) =>
                                                          index !==
                                                          dentist.insurance
                                                              .length -
                                                              1
                                                              ? `${getInsuranceText(
                                                                    sp
                                                                )}, `
                                                              : `and ${getInsuranceText(
                                                                    sp
                                                                )}`
                                                  )
                                                : getInsuranceText(
                                                      dentist.insurance[0]
                                                  )}
                                        </Text>
                                    </Flex>
                                )}

                                {!_isEmpty(dentist.languages) && (
                                    <Flex alignItems="center">
                                        <Icon type="languages" />
                                        <Text fontSize="12px" ml="8px">
                                            Speaks{' '}
                                            {dentist.languages.length > 1 ? (
                                                dentist.languages.map(
                                                    (sp, index) =>
                                                        index !==
                                                        dentist.languages
                                                            .length -
                                                            1 ? (
                                                            <Text
                                                                is="span"
                                                                textTransform="capitalize"
                                                            >{`${sp.toLowerCase()}, `}</Text>
                                                        ) : (
                                                            <Text
                                                                is="span"
                                                                textTransform="capitalize"
                                                            >{`and ${sp.toLowerCase()}`}</Text>
                                                        )
                                                )
                                            ) : (
                                                <Text
                                                    is="span"
                                                    textTransform="capitalize"
                                                >
                                                    {dentist.languages[0].toLowerCase()}
                                                </Text>
                                            )}
                                        </Text>
                                    </Flex>
                                )}
                            </Flex>
                        </Box>
                    </Box>
                </Link>

                <Button
                    disabled={isFindAnotherMatchDisabled}
                    onClick={onFindAnotherMatch}
                    height="auto"
                    width="100%"
                    ghost={!isFindAnotherMatchDisabled}
                >
                    <Flex
                        height="48px"
                        width="100%"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text
                            fontSize={1}
                            fontWeight="bold"
                            color={
                                isFindAnotherMatchDisabled
                                    ? 'text.gray'
                                    : 'text.blue'
                            }
                        >
                            Find me another match
                        </Text>
                    </Flex>
                </Button>
            </Grid>
        </Box>
    );
};

SuggestedDentistView.propTypes = {};

export default SuggestedDentistView;
