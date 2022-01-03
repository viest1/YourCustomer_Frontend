export const sortByTimestamp = (arr) => {
  return [...arr].sort((a, b) => b.timestamp - a.timestamp);
};
