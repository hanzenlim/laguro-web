import styled from 'styled-components';
import system from 'system-components';
import Img from 'react-image';

const Image = system(
    {
        is: Img,
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
