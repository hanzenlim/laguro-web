import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DatePicker as AntdDatePicker } from 'antd';
import moment from 'moment';
import { width } from 'styled-system';

import { Flex, Text, Icon } from '../../components';

const StyledContainer = styled.div`
    && {
        position: relative;
        ${width};
        height: 60px;
        border-radius: 2px;
        background-color: ${props => props.theme.colors.background.white};
        border: 1px solid ${props => props.theme.colors.divider.darkGray};
        font-size: ${props => props.theme.fontSizes[2]};
        font-weight: ${props => props.theme.fontWeights.bold};
        cursor: pointer;
        text-align: left;
    }

    a {
        color: ${props => props.theme.colors.datePicker.green};
    }

    .ant-calendar-date {
        border-radius: 25px;
    }

    .ant-calendar-today .ant-calendar-date {
        border-color: ${props => props.theme.colors.datePicker.green};
        font-weight: bold;
        color: ${props => props.theme.colors.text.black};
    }

    .ant-calendar-selected-day .ant-calendar-date {
        color: ${props => props.theme.colors.text.white};
        background-color: ${props => props.theme.colors.datePicker.green};
    }

    .ant-calendar-selected-date .ant-calendar-date,
    .ant-calendar-selected-start-date .ant-calendar-date,
    .ant-calendar-selected-end-date .ant-calendar-date {
        color: ${props => props.theme.colors.datePicker.white};
        background-color: ${props => props.theme.colors.datePicker.green};
    }

    .ant-calendar-date:hover,
    .ant-calendar-selected-day .ant-calendar-date:hover {
        background: ${props => props.theme.colors.datePicker.green75};
        color: ${props => props.theme.colors.text.black};
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
        this.setState({ open: !this.state.open });
    };

    onSelectDate = (date, dateString) => {
        this.setState({ dateString, open: false });

        this.props.onDateChange(date);
    };

    getCalendarContainer = () => this.refs.datePickerContainer;

    render() {
        const { open } = this.state;

        return (
            <StyledContainer width={this.props.width}>
                <Flex
                    width="100%"
                    height="100%"
                    position="absolute"
                    alignItems="center"
                    justifyContent="flex-start"
                    onClick={this.toggleDatePicker}
                    py={20}
                    px={10}
                >
                    <Icon
                        type="calendar"
                        ml={10}
                        mt={2}
                        fontSize={4}
                        color="icon.green"
                    />

                    <Text
                        fontSize={3}
                        color={
                            this.state.dateString ? 'text.black50' : 'text.gray'
                        }
                        ml={15}
                    >
                        {this.state.dateString || moment().format('ddd MM/DD')}
                    </Text>
                </Flex>
                <div ref="datePickerContainer" />
                <AntdDatePicker
                    format={'ddd MM/DD'}
                    open={open}
                    onChange={this.onSelectDate}
                    getCalendarContainer={this.getCalendarContainer}
                    showToday={false}
                    style={{
                        visibility: 'hidden',
                        position: 'relative',
                        top: '70px',
                    }}
                    popupStyle={{ borderRadius: '30px' }}
                />
            </StyledContainer>
        );
    }
}

export default DatePicker;
