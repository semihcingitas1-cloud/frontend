import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:4000";

const initialState = {

    users: [],
    loading: false,
    success: false,
    error: null
};

export const getAllUsersForMail = createAsyncThunk('getAllUsersForMail', async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/admin/users`, {

        headers: { authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    return data.users;
});

export const sendAdminMail = createAsyncThunk('sendAdminMail', async (mailData, { rejectWithValue }) => {

    try {

        const token = localStorage.getItem("token");
        const config = {

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await axios.post(`${BASE_URL}/admin/send-mail`, mailData, config);
        
        return response.data;

    } catch (error) {

        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        return rejectWithValue(message);
    }
});

export const mailSlice = createSlice({

    name: 'mail',
    initialState,
    reducers: {

        resetMailStatus: (state) => {
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getAllUsersForMail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUsersForMail.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload || [];
        });
        builder.addCase(sendAdminMail.pending, (state) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(sendAdminMail.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        });
        builder.addCase(sendAdminMail.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });
    },
});

export const { resetMailStatus } = mailSlice.actions;
export default mailSlice.reducer;