/**
 * Format Number Currency To String
 * @param {number} number - value currency
 * @param {number} digits - digit after comma
 * @param {'id' | 'en'} language - language option
 * @return {string}
 */
export const formatNumberCurrencyToString = (
  number: number,
  digits: number,
  language: 'id' | 'en'
): string => {
  const billion = language === `en` ? `B` : `M`;
  const million = language === `en` ? `M` : `Jt`;
  const formatContant = [
    { symbol: ` T`, value: 1e12 },
    { symbol: ` ${billion}`, value: 1e9 },
    { symbol: ` ${million}`, value: 1e6 },
    { symbol: ` Rb`, value: 1e3 },
    { symbol: ``, value: 1 }
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const format = formatContant.filter(({ value }) => number >= value);

  if (format.length > 0) {
    return `${(number / format[0].value).toFixed(digits).replace(rx, `$1`)}${
      format[0].symbol
    }`.replace(`.`, `,`);
  }

  return `${number}`;
};

/**
 * minify tag html
 * @param {string} html - source html string
 * @return {string}
 */
export const minifyHTML = (html: string): string =>
  html
    .replace(/^\s+|\s+$/gm, ``)
    .split(`\n`)
    .join(``);

/**
 * Object To String
 * @param {ComponentClassnameDefaultInterface} obj - object classname
 * @return {string}
 */
export const objToString = (obj: Record<string, unknown>): string => {
  try {
    return Object.keys(obj)
      .filter((item: string) => obj[item])
      .map((item: string) => item)
      .join(` `);
  } catch (e) {
    return ``;
  }
};

/**
 * Parsing Normal Text To Kebab Case
 * @param {string} text - text
 * @return {string}
 */
export const parsingNormalTextToKebabCase = (text: string): string =>
  text
    .toLowerCase()
    .split(` `)
    .filter((item) => item !== ``)
    .join(`-`);

/**
 * Parsing Integert To Currency String
 * @param {string} prefix - currency ex Rp, IDR, SGD
 * @param {number} price  - price value
 * @param {',' | '.'} separator - separator number
 * @return {string}
 */
export const parsingNumberToCurrencyString = (
  prefix: string,
  price: number,
  separator: string
): string => {
  const priceTag = `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return `${prefix} ${priceTag}`;
};

/**
 * Remove non-Alphanumeric Character
 * @param {string} text
 */
export const removeNonAlphanumericCharacter = (text: string): string => {
  const isAlphabetical = text.match(/\w/g);

  if (isAlphabetical && isAlphabetical.length > 0) {
    return text.replace(/\W/g, ` `);
  }
  return text;
};

/**
 * Uppercase Each Word
 * @param {string} text - text to uppercase
 * @return {string}
 */
export const uppercaseEachWord = (text: string): string => {
  const splitStr = text.toLowerCase().split(` `);
  const response: string[] = [];

  splitStr.forEach((item) => {
    const temp = `${item.charAt(0).toUpperCase()}${item.substring(1)}`;
    response.push(temp);
  });

  return response.join(` `);
};

/**
 * Validate Number And Parsed To Integer
 * @param {unknow} number - parameter for parsing this method
 * @return {number}
 */
export const validateNumberAndParsedToInteger = (number: unknown): number => {
  if (
    typeof number === `number` ||
    typeof number === `bigint` ||
    /^-?\d*(\.\d+)?$/.test(`${number}`)
  ) {
    return parseInt(`${number}`, 10);
  }

  return 0;
};
