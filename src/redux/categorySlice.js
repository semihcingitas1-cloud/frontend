import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Tüm Kategorileri Getir
export const getAllCategories = createAsyncThunk("getAllCategories", async () => {
    const { data } = await axios.get("https://backend-d72l.onrender.com/categories");
    return data.categories;
});

// Yeni Kategori Ekle (Admin)
export const createCategory = createAsyncThunk("createCategory", async (categoryData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post("https://backend-d72l.onrender.com/admin/category/new", categoryData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return data.category;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Kategori Sil (Admin)
export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`https://backend-d72l.onrender.com/admin/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return id;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        success: false,
        error: null
    },
    reducers: {
        clearStatus: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Listeleme
            .addCase(getAllCategories.pending, (state) => { state.loading = true; })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            // Ekleme
            .addCase(createCategory.fulfilled, (state, action) => {
                state.success = true;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Silme
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(cat => cat._id !== action.payload);
            });
    }
});

export const { clearStatus } = categorySlice.actions;

export default categorySlice.reducer;
