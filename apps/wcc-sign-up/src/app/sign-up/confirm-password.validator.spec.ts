import { confirmPasswords } from './confirm-password.validator';

const validControl = { value: 'PASSWORD' };
const invalidControl = { value: 'WRONG PASSWORD' };

const group = {
  get: () => null,
} as any;

describe('confirmPassword validator', () => {
  it('should return null when password fields are the same', () => {
    jest.spyOn(group, 'get').mockReturnValue(validControl);

    const result = confirmPasswords(group);

    expect(result).toBe(null);
  });

  it('should return error notSame when values are not the same', () => {
    jest.spyOn(group, 'get').mockImplementation((name) => {
      return name === 'password' ? validControl : invalidControl;
    });

    const result = confirmPasswords(group);

    expect(result).toEqual({ notSame: true });
  });

  it('should return error notSame when password field is not defined', () => {
    jest.spyOn(group, 'get').mockImplementation((name) => {
      return name === 'password' ? undefined : validControl;
    });

    const result = confirmPasswords(group);

    expect(result).toEqual({ notSame: true });
  });

  it('should return error notSame when confirmPassword field is not defined', () => {
    jest.spyOn(group, 'get').mockImplementation((name) => {
      return name === 'password' ? validControl : undefined;
    });

    const result = confirmPasswords(group);

    expect(result).toEqual({ notSame: true });
  });
});
