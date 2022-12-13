// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import AppHeader from '.';
import { store } from '../../../../../redux/store';

const mockStore = configureStore();
const spyStore = mockStore({
  auth: {
    user: {
      _id: '1',
      id: '1',
      avatarUrl: 'https://lh3.googleusercontent.com/a-/AC',
      email: 'john.smith@softup.co',
      lastName: 'Smith',
      myEvents: [],
      name: 'John',
    },
  },
});

global.matchMedia =
  global.matchMedia ||
  // eslint-disable-next-line func-names
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe('App Header', () => {
  it('should contain SoftupLogo ', () => {
    render(
      <Router>
        <Provider store={store}>
          <AppHeader />
        </Provider>
      </Router>,
    );
    const softupLogo = screen.getByAltText(/logo/i);
    expect(softupLogo.className).toBe('logoStyle');
    expect(softupLogo).toHaveAttribute('src', '/images/logo_boothup.svg');
  });

  it('should contain name of logged in user ', () => {
    render(
      <Router>
        <Provider store={spyStore}>
          <AppHeader />
        </Provider>
      </Router>,
    );
    const title = screen.getByText(/BoothUp/i);
    expect(title).toBeInTheDocument();
    expect(title.textContent).toEqual('BoothUp | John ');
  });

  it('should display the current time', () => {
    render(
      <Router>
        <Provider store={spyStore}>
          <AppHeader />
        </Provider>
      </Router>,
    );
    const date = screen.getAllByRole('heading', { level: 1 })[1];
    expect(date).toBeInTheDocument();
    expect(date.textContent).toContain(new Date().toLocaleDateString());
  });
});
