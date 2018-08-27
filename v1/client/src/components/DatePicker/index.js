import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DatePicker as AntdDatePicker } from 'antd';
import { Flex, Text, Box, Icon } from '../../components';

const StyledContainer = styled.div`
    position: relative;
    width: 190px;
    height: 80px;
    border-radius: 4px;
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

class DatePicker extends PureComponent {
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
                        <AntdDatePicker
                            {...rest}
                            format={'D MMM YYYY'}
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
                        justifyContent="center"
                        onClick={this.toggleDatePicker}
                    >
                        {this.state.dateString.length > 0 && (
                            <Icon type="calendar" width="24px" height="24px" />
                        )}
                        <Text
                            fontSize={2}
                            color="text.black"
                            ml={this.state.dateString.length ? 6 : 0}
                        >
                            {this.state.dateString || 'date'}
                        </Text>
                    </Flex>
                </div>
            </StyledContainer>
        );
    }
}

export default DatePicker;
