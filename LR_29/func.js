module.exports = {
  sum(params) {
    let sum = 0;
    params.forEach((p) => (sum += +p));
    return sum;
  },

  mul(params) {
    let mul = 1;
    params.forEach((p) => (mul *= +p));
    return mul;
  },
};
