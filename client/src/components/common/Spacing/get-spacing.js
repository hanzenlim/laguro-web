export default function({
    margin,
    top,
    right,
    left,
    bottom,
    horizontal,
    vertical,
    marginPerc,
    topPerc,
    rightPerc,
    leftPerc,
    bottomPerc,
    horizontalPerc,
    verticalPerc,

}) {
    const topMargin = [top, vertical, margin].find(s => s != null) || 0;
    const rightMargin = [right, horizontal, margin].find(s => s != null) || 0;
    const bottomMargin = [bottom, vertical, margin].find(s => s != null) || 0;
    const leftMargin = [left, horizontal, margin].find(s => s != null) || 0;

    const topMarginPerc = [topPerc, verticalPerc, marginPerc].find(s => s != null) || 0;
    const rightMarginPerc = [rightPerc, horizontalPerc, marginPerc].find(s => s != null) || 0;
    const bottomMarginPerc = [bottomPerc, verticalPerc, marginPerc].find(s => s != null) || 0;
    const leftMarginPerc = [leftPerc, horizontalPerc, marginPerc].find(s => s != null) || 0;

    if (topMargin || rightMargin || bottomMargin || leftMargin) {
        return `${topMargin}px ${rightMargin}px ${bottomMargin}px ${leftMargin}px`;
    } else {
        return `${topMarginPerc}% ${rightMarginPerc}% ${bottomMarginPerc}% ${leftMarginPerc}%`;
    }


}
