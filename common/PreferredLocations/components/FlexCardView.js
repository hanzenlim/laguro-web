import React from 'react';

import { FlexCard, IconBackground, StyledIcon, FlexCardText } from './styled';
import { Flex, Text, Rating } from '~/components';

const FlexCardView = ({
    withContent,
    isChoice,
    name,
    averageRating,
    numReviews,
    address,
    isActive,
    handleClick,
    handleRemoveLocation,
    selected,
}) => (
    <FlexCard
        role="button"
        withContent={withContent}
        isChoice={isChoice}
        isActive={isActive}
        selected={selected}
        onClick={selected ? () => {} : handleClick}
        position="relative"
    >
        {isChoice && selected && (
            <Flex
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                zIndex={9999}
                bg="#fff"
                justifyContent="center"
                alignItems="center"
                opacity={0.92}
            >
                <FlexCardText>Selected</FlexCardText>
            </Flex>
        )}
        {withContent && (
            <IconBackground role="button" onClick={handleRemoveLocation}>
                <StyledIcon
                    type="close"
                    style={{
                        color: '#fff',
                    }}
                />
            </IconBackground>
        )}
        <FlexCardText withContent={withContent || isChoice}>
            {name}
        </FlexCardText>
        {(withContent || isChoice) && (
            <Flex>
                <Rating fontSize="12px" disabled value={averageRating} />
                <Text
                    ml={6}
                    fontSize={0}
                    fontWeight="medium"
                    color="text.lightGray"
                    letterSpacing="-0.6px"
                >
                    ({numReviews})
                </Text>
            </Flex>
        )}
        <Text
            fontWeight="medium"
            color="text.lightGray"
            letterSpacing="-0.6px"
            style={{ fontSize: 12 }}
            mt={3}
        >
            {address}
        </Text>
    </FlexCard>
);

export default FlexCardView;
