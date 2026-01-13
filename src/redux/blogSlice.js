import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    blogs: [],
    adminBlogs: { blogs: [] },
    blog: {},
    loading: false,
    success: false,
    error: null
};

export const getBlogs = createAsyncThunk(
    'getBlogs',
    async (params, { rejectWithValue }) => {
        try {
            // Params objesini güvenli bir şekilde string'e çevirelim
            const category = params?.category || "";
            const keyword = params?.keyword || "";
            
            const response = await axios.get(`http://localhost:4000/blogs?category=${category}&keyword=${keyword}`);
            
            // Axios veriyi direkt .data içinde getirir
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAdminBlogs = createAsyncThunk(
    'getAdminBlogs',
    async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:4000/admin/blogs`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        return (await response.json());
    }
);

export const addAdminBlog = createAsyncThunk('addAdminBlog', async (blogData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/admin/blog/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
    });
    const result = await response.json();
    return result;
});

export const deleteAdminBlog = createAsyncThunk('deleteAdminBlog', async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/admin/blog/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();
    return { id, data };
});

export const updateAdminBlog = createAsyncThunk('updateAdminBlog', async ({ id, blogData }) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/admin/blog/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
    });
    const data = await response.json();
    return data;
});

export const getBlogDetail = createAsyncThunk(
    'getBlogDetail',
    async (slug) => {
        const response = await fetch(`http://localhost:4000/blog/${slug}`);
        return (await response.json());
    }
);

export const addBlogComment = createAsyncThunk("addBlogComment", async (commentData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
        };
        const response = await axios.post(`http://localhost:4000/blog/comment`, commentData, config);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        // Get Blogs
        builder.addCase(getBlogs.pending, (state) => {
            state.loading = true;
        }).addCase(getBlogs.fulfilled, (state, action) => {
    state.loading = false;
    // API'den gelen objenin içindeki tüm ihtimalleri kontrol et
    state.blogs = action.payload.blogs || action.payload.data || action.payload;
    // Konsolda ne geldiğini burada da gör:
    console.log("Slice'a giren veri:", action.payload);
    });

        // Blog Detail
        builder.addCase(getBlogDetail.pending, (state) => {
            state.loading = true;
        }).addCase(getBlogDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.blog = action.payload.blog;
        });

        // Admin Blogs
        builder.addCase(getAdminBlogs.pending, (state) => {
            state.loading = true;
        }).addCase(getAdminBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.adminBlogs = action.payload.blogs || [];
        });

        // Add Blog
        builder.addCase(addAdminBlog.pending, (state) => {
            state.loading = true;
        }).addCase(addAdminBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            if (action.payload.blog) {
                state.adminBlogs = [action.payload.blog, ...state.adminBlogs];
            }
        });

        // Delete Blog
        builder.addCase(deleteAdminBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.adminBlogs = state.adminBlogs.filter(b => b._id !== action.payload.id);
            state.blogs = state.blogs.filter(b => b._id !== action.payload.id);
        });

        // Update Blog
        builder.addCase(updateAdminBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.blog = action.payload.blog;
        });
    },
});

export const { clearErrors, resetSuccess } = blogSlice.actions;
export default blogSlice.reducer;