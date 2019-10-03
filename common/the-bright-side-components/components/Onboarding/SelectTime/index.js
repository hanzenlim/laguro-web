import React, { Component } from 'react';
import Radio from '../Radio';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class SelectTime extends Component {
    onChange = event => {
        const { value } = event.target;
        this.props.onSelect && this.props.onSelect(value);
    };

    render() {
        return (
            <RadioGroup
                value={this.props.value}
                onChange={this.onChange}
                buttonStyle="solid"
            >
                <RadioButton
                    fontSize={[0, '', 3]}
                    width={135}
                    height={50}
                    value={30}
                >
                    30 mins
                </RadioButton>
                <RadioButton
                    fontSize={[0, '', 3]}
                    width={135}
                    height={50}
                    value={60}
                >
                    1 hour
                </RadioButton>
            </RadioGroup>
        );
    }
}

export { SelectTime };
