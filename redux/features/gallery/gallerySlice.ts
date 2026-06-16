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
}

const initialState: GalleryState = {
  gallery: [],
  loading: false,
  error: null,
};

export const fetchGallery = createAsyncThunk(
  'gallery/fetchGallery',
  async (_, { rejectWithValue }) => {
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
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createGalleryItem.fulfilled, (state, action: PayloadAction<GalleryItem>) => {
        state.gallery.unshift(action.payload);
      })
      .addCase(updateGalleryItem.fulfilled, (state, action: PayloadAction<GalleryItem>) => {
        const index = state.gallery.findIndex((item) => item._id === action.payload._id);
        if (index !== -1) {
          state.gallery[index] = action.payload;
        }
      })
      .addCase(deleteGalleryItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.gallery = state.gallery.filter((item) => item._id !== action.payload);
      });
  },
});

export const { clearGalleryError } = gallerySlice.actions;
export default gallerySlice.reducer;
