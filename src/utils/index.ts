import { create, all } from "mathjs";
// TODO math.derivative('x^2 + x', 'x') pochodna
export const serialize = (obj) => {
  const str = [];
  for (const p in obj) {
    str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
  }
  return str.join("&");
};

const getIndicesOf = (searchStr, str, caseSensitive) => {
  const searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  let startIndex = 0,
    index;
  const indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
};

export const getMathObject = (fraction?: boolean) => {
  const config = {
    number: fraction ? "Fraction" : "BigNumber",
  };

  return create(all, config);
};

export const getParser = (fraction?: boolean) => {
  return getMathObject(fraction).parser();
};

export const getZeroOfAFunction = (expression: string | string[]) => {
  const parser = getParser(true);
  // const newExpression = expression.replace("f(x)", 0);

  parser.evaluate("x=0");

  return parser.evaluate("f(x)");
};

export const getYAxisCross = (expression: string | string[]) =>
  calculateFunc(expression, "0");

export const calculateFunc = (expression: string | string[], x: string) => {
  const parser = getParser(true);
  parser.evaluate(expression);
  parser.evaluate("x=" + x);

  try {
    return parser.evaluate("f(x)");
  } catch (error) {
    const parser = getParser(false);
    parser.evaluate(expression);
    parser.evaluate("x=" + x);
    return parser.evaluate("f(x)");
  }
};

export const bisection = (a, b, expression: string) => {
  const EPSILON = 0.01;

  if (calculateFunc(a, expression) * calculateFunc(b, expression) >= 0) {
    return false;
  }

  let c = a;
  while (b - a >= EPSILON) {
    // Find middle point
    c = (a + b) / 2;

    // Check if middle point is root
    if (calculateFunc(c, expression) == 0.0) break;
    // Decide the side to repeat the steps
    else if (calculateFunc(c, expression) * calculateFunc(a, expression) < 0)
      b = c;
    else a = c;
  }
  //prints value of c upto 4 decimal places
  return c.toFixed(4);
};
