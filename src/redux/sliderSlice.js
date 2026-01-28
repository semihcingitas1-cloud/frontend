import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://backend-d72l.onrender.com";

export const createSlider = createAsyncThunk("createSlider", async (sliderData) => {

    const token = localStorage.getItem('token');

    const { data } = await axios.post(`${BASE_URL}/admin/slider/new`, sliderData, {

        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        withCredentials: true
    });

    return data;
});

export const getAllSliders = createAsyncThunk("getAllSliders", async () => {

    const token = localStorage.getItem('token');

    const { data } = await axios.get(`${BASE_URL}/sliders?admin=true`, {

        headers: { "Authorization": `Bearer ${token}` }
    });

    return data.sliders;
});

export const deleteSlider = createAsyncThunk("deleteSlider", async (id) => {

    const token = localStorage.getItem('token');

    const { data } = await axios.delete(`${BASE_URL}/admin/slider/${id}`, {

        headers: { "Authorization": `Bearer ${token}` },
        withCredentials: true
    });
    return { id, success: data.success };
});

export const updateSliderStatus = createAsyncThunk("updateSliderStatus", async ({ id, isActive }) => {

    const token = localStorage.getItem('token');

    const { data } = await axios.put(`${BASE_URL}/admin/slider/${id}`, 

        { isActive }, {

            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            withCredentials: true
        }
    );

    return data.slider;
});

const sliderSlice = createSlice({
    name: "slider",
    initialState: {
        sliders: [],
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        resetSliderStatus: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getAllSliders.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllSliders.fulfilled, (state, action) => {
            state.loading = false;
            state.sliders = action.payload;
        });
        builder.addCase(createSlider.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createSlider.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.sliders.push(action.payload.slider);
        });
        builder.addCase(createSlider.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(deleteSlider.fulfilled, (state, action) => {
            state.loading = false;
            state.sliders = state.sliders.filter(i => i._id !== action.payload.id);
        });
        builder.addCase(updateSliderStatus.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.sliders.findIndex(s => s._id === action.payload._id);
            if (index !== -1) {
                state.sliders[index] = action.payload;
            }
        });
    }
});

export const { clearErrors, resetSliderStatus } = sliderSlice.actions;

export default sliderSlice.reducer;
