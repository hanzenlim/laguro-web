import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DatePicker as AntdDatePicker } from 'antd';
import moment from 'moment';
import { width } from 'styled-system';

import { Icon, Input } from '../../components';

const StyledContainer = styled.div`
    && {
        position: relative;
        ${width};
        height: 60px;
        border-radius: 2px;
        background-color: ${props => props.theme.colors.background.white};
        border: 1px solid ${props => props.theme.colors.divider.darkGray};
        cursor: pointer;
        text-align: left;
    }

    a {
        color: ${props => props.theme.colors.datePicker.blue};
    }
    .ant-input-affix-wrapper {
        height: 100%;
        width: 100%;
        padding: 5px 20px 5px 5px;

        .ant-input-suffix {
            visibility: hidden;
        }

        :hover {
            .ant-input-suffix {
                visibility: visible;
            }
        }
    }

    .ant-input-prefix {
        margin-left: 5px;
    }

    .ant-input {
        border: none;
        height: 100%;
        width: 100%;
        margin-left: 15px;
        color: ${props => props.theme.colors.text.black50};
        font-weight: ${props => props.theme.fontWeights.bold};
        font-size: ${props => props.theme.fontSizes[3]};
    }

    .ant-calendar-date {
        border-radius: 25px;
    }

    .ant-calendar-today .ant-calendar-date {
        border-color: ${props => props.theme.colors.datePicker.blue};
        font-weight: bold;
        color: ${props => props.theme.colors.text.black};
    }

    .ant-calendar-selected-day .ant-calendar-date {
        color: ${props => props.theme.colors.text.white};
        background-color: ${props => props.theme.colors.datePicker.blue};
    }

    .ant-calendar-selected-date .ant-calendar-date,
    .ant-calendar-selected-start-date .ant-calendar-date,
    .ant-calendar-selected-end-date .ant-calendar-date {
        color: ${props => props.theme.colors.datePicker.white};
        background-color: ${props => props.theme.colors.datePicker.blue};
    }

    .ant-calendar-date:hover,
    .ant-calendar-selected-day .ant-calendar-date:hover {
        background: ${props => props.theme.colors.datePicker.blue75};
        color: ${props => props.theme.colors.text.black};
    }
`;

class DatePicker extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dateString: props.initialValue
                ? moment(props.initialValue).format(this.props.format)
                : '',
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
        const { open, dateString } = this.state;

        return (
            <StyledContainer width={this.props.width}>
                <Input
                    onClick={this.toggleDatePicker}
                    value={dateString}
                    placeholder={moment().format(this.props.format)}
                    prefix={
                        <Icon
                            type="calendar"
                            mt={3}
                            fontSize={4}
                            color="icon.blue"
                        />
                    }
                    suffix={
                        dateString ? (
                            <Icon
                                type="close-circle"
                                fontSize={4}
                                color="icon.lightGray"
                                onClick={() =>
                                    this.setState({ dateString: '' })
                                }
                            />
                        ) : null
                    }
                />
                <div ref="datePickerContainer" />
                <AntdDatePicker
                    format={this.props.format}
                    open={open}
                    onChange={this.onSelectDate}
                    getCalendarContainer={this.getCalendarContainer}
                    showToday={false}
                    style={{
                        visibility: 'hidden',
                        position: 'relative',
                        top: '10px',
                    }}
                    popupStyle={{ borderRadius: '30px' }}
                />
            </StyledContainer>
        );
    }
}

export default DatePicker;
