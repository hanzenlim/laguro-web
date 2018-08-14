import React from 'react';
import { Card as MaterialUICard } from '@material-ui/core';

const Card = (props) => {
    const { children, ...customProps } = props;

    return (
        <MaterialUICard {...customProps}>
            {children}
        </MaterialUICard>
    );
};

export default Card;
