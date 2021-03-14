import {
  bulkVerifiedIsNotEmpty,
  isNumber,
  isString,
  verifiedGreatherThan,
  verifiedIsExistAndIsArray,
  verifiedIsExistAndIsNumber,
  verifiedIsExistAndIsRangeInput,
  verifiedIsExistAndIsString,
  verifiedIsNotEmpty,
  verifiedIsNotFalse,
  verifiedKeyIsExist
} from '../validation.helper';

describe(`Validator Helper`, () => {
  beforeEach(() => {
    global.console = {
      ...global.console,
      debug: jest.fn(),
      error: jest.fn()
    };
  });

  describe(`Testing method is number`, () => {
    it(`Invoke this method with correct and incorrect parameter`, () => {
      expect(isNumber(10)).toBe(true);
      expect(isNumber(`a`)).toBe(false);
    });
  });

  describe(`Testing method is string`, () => {
    it(`Invoke this method with correct and incorrect parameter`, () => {
      expect(isString(10)).toBe(false);
      expect(isString(`a`)).toBe(true);
    });
  });

  describe(`Testing method verified is not empty`, () => {
    it(`Invoke this method with correct and incorrect parameter`, () => {
      expect(verifiedIsNotEmpty(null)).toBe(false);
      expect(verifiedIsNotEmpty(undefined)).toBe(false);
      expect(verifiedIsNotEmpty(``)).toBe(false);
      expect(verifiedIsNotEmpty(`is defined`)).toBe(true);
    });
  });

  describe(`Testing method bulk vierified is not empty`, () => {
    it(`Invoke this method with correct and incorrect parameter`, () => {
      expect(bulkVerifiedIsNotEmpty([null, ``, `abc`])).toBe(false);
      expect(bulkVerifiedIsNotEmpty([null, 1997, `abc`])).toBe(false);
      expect(bulkVerifiedIsNotEmpty([{}, 1997, `abc`])).toBe(true);
    });
  });

  it(`verirified variable is not false`, () => {
    expect(verifiedIsNotFalse(null)).toBe(false);
    expect(verifiedIsNotFalse(undefined)).toBe(false);
    expect(verifiedIsNotFalse(false)).toBe(false);
    expect(verifiedIsNotFalse(true)).toBe(true);
  });

  describe(`Testing method verified key is exist`, () => {
    it(`Invoke this method with key parameter is available or not in object parameter`, () => {
      expect(verifiedKeyIsExist({ test1: `hello` }, `test`)).toBe(false);

      expect(verifiedKeyIsExist({ test1: `hello` }, undefined)).toBe(false);

      expect(verifiedKeyIsExist({ test: `hello` }, `test`)).toBe(true);
    });

    it(`Pass parameter object with string`, () => {
      try {
        verifiedKeyIsExist(
          (undefined as unknown) as Record<string, string>,
          `test`
        );
      } catch (e) {
        expect(e.message).toBe(`Cannot convert undefined or null to object`);
      }
    });
  });

  describe(`Testing method verified greater than`, () => {
    it(`Invoke this method with min and max is integer`, () => {
      expect(verifiedGreatherThan(10, 5)).toBe(true);
      expect(verifiedGreatherThan(5, 19)).toBe(false);
      expect(verifiedGreatherThan(10, 10)).toBe(false);
      expect(verifiedGreatherThan(10, 10, true)).toBe(true);
    });

    it(`Pass parameter min is string`, () => {
      try {
        verifiedGreatherThan((`a` as unknown) as number, 5);
      } catch (e) {
        expect(e.message).toBe(
          `[Error] parameter max and min must be integer or float`
        );
      }
    });
  });

  describe(`Testing method verified is exist and is number`, () => {
    it(`Testing not found find key in object parameter`, () => {
      expect(
        verifiedIsExistAndIsNumber(
          {
            name: `engineer`
          },
          `age`,
          0
        )
      ).toBe(0);
    });

    it(`Find value based on key parameter in object parameter`, () => {
      expect(
        verifiedIsExistAndIsNumber(
          {
            age: 50,
            name: `engineer`
          },
          `age`,
          0
        )
      ).toBe(50);
    });

    it(`Pass parameter object is string`, () => {
      expect(
        verifiedIsExistAndIsNumber(
          (`testing` as unknown) as Record<string, string>,
          `age`,
          13
        )
      ).toBe(13);
    });
  });

  describe(`Testing method verified is exist and is string`, () => {
    it(`Testing not found find key in object parameter`, () => {
      expect(
        verifiedIsExistAndIsString(
          {
            name: `engineer`
          },
          `ages`,
          `Not Found`
        )
      ).toBe(`Not Found`);
    });

    it(`Find value based on key parameter in object parameter`, () => {
      expect(
        verifiedIsExistAndIsString(
          {
            age: 50,
            name: `engineer`
          },
          `name`,
          `99`
        )
      ).toBe(`engineer`);
      expect(
        verifiedIsExistAndIsString(
          {
            age: 50,
            name: undefined
          },
          `name`,
          `99`
        )
      ).toBe(`99`);
    });

    it(`Pass parameter object is string and default parameter is number`, () => {
      expect(
        verifiedIsExistAndIsString(
          (`testing` as unknown) as Record<string, string>,
          `age`,
          (13 as unknown) as string
        )
      ).toBe(13);
    });
  });

  describe(`Testing method verified is exist and is array`, () => {
    it(`Testing not found find key in object parameter`, () => {
      expect(
        verifiedIsExistAndIsArray(
          {
            name: `engineer`
          },
          `ages`,
          []
        )
      ).toStrictEqual([]);
    });

    it(`Find value based on key parameter in object parameter`, () => {
      expect(
        verifiedIsExistAndIsArray(
          {
            age: 50,
            school: [
              {
                name: `school 1`
              },
              {
                name: `school 2`
              }
            ]
          },
          `school`,
          []
        )
      ).toStrictEqual([
        {
          name: `school 1`
        },
        {
          name: `school 2`
        }
      ]);
    });
  });

  describe(`Testing method verified is exist and is range input`, () => {
    it(`Testing not found find key in object parameter`, () => {
      expect(
        verifiedIsExistAndIsRangeInput({}, `landSize`, {
          max: 0,
          min: 0
        })
      ).toStrictEqual({
        max: 0,
        min: 0
      });
    });

    it(`Find value based on key parameter in object parameter`, () => {
      expect(
        verifiedIsExistAndIsRangeInput(
          {
            age: 50,
            landSize: {
              max: 100,
              min: 0
            }
          },
          `landSize`,
          {
            max: 0,
            min: 0
          }
        )
      ).toStrictEqual({
        max: 100,
        min: 0
      });
    });
  });
});
