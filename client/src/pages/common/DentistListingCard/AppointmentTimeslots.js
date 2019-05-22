import React, { Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _debounce from 'lodash/debounce';
import moment from 'moment';
import { Dropdown } from 'antd';

import { Box, Button, Text, Grid, Flex, Icon } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';

class AppointmentTimeslots extends React.Component {
    state = { gridWidth: 0 };

    gridWidthRef = React.createRef();

    componentDidMount() {
        window.addEventListener('resize', this.setGridWidth);
        this.setGridWidth();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setGridWidth);
    }

    setGridWidth = _debounce(() => {
        if (this.gridWidthRef.current) {
            this.setState({
                gridWidth: this.gridWidthRef.current.offsetWidth,
            });
        }
    });

    getNumOfVisibleSlots = () => {
        const { gridWidth } = this.state;
        const { tabletMobileOnly } = this.props;
        const slotSize = tabletMobileOnly ? 79 : 147;
        if (gridWidth < slotSize) return 0;

        return Math.floor(gridWidth / slotSize) * 2;
    };

    render() {
        const {
            dentist,
            indexToMap,
            earliestAvailableDate,
            handleSelectAppointment,
            menu,
        } = this.props;

        const hasTimeslots =
            dentist.appointmentTimeslotsByOffice &&
            dentist.appointmentTimeslotsByOffice.length !== 0 &&
            !_isEmpty(
                dentist.appointmentTimeslotsByOffice[0].appointmentTimeslots
            );

        const numOfVisibleSlots = this.getNumOfVisibleSlots();

        return hasTimeslots ? (
            <Fragment>
                <Text
                    mb={16}
                    fontWeight={['', '', 'medium']}
                    fontSize={[0, '', 1]}
                    lineHeight={['14px', '', '17px']}
                    textAlign="left"
                    mt={[5, '', 0]}
                >
                    {`Available times `}
                    {moment(
                        dentist.appointmentTimeslotsByOffice[indexToMap]
                            .appointmentTimeslots[indexToMap].localStartTime
                    ).diff(moment(), 'days') === 0 && 'today'}
                    {moment(
                        dentist.appointmentTimeslotsByOffice[indexToMap]
                            .appointmentTimeslots[indexToMap].localStartTime
                    ).diff(moment(), 'days') === 1 && 'tomorrow'}
                    {moment(
                        dentist.appointmentTimeslotsByOffice[indexToMap]
                            .appointmentTimeslots[indexToMap].localStartTime
                    ).diff(moment(), 'days') > 1 &&
                        `on ${moment(earliestAvailableDate).format('LL')}`}
                    {` at `}
                    {dentist.appointmentTimeslotsByOffice.length > 1 ? (
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button
                                type="ghost"
                                p={0}
                                width={['calc(100vw - 50px - 32px)', '', 380]}
                                height="auto"
                                ml={[0, '', 10]}
                                mt={5}
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                            >
                                <Flex
                                    height={40}
                                    flexDirection="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.18)"
                                    px={15}
                                >
                                    <Text
                                        fontWeight="normal"
                                        fontSize={[0, '', 1]}
                                        mr={5}
                                        style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {
                                            dentist
                                                .appointmentTimeslotsByOffice[
                                                indexToMap
                                            ].office.location.name
                                        }
                                    </Text>
                                    <Icon
                                        type="down"
                                        color="text.blue"
                                        fontSize={10}
                                    />
                                </Flex>
                            </Button>
                        </Dropdown>
                    ) : (
                        <Text
                            is="span"
                            fontSize={[0, '', 1]}
                            lineHeight={['14px', '', '17px']}
                            fontWeight="regular"
                        >
                            {dentist.appointmentTimeslotsByOffice[0].office.location.name
                                .split(',', 3)
                                .toString()}
                        </Text>
                    )}
                </Text>
                <Box
                    height={84}
                    maxHeight={84}
                    overflow="hidden"
                    width="100%"
                    ref={this.gridWidthRef}
                >
                    {this.gridWidthRef.current && (
                        <Grid
                            gridTemplateColumns={[
                                'repeat(auto-fit, 79px)',
                                '',
                                'repeat(auto-fit, 147px)',
                            ]}
                            gridGap={3}
                        >
                            {dentist.appointmentTimeslotsByOffice[
                                indexToMap
                            ].appointmentTimeslots
                                .slice(0, numOfVisibleSlots)
                                .map((availableTime, index) => {
                                    if (index + 1 === numOfVisibleSlots) {
                                        return (
                                            <Button
                                                key={
                                                    availableTime.localStartTime
                                                }
                                                type="primary"
                                                height={40}
                                                width="100%"
                                                ghost={true}
                                                pb={10}
                                                fontSize={4}
                                                fontWeight="700"
                                                data-dentistid={
                                                    dentist.dentistId
                                                }
                                                data-officeId={
                                                    dentist
                                                        .appointmentTimeslotsByOffice[
                                                        indexToMap
                                                    ].office.id
                                                }
                                                onClick={
                                                    handleSelectAppointment
                                                }
                                            >
                                                ...
                                            </Button>
                                        );
                                    }
                                    return (
                                        <Button
                                            key={availableTime.localStartTime}
                                            data-start={
                                                availableTime.localStartTime
                                            }
                                            data-dentistid={dentist.dentistId}
                                            data-officeId={
                                                dentist
                                                    .appointmentTimeslotsByOffice[
                                                    indexToMap
                                                ].office.id
                                            }
                                            type="primary"
                                            height={40}
                                            width="100%"
                                            ghost={true}
                                            onClick={handleSelectAppointment}
                                            fontSize={[0, '', 3]}
                                        >
                                            {moment(
                                                availableTime.localStartTime
                                            ).format('h:mm A')}
                                        </Button>
                                    );
                                })}
                        </Grid>
                    )}
                </Box>
            </Fragment>
        ) : (
            <Text
                style={{ 'white-space': 'pre-line' }}
                fontSize={[0, '', 3]}
                fontWeight="500"
                textAlign="left"
            >
                There are no available times
            </Text>
        );
    }
}

export default withScreenSizes(AppointmentTimeslots);
