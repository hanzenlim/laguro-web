import styled from 'styled-components';
import system from 'system-components';

const Image = system(
    {
        is: 'img',
        display: 'block',
        maxwidth: '100%',
        height: 'auto',
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
    'opacity',
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

const StyledImage = styled(Image)`
    ${props => (props.objectFit ? `object-fit: ${props.objectFit}` : '')};
`;

StyledImage.displayName = 'Image';

export default StyledImage;
