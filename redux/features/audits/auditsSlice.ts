import api from '@/apiConfig/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Audit {
  _id: string;
  action: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'suspend' | 'unsuspend';
  entity: string;
  entityId?: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
  performedBy: string;
  performedByName?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuditsState {
  audits: Audit[];
  loading: boolean;
  error: string | null;
  fetchedAt: number | null; // Timestamp when we last fetched
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const initialState: AuditsState = {
  audits: [],
  loading: false,
  error: null,
  fetchedAt: null,
};

export const fetchAudits = createAsyncThunk(
  'audits/fetchAudits',
  async (params: { force?: boolean } | undefined, { rejectWithValue, getState }) => {
    // Check if cache is still fresh, unless forced
    const state = getState() as any;
    if (!params?.force && 
        state.audits.fetchedAt && 
        Date.now() - state.audits.fetchedAt < CACHE_TTL && 
        state.audits.audits.length > 0) {
      return state.audits.audits; // Return cached data
    }
    
    try {
      const response = await api.get('/audits');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch audits');
    }
  }
);

const auditsSlice = createSlice({
  name: 'audits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAudits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAudits.fulfilled, (state, action: PayloadAction<Audit[]>) => {
        state.loading = false;
        state.audits = action.payload;
        state.fetchedAt = Date.now(); // Update cache timestamp
      })
      .addCase(fetchAudits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default auditsSlice.reducer;
