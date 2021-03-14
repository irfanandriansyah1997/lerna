import {
  formatNumberCurrencyToString,
  minifyHTML,
  parsingNormalTextToKebabCase,
  parsingNumberToCurrencyString,
  uppercaseEachWord,
  validateNumberAndParsedToInteger
} from '../string.helper';

describe(`Testing static file helper`, () => {
  beforeEach(() => {
    global.console = {
      ...global.console,
      debug: jest.fn(),
      error: jest.fn()
    };
  });

  it(`testing method generateStaticFileToPreload`, () => {
    expect(
      minifyHTML(`<html>
                    <head>
                        <title>hello world</title>
                    </head>
                    <body>
                        <p>This is body</p>
                    </body>
                </html>
            `)
    ).toBe(
      `<html><head><title>hello world</title></head><body><p>This is body</p></body></html>`
    );
  });

  it(`testing method generateStaticFileToPreload with wrong parameter`, () => {
    try {
      minifyHTML((undefined as unknown) as string);
    } catch (e) {
      expect(e.message).toBe(`Cannot read property 'replace' of undefined`);
    }
  });

  it(`testing method parsingNumberToCurrencyString with correct parameter`, () => {
    [
      {
        param: 1000,
        separator: `,`,
        value: `Rp 1,000`
      },
      {
        param: 1000000,
        separator: `,`,
        value: `Rp 1,000,000`
      },
      {
        param: 1500000,
        separator: `.`,
        value: `Rp 1.500.000`
      },
      {
        param: 25000,
        separator: `.`,
        value: `Rp 25.000`
      }
    ].forEach(({ param, separator, value }) => {
      expect(parsingNumberToCurrencyString(`Rp`, param, separator)).toBe(value);
    });
  });

  it(`testing method format number currency to string`, () => {
    [
      {
        digits: 2,
        language: `id`,
        output: `10 M`,
        value: 10000000000
      },
      {
        digits: 2,
        language: `id`,
        output: `1 T`,
        value: 1000000000000
      },
      {
        digits: 2,
        language: `en`,
        output: `1 T`,
        value: 1000000000000
      },
      {
        digits: 2,
        language: `id`,
        output: `2,5 M`,
        value: 2500000000
      },
      {
        digits: 3,
        language: `en`,
        output: `32,5 B`,
        value: 32500000000
      },
      {
        digits: 2,
        language: `id`,
        output: `9 Rb`,
        value: 9000
      },
      {
        digits: 3,
        language: `id`,
        output: `1,25 Jt`,
        value: 1250000
      },
      {
        digits: 3,
        language: `en`,
        output: `1,25 M`,
        value: 1250000
      },
      {
        digits: 3,
        language: `id`,
        output: `10`,
        value: 10
      },
      {
        digits: 3,
        language: `en`,
        output: `-10`,
        value: -10
      }
    ].forEach(({ digits, language, output, value }) => {
      expect(
        formatNumberCurrencyToString(value, digits, language as 'id' | 'en')
      ).toBe(output);
    });
  });

  it(`testing method validate number and parsing into string`, () => {
    expect(validateNumberAndParsedToInteger(0)).toBe(0);
    expect(validateNumberAndParsedToInteger(`5`)).toBe(5);
    expect(validateNumberAndParsedToInteger(`a`)).toBe(0);
    expect(validateNumberAndParsedToInteger(`5.5`)).toBe(5);
  });

  it(`testing method convert plain text to kebab case`, () => {
    [
      {
        param: `cimahi jawa barat`,
        value: `cimahi-jawa-barat`
      },
      {
        param: `bandung jawa barat`,
        value: `bandung-jawa-barat`
      },
      {
        param: `bandung`,
        value: `bandung`
      }
    ].forEach(({ param, value }) => {
      expect(parsingNormalTextToKebabCase(param)).toBe(value);
    });
  });

  it(`testing method convert plain text to kebab case with wrong parameter`, () => {
    try {
      parsingNormalTextToKebabCase((5 as unknown) as string);
    } catch (e) {
      expect(e.message).toBe(`text.toLowerCase is not a function`);
    }
  });

  it(`testing method uppercaseEachWord with correct parameter`, () => {
    [
      {
        parameter: `bandung`,
        value: `Bandung`
      },
      {
        parameter: `bAnDUNG`,
        value: `Bandung`
      },
      {
        parameter: `Bandung BARAT`,
        value: `Bandung Barat`
      },
      {
        parameter: `JAWA TENGAH`,
        value: `Jawa Tengah`
      }
    ].forEach(({ parameter, value }) => {
      expect(uppercaseEachWord(parameter)).toBe(value);
    });
  });
});
