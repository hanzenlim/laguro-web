import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { Menu } from 'antd';
import {
    Box,
    Card,
    Flex,
    Image,
    Text,
    FilestackImage,
    Responsive,
    Link,
} from '~/components';
import { withScreenSizes } from '~/components/Responsive';
import Bundle from '../Bundle';
import TopBlock from './TopBlock';
import MiddleBlock from './MiddleBlock';
import AppointmentTimeslots from './AppointmentTimeslots';
import { getIdFromFilestackUrl } from '~/util/imageUtil';
import { DENTIST_DETAILS_PAGE_URL_PREFIX } from '~/util/urls';

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

    handleSelectAppointment = e => {
        const {
            start,
            dentistid,
            officeid,
            dentistpermalink,
        } = e.currentTarget.dataset;

        const { onSelectAppointment } = this.props;

        const appointment = {};

        if (dentistpermalink) {
            appointment.dentistPermalink = dentistpermalink;
        }

        if (start) {
            appointment.localStartTime = start;
        }

        if (dentistid) {
            appointment.dentistId = dentistid;
        }

        if (officeid) {
            appointment.officeId = officeid;
        }

        if (onSelectAppointment) onSelectAppointment(appointment);

        e.stopPropagation();
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
        const { dentist } = this.props;
        const indexToMap = parseInt(this.state.indexToMap, 10);

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
                        <Text
                            fontWeight="normal"
                            fontSize={[0, '', 1]}
                            width={['calc(100vw - 104px)', '', 380]}
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {item.office.location.name.split(',', 3).toString()}
                        </Text>
                    </Menu.Item>
                ))}
            </Menu>
        );

        const dentistDetailsPageUrl = `${DENTIST_DETAILS_PAGE_URL_PREFIX}/${dentist.permalink ||
            dentist.dentistId}`;

        return (
            <Box width="100%">
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
                                    <Link
                                        to={dentistDetailsPageUrl}
                                        prefetch={false}
                                    >
                                        {dentist.imageUrl &&
                                        dentist.imageUrl.includes(
                                            'filestack'
                                        ) ? (
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
                                                src="/static/images/defaultUserImage.svg"
                                                alt={`Dr. ${dentist.name}`}
                                                width="100%"
                                                height="100%"
                                            />
                                        )}
                                    </Link>
                                </Box>
                            </Desktop>
                            <Box
                                flex={1}
                                width={['', '', 'calc(100% - 136px - 32px)']}
                                pr={['', '', 32]}
                            >
                                <Box mb={[8, '', 4]}>
                                    <Link
                                        to={dentistDetailsPageUrl}
                                        prefetch={false}
                                    >
                                        <TopBlock dentist={dentist} />
                                    </Link>
                                </Box>
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
                                    width="100%"
                                    maxWidth="304px"
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
    onSelectAppointment: PropTypes.func,
};

export default withScreenSizes(DentistListingCard);
