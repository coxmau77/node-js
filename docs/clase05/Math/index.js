export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
};
export const power = (base, exponent) => Math.pow(base, exponent);
export const sqrt = (value) => {
  if (value < 0) {
    throw new Error("Cannot calculate square root of negative number");
  }
  return Math.sqrt(value);
};
