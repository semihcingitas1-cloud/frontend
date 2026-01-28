import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://backend-d72l.onrender.com";

const initialState = {
    blogs: [],
    adminBlogs: [],
    blog: {},
    loading: false,
    error: null
};

export const getBlogs = createAsyncThunk('getBlogs', async () => {

    const response = await fetch(`${BASE_URL}/blogs`);
    return (await response.json());
});

export const getBlogDetail = createAsyncThunk('getBlogDetail', async (id) => {
    const response = await fetch(`${BASE_URL}/blogs/${id}`);
    const data = await response.json();
    return data;
});

export const getAdminBlogs = createAsyncThunk('getAdminBlogs', async () => {

    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/admin/blogs`, {
        headers: { authorization: `Bearer ${token}` }
    });
    return (await response.json());
});

export const createAdminBlog = createAsyncThunk('createAdminBlog', async (blogData) => {

    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/blog/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
    });
    return (await response.json());
});

export const deleteAdminBlog = createAsyncThunk('deleteAdminBlog', async (id) => {

    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await response.json();
    return { id, data };
});

export const updateAdminBlog = createAsyncThunk('updateAdminBlog', async ({ id, blogData }) => {

    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
    });
    return (await response.json());
});

export const addBlogComment = createAsyncThunk("addBlogComment", async (commentData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        };
        const response = await axios.post(`${BASE_URL}/blog/newComment`, commentData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getBlogs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs || [];
        });
        builder.addCase(getBlogDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBlogDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        });
        builder.addCase(getAdminBlogs.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAdminBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.adminBlogs = action.payload.blogs || [];
        });
        builder.addCase(createAdminBlog.fulfilled, (state, action) => {
            if (action.payload?.success) {
                state.adminBlogs = [action.payload.blog, ...state.adminBlogs];
            }
        });
        builder.addCase(deleteAdminBlog.fulfilled, (state, action) => {
            state.adminBlogs = state.adminBlogs.filter(b => b._id !== action.payload.id);
            state.blogs = state.blogs.filter(b => b._id !== action.payload.id);
        });
    },
});

export const { clearErrors } = blogSlice.actions;

export default blogSlice.reducer;
