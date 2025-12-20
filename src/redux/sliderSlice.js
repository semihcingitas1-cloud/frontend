import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createSlider = createAsyncThunk("createSlider", async (sliderData) => {

    const { data } = await axios.post("http://localhost:4000/admin/slider/new", sliderData, {

        headers: { "Content-Type": "application/json" },
        withCredentials: true
    });
    return data;
});

export const getAllSliders = createAsyncThunk("getAllSliders", async () => {

    const { data } = await axios.get("http://localhost:4000/sliders");
    return data.sliders;
});


export const deleteSlider = createAsyncThunk("deleteSlider", async (id) => {

    const { data } = await axios.delete(`http://localhost:4000/admin/slider/${id}`);
    return { id, success: data.success };
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
    }
});

export const { clearErrors, resetSliderStatus } = sliderSlice.actions;
export default sliderSlice.reducer;