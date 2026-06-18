import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../apiConfig/axios';

export type EventType = 'Birthday' | 'Wedding' | 'New Arrivals';

export interface Event {
  _id: string;
  type: EventType;
  title: string;
  dateLocation: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchedAt: number | null; // Timestamp when we last fetched
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  fetchedAt: null,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params: { force?: boolean } | undefined, { rejectWithValue, getState }) => {
    // Check if cache is still fresh, unless forced
    const state = getState() as any;
    if (!params?.force && 
        state.events.fetchedAt && 
        Date.now() - state.events.fetchedAt < CACHE_TTL && 
        state.events.events.length > 0) {
      return state.events.events; // Return cached data
    }
    
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (data: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/events', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, data }: { id: string; data: Partial<Event> }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/events/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/events/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
        state.fetchedAt = Date.now(); // Update cache timestamp
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.events.unshift(action.payload);
        state.fetchedAt = Date.now();
      })
      .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        const index = state.events.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.fetchedAt = Date.now();
      })
      .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
        state.fetchedAt = Date.now();
      });
  },
});

export const { clearEventError } = eventsSlice.actions;
export default eventsSlice.reducer;
