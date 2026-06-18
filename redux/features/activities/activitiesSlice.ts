import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../apiConfig/axios';

export interface Activity {
  _id: string;
  day: string;
  month: string;
  title: string;
  details: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivitiesState {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  fetchedAt: number | null; // Timestamp when we last fetched
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  error: null,
  fetchedAt: null,
};

export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async (params: { force?: boolean } | undefined, { rejectWithValue, getState }) => {
    // Check if cache is still fresh, unless forced
    const state = getState() as any;
    if (!params?.force && 
        state.activities.fetchedAt && 
        Date.now() - state.activities.fetchedAt < CACHE_TTL && 
        state.activities.activities.length > 0) {
      return state.activities.activities; // Return cached data
    }
    
    try {
      const response = await api.get('/activities');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch activities');
    }
  }
);

export const createActivity = createAsyncThunk(
  'activities/createActivity',
  async (data: Omit<Activity, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/activities', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create activity');
    }
  }
);

export const updateActivity = createAsyncThunk(
  'activities/updateActivity',
  async ({ id, data }: { id: string; data: Partial<Activity> }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/activities/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update activity');
    }
  }
);

export const deleteActivity = createAsyncThunk(
  'activities/deleteActivity',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/activities/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete activity');
    }
  }
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    clearActivityError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action: PayloadAction<Activity[]>) => {
        state.loading = false;
        state.activities = action.payload;
        state.fetchedAt = Date.now(); // Update cache timestamp
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createActivity.fulfilled, (state, action: PayloadAction<Activity>) => {
        state.activities.unshift(action.payload);
        state.fetchedAt = Date.now();
      })
      .addCase(updateActivity.fulfilled, (state, action: PayloadAction<Activity>) => {
        const index = state.activities.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
        state.fetchedAt = Date.now();
      })
      .addCase(deleteActivity.fulfilled, (state, action: PayloadAction<string>) => {
        state.activities = state.activities.filter((a) => a._id !== action.payload);
        state.fetchedAt = Date.now();
      });
  },
});

export const { clearActivityError } = activitiesSlice.actions;
export default activitiesSlice.reducer;
