import styled from 'styled-components';
import system from 'system-components';
import { truncate } from '../utils';

const Text = system(
    {
        fontFamily: `'Ubuntu', sans-serif`,
        color: 'text.black',
    },
    // core
    'space',
    'width',
    'color',
    // typography
    'fontFamily',
    'fontSize',
    'textAlign',
    'lineHeight',
    'letterSpacing',
    'fontWeight',
    // borders
    'borders',
    'borderColor',
    'borderRadius',
    // layout
    'display',
    'maxWidth',
    'minWidth',
    'height',
    'maxHeight',
    'minHeight',
    // flexText
    'alignItems',
    'alignContent',
    'justifyContent',
    'flexWrap',
    'flexDirection',
    'flex',
    'flexBasis',
    'justifySelf',
    'alignSelf',
    'order',
    // position
    'position',
    'zIndex',
    'top',
    'right',
    'bottom',
    'left'
);

const StyledText = styled(Text)`
    ${props => props.truncate && truncate('auto')};
    ${props => props.fontStyle && `font-style: ${props.fontStyle}`};
`;

StyledText.displayName = 'Text';

export default StyledText;
