import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface DueUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'alumni';
}

export interface Due {
  _id: string;
  reference: string;
  amount: number;
  currency: string;
  type: string;
  month: string;
  status: string;
  paidAt?: string;
  dueDate?: string;
  notes?: string;
  userId: string;
  user?: DueUser;
  createdAt: string;
  updatedAt: string;
}

export interface DueSummary {
  totalPaid: number;
  pendingCount: number;
  overdueCount: number;
  totalDues: number;
  isCurrentMonthPaid: boolean;
  currentMonth: string;
}

export interface InitializeDuePayload {
  month: string;
  type: string;
  notes?: string;
}

export interface InitializeDueResponse {
  authorizationUrl?: string;
  reference?: string;
  message?: string;
}

interface DuesState {
  dues: Due[];
  dueSummary: DueSummary | null;
  isCheckingDueStatus: boolean;
  lastDueStatusCheck: number | null;
  isInitializingPayment: boolean;
  isFetchingDues: boolean;
  paymentError: string | null;
  fetchError: string | null;
}

const initialState: DuesState = {
  dues: [],
  dueSummary: null,
  isCheckingDueStatus: false,
  lastDueStatusCheck: null,
  isInitializingPayment: false,
  isFetchingDues: false,
  paymentError: null,
  fetchError: null,
};

// Async thunk to check due payment status
export const checkDuePaymentStatus = createAsyncThunk(
  'dues/checkDuePaymentStatus',
  async (force: boolean = false, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:4000';
      
      const response = await fetch(`${baseUrl}/api/dues/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle 404 specifically
      if (response.status === 404) {
        throw new Error('Due summary endpoint not found. Please check if the server is running correctly.');
      }

      // Try to parse JSON, but handle non-JSON responses
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, create a generic error
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        // Handle rate limiting error specifically
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        throw new Error(data.message || `Failed to fetch due summary (${response.status})`);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to check due payment status');
    }
  },
  {
    condition: (force = false, { getState }) => {
      if (force) {
        return true;
      }

      const { dues } = getState() as { dues: DuesState };

      if (dues.isCheckingDueStatus) {
        return false;
      }

      if (
        dues.lastDueStatusCheck &&
        Date.now() - dues.lastDueStatusCheck < 15000
      ) {
        return false;
      }

      return true;
    },
  }
);

// Async thunk to initialize due payment
export const initializeDuePayment = createAsyncThunk(
  'dues/initializeDuePayment',
  async (payload: InitializeDuePayload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:4000';
      
      const response = await fetch(`${baseUrl}/api/dues/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // Handle 404 specifically
      if (response.status === 404) {
        throw new Error('Payment initialization endpoint not found. Please check if the server is running correctly.');
      }

      // Try to parse JSON, but handle non-JSON responses
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, create a generic error
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || `Failed to initialize payment (${response.status})`);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to initialize payment');
    }
  }
);

// Async thunk to fetch user dues
export const fetchUserDues = createAsyncThunk(
  'dues/fetchUserDues',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:4000';
      
      const response = await fetch(`${baseUrl}/api/dues/my-dues`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle 404 specifically
      if (response.status === 404) {
        throw new Error('User dues endpoint not found. Please check if the server is running correctly.');
      }

      // Try to parse JSON, but handle non-JSON responses
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, create a generic error
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        throw new Error(data.message || `Failed to fetch user dues (${response.status})`);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch dues');
    }
  }
);

// Async thunk to fetch all dues (admin only)
export const fetchAllDues = createAsyncThunk(
  'dues/fetchAllDues',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:4000';
      
      const response = await fetch(`${baseUrl}/api/dues`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Handle 404 specifically
      if (response.status === 404) {
        throw new Error('All dues endpoint not found. Please check if the server is running correctly.');
      }

      // Try to parse JSON, but handle non-JSON responses
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If response is not JSON, create a generic error
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        throw new Error(data.message || `Failed to fetch all dues (${response.status})`);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch dues');
    }
  }
);

const duesSlice = createSlice({
  name: 'dues',
  initialState,
  reducers: {
    clearDuesError: (state) => {
      state.paymentError = null;
      state.fetchError = null;
    },
    resetDuesState: () => initialState,
  },
  extraReducers: (builder) => {
    // checkDuePaymentStatus
    builder
      .addCase(checkDuePaymentStatus.pending, (state) => {
        state.isCheckingDueStatus = true;
        state.lastDueStatusCheck = Date.now();
        state.paymentError = null;
      })
      .addCase(checkDuePaymentStatus.fulfilled, (state, action: PayloadAction<DueSummary>) => {
        state.isCheckingDueStatus = false;
        state.dueSummary = action.payload;
      })
      .addCase(checkDuePaymentStatus.rejected, (state, action) => {
        state.isCheckingDueStatus = false;
        state.paymentError = action.payload as string;
      });

    // initializeDuePayment
    builder
      .addCase(initializeDuePayment.pending, (state) => {
        state.isInitializingPayment = true;
        state.paymentError = null;
      })
      .addCase(initializeDuePayment.fulfilled, (state, action: PayloadAction<InitializeDueResponse>) => {
        state.isInitializingPayment = false;
        // If payment was initialized successfully, we don't need to update local state
        // The webhook will update the payment status
      })
      .addCase(initializeDuePayment.rejected, (state, action) => {
        state.isInitializingPayment = false;
        state.paymentError = action.payload as string;
      });

    // fetchUserDues
    builder
      .addCase(fetchUserDues.pending, (state) => {
        state.isFetchingDues = true;
        state.fetchError = null;
      })
      .addCase(fetchUserDues.fulfilled, (state, action: PayloadAction<Due[]>) => {
        state.isFetchingDues = false;
        state.dues = action.payload;
      })
      .addCase(fetchUserDues.rejected, (state, action) => {
        state.isFetchingDues = false;
        state.fetchError = action.payload as string;
      });

    // fetchAllDues
    builder
      .addCase(fetchAllDues.pending, (state) => {
        state.isFetchingDues = true;
        state.fetchError = null;
      })
      .addCase(fetchAllDues.fulfilled, (state, action: PayloadAction<Due[]>) => {
        state.isFetchingDues = false;
        state.dues = action.payload;
      })
      .addCase(fetchAllDues.rejected, (state, action) => {
        state.isFetchingDues = false;
        state.fetchError = action.payload as string;
      });
  },
});

export const { clearDuesError, resetDuesState } = duesSlice.actions;
export default duesSlice.reducer;
