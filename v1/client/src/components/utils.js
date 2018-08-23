import styled from 'styled-components';
import { style } from 'styled-system';

// eslint-disable-next-line
export function truncate(width) {
    return `
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overlow: ellipsis;
      width: ${width};
  `;
}

const stroke = style({
    prop: 'stroke',
    cssProperty: 'stroke',
    key: 'colors',
});

export const StyledPath = styled.path`
    ${stroke};
`;
