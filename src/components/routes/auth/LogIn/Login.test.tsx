import { render, screen } from '@testing-library/react';
import LogIn from '.';

jest.mock('./LogInButton', () => () => <div data-testid="loginButton" />);

describe('Login Page', () => {
  it('should contain 2 divs as children', () => {
    const { container } = render(<LogIn />);
    const loginContainer = container.getElementsByClassName('container')[0];
    expect(loginContainer.children.length).toBe(2);
    expect(loginContainer.children[0].className).toBe('splitScreenLeft');
    expect(loginContainer.children[1].className).toBe('splitScreenRight');
  });

  it('should contain the welcome paragraph', () => {
    render(<LogIn />);
    const welcomeParagraph = screen.getByText(/welcome to boothUp/i);
    expect(welcomeParagraph).toBeInTheDocument();
  });

  it('should contain the Boothup logo', () => {
    render(<LogIn />);
    const logo = screen.getByAltText(/softup-logo/i);
    expect(logo.className).toBe('logoStyle');
    expect(logo).toHaveAttribute('src', '/images/logo_boothup.svg');
  });

  it('should contain the Boothup logo', () => {
    render(<LogIn />);
    const logo = screen.getByAltText(/softup-logo/i);
    expect(logo.className).toBe('logoStyle');
    expect(logo).toHaveAttribute('src', '/images/logo_boothup.svg');
  });

  it('should contain the Calendar gif', () => {
    render(<LogIn />);
    const logo = screen.getByAltText(/gif/i);
    expect(logo.className).toBe('gifStyle');
    expect(logo).toHaveAttribute('src', '/images/calendar_thin.gif');
  });

  it('should contain the Login Button component', () => {
    const { getByTestId } = render(<LogIn />);
    expect(getByTestId(/loginButton/)).toBeInTheDocument();
  });
});
