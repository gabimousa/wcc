import { of, throwError } from 'rxjs';
import { SignUpService } from './sign-up.service';

const mockData = 'MOCK_DATA' as any;
const mockResultData = 'MOCK_DATA' as any;

const mockHttpClient = {
  post: jest.fn().mockReturnValue(of(mockResultData)),
};

describe('SignUpService', () => {
  let sut: SignUpService;
  beforeEach(() => {
    sut = new SignUpService(mockHttpClient as any);
  });

  it('should send post request to correct url', () => {
    sut.signUp(mockData);

    expect(mockHttpClient.post).toHaveBeenCalledWith(
      'https://demo-api.now.sh/users',
      mockData
    );
  });

  it('should return an observable with the result', () => {
    const result$ = sut.signUp(mockData);
    let resultValue = null;

    result$.subscribe((val) => (resultValue = val));
    expect(resultValue).toEqual(mockResultData);
  });

  it('should handle errors correctly', () => {
    jest.spyOn(mockHttpClient, 'post').mockReturnValue(throwError('ERROR'));
    jest.spyOn(console, 'log').mockImplementation(() => void 0);

    const result$ = sut.signUp(mockData);

    let resultValue = null;
    result$.subscribe((val) => (resultValue = val));
    expect(resultValue).toBe(null);
    expect(console.log).toHaveBeenCalledWith('ERROR');
  });
});
