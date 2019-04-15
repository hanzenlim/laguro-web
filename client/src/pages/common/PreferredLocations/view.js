import React, { Fragment } from 'react';
import styled from 'styled-components';
import _truncate from 'lodash/truncate';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

import {
    Box,
    Flex,
    Text,
    Button,
    Grid,
    Input,
    Responsive,
} from '../../../components';
import FlexCard from './components/FlexCardView';
import { DentistButton } from './components/styled';
import { Loading } from '../../../components';

const { Mobile, Desktop } = Responsive;

const SaveButton = styled(Button)`
    && {
        width: 327px;
        height: 51px;
        border-radius: 25.5px;
        border: 1px solid #3481f8;
        color: #3481f8;
        background: #fff;
    }
`;

const PreferredLocations = ({
    renderPanelHeader,
    searchLocations = [],
    ownLocations = [],
    setPreferredLocation,
    selectEmptyLocation,
    toggleShowLocations,
    handleZipCodeChange,
    zipCode,
    preferredLocationOne,
    preferredLocationTwo,
    selectedEmptyLocation,
    showLocations,
    loadingLocations,
    handleOnSave,
    updateLoading,
}) => {
    const selectedIds = [preferredLocationOne, preferredLocationTwo].map(loc =>
        loc ? loc.id : ''
    );

    const filteredOwnLocations = ownLocations.filter(
        loc => !selectedIds.includes(loc.id)
    );

    let header = 'Preferred Locations';
    if (preferredLocationOne || preferredLocationTwo) {
        header = 'Preferred Locations (1/2 selected)';
    }

    if (preferredLocationOne && preferredLocationTwo) {
        header = 'Preferred Locations (2/2 selected)';
    }

    if (!preferredLocationOne && !preferredLocationTwo) {
        header = 'Preferred Locations (0/2 selected)';
    }

    let zipCodeAndLocation = '';

    if (!_isEmpty(searchLocations)) {
        const address = _get(searchLocations[0], 'location.name', '');
        const splitAddress = address.split(',');
        zipCodeAndLocation = splitAddress.filter(item =>
            item.includes(zipCode.toString())
        );
    }

    const locationsText = _isEmpty(searchLocations)
        ? 'No locations found'
        : 'Recommended locations around';

    return (
        <Fragment>
            {renderPanelHeader(header)}
            <Box mt={[22, '', 0]} mb={[42, '', 0]}>
                <Text fontSize={0} color="#303449">
                    Choose your desired dental offices below. We will match your
                    patients and locations accordingly.
                </Text>

                <Box height={15} />
                <Grid
                    gridTemplateColumns={[
                        'repeat(auto-fit, minmax(318px, 1fr))',
                        'repeat(auto-fit, minmax(330px, 1fr))',
                        'repeat(auto-fit, 424px)',
                    ]}
                    gridGap={12}
                >
                    {_isEmpty(preferredLocationOne) ? (
                        <FlexCard
                            name="Preferred Location 1"
                            isActive={selectedEmptyLocation === 'one'}
                            handleClick={() =>
                                selectEmptyLocation({ emptyLocation: 'one' })
                            }
                        />
                    ) : (
                        <FlexCard
                            {...preferredLocationOne}
                            address={
                                preferredLocationOne &&
                                preferredLocationOne.location &&
                                preferredLocationOne.location.name
                            }
                            withContent
                            handleRemoveLocation={() =>
                                setPreferredLocation({
                                    location: null,
                                    locationNumber: 'one',
                                })
                            }
                        />
                    )}
                    {_isEmpty(preferredLocationTwo) ? (
                        <FlexCard
                            name="Preferred Location 2"
                            isActive={selectedEmptyLocation === 'two'}
                            handleClick={() =>
                                selectEmptyLocation({ emptyLocation: 'two' })
                            }
                        />
                    ) : (
                        <FlexCard
                            withContent
                            {...preferredLocationTwo}
                            address={
                                preferredLocationTwo &&
                                preferredLocationTwo.location &&
                                preferredLocationTwo.location.name
                            }
                            handleRemoveLocation={() =>
                                setPreferredLocation({
                                    location: null,
                                    locationNumber: 'two',
                                })
                            }
                        />
                    )}
                </Grid>

                <Flex
                    width="100%"
                    height={60}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box height={1} width={207} border="1px solid #dbdbdb" />
                </Flex>

                {!showLocations && (
                    <Fragment>
                        <Flex flexDirection="row" alignItems="center">
                            <Text fontSize={0} color="#303449" mr={10}>
                                Recommended locations around
                            </Text>
                            <Input
                                width={152}
                                height={33}
                                borderRadius={2}
                                border="solid 1px #dbdbdb"
                                background="#fff"
                                mr={10}
                                onChange={handleZipCodeChange}
                                value={zipCode}
                            />
                            <Text
                                fontSize={0}
                                color="#3481f8"
                                role="button"
                                onClick={() => toggleShowLocations(true)}
                            >
                                update
                            </Text>
                        </Flex>

                        <Box height={30} />

                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            m="30px auto"
                        >
                            <Text
                                fontSize={18}
                                opacity={0.46}
                                fontFamily="Silka"
                                fontWeight="bold"
                                color="#9b9b9b"
                            >
                                Please enter the ZIP code to see recommended
                                locations
                            </Text>
                        </Flex>
                        <Box height={30} />
                    </Fragment>
                )}

                {showLocations && (
                    <Fragment>
                        <Flex
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            margin="0 auto"
                        >
                            <Flex
                                flexDirection={['column', 'row', 'row']}
                                justifyContent={['center', 'flex-start']}
                            >
                                {filteredOwnLocations.map(item => (
                                    <DentistButton
                                        key={item.id}
                                        mb={[12, 0, 0]}
                                        onClick={() =>
                                            setPreferredLocation({
                                                location: { ...item },
                                                locationNumber: selectedEmptyLocation,
                                            })
                                        }
                                    >
                                        <span className="label-text plus">
                                            &#43;
                                        </span>
                                        <span className="label-text main-text">
                                            {_truncate(item.name, {
                                                length: 25,
                                                separator: ' ',
                                            })}
                                        </span>
                                    </DentistButton>
                                ))}
                            </Flex>
                        </Flex>

                        <Box height={30} />
                        <Desktop>
                            <Text
                                fontSize={0}
                                color="#303449"
                                display="flex"
                                flexDirection="row"
                            >
                                {locationsText}
                                <Text ml={8} fontWeight="bold">
                                    {zipCodeAndLocation}
                                </Text>
                                <Text
                                    ml={8}
                                    role="button"
                                    color="#3481f8"
                                    onClick={() => toggleShowLocations(false)}
                                >
                                    change zip code
                                </Text>
                            </Text>
                        </Desktop>
                        <Mobile>
                            <Text fontSize={0} color="#303449">
                                {`${locationsText} ${zipCodeAndLocation}`}
                                <Text
                                    ml={[0, 8]}
                                    role="button"
                                    color="#3481f8"
                                    onClick={() => toggleShowLocations(false)}
                                >
                                    change zip code
                                </Text>
                            </Text>
                        </Mobile>
                        <Box height={20} />
                        {loadingLocations && <Loading />}
                        <Grid
                            gridTemplateColumns={[
                                'repeat(auto-fit, minmax(318px, 1fr))',
                                'repeat(auto-fit, minmax(330px, 1fr))',
                                'repeat(auto-fit, 424px)',
                            ]}
                            gridGap={12}
                        >
                            {!loadingLocations &&
                                !_isEmpty(searchLocations) &&
                                searchLocations.map(item => (
                                    <FlexCard
                                        key={item.id}
                                        {...item}
                                        address={
                                            item &&
                                            item.location &&
                                            item.location.name
                                        }
                                        isChoice
                                        selected={
                                            (preferredLocationOne &&
                                                preferredLocationOne.id ===
                                                    item.id) ||
                                            (preferredLocationTwo &&
                                                preferredLocationTwo.id ===
                                                    item.id)
                                        }
                                        handleClick={() =>
                                            setPreferredLocation({
                                                location: { ...item },
                                                locationNumber: selectedEmptyLocation,
                                            })
                                        }
                                    />
                                ))}
                        </Grid>

                        <Box height={30} />
                    </Fragment>
                )}

                <Flex justifyContent="center" alignItems="center" width="100%">
                    <SaveButton loading={updateLoading} onClick={handleOnSave}>
                        Save changes
                    </SaveButton>
                </Flex>
            </Box>
        </Fragment>
    );
};

export default PreferredLocations;
