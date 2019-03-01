import React from 'react';
import moment from 'moment';

import { Box, Text, Flex, Image, Responsive } from '../../../components';

import { StyledList } from './view';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import { setImageSizeToUrl } from '../../../util/imageUtil';

const { Desktop, TabletMobile } = Responsive;

const AvailableTimes = ({ availableTimes }) =>
    availableTimes.map(({ startTime, endTime }, index) => (
        <Box
            key={index}
            pb={index !== availableTimes.length - 1 ? [8, '', 20] : 0}
        >
            <Desktop>
                <Text fontSize={4} fontWeight="medium">
                    {moment(startTime).format('ddd, M/D/YY')}
                </Text>
                <Text fontSize={2}>
                    {moment(startTime).format('h:mmA')} -{' '}
                    {moment(endTime).format('h:mmA')}
                </Text>
            </Desktop>
            <TabletMobile>
                <Text fontWeight="bold">
                    {moment(startTime).format('MMM D')}{' '}
                    {moment(startTime).format('h:mmA')} -{' '}
                    {moment(endTime).format('h:mmA')}
                </Text>
            </TabletMobile>
        </Box>
    ));

const Reservations = ({ reservations }) =>
    reservations.map(reservation => {
        const {
            id,
            availableTimes,
            reservedBy,
            numChairsSelected,
            equipmentSelected,
        } = reservation;
        const { firstName, lastName, imageUrl } = reservedBy.user;
        const name = `Dr. ${firstName} ${lastName}`;
        return (
            <Box
                key={id}
                bg="background.white"
                border="1px solid"
                borderColor="divider.gray"
                borderRadius={2}
                mb={[8, '', 10]}
            >
                <Flex
                    alignItems="flex-start"
                    justifyContent="space-between"
                    p={['22px 24px', '', 26]}
                    flexWrap="wrap"
                >
                    <Box>
                        <AvailableTimes availableTimes={availableTimes} />
                        <Text
                            flexBasis={['100%', '', 'initial']}
                            mt={8}
                            mx={0}
                            fontSize={1}
                            fontWeight="light"
                            display={['block', '', 'none']}
                        >
                            {name}
                        </Text>
                    </Box>
                    <Text
                        flexBasis="initial"
                        mt={12}
                        mx={15}
                        fontSize={4}
                        fontWeight="regular"
                        display={['none', '', 'block']}
                    >
                        {name}
                    </Text>
                    <Image
                        src={setImageSizeToUrl(
                            imageUrl || defaultUserImage,
                            40
                        )}
                        alt={name}
                        width={40}
                        height={40}
                        borderRadius="50%"
                        mt={[0, '', 6]}
                    />
                </Flex>
                <Box
                    borderTop="1px solid"
                    borderColor="divider.gray"
                    px={[24, '', 26]}
                    py={[12, '', 20]}
                >
                    <Box fontSize={[0, '', 1]} mb={8}>
                        Equipments ordered by{' '}
                        <Text fontWeight="medium" is="span">
                            {name}
                        </Text>
                    </Box>
                    <StyledList>
                        <li>
                            <Text
                                display="inline"
                                fontWeight="medium"
                                fontSize={[0, '', 1]}
                            >
                                {`${numChairsSelected} chair${
                                    numChairsSelected > 1 ? 's' : ''
                                }`}
                            </Text>
                        </li>
                        {equipmentSelected.map((item, index) => (
                            <li key={index}>
                                <Text display="inline" fontSize={[0, '', 1]}>
                                    {item}
                                </Text>
                            </li>
                        ))}
                    </StyledList>
                </Box>
            </Box>
        );
    });

export default Reservations;
