import React from 'react';
import { Divider } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { Text, Button, Flex, Image } from '../../../../components';
import { wrapperStyles } from '..';
import { renderAddress } from '../../../../util/officeUtils';
import Clipboard from '../../../../images/clipboard.png';

const StyledDivider = styled(Divider)`
    && {
        &.ant-divider-horizontal {
            margin: 16px 0;
        }
    }
`;

export const BookAppointmentDecision = ({
    patientName,
    apptStartTime,
    dentistName,
    apptAddress,
    onNext,
    onPrevious,
    isBooking,
}) => (
    <Flex
        alignItems="center"
        flexDirection="column"
        {...wrapperStyles}
        textAlign="center"
        letterSpacing="-0.32px"
    >
        <Flex justifyContent="center" fontWeight="medium" fontSize={[0, '', 1]}>
            <Text>{patientName}</Text>
            <Text color="rgba(0, 0, 0, 0.5)">'s appointment</Text>
        </Flex>
        <StyledDivider />
        <Text
            fontWeight="medium"
            fontSize={[1, '', 2]}
            color="text.lightGray"
            mb={[10, '', 15]}
        >
            Almost there!
            <br />
            Please review your appointment
        </Text>
        <Image
            src={Clipboard}
            width={[70, '', 134]}
            height={[70, '', 134]}
            alt="clipboard"
            mb={[10, '', 15]}
        />
        <Text fontSize={[2, '', 4]}>
            {moment(apptStartTime).format('LLLL')}
        </Text>
        <Text fontWeight="medium" fontSize={[2, '', 4]} color="text.darkBlue">
            {dentistName}
        </Text>
        {renderAddress(apptAddress)}
        <Button
            width="100%"
            fontWeight="bold"
            mt={[12, '', 24]}
            onClick={onNext}
            fontSize={[0, '', 1]}
            loading={isBooking}
        >
            Book now
        </Button>
        <Button type="ghost" onClick={onPrevious}>
            <Text fontSize={0} color="text.blue">
                Choose a different time
            </Text>
        </Button>
    </Flex>
);
