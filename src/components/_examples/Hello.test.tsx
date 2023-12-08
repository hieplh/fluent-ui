import { render } from '@testing-library/react';
import { Hello, Props } from './Hello';
import * as UseQuery from 'mystique/hooks/useQuery';

describe('Hello Component', () => {
  const props: Props = {
    content: 'Welcome,',
  };

  it('Shows "loading" before data has been loaded', () => {
    const { getByTestId } = render(<Hello {...props} />);

    expect(getByTestId('hello-content').textContent).toBe('Loading...');
  });

  describe('When data loaded', () => {
    let useQuerySpy: any;

    beforeEach(() => {
      const mockMeApiResponse: UseQuery.UseQueryResponse = [
        {
          fetching: false,
          stale: false,
          data: {
            'me': {
              'id': '112',
              'ref': '1628145547103_admin',
              'username': '1628145547103_admin',
              'type': 'RETAILER',
              'status': 'ACTIVE',
            },
          },
        }, () => null,
      ];
      useQuerySpy = jest.spyOn(UseQuery, 'useQuery').mockImplementation((): any => mockMeApiResponse);
    });
    
    it('Makes useQuery request', () => {
      render(<Hello {...props} />);
    
      expect(useQuerySpy).toHaveBeenCalledTimes(1);
    });
    
    it('Renders content prop in component', () => {
      const { getByTestId } = render(<Hello {...props} />);
    
      expect(getByTestId('hello-content').textContent).toBe('Welcome, 1628145547103_admin');
    });
  });
});