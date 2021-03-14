import { verifiedIsNotEmpty } from './validation.helper';

/**
 * Exclude Destructure Object
 * @param {Record<string, unknown> | undefined} obj - object for destructure
 * @return {Record<string, unknown>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.03.14
 */
export function excludeDestructureObject<T = Record<string, unknown>>(
  obj: Record<string, unknown>,
  excludeField: string[]
): T {
  if (verifiedIsNotEmpty(obj)) {
    return (Object.keys(obj)
      .filter(
        (item: string) =>
          excludeField.filter((excludeItem: string) => item === excludeItem)
            .length === 0
      )
      .reduce(
        (prev: Record<string, unknown>, current: string) => ({
          ...prev,
          [`${current}`]: obj[current]
        }),
        {}
      ) as unknown) as T;
  }

  throw new Error(`[Error] parameter obj must be Record<string, any> type`);
}

/**
 * Merging Array To Map
 * @param {Record<string, unknown>[]} obj - array obj for destructure
 * @return {Record<string, unknown>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.03.14
 */
export const mergingArrayMapToMap = (
  obj: Record<string, unknown>[]
): Record<string, unknown> =>
  obj.reduce(
    (res, current) => ({
      ...res,
      ...current
    }),
    {}
  );

/**
 * Object To URL Param
 * @param {Record<string, unknown>[]} obj - array obj for destructure
 * @return {string}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.03.14
 */
export const objectToURLParam = (obj: Record<string, unknown>): string =>
  Object.keys(obj)
    .filter((item) => {
      if (
        typeof obj[item] === `object` &&
        obj[item] !== null &&
        (obj[item] as Array<unknown>).length > 0
      ) {
        return true;
      }
      if (typeof obj[item] !== `object` && obj[item] !== undefined) {
        return true;
      }

      return false;
    })
    .map((item) => {
      if (
        typeof obj[item] === `object` &&
        obj[item] !== undefined &&
        (obj[item] as Array<unknown>).length > 0
      ) {
        return (obj[item] as Array<unknown>)
          .map((subItem) => `${item}=${subItem}`)
          .join(`&`);
      }
      return `${item}=${obj[item]}`;
    })
    .join(`&`);

/**
 * Remove Object Key If Value Empty
 * @param {Record<string, unknown>[]} obj - array obj for destructure
 * @return {Record<string, unknown>}
 * @author Irfan Andriansyah <irfan@99.co>
 * @since 2021.03.14
 */
export const removeObjectKeyIfEmpty = (
  obj: Record<string, unknown>
): Record<string, unknown> =>
  Object.keys(obj)
    .filter((item) => verifiedIsNotEmpty(obj[item]))
    .reduce(
      (prev, current) => ({
        ...prev,
        [current]: obj[current]
      }),
      {}
    );
