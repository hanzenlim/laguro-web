import React, { Component } from 'react';
import { Box } from '@laguro/basic-components';

import PinItem from './PinItem';

type PinInputProps = {
    focus?: boolean;
    length: number;
    onChange: Function;
    onComplete?: Function;
    secret?: boolean;
    type?: string;
    validate?: Function;
    small?: boolean;
};

class PinInput extends Component<PinInputProps> {
    values: string[];
    elements: any[];
    currentIndex: number;

    constructor(props) {
        super(props);
        this.values = new Array(props.length).join('0').split('0');
        this.elements = [];
        this.currentIndex = 0;
    }

    componentDidMount() {
        if (this.props.focus && this.props.length) this.elements[0].focus();
    }

    clear = () => {
        this.elements.forEach(e => e.clear());
        this.values = this.values.map(() => undefined);
        this.elements[0].focus();
    };

    onItemChange = (value, index) => {
        const { length, onComplete, onChange } = this.props;
        let currentIndex = index;

        this.values[index] = value;

        if (value.length === 1 && index < length - 1) {
            currentIndex += 1;
            this.elements[currentIndex].focus();
        }

        const pin = this.values.join('');

        onChange(pin, currentIndex);
        if (onComplete && pin.length === length) {
            onComplete(pin, currentIndex);
        }
    };

    onBackspace = index => {
        if (index > 0) {
            this.elements[index - 1].focus();
        }
    };

    render() {
        const { validate, type, secret, small } = this.props;
        return (
            <Box>
                {this.values.map((_: any, i) => (
                    <PinItem
                        ref={n => (this.elements[i] = n)}
                        key={i}
                        onBackspace={() => this.onBackspace(i)}
                        secret={secret || false}
                        onChange={v => this.onItemChange(v, i)}
                        type={type}
                        validate={validate}
                        small={small}
                    />
                ))}
            </Box>
        );
    }
}

export default PinInput;
