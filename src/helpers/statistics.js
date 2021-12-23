export const sum = (arr, el) => {
  return arr.map((item) => item[el]).reduce((a, b) => a + +b, 0);
};
export const sumValue = (arr, el) => {
  return arr.map((item) => item[el]?.value).reduce((a, b) => a + +b, 0);
};
export const averageValue = (arr, el) => {
  return (arr.map((item) => item[el]?.value).reduce((a, b) => a + +b, 0) / arr.length).toFixed(2);
};
export const sumTimeInMinutes = (arr) => {
  return arr
    .map((item) => item.time)
    .map((item) => item.split(':'))
    .map((item) => +item[0] * 60 + +item[1])
    .reduce((a, b) => a + +b, 0);
};
export const averageTimeInMinutes = (arr) => {
  return sumTimeInMinutes(arr) / arr.length;
};
export const displayTimeInHHMM = (arr) => {
  const time = averageTimeInMinutes(arr);
  const hour = Math.floor(time / 60);
  const minutes = time % 60;
  return `0${hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
