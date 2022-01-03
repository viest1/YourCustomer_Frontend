export const sum = (arr, el) => {
  return arr.map((item) => item[el]).reduce((a, b) => a + +b, 0);
};
export const sumValue = (arr, el) => {
  if (el === 'price') {
    return arr.map((item) => item[el]?.value?.split(' ')[0]).reduce((a, b) => a + +b, 0);
  }
  return arr.map((item) => item[el]?.value).reduce((a, b) => a + +b, 0);
};
export const averageValue = (arr, el) => {
  if (!arr.length) {
    return (0).toFixed(2);
  }
  if (el === 'price') {
    return (arr.map((item) => item[el]?.value.split(' ')[0]).reduce((a, b) => a + +b, 0) / arr.length).toFixed(2);
  }
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
  return (sumTimeInMinutes(arr) / arr.length).toFixed(0);
};
export const displayTimeInHHMM = (arr) => {
  if (!arr.length) return 0;
  const time = averageTimeInMinutes(arr);
  const hour = Math.floor(time / 60);
  const minutes = time % 60;
  return `0${hour}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
