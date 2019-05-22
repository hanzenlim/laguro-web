import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { Menu } from 'antd';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import {
    Box,
    Card,
    Flex,
    Image,
    Text,
    FilestackImage,
    Responsive,
} from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import Bundle from '../Bundle';
import TopBlock from './TopBlock';
import MiddleBlock from './MiddleBlock';
import AppointmentTimeslots from './AppointmentTimeslots';
import { getIdFromFilestackUrl } from '../../../util/imageUtil';

const { Desktop } = Responsive;

const StyledCard = styled(Card)`
    &&.ant-card-bordered {
        width: ${({ showMap }) => (showMap ? '839px' : '100%')};
        border-radius: 0;
        border: none;
        box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
            -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
        border: 1px solid #ececec;
    }

    @media (min-width: ${props => props.theme.breakpoints[1]}) {
        &&.ant-card-bordered {
            border: none;
            box-shadow: 1px 1px 12px 0 rgba(0, 0, 0, 0.06),
                -1px -1px 12px 0 rgba(0, 0, 0, 0.06);
        }
    }

    @media (max-width: ${props => props.theme.breakpoints[1]}) {
        &&.ant-card-bordered {
            height: 100%;
            width: 100%;
        }
    }

    && {
        .ant-card-body {
            padding: 10px 16px;
            height: 100%;

            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                padding: 32px;
            }
        }
    }
`;

class DentistListingCard extends PureComponent {
    state = {
        tagStopPoint: null,
        indexToMap: 0,
    };

    componentDidMount() {
        if (this.props.dentist && !_isEmpty(this.props.dentist.procedures)) {
            this.setState({
                tagStopPoint: this.getStopPoint({
                    procedures: this.props.dentist.procedures,
                }),
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.showMap !== this.props.showMap) {
            if (
                this.props.dentist &&
                !_isEmpty(this.props.dentist.procedures)
            ) {
                this.setState({
                    tagStopPoint: this.getStopPoint({
                        procedures: this.props.dentist.procedures,
                    }),
                });
            }
        }
    }

    handleSelectAppointment = e => {
        const { start, dentistid, officeid } = e.currentTarget.dataset;

        const { onSelectAppointment } = this.props;

        const appointment = {};

        if (start) {
            appointment.localStartTime = start;
        }

        if (dentistid) {
            appointment.dentistId = dentistid;
        }

        if (officeid) {
            appointment.officeId = officeid;
        }

        onSelectAppointment && onSelectAppointment(appointment);

        e.stopPropagation();
    };

    getStopPoint = ({ procedures = [] }) => {
        const { showMap, mobileOnly } = this.props;
        let stopPoint = null;

        let threshold = showMap ? 374 : 1188;

        if (mobileOnly) {
            threshold = 330;
        }

        procedures.reduce((acc, cur, i) => {
            if (!stopPoint && stopPoint !== 0 && acc >= threshold) {
                stopPoint = i;
            }

            return acc + cur.length * 6.5 + 38;
        }, 0);

        return stopPoint;
    };

    filterProcedureList = procedures => {
        if (this.props.dentist.bundles.length === 0) return [];
        const bundlesWithPrices = this.props.dentist.bundles.filter(
            b => b.price
        );
        const bundlesNameWithPrices = bundlesWithPrices.map(p => p.group);
        return procedures.filter(p => bundlesNameWithPrices.includes(p));
    };

    render() {
        const { dentist, onRedirect } = this.props;
        const indexToMap = parseInt(this.state.indexToMap);

        const earliestAvailableDate =
            dentist.appointmentTimeslotsByOffice &&
            dentist.appointmentTimeslotsByOffice.length !== 0 &&
            !_isEmpty(
                dentist.appointmentTimeslotsByOffice[indexToMap]
                    .appointmentTimeslots
            ) &&
            dentist.appointmentTimeslotsByOffice[indexToMap]
                .appointmentTimeslots[indexToMap].localStartTime;

        const { tagStopPoint } = this.state;

        const menu = (
            <Menu
                onClick={({ key, domEvent }) => {
                    this.setState({ indexToMap: key });
                    domEvent.stopPropagation();
                }}
            >
                {dentist.appointmentTimeslotsByOffice.map((item, index) => (
                    <Menu.Item key={index}>
                        {item.office.location.name.split(',', 3).toString()}
                    </Menu.Item>
                ))}
            </Menu>
        );

        return (
            <Box
                width="100%"
                style={{ cursor: 'pointer' }}
                onClick={onRedirect}
            >
                <StyledCard>
                    <Flex height="100%" flexDirection={['column', '', 'row']}>
                        <Flex
                            width={['100%', '', 'calc(100% - 304px)']}
                            borderRight={['none', '', '1px solid #dbdbdb']}
                            borderBottom={['1px solid #dbdbdb', '', 'none']}
                            pb={[20, '', 0]}
                        >
                            <Desktop>
                                <Box
                                    width={136}
                                    height={136}
                                    borderRadius="50%"
                                    mr={32}
                                    overflow="hidden"
                                >
                                    {dentist.imageUrl &&
                                    dentist.imageUrl.includes('filestack') ? (
                                        <FilestackImage
                                            handle={getIdFromFilestackUrl(
                                                dentist.imageUrl
                                            )}
                                            alt={`Dr. ${dentist.name}`}
                                            sizes={{
                                                fallback: '136px',
                                            }}
                                            formats={['webp', 'pjpg']}
                                        />
                                    ) : (
                                        <Image
                                            src={defaultUserImage}
                                            alt={`Dr. ${dentist.name}`}
                                            width="100%"
                                            height="100%"
                                        />
                                    )}
                                </Box>
                            </Desktop>
                            <Box
                                flex={1}
                                width={['', '', 'calc(100% - 136px - 32px)']}
                                pr={['', '', 32]}
                            >
                                <TopBlock dentist={dentist} />
                                <MiddleBlock
                                    dentist={dentist}
                                    tagStopPoint={tagStopPoint}
                                />
                                <AppointmentTimeslots
                                    dentist={dentist}
                                    indexToMap={indexToMap}
                                    earliestAvailableDate={
                                        earliestAvailableDate
                                    }
                                    handleSelectAppointment={
                                        this.handleSelectAppointment
                                    }
                                    menu={menu}
                                />
                            </Box>
                        </Flex>
                        <Flex justifyContent="center" flex="1">
                            {dentist.bundles && dentist.bundles.length ? (
                                <Box
                                    width="100%"
                                    maxWidth="304px"
                                    minHeight={['auto', '', '310px']}
                                    pt={[12, '', 0]}
                                    pb={[10, '', 0]}
                                >
                                    <Bundle
                                        procedures={this.filterProcedureList(
                                            dentist.procedures
                                        )}
                                        insurance={
                                            dentist.acceptedInsurances || []
                                        }
                                        price={
                                            dentist.bundles &&
                                            dentist.bundles.length !== 0 &&
                                            dentist.bundles[0].price
                                        }
                                        bundles={dentist.bundles || []}
                                        dentistId={dentist.dentistId}
                                    />
                                </Box>
                            ) : (
                                <Flex
                                    alignItems="center"
                                    justifyContent="center"
                                    width={304}
                                    pl={[0, '', 18]}
                                    py={20}
                                >
                                    <Text textAlign="center">
                                        There are no available prices
                                    </Text>
                                </Flex>
                            )}
                        </Flex>
                    </Flex>
                </StyledCard>
            </Box>
        );
    }
}

DentistListingCard.propTypes = {
    variant: PropTypes.oneOf(['small', 'large']),
    dentist: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        specialty: PropTypes.string,
        address: PropTypes.string,
        rating: PropTypes.number,
        ratingCount: PropTypes.number,
        languages: PropTypes.arrayOf(PropTypes.string),
        procedures: PropTypes.arrayOf(PropTypes.string),
        insurance: PropTypes.arrayOf(PropTypes.string),
        availableTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    }),
    onRedirect: PropTypes.func,
    onSelectAppointment: PropTypes.func,
};

export default withScreenSizes(DentistListingCard);
