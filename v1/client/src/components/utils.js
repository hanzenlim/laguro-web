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

export const hoverColor = style({
    prop: 'hoverColor',
    cssProperty: 'color',
    key: 'colors',
});
