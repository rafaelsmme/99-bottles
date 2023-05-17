const downTo = (upper, lower) => {
  const arr = [];
  for (let i = upper; i >= lower; i--) {
    arr.push(i);
  }
  return arr;
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = { downTo, capitalize };
