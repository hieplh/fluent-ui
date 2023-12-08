import * as api from './ApiConnector';
import axios from 'axios';

describe('Environment Setup', () => {
  const account = 'MYSTQA';
  const clientSecret = '********-****-****-****-************';
  const username = '****_admin';
  const password = '******';
  const endpoint = `https://${account}.test.api.fluentretail.com:443`;

  test('Should be able to authenticate', async () => {
    // Arrange
    const axiosPostSpy = jest.spyOn(axios, 'post');
    axiosPostSpy.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {
          access_token: '5b80c51e-ed00-1234-9c90-d2d104fe14b2',
        },
      }),
    );

    // Act
    const response: any = await api.authenticate(
      endpoint,
      account,
      clientSecret,
      username,
      password,
    );

    // Assert
    expect(response.access_token).toEqual('5b80c51e-ed00-1234-9c90-d2d104fe14b2');
  });
});
