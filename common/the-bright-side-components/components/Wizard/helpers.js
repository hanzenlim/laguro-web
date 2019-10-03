export function getInitialValues(steps) {
    return steps.reduce((curr, next) => {
        curr[next.id] = next.initialValues;
        return curr;
    }, {});
}
