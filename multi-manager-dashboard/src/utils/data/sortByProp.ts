export const sortTimestampByProp = (data, propName, order = 'asc') => {
    return [...data].sort((a, b) => {
        if (order === 'asc') return a[propName] - b[propName];
        return b[propName] - a[propName];
    });
};