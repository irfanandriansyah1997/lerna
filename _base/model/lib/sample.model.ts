import { ItsTrue } from '@irfanandriansyah1997/helper/validation.helper';

/**
 * Generate Method
 * @author Irfan Andriansyah <irfan@99.co>
 * @description
 * @since 2021.03.11
 */
export const Model = (): string => {
  if (ItsTrue()) {
    return 'from model';
  }
  return 'simple model';
};
