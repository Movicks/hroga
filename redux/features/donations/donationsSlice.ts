import api from '@/apiConfig/axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Donation {
  _id: string;
  reference: string;
  fullName: string;
  email: string;
  amount: number;
  currency: string;
  purpose?: string;
  message?: string;
  anonymous: boolean;
  status: 'pending' | 'success' | 'failed';
  authorizationUrl?: string;
  accessCode?: string;
  paidAt?: string;
  channel?: string;
  paystackData?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface DonationsState {
  donations: Donation[];
  loading: boolean;
  error: string | null;
  fetchedAt: number | null;
}

const CACHE_TTL = 5 * 60 * 1000;

const initialState: DonationsState = {
  donations: [],
  loading: false,
  error: null,
  fetchedAt: null,
};

export const fetchDonations = createAsyncThunk(
  'donations/fetchDonations',
  async (params: { force?: boolean } | undefined, { rejectWithValue, getState }) => {
    const state = getState() as any;
    if (!params?.force &&
        state.donations.fetchedAt &&
        Date.now() - state.donations.fetchedAt < CACHE_TTL &&
        state.donations.donations.length > 0) {
      return state.donations.donations;
    }

    try {
      const response = await api.get('/donations');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch donations');
    }
  }
);

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonations.fulfilled, (state, action: PayloadAction<Donation[]>) => {
        state.loading = false;
        state.donations = action.payload;
        state.fetchedAt = Date.now();
      })
      .addCase(fetchDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default donationsSlice.reducer;
