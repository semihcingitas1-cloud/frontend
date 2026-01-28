import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

{/**
export const userSlice = createSlice({

    extraReducers: (builder) => {

        builder.addCase(register.fulfilled, (state, action) => {
            state.isAuth = true;
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.isAuth = false;
        });
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.isAuth = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuth = true;
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.isAuth = false;
            localStorage.removeItem("token");
        });
        builder.addCase(profile.pending, (state, action) => {
            state.loading = true;
            state.isAuth = false;
        });
        builder.addCase(profile.fulfilled, (state, action) => {
            state.isAuth = true;
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(profile.rejected, (state, action) => {
            state.isAuth = false;
            state.loading = false;
            state.user = {};
        });
        builder.addCase(forgotPassword.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(resetPassword.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
        });
    },
});*/}


const BASE_URL = "http://localhost:4000";

const initialState = {
    user: {},
    isAuth: false,
    loading: false,
    error: null
};

export const register = createAsyncThunk(

    'register',

    async (data, { rejectWithValue }) => {

        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        const response = await fetch(`${BASE_URL}/register`, requestOptions);
        
        if (!response.ok) {

            let error = await response.json();
            return rejectWithValue(error);
        }

        return (await response.json());
    }
);

export const login = createAsyncThunk(

    'login',

    async (data, { rejectWithValue }) => {

        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: data.email, password: data.password})
        }

        const response = await fetch(`${BASE_URL}/login`, requestOptions);

        if (!response.ok) {

            let error = await response.json();
            return rejectWithValue(error);
        }

        let res = await response.json();
        localStorage.setItem("token", res?.token);

        return res;
    }
);

export const forgotPassword = createAsyncThunk(

    'forgot',

    async (email, { rejectWithValue }) => {

        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email})
        }

        const response = await fetch(`${BASE_URL}/forgotPassword`, requestOptions);
        
        if (!response.ok) {

            let error = await response.json();
            return rejectWithValue(error);
        }
        
        return (await response.json());
    }
);

export const resetPassword = createAsyncThunk(

    'reset',

    async (params, { rejectWithValue }) => {

        const requestOptions = {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({password: params.password})
        }

        const response = await fetch(`${BASE_URL}/reset/${params.token}`, requestOptions);

        if (!response.ok) {
            let error = await response.json();
            return rejectWithValue(error);
        }

        return (await response.json());
    }
);

export const profile = createAsyncThunk(

    'profile',

    async (_, { rejectWithValue }) => {

        const token = localStorage.getItem("token"); 
        
        if(!token){

            return rejectWithValue({ message: "Oturum açılmamış. Token bulunamadı." });
        }

        const response = await fetch(`${BASE_URL}/profile`, { headers: {

            authorization: `Bearer ${token.trim()}` 
        }});

        if (!response.ok) {

            let error = await response.json();

            if (response.status === 401) {

                localStorage.removeItem("token");
            }

            return rejectWithValue(error);
        }

        return (await response.json());
    }
);

export const addAddress = createAsyncThunk('addAddress', async (addressData) => {

    const token = localStorage.getItem('token');

    const { data } = await axios.post(
        `${BASE_URL}/profile/address/new`, 
        addressData, 
        {
            headers: {

                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
            },
            withCredentials: true
        }
    );
    return data;
});

export const deleteAddress = createAsyncThunk('deleteAddress', async (id) => {
    const token = localStorage.getItem('token');

    const { data } = await axios.delete(
        `${BASE_URL}/profile/address/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return data;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        logoutUser: (state) => {

            state.isAuth = false;
            state.loading = false;
            state.user = {};
            state.error = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {

        builder.addCase(forgotPassword.pending, (state) => { state.loading = true; state.error = null; });
        builder.addCase(resetPassword.pending, (state) => { state.loading = true; state.error = null; });


        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.isAuth = false;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isAuth = true;
            state.loading = false;
            state.user = action.payload;
            state.error = null;

            if (action.payload?.token) {
                localStorage.setItem('token', action.payload.token);
            }
        });

        builder.addCase(login.pending, (state) => {
            state.loading = true; state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuth = true;
            state.loading = false;
            state.user = action.payload;
            state.error = null;


            if (action.payload?.token) {

                localStorage.setItem('token', action.payload.token);
            }
        });

        builder.addCase(profile.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(profile.fulfilled, (state, action) => {
            state.isAuth = true;
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(addAddress.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(deleteAddress.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(forgotPassword.fulfilled, (state) => {
            state.loading = false; state.error = null;
        });
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.loading = false; state.error = null;
        });

        [register.rejected, login.rejected, profile.rejected].forEach(action => {
            builder.addCase(action, (state, action) => {
                state.loading = false;
                state.isAuth = false;
                // Gelen hata payload'unu state'e kaydet
                state.error = action.payload; 
                // Eğer profile hatası aldıysak ve token silindiyse, user state'i temizle
                if (action.type === profile.rejected.type) {
                    state.user = {};
                }
            });
        });

        // Şifre sıfırlama hataları
        [forgotPassword.rejected, resetPassword.rejected].forEach(action => {
            builder.addCase(action, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        });
    },
});

export const { logoutUser } = userSlice.actions;


export default userSlice.reducer;
