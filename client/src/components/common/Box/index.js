import styled from 'styled-components';
import { border, height, space, width, fontSize, color, maxHeight, background, zIndex } from 'styled-system';

export default styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${maxHeight}
  ${height}
  ${border}
  ${background}
  ${zIndex}
  ${props => props.withborder && 'border: 1px solid #ddd; border-radius: 3px;'};
`;
