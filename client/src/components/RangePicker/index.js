import React, { PureComponent } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { DatePicker as AntdDatePicker } from 'antd';
import { Flex, Text, Box, Icon, Grid } from '../../components';
import Responsive, { withScreenSizes } from '../../components/Responsive';

const { Desktop, TabletMobile } = Responsive;

const StyledContainer = styled.div`
    position: relative;
    width: ${props => (props.width ? props.width : '455px')};
    border-radius: 2px;
    background-color: ${props => props.theme.colors.background.white};
    border: 1px solid ${props => props.theme.colors.divider.gray};
    height: 100px;
    cursor: pointer;
    @media (min-width: ${props => props.theme.breakpoints[1]}) {
        height: 50px;
    }

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
    }
`;

const rightArrowHeight = 16;
const rightArrowWidth = 1.25 * rightArrowHeight;

class RangePicker extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dateString: '',
            startValue: null,
            endValue: null,
            startOpen: false,
            endOpen: false,
        };
    }

    disabledStartDate = startValue => {
        const { endValue } = this.state;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const { startValue } = this.state;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onStartChange = value => {
        this.setState({ startValue: value });
    };

    onEndChange = value => {
        this.setState({ endValue: value });

        if (this.props.onChange) {
            this.props.onChange([this.state.startValue, value]);
        }
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ startOpen: false, endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    toggleStartDatePicker = e => {
        e.stopPropagation();
        this.setState({ startOpen: true });
    };

    onSelectDate = (date, dateString) => {
        this.setState({ dateString, startOpen: false });

        if (this.props.onChange) {
            this.props.onChange(date);
        }
    };

    getCalendarContainer = () => this.refs.datePickerContainer;

    render() {
        const { value, dateSize, desktopOnly, ...rest } = this.props;
        const { startValue, endValue, startOpen, endOpen } = this.state;

        const startValueString = desktopOnly
            ? (value &&
                  value[0] &&
                  moment.isMoment(value[0]) &&
                  value[0].format('ddd M/DD')) ||
              this.state.dateString[0] ||
              'Start date'
            : (startValue && startValue.format('ddd M/DD')) || 'Start date';

        const endValueString = desktopOnly
            ? (value &&
                  value[1] &&
                  moment.isMoment(value[1]) &&
                  value[1].format('ddd M/DD')) ||
              this.state.dateString[1] ||
              'End date'
            : (endValue && endValue.format('ddd M/DD')) || 'End date';

        return (
            <StyledContainer {...rest}>
                <div ref="datePickerContainer" />
                <Desktop>
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        opacity="0"
                    >
                        <AntdDatePicker.RangePicker
                            value={
                                value &&
                                moment.isMoment(value[0]) &&
                                moment.isMoment(value[1])
                                    ? value
                                    : []
                            }
                            {...rest}
                            format={'ddd M/D'}
                            getCalendarContainer={this.getCalendarContainer}
                            open={startOpen}
                            onChange={this.onSelectDate}
                        />
                    </Box>
                </Desktop>
                <TabletMobile>
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        opacity="0"
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
                        <AntdDatePicker
                            getCalendarContainer={this.getCalendarContainer}
                            disabledDate={this.disabledEndDate}
                            format="ddd M/DD"
                            value={endValue}
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                        />
                    </Box>
                </TabletMobile>
                <Box position="absolute" width="100%" height={[100, '', 50]}>
                    <Grid
                        width="100%"
                        height={[100, '', 50]}
                        gridTemplateRows={['auto auto', '', 'auto']}
                        gridTemplateColumns={[
                            '100%',
                            '',
                            `1fr ${rightArrowWidth}px 1fr`,
                        ]}
                        alignItems="center"
                        onClick={this.toggleStartDatePicker}
                    >
                        <Flex
                            justifyContent="space-between"
                            width="100%"
                            height="50px"
                            px={30}
                            py={12}
                            borderBottom={['1px solid', '', 'none']}
                            borderColor="divider.gray"
                        >
                            <Text
                                fontSize={[0, '', dateSize || 3]}
                                fontWeight="regular"
                                color="text.black50"
                                lineHeight="26px"
                                letterSpacing="-0.6px"
                            >
                                {startValueString}
                            </Text>
                            <Icon
                                type="calendar"
                                color="icon.blue"
                                fontSize="26px"
                            />
                        </Flex>

                        {/* width is 1.25 * rightArrowWidth */}
                        <Desktop>
                            <Icon
                                type="rightForwardArrow"
                                height={`${rightArrowHeight}px`}
                            />
                        </Desktop>

                        <Flex
                            justifyContent="space-between"
                            width="100%"
                            height="50px"
                            px={30}
                            py={12}
                            color="text.blue"
                        >
                            <Text
                                fontSize={[0, '', dateSize || 3]}
                                fontWeight="regular"
                                color="text.black50"
                                lineHeight="26px"
                                letterSpacing="-0.6px"
                            >
                                {endValueString}
                            </Text>
                            <Icon
                                type="calendar"
                                color="text.blue"
                                fontSize="26px"
                            />
                        </Flex>
                    </Grid>
                </Box>
            </StyledContainer>
        );
    }
}

export default withScreenSizes(RangePicker);
