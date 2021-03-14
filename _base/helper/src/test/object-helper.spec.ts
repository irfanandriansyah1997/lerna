import {
  excludeDestructureObject,
  mergingArrayMapToMap,
  objectToURLParam
} from '../object.helper';

describe(`Testing object helper`, () => {
  beforeEach(() => {
    global.console = {
      ...global.console,
      debug: jest.fn(),
      error: jest.fn()
    };
  });

  it(`testing method exclude destructure object`, () => {
    expect(
      excludeDestructureObject(
        {
          id: `1234567`,
          name: `testing`
        },
        [`id`]
      )
    ).toStrictEqual({ name: `testing` });
  });

  it(`testing method exclude destructure object with wrong parameter`, () => {
    try {
      excludeDestructureObject(
        (undefined as unknown) as Record<string, unknown>,
        [`id`]
      );
    } catch (e) {
      expect(e.message).toBe(
        `[Error] parameter obj must be Record<string, any> type`
      );
    }
  });

  it(`testing method merging array to map`, () => {
    expect(
      mergingArrayMapToMap([
        {
          name: `testing`
        },
        {
          age: 12
        }
      ])
    ).toStrictEqual({ age: 12, name: `testing` });
  });

  describe(`Testing Method Object To URL Param`, () => {
    it(`Testing with normal object`, () => {
      expect(
        objectToURLParam({
          age: 15,
          firstName: `john`,
          lastName: `doe`
        })
      ).toBe(`age=15&firstName=john&lastName=doe`);
    });

    it(`Testing with nested object`, () => {
      expect(
        objectToURLParam({
          age: 15,
          name: {
            firstName: `john`,
            lastName: `doe`
          }
        })
      ).toBe(`age=15`);
    });

    it(`Testing with array object`, () => {
      expect(
        objectToURLParam({
          age: 15,
          firstName: `john`,
          lastName: `doe`,
          phoneNumbers: [`085721079653`, `081809639373`]
        })
      ).toBe(
        `age=15&firstName=john&lastName=doe&phoneNumbers=085721079653&phoneNumbers=081809639373`
      );
    });
  });
});
