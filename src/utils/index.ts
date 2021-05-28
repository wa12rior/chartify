import { create, all } from "mathjs";

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
    precision: 64,
  };

  return create(all, config);
};

export const getParser = (fraction?: boolean) => {
  return getMathObject(fraction).parser();
};

export const getZeroOfAFunction = (
  a: number,
  b: number,
  expression: string | string[],
) => bisection(a, b, expression);

export const getYAxisCross = (expression: string | string[]) =>
  calculateFunc(expression, "0");

export const getDerivative = (expression: string | string[]) =>
  getMathObject().derivative(expression, "x").toString();

export const calculateFunc = (expression: string[] | string, x: string) => {
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

export const calculateFuncNum = (expression: string | string[], x: string) => {
  const res = calculateFunc(expression, x);
  return res.n / res.s;
};

export const newtonRaphson = (guess, increment, iteration, eps, expression) => {
  let rootFound = false;

  const math = getMathObject(false);
  const parser = getParser(false);
  parser.evaluate(expression);
  const f = parser.get("f");

  for (let i = 0; i < iteration + 1; i++) {
    let fPrime;

    try {
      fPrime =
        (f(guess + increment / 2) - f(guess - increment / 2)) / increment;
    } catch (e) {
      console.log(e);
      console.log(math.bignumber(f(guess + increment / 2)));
    }

    guess += math.round(-f(guess) / fPrime, 3);

    if (math.abs(f(guess)) <= eps) {
      rootFound = true;
      break;
    }
  }

  if (rootFound) {
    return guess;
  } else {
    return false;
  }
};
// @TODO zostało poprawić tylko sinusa
export const bisection = (a, b, expression: string | string[]) => {
  const EPSILON = 0.01;

  if (calculateFuncNum(expression, a) === 0) {
    return a;
  }

  if (calculateFuncNum(expression, b) === 0) {
    return b;
  }

  if (calculateFuncNum(expression, a) * calculateFuncNum(expression, b) >= 0) {
    return false;
  }

  // try {
  //   let c = a;
  //   while (b - a >= EPSILON) {
  //     // Find middle point
  //     c = (a + b) / 2;
  //
  //     // Check if middle point is root
  //     if (calculateFuncNum(expression, c) == 0) {
  //       return c;
  //     }
  //     // Decide the side to repeat the steps
  //     else if (
  //       calculateFuncNum(expression, c) * calculateFuncNum(expression, a) <
  //       0
  //     ) {
  //       b = c;
  //     } else {
  //       a = c;
  //     }
  //   }
  //
  //   if (
  //     parseFloat(c.toFixed(2)) + EPSILON === a ||
  //     parseFloat(c.toFixed(2)) + EPSILON === b
  //   ) {
  //     return false;
  //   }
  //
  //   //prints value of c upto 4 decimal places
  //   return c.toFixed(4);
  // } catch (e) {
  //   return false;
  // }
};

export const changeAbs = (str) => {
  let out = str;
  let size = str.length;
  let buf = "";
  let pos = 0;
  let parens = 0;
  let marker = 0;

  while (pos < size) {
    const tok = peek(4);

    if (parens > 0) {
      switch (out[pos]) {
        case "(":
          parens++;
          break;
        case ")":
          parens--;
          break;
      }
      if (parens > 0) {
        buf += out[pos];
      } else {
        replace(marker, pos, `|${buf}|`);
        pos = marker;
        buf = "";
      }
    }

    if (tok == "abs(" && parens == 0) {
      parens = 1;
      marker = pos;
      pos += 4;
    } else {
      pos++;
    }
  }

  return out;

  function peek(size = 1) {
    return out.substr(pos, size);
  }

  function replace(from, to, withStr) {
    out = out.substring(0, from) + withStr + out.substring(to + 1);
    size = out.length;
  }
};
