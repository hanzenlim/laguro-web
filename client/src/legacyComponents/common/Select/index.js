import React, { Component } from 'react';
import { Select as MateriaUISelect } from '@material-ui/core';

import styled from 'styled-components';

const StyledSelect = styled(MateriaUISelect)`
    width: 100%;
`;

class Select extends Component {
    render() {
        return <StyledSelect {...this.props} />;
    }
}

export default Select;
