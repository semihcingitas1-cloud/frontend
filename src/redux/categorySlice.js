import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:4000";

export const getAllCategories = createAsyncThunk("getAllCategories", async () => {

    const { data } = await axios.get(`${BASE_URL}/categories`);
    return data.categories;
});

export const createCategory = createAsyncThunk("createCategory", async (categoryData, { rejectWithValue }) => {

    try {

        const token = localStorage.getItem('token');

        const { data } = await axios.post(`${BASE_URL}/admin/category/new`, categoryData, {

            headers: { Authorization: `Bearer ${token}` }
        });

        return data.category;

    } catch (error) {

        return rejectWithValue(error.response.data.message);
    }
});

export const deleteCategory = createAsyncThunk("deleteCategory", async (id) => {

    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/admin/category/${id}`, {

        headers: { Authorization: `Bearer ${token}` }
    });

    return id;
});

export const getAllShippings = createAsyncThunk("getAllShippings", async () => {

    const { data } = await axios.get(`${BASE_URL}/shippings`);
    return data.shippings;
});

export const createShipping = createAsyncThunk("createShipping", async (shippingData, { rejectWithValue }) => {

    try {

        const token = localStorage.getItem('token');

        const { data } = await axios.post(`${BASE_URL}/admin/shipping/new`, shippingData, {

            headers: { Authorization: `Bearer ${token}` }
        });

        return data.shipping;

    } catch (error) {

        return rejectWithValue(error.response.data.message);
    }
});

export const deleteShipping = createAsyncThunk("deleteShipping", async (id) => {

    const token = localStorage.getItem('token');

    await axios.delete(`${BASE_URL}/admin/shipping/${id}`, {

        headers: { Authorization: `Bearer ${token}` }
    });

    return id;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        shippings: [],
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
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.success = true;
            state.categories.push(action.payload);
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter(cat => cat._id !== action.payload);
        });
        builder.addCase(getAllShippings.fulfilled, (state, action) => {
            state.loading = false;
            state.shippings = action.payload;
        });
        builder.addCase(createShipping.fulfilled, (state, action) => {
            state.success = true;
            state.shippings.push(action.payload);
        });
        builder.addCase(deleteShipping.fulfilled, (state, action) => {
            state.shippings = state.shippings.filter(ship => ship._id !== action.payload);
        });

        builder.addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => { state.loading = true; }
        );
        builder.addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
        );
    }
});

export const { clearStatus } = categorySlice.actions;
export default categorySlice.reducer;