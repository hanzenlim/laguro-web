import React, { Component } from 'react';
import system from 'system-components';
import { Box } from '../';

// props:
//          name       css-property

//     Grid:
//          gtc:      grid-template-columns
//          gtr:      grid-template-rows
//          gcg:      grid-column-gap

//     GridItem:
//           gc:      grid-column    --> 'all' means 'spans all columns'
//           gr:      grid-row       --> 'all' means 'spans all columns'

const GridSystem = system(
    {
        is: Box,
        display: 'grid',
    },
    props => ({
        'grid-template-columns': props.gtc,
        'grid-template-rows': props.gtr,
        'grid-column-gap': props.gcg,
        'grid-row-gap': props.grg,
    }),
    'alignItems',
    'justifyItems',
    'space',
    'position'
);

const GridItemSystem = system(
    props => ({
        'grid-column': props.gc === 'all' ? '1 / -1' : props.gc,
        'grid-row': props.gr === 'all' ? '1 / -1' : props.gr,
    }),
    'alignItems',
    'space',
    'position'
);

class Grid extends Component {
    render() {
        const { children, ...rest } = this.props;
        return <GridSystem {...rest}> {children} </GridSystem>;
    }
}

Grid.GridItem = GridItemSystem;

export default Grid;
