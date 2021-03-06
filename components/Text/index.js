import styled from 'styled-components';
import system from 'system-components';

const Text = system(
    {
        fontFamily: `'Silka', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
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
    'left',
    'opacity'
);

const StyledText = styled(Text)`
    ${props => props.fontStyle && `font-style: ${props.fontStyle}`};
    ${props => props.textOverflow && `text-overflow: ${props.textOverflow}`};
    ${props => props.overflow && `overflow: ${props.overflow}`};
    ${props => props.whiteSpace && `white-space: ${props.whiteSpace}`};
    ${props => props.textTransform && `text-transform: ${props.textTransform}`};
    ${props => props.cursor && `cursor: ${props.cursor}`};

    :hover {
        ${props => props.hoverColor && `color: ${props.hoverColor}`};
    }
    ${props => props.multiline && `text-overflow: clip; white-space: pre-line;`}
`;

StyledText.defaultProps.blacklist = [
    ...StyledText.defaultProps.blacklist,
    'fontStyle',
    'textOverflow',
    'overflow',
    'whiteSpace',
    'textTransform',
    'cursor',
    'hoverColor',
    'multiline',
];

StyledText.displayName = 'Text';

export default StyledText;
