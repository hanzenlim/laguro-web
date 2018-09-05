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
            <StyledContainer>
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
                        height="100%"
                        position="absolute"
                        alignItems="center"
                        justifyContent="space-around"
                        onClick={this.toggleDatePicker}
                    >
                        <Text
                            fontSize={2}
                            color="text.black50"
                            ml={this.state.dateString.length ? 6 : 0}
                        >
                            {this.state.dateString[0] || 'Start date'}
                        </Text>
                        <Icon
                            type="rightForwardArrow"
                            width="20px"
                            height="16px"
                        />
                        <Text
                            fontSize={2}
                            color="text.black50"
                            ml={this.state.dateString.length ? 6 : 0}
                        >
                            {this.state.dateString[1] || 'End date'}
                        </Text>
                    </Flex>
                </div>
            </StyledContainer>
        );
    }
}

export default RangePicker;
