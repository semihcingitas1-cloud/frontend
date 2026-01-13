import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {

    products: [],
    adminProducts: [],
    product: {},
    loading: false
};

export const getProducts = createAsyncThunk(

    'products',

    async (params) => {

        let link = `http://localhost:4000/products?keyword=${params?.keyword || ""}&rating[gte]=${params?.rating || 0}&price[gte]=${params?.price?.min || 0}&price[lte]=${params?.price?.max || 30000}`;

        if(params.category){

            link = `http://localhost:4000/products?keyword=${params?.keyword || ""}&rating[gte]=${params?.rating || 0}&price[gte]=${params?.price?.min || 0}&price[lte]=${params?.price?.max || 30000}&category=${params.category}`;
        }

        const response = await fetch(link);
        return (await response.json());
    }
);

export const getAdminProducts = createAsyncThunk(

    'admin',

    async () => {

        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:4000/admin/products`, {headers: {

            authorization: `Bearer ${token}`
        }});
        return (await response.json());
    }
);

export const addAdminProducts = createAsyncThunk('addAdminProducts', async (data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/product/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    
    const result = await response.json();
    return result;
});

export const deleteAdminProduct = createAsyncThunk('deleteAdminProduct', async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    return { id, data };
});

export const updateAdminProduct = createAsyncThunk('updateAdminProduct', async ({ id, productData }) => {

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData)
    });
    const data = await response.json();
    return data;
});

export const getProductDetail = createAsyncThunk(

    'product',

    async (id) => {

        const response = await fetch(`http://localhost:4000/products/${id}`);
        return (await response.json());
    }
);

export const addReview = createAsyncThunk("addReview", async (reviewData, { rejectWithValue }) => {
    try {

        const token = localStorage.getItem("token");

        const config = {
            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        };

        const response = await axios.post(`http://localhost:4000/product/newReview`, reviewData, config);
        
        return response.data;
    } catch (error) {

        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        return rejectWithValue(message);
    }
});

export const deleteReview = createAsyncThunk("deleteReview", async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
            `http://localhost:4000/reviews?productId=${productId}&id=${reviewId}`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const productSlice = createSlice({

    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;

            if (Array.isArray(action.payload)) {

                state.products = { products: action.payload };
            } else if (action.payload && action.payload.products) {

                state.products = action.payload;
            } else {

                state.products = { products: [] };
            }
        });
        builder.addCase(getProductDetail.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        });
        builder.addCase(getAdminProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.adminProducts = Array.isArray(action.payload.products) ? action.payload : { products: [] };
        });
        builder.addCase(addAdminProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addAdminProducts.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload?.product) {

                state.adminProducts.products = [action.payload.product, ...state.adminProducts.products];
            }
        });
        builder.addCase(deleteAdminProduct.fulfilled, (state, action) => {

            state.loading = false;
            state.adminProducts.products = state.adminProducts.products.filter(p => p._id !== action.payload.id);
            state.products.products = state.products.products.filter(p => p._id !== action.payload.id);
        });
    },
});


export default productSlice.reducer;
