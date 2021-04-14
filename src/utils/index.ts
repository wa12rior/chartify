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

export const getMathObject = () => {
  const config = {
    number: "Fraction",
  };

  return create(all, config);
};

export const getParser = () => {
  return getMathObject().parser();
};

export const getZeroOfAFunction = (expression: string | string[]) => {
  const parser = getParser();
  // const newExpression = expression.replace("f(x)", 0);

  parser.evaluate("x=0");

  return parser.evaluate("f(x)");
};

export const getYAxisCross = (expression: string | string[]) => {
  const parser = getParser();
  parser.evaluate(expression);
  parser.evaluate("x=0");

  return parser.evaluate("f(x)");
};
