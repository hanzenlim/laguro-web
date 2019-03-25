import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { DatePicker as AntdDatePicker } from 'antd';
import moment from 'moment';
import { width, height } from 'styled-system';

import { Icon, Input } from '../../components';
import { PLACE_HOLDER_OPACITY } from '../theme';

const PADDING_X_IN_PIXELS = 25;
const CALENDAR_ICON_WIDTH = 20;
const MARGIN_BETWEEN_CALENDAR_ICON_AND_TEXT = 13;
const DATEPICKER_TEXT_PADDING_LEFT =
    PADDING_X_IN_PIXELS +
    CALENDAR_ICON_WIDTH +
    MARGIN_BETWEEN_CALENDAR_ICON_AND_TEXT;

const StyledContainer = styled.div`
    && {
        position: relative;
        ${width};
        ${height};
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
        padding: 1px;

        .ant-input-suffix {
            visibility: hidden;
        }

        :hover {
            .ant-input-suffix {
                visibility: visible;
            }
        }
    }

    .ant-input-affix-wrapper .ant-input-prefix {
        left: 0;
        margin-left: ${PADDING_X_IN_PIXELS}px;
    }

    .ant-input {
        border: none;
        height: 100%;
        width: 100%;
        font-weight: ${props => props.theme.fontWeights.medium}
        font-size: ${props => props.theme.fontSizes[1]};
        color: ${props => props.theme.colors.text.black};
        letter-spacing: -0.3x;    
        ::placeholder {
            letter-spacing: -0.32px;
            font-weight: ${props => props.theme.fontWeights.medium}
            opacity: ${PLACE_HOLDER_OPACITY};
            font-size: ${props => props.theme.fontSizes[1]};
            color: ${props => props.theme.colors.text.black};
            letter-spacing: -0.3x;
            @media (min-width: ${props => props.theme.breakpoints[1]}) {
                font-weight: ${props => props.theme.fontWeights.regular}
            }
        }
        padding-top: 0;
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            padding-top: 2px;            
        } 
    }

    .ant-input-affix-wrapper .ant-input:not(:first-child) {
        :not(:first-child) {
            padding-left: ${DATEPICKER_TEXT_PADDING_LEFT}px;
            padding-right: ${PADDING_X_IN_PIXELS}px;
        }
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

    disabledDate = currentDate => {
        const { disablePastDates } = this.props;

        if (disablePastDates) {
            return currentDate && currentDate < moment().startOf('day');
        }

        return false;
    };

    render() {
        const { open, dateString } = this.state;

        return (
            <StyledContainer
                width={this.props.width}
                height={this.props.height}
            >
                <Input
                    onClick={this.toggleDatePicker}
                    value={dateString}
                    placeholder={moment().format(this.props.format)}
                    prefix={
                        <Icon
                            type="calendar"
                            mt={1}
                            fontSize={CALENDAR_ICON_WIDTH}
                            color="icon.blue"
                        />
                    }
                    suffix={
                        dateString ? (
                            <Icon
                                type="close-circle"
                                fontSize={3}
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
                    disabledDate={this.disabledDate}
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
