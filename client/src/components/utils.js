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
