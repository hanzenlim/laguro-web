import styled from 'styled-components';
import {
    background,
    border,
    borderLeft,
    borderRadius,
    borderRight,
    space,
    width,
    height,
    color,
    alignItems,
    justifyContent,
    flexWrap,
    flexDirection,
    fontWeight,
    propTypes
} from 'styled-system';

const Flex = styled.div`
  display: flex;
  ${alignItems} ${background} ${border} ${borderLeft} ${borderRadius} ${borderRight} ${color} ${flexDirection} ${flexWrap} ${fontWeight} ${height} ${justifyContent} ${space} ${width};
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
