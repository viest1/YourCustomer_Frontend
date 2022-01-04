export const sortByTimestamp = (arr, el) => {
  if (el === 'visit') {
    return [...arr].sort((a, b) => new Date(b[el]).getTime() - new Date(a[el]).getTime());
  }
  return [...arr].sort((a, b) => b.timestamp - a.timestamp);
};
