/* eslint-disable sort-exports/sort-exports */

import { validateNumberAndParsedToInteger } from './string.helper';

/**
 * Check is number
 * @param {unknown} param - parameter to check
 * @return {boolean}
 */
export const isNumber = (param: unknown): boolean =>
  typeof param === `number` ||
  typeof param === `bigint` ||
  /^\d+$/.test(`${param}`);

/**
 * Check is number
 * @param {unknown} param - parameter to check
 * @return {boolean}
 */
export const isString = (param: unknown): boolean => typeof param === `string`;

/**
 * Verified Is Not Empty
 * @param {unknown} param - parameter to check
 * Validator checking parameter input is not undefined / null
 */
export const verifiedIsNotEmpty = (param: unknown): boolean =>
  [undefined, null, ``].filter((item: unknown) => param === item).length === 0;

/**
 * Verified Is Not Null
 * @param {unknown} param - parameter to check
 * Validator checking parameter input is not undefined / null
 */
const verifiedIsNotNull = (param: unknown): boolean =>
  [undefined, null].filter((item: unknown) => param === item).length === 0;

/**
 * Bulk Verified Is Not Empty
 * @param {unknown[]} param - parameter to check
 * Validator checking parameter input is not undefined / null
 */
export const bulkVerifiedIsNotEmpty = (param: unknown[]): boolean =>
  param.filter((item) => !verifiedIsNotEmpty(item)).length === 0;

/**
 * Bulk Verified Is Not Null
 * @param {unknown[]} param - parameter to check
 * Validator checking parameter input is not undefined / null
 */
export const bulkVerifiedIsNotNull = (param: unknown[]): boolean =>
  param.filter((item) => !verifiedIsNotNull(item)).length === 0;

/**
 * Verified Is Not False
 * @param {boolean | undefined | null} param - parameter to check
 * Validator checking parameter input is true
 */
export const verifiedIsNotFalse = (
  param: boolean | undefined | null
): boolean => {
  const stage1 =
    [undefined, null, false].filter((i: unknown) => param === i).length === 0;

  if (stage1 && param === true) {
    return true;
  }

  return false;
};

/**
 * Verified Key Is Available
 * @param {DefaultDynamicObject} obj
 * @param {string} key
 * @return {boolean}
 */
export const verifiedKeyIsExist = (
  obj: Record<string, unknown>,
  key: string | undefined
): boolean => {
  if (key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  return false;
};

/**
 * Bulk Verified Key Is Exist
 * @param {Record<string, unknown>} obj - obj parameter
 * @param {string[]} key - key object
 * @returns {boolean}
 */
export const bulkVerifiedKeyIsExist = (
  obj: Record<string, unknown>,
  key: string[]
): boolean => {
  const response = key
    .map((item) => verifiedKeyIsExist(obj, item))
    .filter((item) => !item);

  return response.length === 0;
};

/**
 * Verified param max greater than min
 * @param {number} max - parameter number 1
 * @param {number} min - parameter number 2
 * @param {boolean} isEqual - is equal to param 2 ?
 * @return {boolean}
 */
export const verifiedGreatherThan = (
  max: number,
  min: number,
  isEqual = false
): boolean => {
  if (isNumber(max) && isNumber(min)) {
    if (max >= min && isEqual) {
      return true;
    }

    if (max > min) {
      return true;
    }

    return false;
  }

  throw new Error(`[Error] parameter max and min must be integer or float`);
};

/**
 * Verified Is Exist And Is Number
 * @param {DefaultDynamicObject} obj - object parameter
 * @param {string} key - object key
 * @param {number} defaultValue - default value is not exist
 * @return {boolean}
 */
export const verifiedIsExistAndIsNumber = (
  obj: Record<string, unknown>,
  key: string,
  defaultValue: number
): number => {
  if (verifiedKeyIsExist(obj, key)) {
    return validateNumberAndParsedToInteger(obj[key]);
  }

  return defaultValue;
};

/**
 * Verified Is Exist And Is Number
 * @param {DefaultDynamicObject} obj - object parameter
 * @param {string} key - object key
 * @param {number} defaultValue - default value is not exist
 * @return {boolean}
 */
export const verifiedIsExistAndIsString = (
  obj: Record<string, unknown>,
  key: string,
  defaultValue: string
): string => {
  if (verifiedKeyIsExist(obj, key) && isString(obj[key])) {
    return (obj[key] as unknown) as string;
  }

  return defaultValue;
};

/**
 * Verified Is Exist And Is Array
 * @param {DefaultDynamicObject} obj - object parameter
 * @param {string} key - object key
 * @param {any[]} defaultValue - default value is not exist
 * @return {any[]}
 */
export const verifiedIsExistAndIsArray = (
  obj: Record<string, unknown>,
  key: string,
  defaultValue: any[]
): any[] => {
  if (verifiedKeyIsExist(obj, key) && obj[key] instanceof Array) {
    return (obj[key] as unknown) as any[];
  }

  return defaultValue;
};

/**
 * Verified Is Exist And Is Range Input
 * @param {DefaultDynamicObject} obj - object parameter
 * @param {string} key - object key
 * @param {any[]} defaultValue - default value is not exist
 * @return {any[]}
 */
export const verifiedIsExistAndIsRangeInput = (
  obj: Record<string, any>,
  key: string,
  defaultValue: {
    max: number;
    min: number;
  }
): {
  max: number;
  min: number;
} => {
  if (
    verifiedKeyIsExist(obj, key) &&
    verifiedKeyIsExist(obj[key], `min`) &&
    verifiedKeyIsExist(obj[key], `max`)
  ) {
    return (obj[key] as unknown) as {
      max: number;
      min: number;
    };
  }

  return defaultValue;
};
