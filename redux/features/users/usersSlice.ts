import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../apiConfig/axios';

export interface Address {
  country: string;
  state: string;
  city: string;
  addressLine: string;
}

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  maidenName?: string;
  image?: string;
  role: string;
  yearOfGraduation: string;
  dateOfBirth?: string;
  gender?: string;
  email: string;
  phoneNumber: string;
  whatsappNumber?: string;
  country: string;
  stateCity?: string;
  homeAddress?: string;
  entryYear?: string;
  house?: string;
  classArm?: string;
  formTeacher?: string;
  positionsHeld?: string;
  clubsSocieties?: string;
  favoriteMemory?: string;
  classmates?: string;
  currentOccupation?: string;
  jobTitle?: string;
  organisation?: string;
  industry?: string;
  highestQualification?: string;
  institutionAttended?: string;
  maritalStatus?: string;
  spouseName?: string;
  numberOfChildren?: string;
  numberOfGrandchildren?: string;
  yourStory?: string;
  involvement?: {
    attendReunion: boolean;
    joinCommittee: boolean;
    contributeFundraising: boolean;
    mentorStudents: boolean;
    shareStory: boolean;
    serveExec: boolean;
  };
  howHeard?: string;
  referralName?: string;
  notifications?: {
    emailNewsletter: boolean;
    whatsAppGroup: boolean;
    smsAlerts: boolean;
  };
  acceptTerms?: boolean;
  currentAddress: Address;
  permanentAddress: Address;
  suspended: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchedAt: number | null; // Timestamp when we last fetched
  selectedUser: User | null;
  selectedUserLoading: boolean;
  selectedUserError: string | null;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  fetchedAt: null,
  selectedUser: null,
  selectedUserLoading: false,
  selectedUserError: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: { force?: boolean } | undefined, { rejectWithValue, getState }) => {
    // Check if cache is still fresh, unless forced
    const state = getState() as any;
    if (!params?.force && 
        state.users.fetchedAt && 
        Date.now() - state.users.fetchedAt < CACHE_TTL && 
        state.users.users.length > 0) {
      return state.users.users; // Return cached data
    }
    
    try {
      const response = await api.get('/auth/admin/users');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const suspendUser = createAsyncThunk(
  'users/suspendUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/auth/admin/users/${userId}/suspend`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to suspend user');
    }
  }
);

export const unsuspendUser = createAsyncThunk(
  'users/unsuspendUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/auth/admin/users/${userId}/unsuspend`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to unsuspend user');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/auth/admin/users/${userId}`);
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/admin/users/${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user details');
    }
  }
);

export const changeUserRole = createAsyncThunk(
  'users/changeUserRole',
  async ({ userId, role }: { userId: string; role: 'admin' | 'alumni' }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/auth/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change user role');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.fetchedAt = Date.now(); // Update cache timestamp
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(suspendUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.fetchedAt = Date.now();
      })
      .addCase(unsuspendUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.fetchedAt = Date.now();
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.users = state.users.filter(u => u.id !== action.payload);
        state.fetchedAt = Date.now();
      })
      .addCase(fetchUser.pending, (state) => {
        state.selectedUserLoading = true;
        state.selectedUserError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.selectedUserLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.selectedUserLoading = false;
        state.selectedUserError = action.payload as string;
      })
      .addCase(changeUserRole.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        // Also update selectedUser if it's the same user
        if (state.selectedUser && state.selectedUser.id === action.payload.id) {
          state.selectedUser = action.payload;
        }
      });
  },
});

export const { clearUsersError } = usersSlice.actions;
export default usersSlice.reducer;
