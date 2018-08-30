import React from 'react';
import { CardElement } from 'react-stripe-elements';

const style = {
    base: {
        fontSize: '16px',
        color: '#424770',
        lineHeight: '22px',
        letterSpacing: '0.025em',
        '::placeholder': {
            color: '#aab7c4',
        },
        padding: '16px',
    },
    invalid: {
        color: '#f5222d',
    },
};

class CardField extends React.Component {
    render() {
        return <CardElement className="ant-input" style={style} />;
    }
}

export default CardField;
