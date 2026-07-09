import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../apiConfig/axios';

export interface GalleryItem {
  _id: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface GalleryState {
  gallery: GalleryItem[];
  loading: boolean;
  error: string | null;
  fetchedAt: number | null; // Timestamp when we last fetched
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const initialState: GalleryState = {
  gallery: [],
  loading: false,
  error: null,
  fetchedAt: null,
};

export const fetchGallery = createAsyncThunk(
  'gallery/fetchGallery',
  async (params: { force?: boolean } | undefined, { rejectWithValue, getState }) => {
    // Check if cache is still fresh, unless forced
    const state = getState() as any;
    if (!params?.force && 
        state.gallery.fetchedAt && 
        Date.now() - state.gallery.fetchedAt < CACHE_TTL && 
        state.gallery.gallery.length > 0) {
      return state.gallery.gallery; // Return cached data
    }
    
    try {
      const response = await api.get('/gallery');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch gallery');
    }
  }
);

export const createGalleryItem = createAsyncThunk(
  'gallery/createGalleryItem',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create gallery item');
    }
  }
);

export const updateGalleryItem = createAsyncThunk(
  'gallery/updateGalleryItem',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/gallery/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update gallery item');
    }
  }
);

export const deleteGalleryItem = createAsyncThunk(
  'gallery/deleteGalleryItem',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/gallery/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete gallery item');
    }
  }
);

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearGalleryError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action: PayloadAction<GalleryItem[]>) => {
        state.loading = false;
        state.gallery = action.payload;
        state.fetchedAt = Date.now(); // Update cache timestamp
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGalleryItem.fulfilled, (state, action: PayloadAction<GalleryItem>) => {
        state.loading = false;
        state.gallery.unshift(action.payload);
        state.fetchedAt = Date.now();
      })
      .addCase(createGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGalleryItem.fulfilled, (state, action: PayloadAction<GalleryItem>) => {
        state.loading = false;
        const index = state.gallery.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.gallery[index] = action.payload;
        }
        state.fetchedAt = Date.now();
      })
      .addCase(updateGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteGalleryItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGalleryItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.gallery = state.gallery.filter((item) => item._id !== action.payload);
        state.fetchedAt = Date.now();
      })
      .addCase(deleteGalleryItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearGalleryError } = gallerySlice.actions;
export default gallerySlice.reducer;
