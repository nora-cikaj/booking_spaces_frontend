/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReservationModal from '.';
import 'moment-timezone';
import { RootState } from '../../../../../redux/store';

global.matchMedia =
  global.matchMedia ||
  // eslint-disable-next-line func-names
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

jest.mock('axios');

const resource = { alt: 'Fake room', id: '1' };

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
  events: {
    eventList: [
      {
        id: '1',
        summary: 'test',
        location: 'Tirana Office-1-Quiet Room (5)',
        start: {
          dateTime: '2022-12-01T09:00:00+01:00',
          timeZone: 'Europe/Berlin',
        },
        end: {
          dateTime: '2022-12-01T10:00:00+01:00',
          timeZone: 'Europe/Berlin',
        },
        attendees: [
          {
            email: 'fake@resource.calendar.google.com',
            displayName: 'Tirana Office-1-Test Room (5)',
          },
          {
            email: 'boothup@softup.co',
          },
        ],
      },
    ],
    eventSelected: {
      id: '1',
      summary: 'test',
      location: 'Tirana Office-1-Test Room (5)',
      start: {
        dateTime: '2022-12-01T09:00:00+01:00',
        timeZone: 'Europe/Berlin',
      },
      end: {
        dateTime: '2022-12-01T10:00:00+01:00',
        timeZone: 'Europe/Berlin',
      },
      attendees: [
        {
          email: 'fake@resource.calendar.google.com',
          displayName: 'Tirana Office-1-Quiet Room (5)',
        },
        {
          email: 'boothup@softup.co',
        },
      ],
    },
  },
  users: {
    usersList: [
      {
        id: '1',
        primaryEmail: 'john.smith@softup.co',
        name: {
          givenName: 'John',
          familyName: 'Smith',
          fullName: 'John Smith',
        },
        thumbnailPhotoUrl: '11',
        thumbnailPhotoEtag: '11',
      },
    ],
    activeUsers: [
      {
        _id: '1',
        avatarUrl: 'url',
        email: 'john.smith@softup.co',
        myEvents: [],
        name: 'John',
      },
    ],
  },
  resources: {
    resourcesList: [
      {
        resourceId: '1',
        resourceName: 'Quiet Room',
        resourceEmail: 'fake@resource.calendar.google.com',
      },
    ],
  },
});

describe('App Header', () => {
  it('should contain summary of event is one is selected ', async () => {
    render(
      <Router>
        <Provider store={spyStore}>
          <ReservationModal
            resource={resource}
            showReservationModal={() => {}}
          />
        </Provider>
      </Router>,
    );

    await waitFor(async () => {
      const summary = screen.getByDisplayValue('test');
      expect(summary).toBeInTheDocument();
    });
  });

  it('its time should be filled with users input if event selected', async () => {
    render(
      <Router>
        <Provider store={spyStore}>
          <ReservationModal
            resource={resource}
            showReservationModal={() => {}}
          />
        </Provider>
      </Router>,
    );
    await waitFor(async () => {
      const datePicker = screen.getByTestId('time');
      expect(datePicker).toHaveProperty('value', '2022-12-01');
    });
  });

  it('its start time should be filled with users input if event selected', async () => {
    render(
      <Router>
        <Provider store={spyStore}>
          <ReservationModal
            resource={resource}
            showReservationModal={() => {}}
          />
        </Provider>
      </Router>,
    );

    await waitFor(async () => {
      const startSelectInput = screen.getByTestId('start');
      const startSelectionItem = startSelectInput.querySelector(
        '.ant-select-selection-item',
      );
      expect(startSelectionItem?.textContent).toBe('09:00');
    });
  });

  it('its end time should be filled with users input if event selected', async () => {
    render(
      <Router>
        <Provider store={spyStore}>
          <ReservationModal
            resource={resource}
            showReservationModal={() => {}}
          />
        </Provider>
      </Router>,
    );

    await waitFor(async () => {
      const endSelectInput = screen.getByTestId('end');
      const startSelectionItem = endSelectInput.querySelector(
        '.ant-select-selection-item',
      );
      expect(startSelectionItem?.textContent).toBe('10:00');
    });
  });

  it(' should fill summary with users input  ', async () => {
    render(
      <Router>
        <Provider store={spyStore}>
          <ReservationModal
            resource={resource}
            showReservationModal={() => {}}
          />
        </Provider>
      </Router>,
    );

    await waitFor(async () => {
      const user = userEvent.setup();
      const summary = screen.getByPlaceholderText('Add title');

      await user.clear(summary);
      await user.type(summary, 'i am testing');
      expect(summary).toHaveProperty('value', 'i am testing');
    });
  });

  it('no input should have value if no event selected', async () => {
    const storeState = spyStore.getState() as RootState;
    storeState.events.eventSelected = undefined;
    render(
      <Router>
        <Provider store={spyStore}>
          <ReservationModal
            resource={resource}
            showReservationModal={() => {}}
          />
        </Provider>
      </Router>,
    );

    await waitFor(async () => {
      const summary = screen.getByPlaceholderText('Add title');
      expect(summary).toBeInTheDocument();
      expect(summary.textContent).toBe('');
      const datePicker = screen.getByTestId('time');
      expect(datePicker).toHaveProperty('value', '');
      const startSelectInput = screen.getByTestId('start');
      const startSelectionItem = startSelectInput.querySelector('input');
      expect(startSelectionItem?.textContent).toBe('');
      const endSelectInput = screen.getByTestId('start');
      const endSelectionItem = endSelectInput.querySelector('input');
      expect(endSelectionItem?.textContent).toBe('');
      const attendeesElement = screen.getByTestId('attendees');
      const attendeesElementInput = attendeesElement.querySelector('input');
      expect(attendeesElementInput?.textContent).toBe('');
      const description = screen.getByPlaceholderText(
        'Add description (optional)',
      );
      expect(description).toBeInTheDocument();
      expect(description.textContent).toBe('');
    });
  });
});
