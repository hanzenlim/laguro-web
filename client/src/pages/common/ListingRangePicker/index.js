import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { DatePicker as AntdDatePicker } from 'antd';
import { Flex, Text, Box, Icon, Grid, Button } from '../../../components';
import Responsive, { withScreenSizes } from '../../../components/Responsive';

const { Desktop, TabletMobile } = Responsive;

const StyledContainer = styled.div`
    position: relative;
    width: ${props => (props.width ? props.width : '455px')};
    background-color: ${props => props.theme.colors.background.white};
    height: 100px;
    cursor: pointer;

    && {
        a {
            color: ${props => props.theme.colors.datePicker.blue};
        }

        .ant-calendar-today .ant-calendar-date {
            border-color: ${props => props.theme.colors.datePicker.blue};
            font-weight: bold;
            color: ${props => props.theme.colors.datePicker.blue};
        }

        .ant-calendar-selected-day .ant-calendar-date {
            color: ${props => props.theme.colors.datePicker.white};
            background-color: ${props => props.theme.colors.datePicker.blue};
        }

        .ant-calendar-selected-date .ant-calendar-date,
        .ant-calendar-selected-start-date .ant-calendar-date,
        .ant-calendar-selected-end-date .ant-calendar-date {
            color: ${props => props.theme.colors.datePicker.white};
            background-color: ${props => props.theme.colors.datePicker.blue};
        }

        .ant-calendar-date:hover {
            background: ${props => props.theme.colors.datePicker.white};
            color: ${props => props.theme.colors.datePicker.blue};
        }

        .ant-calendar-input-wrap {
            display: none;
        }
    }
`;

const StyledGrid = styled(Grid)`
    opacity: 0;
    height: 100px;
    @media (min-width: ${props => props.theme.breakpoints[1]}) {
        height: 50px;
    }
`;

class RangePicker extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dateString: '',
            startValue: props.value[0],
            endValue: props.value[1] || null,
            startOpen: false,
            endOpen: false,
            showEndTime: false,
        };
    }

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        const tomorrowMoment = moment()
            .startOf('day')
            .add(1);

        const isBeforeTomorrow = startValue.isBefore(tomorrowMoment);

        if (isBeforeTomorrow) {
            return true;
        }

        if (!_isEmpty(endValue)) {
            return startValue.valueOf() > endValue.valueOf();
        }
        return false;
    };

    disabledEndDate = endValue => {
        const { startValue } = this.state;
        const tomorrowMoment = moment()
            .startOf('day')
            .add(1);

        const isBeforeTomorrow = endValue.isBefore(tomorrowMoment);

        if (isBeforeTomorrow) {
            return true;
        }

        if (!_isEmpty(startValue)) {
            return endValue.valueOf() < startValue.valueOf();
        }
        return false;
    };

    onStartChange = value => {
        this.setState({ startValue: value });
        if (this.props.onChange) {
            this.props.onChange([value, this.state.endValue]);
        }
    };

    onEndChange = value => {
        this.setState({ endValue: value });
        if (this.props.onChange) {
            this.props.onChange([this.state.startValue, value]);
        }
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({
                startOpen: false,
            });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    toggleStartDatePicker = e => {
        e.stopPropagation();
        this.setState({ startOpen: true });
    };

    toggleEndDatePicker = e => {
        e.stopPropagation();
        this.setState({ endOpen: true });
    };

    getCalendarContainer = () => this.refs.datePickerContainer;

    render() {
        const { value, dateSize, desktopOnly, ...rest } = this.props;
        const { startValue, endValue, startOpen, endOpen } = this.state;

        let startValueString =
            (value &&
                value[0] &&
                moment.isMoment(value[0]) &&
                value[0].format('ddd M/DD')) ||
            'Select date';

        if (
            !_isEmpty(_get(value, '[0]')) &&
            value[0].startOf('day').isSame(
                moment()
                    .startOf('day')
                    .add(1, 'day')
            )
        ) {
            startValueString = 'Tomorrow';
        }

        const endValueString =
            (value &&
                value[1] &&
                moment.isMoment(value[1]) &&
                value[1].format('ddd M/DD')) ||
            'Select date';

        const showEndTimeComponent =
            this.state.showEndTime ||
            (!_isEmpty(value[1]) && value[1].isBefore(moment().add(1, 'year')));

        return (
            <StyledContainer {...rest}>
                <div ref="datePickerContainer" />
                <Desktop>
                    <Grid gridTemplateColumns="1fr 1fr 18px" gridColumnGap={11}>
                        <Text
                            className="listing-range-picker-starting-date"
                            fontSize={3}
                            letterSpacing="-0.6px"
                        >
                            Starting date
                        </Text>
                        {showEndTimeComponent && (
                            <Fragment>
                                <Text
                                    className="listing-range-picker-ending-date"
                                    fontSize={3}
                                    letterSpacing="-0.6px"
                                >
                                    Ending date
                                </Text>
                            </Fragment>
                        )}
                    </Grid>
                </Desktop>
                <StyledGrid
                    gridTemplateColumns={['unset', '', '1fr 1fr']}
                    position="absolute"
                    width="100%"
                    height="100%"
                    gridColumnGap={11}
                >
                    <AntdDatePicker
                        getCalendarContainer={this.getCalendarContainer}
                        disabledDate={this.disabledStartDate}
                        format="ddd M/DD"
                        value={startValue}
                        onChange={this.onStartChange}
                        open={startOpen}
                        onOpenChange={this.handleStartOpenChange}
                    />
                    {showEndTimeComponent ? (
                        <AntdDatePicker
                            getCalendarContainer={this.getCalendarContainer}
                            disabledDate={this.disabledEndDate}
                            format="ddd M/DD"
                            value={endValue}
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                            defaultPickerValue={moment(
                                this.state.startValue || undefined
                            ).add(6, 'months')}
                        />
                    ) : (
                        <div />
                    )}
                </StyledGrid>
                <Box position="absolute" width="100%" height={100}>
                    <Grid
                        width="100%"
                        height={100}
                        gridTemplateRows="auto auto"
                        gridColumnGap={11}
                        gridTemplateColumns={['100%', '', '1fr 1fr 18px']}
                        alignItems="center"
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                            height="50px"
                            pl={30}
                            pr={6}
                            py={12}
                            border="solid 1px"
                            borderColor="divider.gray"
                            onClick={this.toggleStartDatePicker}
                        >
                            <Text
                                fontSize={[0, '', 3]}
                                fontWeight="regular"
                                color="text.black50"
                                lineHeight="26px"
                                letterSpacing="-0.6px"
                            >
                                {startValueString}
                            </Text>
                            <Flex alignItems="center" height={50}>
                                <Icon
                                    mr={6}
                                    type="calendar"
                                    color="text.blue"
                                    fontSize="26px"
                                    width={26}
                                    height={26}
                                />
                                <TabletMobile>
                                    <Button
                                        type="ghost"
                                        onClick={() => {
                                            this.setState({
                                                showEndTime: false,
                                            });
                                            this.onEndChange(null);
                                        }}
                                    >
                                        <Box width={18} height={18} />
                                    </Button>
                                </TabletMobile>
                            </Flex>
                        </Flex>

                        {showEndTimeComponent ? (
                            <Fragment>
                                <Flex
                                    justifyContent="space-between"
                                    alignItems="center"
                                    width="100%"
                                    height="50px"
                                    pl={30}
                                    pr={6}
                                    py={12}
                                    color="text.blue"
                                    border={['solid 1px rgba(0, 0, 0, 0.1)']}
                                    borderColor="divider.gray"
                                    borderTop={[
                                        'none',
                                        '',
                                        'solid 1px rgba(0, 0, 0, 0.1)',
                                    ]}
                                    onClick={this.toggleEndDatePicker}
                                >
                                    <Text
                                        fontSize={[0, '', 3]}
                                        fontWeight="regular"
                                        color="text.black50"
                                        lineHeight="26px"
                                        letterSpacing="-0.6px"
                                    >
                                        {endValueString}
                                    </Text>
                                    <Flex alignItems="center" height={50}>
                                        <Icon
                                            mr={6}
                                            type="calendar"
                                            color="text.blue"
                                            fontSize="26px"
                                            width={26}
                                            height={26}
                                        />
                                        <TabletMobile>
                                            <Button
                                                type="ghost"
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    this.setState({
                                                        showEndTime: false,
                                                    });
                                                    this.onEndChange(null);
                                                }}
                                                height={18}
                                            >
                                                <Icon
                                                    width={18}
                                                    height={18}
                                                    type="closeCircle"
                                                    fontSize="18px"
                                                    color="icon.black"
                                                />
                                            </Button>
                                        </TabletMobile>
                                    </Flex>
                                </Flex>
                                <Desktop>
                                    <Button
                                        type="ghost"
                                        onClick={() => {
                                            this.setState({
                                                showEndTime: false,
                                            });
                                            this.onEndChange(null);
                                        }}
                                    >
                                        <Icon
                                            width={18}
                                            height={18}
                                            type="closeCircle"
                                            fontSize="18px"
                                            color="icon.black"
                                        />
                                    </Button>
                                </Desktop>
                            </Fragment>
                        ) : (
                            <Button
                                ml={[0, '', 33]}
                                type="ghost"
                                onClick={() => {
                                    this.setState({
                                        showEndTime: true,
                                    });
                                    this.onEndChange(
                                        moment(
                                            this.state.startValue || undefined
                                        ).add(6, 'months')
                                    );
                                }}
                            >
                                <Flex alignItems="center">
                                    <Icon
                                        mr={16}
                                        width={14}
                                        height={14}
                                        type="plus"
                                        fontSize="14px"
                                        color="icon.black"
                                    />
                                    <Text
                                        color="text.black"
                                        fontSize={[1, '', 3]}
                                        letterSpacing="-0.5px"
                                    >
                                        Add ending time
                                    </Text>
                                </Flex>
                            </Button>
                        )}
                    </Grid>
                </Box>
            </StyledContainer>
        );
    }
}

export default withScreenSizes(RangePicker);
