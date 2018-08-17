import styled from 'styled-components';
import system from 'system-components';
import { truncate } from '../utils';

const SystemText = system(
    {
        fontFamily: `'Ubuntu', sans-serif`,
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

const StyledText = styled(SystemText)`
    ${props => props.truncate && truncate('auto')};
`;

StyledText.displayName = 'Text';

export default StyledText;
