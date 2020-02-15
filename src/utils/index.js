export const strToArray = str => {
    return str
        .split(",")
        .map(item => item.trim())
        .filter(element => element);
};