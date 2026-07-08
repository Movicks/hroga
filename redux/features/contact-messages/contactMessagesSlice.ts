import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../apiConfig/axios';

export interface ContactMessage {
  _id: string;
  fullName: string;
  graduationYear: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  replies: {
    sender: 'admin' | 'user';
    text: string;
    timestamp: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string; // email
  email: string;
  fullName: string;
  graduationYear: string;
  messages: ContactMessage[];
  isRead: boolean;
  createdAt: string;
}

interface ContactMessagesState {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  loading: boolean;
  error: string | null;
  fetchedAt: number | null;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 mins

const initialState: ContactMessagesState = {
  conversations: [],
  selectedConversation: null,
  loading: false,
  error: null,
  fetchedAt: null,
};

export const fetchConversations = createAsyncThunk(
  'contactMessages/fetchConversations',
  async (params: { force?: boolean } | undefined, { rejectWithValue, getState }) => {
    const state = getState() as any;
    if (!params?.force && state.contactMessages.fetchedAt && Date.now() - state.contactMessages.fetchedAt < CACHE_TTL && state.contactMessages.conversations.length > 0) {
      return state.contactMessages.conversations;
    }
    try {
      const response = await api.get('/contact-messages/conversations');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch conversations');
    }
  }
);

export const fetchConversation = createAsyncThunk(
  'contactMessages/fetchConversation',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/contact-messages/conversations/${encodeURIComponent(email)}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch conversation');
    }
  }
);

export const replyToConversation = createAsyncThunk(
  'contactMessages/replyToConversation',
  async ({ email, text }: { email: string; text: string }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/contact-messages/conversations/${encodeURIComponent(email)}/reply`, { text });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reply');
    }
  }
);

export const markConversationAsRead = createAsyncThunk(
  'contactMessages/markConversationAsRead',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/contact-messages/conversations/${encodeURIComponent(email)}/read`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark as read');
    }
  }
);

const contactMessagesSlice = createSlice({
  name: 'contactMessages',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    selectConversation: (state, action: PayloadAction<Conversation | null>) => {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
        state.loading = false;
        state.conversations = action.payload;
        state.fetchedAt = Date.now();
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversation.fulfilled, (state, action: PayloadAction<Conversation>) => {
        state.loading = false;
        state.selectedConversation = action.payload;
        // Update conversations list
        const index = state.conversations.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.conversations[index] = action.payload;
        }
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(replyToConversation.fulfilled, (state, action: PayloadAction<Conversation>) => {
        state.selectedConversation = action.payload;
        const index = state.conversations.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.conversations[index] = action.payload;
        }
      })
      .addCase(markConversationAsRead.fulfilled, (state, action: PayloadAction<Conversation>) => {
        const index = state.conversations.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.conversations[index].isRead = true;
        }
        if (state.selectedConversation && state.selectedConversation.id === action.payload.id) {
          state.selectedConversation.isRead = true;
        }
      });
  },
});

export const { clearError, selectConversation } = contactMessagesSlice.actions;
export default contactMessagesSlice.reducer;
