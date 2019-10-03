import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import {
    display,
    space,
    width,
    height,
    border,
    borderRadius,
} from 'styled-system';

const StyledMaskedInput = styled(MaskedInput)`
    ${display};
    ${space};
    ${width};
    ${height};
    ${border};
    ${borderRadius};

    &&:focus {
        border-color: #40a9ff;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        border-right-width: 1px !important;
    }
`;

StyledMaskedInput.defaultProps = {
    display: 'inline-block',
    p: '4px 11px',
    width: '100%',
    height: '32px',
    border: '1px solid #d9d9d9',
    borderRadius: 4,
};

export default StyledMaskedInput;
