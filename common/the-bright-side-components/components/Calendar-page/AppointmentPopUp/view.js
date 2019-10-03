import * as React from 'react';
import styled from 'styled-components';
import {
    Card,
    Truncate,
    Box,
    Flex,
    Button,
    Link,
    Text,
    Image,
} from '~/components';
import moment from 'moment';

const StyledCard = styled(Card)`
    max-height: 420px;
`;

const currentUrl = window.location.href;
const getLinkUrl = () => {
    if (currentUrl.includes('localhost')) {
        return 'localhost:3020';
    } else if (currentUrl.includes('laguro-stage')) {
        return 'https://ltm.laguro-stage.com';
    } 
        return 'https://ltm.laguro.com';
    
};
const LTM_LINK_BASE_URL = getLinkUrl();

class AppointmentPopUpView extends React.PureComponent {
    renderAvailableTimes = (startTime, endTime) => {
        const date = moment(startTime).format('MMM D, YYYY');
        const start = moment(startTime).format('h:mmA');
        const end = moment(endTime).format('h:mmA');

        return <Text is="span">{`${date} ${start} - ${end}`}</Text>;
    };

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    };

    render() {
        const {
            startTime,
            endTime,
            notes,
            patient,
            office,
            isPending,
            id: appointmentId,
        } = this.props.appointment;

        return (
            <StyledCard width={375} p={25}>
                <a
                    href={`${LTM_LINK_BASE_URL}/go?to=/chart&appointmentId=${appointmentId}`}
                    style={{ textDecoration: 'underline' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Flex alignItems="center" mb={10}>
                        {patient.imageUrl && (
                            <Box mr={12}>
                                <Image
                                    src={patient.imageUrl}
                                    alt="patient_image"
                                    width={32}
                                    height={32}
                                    borderRadius="50%"
                                />
                            </Box>
                        )}
                        <Text
                            width="calc(100% - 33px)"
                            fontSize={3}
                            height={25}
                            fontWeight="medium"
                        >
                            <Truncate lines={1}>{`${patient.firstName} ${
                                patient.lastName
                            } ${isPending ? '(Pending)' : ''}`}</Truncate>
                        </Text>
                    </Flex>
                </a>
                <Box>{this.renderAvailableTimes(startTime, endTime)}</Box>
                <Link to={`/office/${office.id}`}>
                    <Text fontSize={0} mb={9} color="#9b9b9b">
                        {office.name}
                    </Text>
                </Link>
                <Text fontWeight="medium" fontSize={[0, '', 1]}>
                    <Truncate lines={12}>{notes}</Truncate>
                </Text>
                {this.props.hasCancelButton && (
                    <Flex justifyContent="flex-end">
                        <Button type="ghost" onClick={this.onCancel}>
                            <Text fontSize={0} color="#9b9b9b">
                                Cancel Appointment
                            </Text>
                        </Button>
                    </Flex>
                )}
            </StyledCard>
        );
    }
}

export default AppointmentPopUpView;
