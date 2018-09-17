import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DatePicker as AntdDatePicker } from 'antd';
import { Flex, Text, Box, Icon } from '../../components';

const StyledContainer = styled.div`
    position: relative;
    width: 455px;
    height: 50px;
    border-radius: 2px;
    background-color: ${props => props.theme.colors.background.white};
    border: 1px solid ${props => props.theme.colors.divider.gray};
    cursor: pointer;

    && {
        a {
            color: ${props => props.theme.colors.datePicker.green};
        }

        .ant-calendar-today .ant-calendar-date {
            border-color: ${props => props.theme.colors.datePicker.green};
            font-weight: bold;
            color: ${props => props.theme.colors.datePicker.green};
        }

        .ant-calendar-selected-day .ant-calendar-date {
            color: ${props => props.theme.colors.datePicker.white};
            background-color: ${props => props.theme.colors.datePicker.green};
        }

        .ant-calendar-selected-date .ant-calendar-date,
        .ant-calendar-selected-start-date .ant-calendar-date,
        .ant-calendar-selected-end-date .ant-calendar-date {
            color: ${props => props.theme.colors.datePicker.white};
            background-color: ${props => props.theme.colors.datePicker.green};
        }

        .ant-calendar-date:hover {
            background: ${props => props.theme.colors.datePicker.white};
            color: ${props => props.theme.colors.datePicker.green};
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
        const { ...rest } = this.props;

        return (
            <StyledContainer {...rest}>
                <div ref="datePickerContainer">
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        opacity="0"
                    >
                        <AntdDatePicker.RangePicker
                            {...rest}
                            format={'ddd M/D'}
                            getCalendarContainer={this.getCalendarContainer}
                            open={this.state.open}
                            onChange={this.onSelectDate}
                        />
                    </Box>
                    <Flex
                        width="100%"
                        px={30}
                        py={12}
                        position="absolute"
                        alignItems="center"
                        onClick={this.toggleDatePicker}
                    >
                        <Flex
                            justifyContent="space-between"
                            width={`calc((100% - ${rightArrowWidth}px) / 2)`}
                        >
                            <Text
                                fontSize={3}
                                fontWeight="regular"
                                color="text.black50"
                                lineHeight="26px"
                                letterSpacing="-0.6px"
                            >
                                {this.state.dateString[0] || 'Start date'}
                            </Text>
                            <Icon
                                type="calendar"
                                color="text.black50"
                                fontSize="26px"
                                mr={30}
                            />
                        </Flex>

                        {/* width is 1.25 * rightArrowWidth */}
                        <Icon
                            type="rightForwardArrow"
                            height={`${rightArrowHeight}px`}
                        />

                        <Flex
                            justifyContent="space-between"
                            width={`calc((100% - ${rightArrowWidth}px) / 2)`}
                        >
                            <Text
                                fontSize={3}
                                fontWeight="regular"
                                color="text.black50"
                                ml={30}
                                lineHeight="26px"
                                letterSpacing="-0.6px"
                            >
                                {this.state.dateString[1] || 'End date'}
                            </Text>
                            <Icon
                                type="calendar"
                                color="text.black50"
                                fontSize="26px"
                            />
                        </Flex>
                    </Flex>
                </div>
            </StyledContainer>
        );
    }
}

export default RangePicker;
