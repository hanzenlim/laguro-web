export const intersect = (t1, t2) => {
    const { startTime: s1, endTime: e1 } = t1;
    const { startTime: s2, endTime: e2 } = t2;
    return (s1 <= s2 && s2 < e1) || (s2 <= s1 && s1 < e2);
};

export const getIntersection = (t1, t2) => {
    if (!intersect(t1, t2)) {
        return null;
    }

    const { startTime: s1, endTime: e1 } = t1;
    const { startTime: s2, endTime: e2 } = t2;

    const start = s1 < s2 ? s2 : s1;
    const end = e1 < e2 ? e1 : e2;

    return { startTime: start, endTime: end };
};
