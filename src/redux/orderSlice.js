import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "http://localhost:4000";

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
        const { data } = await axios.put(`http://localhost:4000/admin/order/upload-photo/${id}`, { image }, {

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
        const { data } = await axios.put(`http://localhost:4000/order/approve/${id}`, {}, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        return data;

    } catch (error) {

        return rejectWithValue(error.response.data.message);

    }
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],      // Admin için tüm siparişler
        myOrders: [],    // Kullanıcı için kendi siparişleri
        orderDetail: {}, // Tekil sipariş detayı (opsiyonel)
        loading: false,
        success: false,  // Sipariş başarıyla oluşturuldu mu kontrolü
        error: null
    },
    reducers: {
        // Sipariş başarılı olduktan sonra state'i sıfırlamak için
        clearOrderErrors: (state) => {
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- createOrder ---
            .addCase(createOrder.pending, (state) => { state.loading = true; })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.myOrders.push(action.payload.order);
            })
            
            // --- getMyOrders ---
            .addCase(getMyOrders.pending, (state) => { state.loading = true; })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.myOrders = action.payload.orders;
            })

            // --- getAllOrders (Admin) ---
            .addCase(getAllOrders.pending, (state) => { state.loading = true; })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
            })

            // --- updateOrderStatus (Admin) ---
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orders.findIndex(order => order._id === action.payload.order._id);
                if (index !== -1) {
                    state.orders[index] = action.payload.order;
                }
            });
    }
});

export const { clearOrderErrors } = orderSlice.actions;
export default orderSlice.reducer;
