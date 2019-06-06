import * as React from 'react';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import {
    Card,
    Box,
    Flex,
    Text,
    Truncate,
    Image,
} from '@laguro/basic-components';
import moment from 'moment';
import _sortBy from 'lodash/orderBy';
import _get from 'lodash/get';
import DefaultUserImage from '../../../../../../components/Image/defaultUserImage.svg';

const StyledBox = styled(Box)`
    text-decoration: ${props => props && props.textDecoration};
`;

class MiniCalendarView extends React.PureComponent {
    renderAppointments = appts => {
        const { colorMap } = this.props;
        let currentOfficeId;
        let currentDate;

        return _sortBy(appts, ['startTime']).map(
            ({
                id,
                startTime,
                endTime,
                patient,
                isCancelled,
                isRejected,
                isPending,
                reservation,
            }) => {
                let office;
                let date;
                let dot;
                const name = `${patient.firstName} ${patient.lastName}`;
                const officeId = _get(reservation, 'office.id');
                if (officeId !== currentOfficeId) {
                    currentOfficeId = _get(reservation, 'office.id');
                    office = (
                        <Box textAlign="right">
                            <Text>
                                <Truncate lines={1}>
                                    {_get(reservation, 'office.name')}
                                </Truncate>
                            </Text>
                        </Box>
                    );
                    date = (
                        <Text
                            textAlign="right"
                            color="#9b9b9b"
                            fontWeight="bold"
                        >
                            {moment(startTime)
                                .startOf('day')
                                .format('MMM D')
                                .toUpperCase()}
                        </Text>
                    );
                    dot = (
                        <Box
                            width={6}
                            height={6}
                            borderRadius={3}
                            ml={1}
                            bg={colorMap[officeId]}
                        />
                    );
                }
                if (
                    !moment(startTime)
                        .startOf('day')
                        .isSame(currentDate)
                ) {
                    currentDate = moment(startTime).startOf('day');
                    date = (
                        <Text
                            textAlign="right"
                            fontWeight="bold"
                            color="#9b9b9b"
                        >
                            {currentDate.format('MMM D').toUpperCase()}
                        </Text>
                    );
                    dot = (
                        <Box
                            width={6}
                            height={6}
                            borderRadius={3}
                            ml={1}
                            bg={colorMap[officeId]}
                        />
                    );
                }

                return (
                    <Box key={id}>
                        <Flex
                            fontSize={0}
                            height={office ? 28 : 9}
                            color="#9b9b9b"
                            alignItems="center"
                            bg="background.white"
                        >
                            <Box width={85} mb={-13}>
                                {office}
                            </Box>
                        </Flex>
                        <Flex
                            fontSize={0}
                            color="#9b9b9b"
                            justifyContent="center"
                            alignItems="center"
                            bg="background.white"
                        >
                            <Box width={85}>{date}</Box>

                            <Flex
                                width={8}
                                ml={10}
                                position="relative"
                                height={28}
                                alignItems="center"
                            >
                                <Box zIndex={2}>{dot}</Box>
                            </Flex>
                            <Flex
                                justifyContent="space-between"
                                alignItems="center"
                                fontSize={0}
                                ml={12}
                            >
                                <Box
                                    opacity={
                                        isCancelled || isRejected ? 0.5 : 1
                                    }
                                >
                                    {patient.imageUrl ? (
                                        <Image
                                            src={patient.imageUrl}
                                            alt={name}
                                            width={28}
                                            height={28}
                                            borderRadius="50%"
                                        />
                                    ) : (
                                        <Image
                                            src={DefaultUserImage}
                                            width={28}
                                        />
                                    )}
                                </Box>
                                <Box
                                    ml={8}
                                    width={126}
                                    lineHeight="14px"
                                    opacity={
                                        isCancelled || isRejected ? 0.5 : 1
                                    }
                                >
                                    <StyledBox
                                        textDecoration={
                                            isCancelled || isRejected
                                                ? 'line-through'
                                                : 'none'
                                        }
                                    >
                                        <Text color="#9b9b9b">
                                            {`${moment(startTime).format(
                                                'h:mm A'
                                            )} - ${moment(endTime).format(
                                                'h:mm A'
                                            )}`}
                                        </Text>
                                        <Text fontWeight="medium">
                                            <Truncate
                                                lines={1}
                                                color="text.black"
                                            >
                                                {name}
                                            </Truncate>
                                        </Text>
                                    </StyledBox>
                                    <Text fontWeight="medium">
                                        <Truncate lines={1} color="text.black">
                                            {isPending && '(Pending)'}
                                            {isCancelled && '(Cancelled)'}
                                            {isRejected && '(Rejected)'}
                                        </Truncate>
                                    </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                );
            }
        );
    };

    render() {
        const { appointments } = this.props;
        return (
            <Card py={10} px={8} width={295}>
                <Text fontSize={[0, '', 1]} mb={4} fontWeight="medium">
                    Upcoming Appointments
                </Text>
                <Box borderBottom="solid 1px #ececec" width="100%" mb={8} />
                <Box position="relative">
                    <Box
                        width={100}
                        position="absolute"
                        top={47}
                        bottom={12}
                        borderRight="1px solid #ececec"
                    />
                    {!_isEmpty(appointments)
                        ? this.renderAppointments(appointments)
                        : 'You have no upcoming appointments.'}
                </Box>
            </Card>
        );
    }
}

export default MiniCalendarView;
