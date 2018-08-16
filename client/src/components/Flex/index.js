import system from 'system-components';

const Flex = system(
    {
        display: 'flex',
    },
    // core
    'space',
    'width',
    'color',
    'fontSize',
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
    // flexbox
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

Flex.displayName = 'Flex';

export default Flex;
