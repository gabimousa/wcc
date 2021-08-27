import { shouldNotContain } from './should-not-contain.validator';

const valueContainingSpecialWord = 'MY SPECIAL VALUE';
const valueNotContainingSpecialWord = 'MY VALUE';
const specialWord = 'SPECIAL';

const getControl = (value: any) => {
  return {
    root: {
      get: () => null,
    },
    value,
  } as any;
};

describe('shouldNotContain validator', () => {
  it('should return null when control value contains value from specified field value', () => {
    const control = getControl(valueNotContainingSpecialWord);
    const foundCountrol = getControl(specialWord);
    jest.spyOn(control.root, 'get').mockReturnValue(foundCountrol);
    const validator = shouldNotContain('FIELD');

    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return null when control value is falsy', () => {
    const control = getControl(null);
    const foundCountrol = getControl(specialWord);
    jest.spyOn(control.root, 'get').mockReturnValue(foundCountrol);
    const validator = shouldNotContain('FIELD');

    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return null when found control value is falsy', () => {
    const control = getControl(valueContainingSpecialWord);
    const foundCountrol = getControl(null);
    jest.spyOn(control.root, 'get').mockReturnValue(foundCountrol);
    const validator = shouldNotContain('FIELD');

    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return error when control value contains found control value', () => {
    const control = getControl(valueContainingSpecialWord);
    const foundCountrol = getControl(specialWord);
    jest.spyOn(control.root, 'get').mockReturnValue(foundCountrol);
    const validator = shouldNotContain('FIELD');

    const result = validator(control);

    expect(result).toEqual({
      shouldNotContain_FIELD: { value: specialWord.toLowerCase() },
    });
  });

  it("should return error when control value contains found control value event when case doesn't match", () => {
    const control = getControl(valueContainingSpecialWord);
    const foundCountrol = getControl(specialWord.toLowerCase());
    jest.spyOn(control.root, 'get').mockReturnValue(foundCountrol);
    const validator = shouldNotContain('FIELD');

    const result = validator(control);

    expect(result).toEqual({
      shouldNotContain_FIELD: { value: specialWord.toLowerCase() },
    });
  });
});
