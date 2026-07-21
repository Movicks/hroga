import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../apiConfig/axios';

export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  maidenName?: string;
  role: 'admin' | 'alumni';
  yearOfGraduation: string;
  image?: string;
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
  socialMedia?: {
    linkedIn: string;
    facebook: string;
    whatsApp: string;
  };
  acceptTerms?: boolean;
  currentAddress?: {
    country: string;
    state: string;
    city: string;
    addressLine: string;
  };
  permanentAddress?: {
    country: string;
    state: string;
    city: string;
    addressLine: string;
  };
  suspended?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const getInitialToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const initialState: AuthState = {
  user: getInitialUser(),
  accessToken: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
  loading: false,
  error: null,
};

const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const signupAlumni = createAsyncThunk(
  'auth/signupAlumni',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/alumni/signup', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const registerAdmin = createAsyncThunk(
  'auth/registerAdmin',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/admin/register', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
    }
  }
);

const updateCurrentUser = createAsyncThunk(
  'auth/updateCurrentUser',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      // Clean the data before sending
      const cleanData: any = { ...data };
      
      // Remove any fields that shouldn't be updated
      const systemFields = ['id', 'role', 'suspended', 'createdAt', 'updatedAt'];
      systemFields.forEach(field => {
        delete cleanData[field];
      });
      
      // Handle nested objects - remove empty nested objects
      const nestedFields = ['currentAddress', 'permanentAddress', 'involvement', 'socialMedia'];
      nestedFields.forEach(field => {
        if (cleanData[field]) {
          const nestedObj = cleanData[field];
          // Check if nested object exists and is an object
          if (nestedObj && typeof nestedObj === 'object' && !Array.isArray(nestedObj)) {
            // Check if all values in the nested object are empty
            const allEmpty = Object.values(nestedObj).every(val => 
              val === '' || val === false || val === null || val === undefined
            );
            if (allEmpty) {
              delete cleanData[field];
            }
          }
        }
      });
      
      // Remove any undefined or null values
      Object.keys(cleanData).forEach(key => {
        if (cleanData[key] === undefined || cleanData[key] === null) {
          delete cleanData[key];
        }
      });
      
      const response = await api.put('/auth/me', cleanData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state, action: PayloadAction<{ token: string | null; user: User | null }>) => {
      state.accessToken = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupAlumni.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAlumni.fulfilled, (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(signupAlumni.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Don't immediately log out - keep user state until we confirm token is invalid
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { initializeAuth, logout, clearError } = authSlice.actions;
export { login, signupAlumni, registerAdmin, fetchCurrentUser, updateCurrentUser };
export default authSlice.reducer;