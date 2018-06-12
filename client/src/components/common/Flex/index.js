import styled from 'styled-components';
import {
    space,
    width,
    height, 
    color,
    alignItems,
    justifyContent,
    flexWrap,
    flexDirection,
    propTypes
} from 'styled-system';

const Flex = styled.div`
  display: flex;
  ${space} ${width} ${height} ${color} ${alignItems} ${justifyContent} ${flexWrap} ${flexDirection};
`;

Flex.propTypes = {
    ...propTypes.space,
    ...propTypes.width,
    ...propTypes.height,
    ...propTypes.color,
    ...propTypes.alignItems,
    ...propTypes.justifyContent,
    ...propTypes.flexWrap,
    ...propTypes.flexDirection
};

Flex.displayName = 'Flex';

export default Flex;
