import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:4000";

export const getSiteSettings = createAsyncThunk("getSiteSettings", async () => {

    const { data } = await axios.get(`${BASE_URL}/settings`);
    return data;
});

export const updateStoreStatus = createAsyncThunk("updateStoreStatus", async (isOpen, { rejectWithValue }) => {
    try {

        const token = localStorage.getItem('token');

        const { data } = await axios.put(`${BASE_URL}/settings/update`, 
            { isStoreOpen: isOpen }, 
            { headers: { Authorization: `Bearer ${token}` } }
        );

        return data;

    } catch (error) {

        return rejectWithValue(error.response.data.message);
    }
});

export const updateAvatar = createAsyncThunk("updateAvatar", async (formData, { rejectWithValue }) => {

    try {

        const token = localStorage.getItem('token');

        const { data } = await axios.put(`${BASE_URL}/profil/update/avatar`, formData, {

            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
            }
        });
        return data;
    } catch (error) {

        const message = error.response?.data?.message || "Bir hata oluştu";
        return rejectWithValue(message);
    }
});

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        isStoreOpen: true,
        loading: false,
        success: false,
        error: null
    },
    reducers: {
        clearSettingsStatus: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getSiteSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.isStoreOpen = action.payload.isStoreOpen;
        });
        builder.addCase(updateStoreStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.isStoreOpen = action.payload.isStoreOpen;
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

export const { clearSettingsStatus } = settingsSlice.actions;
export default settingsSlice.reducer;