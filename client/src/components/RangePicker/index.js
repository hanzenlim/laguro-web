import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DatePicker as AntdDatePicker } from 'antd';
import { Flex, Text, Box, Icon, Grid } from '../../components';
import Responsive from '../../components/Responsive';

const { Desktop } = Responsive;

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
            open: false,
        };
    }

    toggleDatePicker = e => {
        e.stopPropagation();
        this.setState({ open: true });
    };

    onSelectDate = (date, dateString) => {
        this.setState({ dateString, open: false });

        if (this.props.onChange) {
            this.props.onChange(date);
        }
    };

    getCalendarContainer = () => this.refs.datePickerContainer;

    render() {
        const { value, dateSize, ...rest } = this.props;

        return (
            <StyledContainer {...rest}>
                <div ref="datePickerContainer" />
                <Box position="absolute" width="100%" height="100%" opacity="0">
                    <AntdDatePicker.RangePicker
                        value={value}
                        {...rest}
                        format={'ddd M/D'}
                        getCalendarContainer={this.getCalendarContainer}
                        open={this.state.open}
                        onChange={this.onSelectDate}
                    />
                </Box>
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
                        onClick={this.toggleDatePicker}
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
                                {(value && value[0].format('ddd M/DD')) ||
                                    this.state.dateString[0] ||
                                    'Start date'}
                            </Text>
                            <Icon
                                type="calendar"
                                color="text.black50"
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
                        >
                            <Text
                                fontSize={[0, '', dateSize || 3]}
                                fontWeight="regular"
                                color="text.black50"
                                lineHeight="26px"
                                letterSpacing="-0.6px"
                            >
                                {(value && value[1].format('ddd M/DD')) ||
                                    this.state.dateString[1] ||
                                    'End date'}
                            </Text>
                            <Icon
                                type="calendar"
                                color="text.black50"
                                fontSize="26px"
                            />
                        </Flex>
                    </Grid>
                </Box>
            </StyledContainer>
        );
    }
}

export default RangePicker;
