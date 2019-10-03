export const reduceArrayOfObjects = array =>
    array.reduce((acc, val) => ({ ...acc, ...val }), {});
