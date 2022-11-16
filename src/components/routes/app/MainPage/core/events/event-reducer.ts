import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, EventUpdateRequestType } from '../../../../../../types/event';
import { EventState } from './types';

const initialState: EventState = {
  eventList: undefined,
  isLoading: false,
  error: undefined,
  eventSelected: undefined,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    addEvents: (state, action: PayloadAction<Event[] | undefined>) => {
      state.eventList = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.eventList?.unshift(action.payload);
    },
    deleteTheEvent: (state, action: PayloadAction<string | undefined>) => {
      state.eventList = state.eventList?.filter(
        (event) => event.id !== action.payload,
      );
    },
    updateTheEvent: (
      state,
      action: PayloadAction<{ eventId: string; event: EventUpdateRequestType }>,
    ) => {
      state.eventList = state.eventList?.map((event) => {
        if (event.id === action.payload.eventId) {
          event = { ...event, ...action.payload.event.event };
        }
        return event;
      });
    },
    selectTheEvent: (state, action: PayloadAction<Event>) => {
      state.eventSelected = action.payload;
    },
    deselectEvent: (state, action: PayloadAction<Event | undefined>) => {
      state.eventSelected = action.payload;
    },
  },
});

export const {
  isLoading,
  hasError,
  addEvents,
  addEvent,
  deleteTheEvent,
  updateTheEvent,
  selectTheEvent,
  deselectEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
