import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:4000";

const initialState = {
    loading: false,
    success: false,
    error: null
};

export const sendAdminSMS = createAsyncThunk('sendAdminSMS', async (smsData, { rejectWithValue }) => {

    try {

        const token = localStorage.getItem("token");

        const config = {

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await axios.post(`${BASE_URL}/admin/send-sms`, smsData, config);
        
        return response.data;

    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message;
        return rejectWithValue(message);
    }
});

export const smsSlice = createSlice({
    name: 'sms',
    initialState,
    reducers: {

        resetSMSStatus: (state) => {
            state.success = false;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(sendAdminSMS.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
            });
        builder.addCase(sendAdminSMS.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            });
        builder.addCase(sendAdminSMS.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });
    },
});

export const { resetSMSStatus } = smsSlice.actions;
export default smsSlice.reducer;