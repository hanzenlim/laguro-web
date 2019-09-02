import * as React from 'react';
import styled from 'styled-components';
import {
    Card,
    Box,
    Flex,
    Button,
    Link,
    Text,
    Image,
    Icon,
} from '../../../../../../components';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

const StyledList = styled.ul`
    list-style-position: outside;
    padding: 0;
    margin-left: 16px;
    margin-bottom: 0;
    display: grid;
    grid-row-gap: 3px;
    grid-column-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;

    > li {
        page-break-inside: avoid;
        break-inside: avoid;
        line-height: 1;
    }
`;

const StyledBox = styled(Box)`
    background-image: linear-gradient(
        to top,
        rgba(5, 39, 93, 0.61),
        rgba(216, 216, 216, 0)
    );
`;

class ReservationPopUpView extends React.PureComponent {
    renderAvailableTimes = localAvailableTimes =>
        localAvailableTimes.map((availableTime, index) => {
            const date = moment(availableTime.startTime).format('MMM D, YYYY');
            const start = moment(availableTime.startTime).format('h:mm A');
            const end = moment(availableTime.endTime).format('h:mm A');

            return (
                <Flex key={index}>
                    <Flex alignItems="center">
                        {index === 0 ? (
                            <Icon
                                type="calendar"
                                color="text.gray"
                                width={12}
                                mr={12}
                            />
                        ) : (
                            <Box width={12} mr={12} />
                        )}
                    </Flex>
                    <Box fontSize={0} display="inline">
                        <Text display="inline" lineHeight="21px">
                            {date}{' '}
                        </Text>
                        <Text
                            display="inline"
                            lineHeight="21px"
                        >{` (${start} - ${end})`}</Text>
                    </Box>
                </Flex>
            );
        });

    renderEquipment = equipment =>
        equipment.map((item, index) => (
            <li key={index}>
                <Text fontSize={0} lineHeight="14px" display="inline">
                    {item}
                </Text>
            </li>
        ));

    render() {
        const {
            host,
            office,
            localAvailableTimes,
            numChairsSelected,
            equipmentSelected,
        } = this.props.reservation;

        const isAppointmentsEmpty = _isEmpty(
            this.props.reservation.appointments
        );
        const hostName = `Dr. ${host.user.firstName} ${host.user.lastName}`;
        return (
            <Card width={365} p={0}>
                <Box
                    borderRadius={4}
                    overflow="hidden"
                    ml={-1.5}
                    mt={-1}
                    position="relative"
                >
                    <Box
                        height={100}
                        backgroundImage={`url(${office.imageUrls[0]})`}
                        backgroundSize="cover"
                        backgroundPosition="50% 50%"
                    />
                    <StyledBox
                        position="absolute"
                        height={100}
                        top={0}
                        width="100%"
                    />
                    <Box width="100%" position="absolute" top={50} zIndex={2}>
                        <Flex width="100%" justifyContent="space-between">
                            <Flex>
                                {host.user.imageUrl && (
                                    <Box ml={12} height={39}>
                                        <Image
                                            src={host.user.imageUrl}
                                            alt={'host_user_image'}
                                            width={39}
                                            height={39}
                                            borderRadius={20}
                                        />
                                    </Box>
                                )}

                                <Box ml={12}>
                                    <Text fontSize={0} color="text.white">
                                        {hostName}
                                    </Text>
                                    <Link to={`/office/${office.id}`}>
                                        <Text
                                            color="text.white"
                                            fontSize={[1, '', 3]}
                                        >
                                            {office.name}
                                        </Text>
                                    </Link>
                                </Box>
                            </Flex>
                            <Flex alignItems="flex-end">
                                <Link to={`/office/${office.id}`}>
                                    <Text
                                        mr={12}
                                        fontSize={10}
                                        color="text.white"
                                    >
                                        View Office
                                    </Text>
                                </Link>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box px={14} pt={8} pb={14} bg="#fbfbfb">
                        <Flex justifyContent="flex-end" position="relative">
                            <Button type="ghost" height={13}>
                                <Text
                                    color={
                                        isAppointmentsEmpty
                                            ? 'text.black'
                                            : 'text.gray'
                                    }
                                    fontSize={10}
                                >
                                    Cancel Booking
                                </Text>
                            </Button>
                        </Flex>
                        <Box>
                            <Text fontWeight="medium" fontSize={0} mb={6}>
                                Booking Details
                            </Text>
                            <Flex>
                                <Icon
                                    type="locationPinWithFill"
                                    width={12}
                                    mr={12}
                                    lineHeight="21px"
                                />
                                <Text fontSize={0}>
                                    {_get(office, 'location.name')}
                                </Text>
                            </Flex>
                            <Box mb={15}>
                                {this.renderAvailableTimes(localAvailableTimes)}
                            </Box>
                            <Text fontWeight="medium" fontSize={0} mb={8}>
                                Equipment ordered
                            </Text>
                            <Box
                                bg="background.white"
                                border="solid 1px #ececec"
                                py={10}
                                px={16}
                            >
                                <StyledList>
                                    <li>
                                        <Text
                                            fontSize={0}
                                            lineHeight="14px"
                                            display="inline"
                                        >
                                            {`${numChairsSelected} chair${
                                                numChairsSelected > 1 ? 's' : ''
                                            }`}
                                        </Text>
                                    </li>
                                    {this.renderEquipment(equipmentSelected)}
                                </StyledList>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Card>
        );
    }
}

export default ReservationPopUpView;
