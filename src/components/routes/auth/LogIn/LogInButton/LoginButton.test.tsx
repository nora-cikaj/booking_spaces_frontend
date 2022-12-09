import { render, screen } from '@testing-library/react';
import LoginButton from '.';
import routes from '../../../../../constants/routes';

describe('Login Button', () => {
  it('should send to the specified url', () => {
    render(<LoginButton />);
    const anchorElement = screen.getByRole('link');
    expect(anchorElement).toHaveAttribute('href', routes.API.LOGIN_API);
  });

  it('should contain `Login with Google` as button title ', () => {
    render(<LoginButton />);
    const anchorElement = screen.getByText(/login with google/i);
    expect(anchorElement).toBeInTheDocument();
  });
});
