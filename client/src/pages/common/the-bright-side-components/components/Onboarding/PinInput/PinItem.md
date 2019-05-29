import { Input } from 'antd';
import React, { Component } from 'react';
import styled from 'styled-components';

const StyledInput = styled(Input)`
    && {
        width: ${({ small }) => (small ? 54 : 60)}px;
        height: ${({ small }) => (small ? 48 : 54)}px;
        margin-right: ${({ small }) => (small ? 9 : 14)}px;
        margin-bottom: 10px;
        border-radius: 4px;
        text-align: center;
        background-color: rgba(184, 233, 134, 0.1);
    }

    &&::-webkit-outer-spin-button,
    &&::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &&[type='number'] {
        -moz-appearance: textfield;
    }

    &&:focus {
        box-shadow: none;
        border-color: rgba(52, 129, 248, 0.7);
        background-color: rgba(52, 129, 248, 0.05);
    }

    &&:last-child {
        margin-right: 0px;
    }

    @media screen and (max-width: 480px) {
        && {
            width: 44px;
            height: 40px;
            margin-right: 10px;
        }

        &&:last-child {
            margin-right: 0px;
        }
    }
`;

interface PinItemProps {
    onBackspace: Function;
    onChange: Function;
    validate: Function;
    type?: string;
    secret?: boolean;
    small?: boolean;
}
interface PinItemState {
    value: string | number;
    focus: boolean;
}

class PinItem extends Component<PinItemProps, PinItemState> {
    public input: any;
    public setTextInputRef: (element: any) => void;
    public focus: () => void;

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            focus: false
        };

        this.input = null;

        this.setTextInputRef = element => {
            this.input = element;
        };

        this.focus = () => {
            // Focus the text input using the raw DOM API
            if (this.input) {
                this.input.focus();
            }
        };
    }

    public onKeyDown = e => {
        if (e.keyCode === 8 && !this.state.value) {
            this.props.onBackspace();
        }
    };

    public clear = () => {
        this.setState({
            value: ''
        });
    };

    public onChange = e => {
        const value = this.validate(e.target.value);
        if (this.state.value === value) {
            return;
        }
        if (value.length < 2) {
            this.setState({ value });
            // timeout is to make sure that clearing happens after value is set
            setTimeout(() => {
                this.props.onChange(value);
            }, 0);
        }
    };

    public onFocus = e => {
        e.target.select();
        this.setState({ focus: true });
    };

    public onBlur = () => {
        this.setState({ focus: false });
    };

    public validate = value => {
        const { validate, type } = this.props;
        if (validate) {
            return validate(value);
        }

        if (type === 'numeric') {
            const numCode = value.charCodeAt(0);
            const isInteger = numCode >= '0'.charCodeAt(0) && numCode <= '9'.charCodeAt(0);
            return isInteger ? value : '';
        }
        return value.toUpperCase();
    };

    public render() {
        const { value } = this.state;
        const { type, secret, small } = this.props;
        const inputType = type === 'numeric' ? 'tel' : type || 'text';

        return (
            <StyledInput
                small={small}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                maxLength={1}
                autoComplete="off"
                type={secret ? 'password' : inputType}
                pattern={type === 'numeric' ? '[0-9]*' : '[A-Z0-9]*'}
                ref={this.setTextInputRef}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                value={value}
            />
        );
    }
}

export default PinItem;
