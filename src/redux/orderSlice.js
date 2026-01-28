import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:4000";

// --- MEVCUT THUNK'LAR ---
export const createOrder = createAsyncThunk('createOrder', async (orderData) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(`${BASE_URL}/order/new`, orderData, {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    });
    return data;
});

export const getMyOrders = createAsyncThunk('getMyOrders', async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${BASE_URL}/orders/me`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    return data;
});

export const getAllOrders = createAsyncThunk('getAllOrders', async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${BASE_URL}/admin/orders`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    return data;
});

export const updateOrderStatus = createAsyncThunk('updateOrderStatus', async ({ id, status }) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.put(`${BASE_URL}/admin/order/${id}`, { status }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return data;
});

export const uploadOrderPhoto = createAsyncThunk("uploadOrderPhoto", async ({ id, image }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.put(`${BASE_URL}/admin/order/upload-photo/${id}`, { image }, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const approveOrder = createAsyncThunk("approveOrder", async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.put(`${BASE_URL}/order/approve/${id}`, {}, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// --- YENİ EKLENEN THUNK: Revize Talebi ---
export const requestRevision = createAsyncThunk("requestRevision", async ({ id, note }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const { data } = await axios.put(`${BASE_URL}/order/revision/${id}`, { note }, {
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],      
        myOrders: [],    
        orderDetail: {}, 
        loading: false,
        success: false,  
        error: null
    },
    reducers: {
        clearOrderErrors: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // createOrder
            .addCase(createOrder.pending, (state) => { state.loading = true; })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.myOrders.push(action.payload.order);
            })
            
            // getMyOrders
            .addCase(getMyOrders.pending, (state) => { state.loading = true; })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.myOrders = action.payload.orders;
            })

            // getAllOrders
            .addCase(getAllOrders.pending, (state) => { state.loading = true; })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
            })

            // updateOrderStatus
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orders.findIndex(order => order._id === action.payload.order._id);
                if (index !== -1) { state.orders[index] = action.payload.order; }
            })

            // uploadOrderPhoto
            .addCase(uploadOrderPhoto.pending, (state) => { state.loading = true; })
            .addCase(uploadOrderPhoto.fulfilled, (state, action) => {
                state.loading = false;
                // Admin listesini güncelle
                const index = state.orders.findIndex(o => o._id === action.payload.order._id);
                if (index !== -1) state.orders[index] = action.payload.order;
            })

            // approveOrder
            .addCase(approveOrder.pending, (state) => { state.loading = true; })
            .addCase(approveOrder.fulfilled, (state, action) => {
                state.loading = false;
                // Kullanıcı listesini güncelle
                const index = state.myOrders.findIndex(o => o._id === action.payload.order._id);
                if (index !== -1) state.myOrders[index] = action.payload.order;
            })

            // requestRevision (YENİ DURUM)
            .addCase(requestRevision.pending, (state) => { state.loading = true; })
            .addCase(requestRevision.fulfilled, (state, action) => {
                state.loading = false;
                // Kullanıcı listesini güncelle
                const index = state.myOrders.findIndex(o => o._id === action.payload.order._id);
                if (index !== -1) state.myOrders[index] = action.payload.order;
            })
            .addCase(requestRevision.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearOrderErrors } = orderSlice.actions;
export default orderSlice.reducer;