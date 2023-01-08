import axios from '../api';
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const createPost = createAsyncThunk(
    "create/post",
    async ({ postData, navigate }, { rejectWithValue }) => {
        try {
            await axios.post("/api/posts", postData);;
            toast("Post added successfully");
            navigate("/");
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getPosts = createAsyncThunk(
    "get/posts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/posts");
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const getSinglePost = createAsyncThunk(
    "get/single/post",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/posts/single/${id}`);
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
)

export const getUserPosts = createAsyncThunk(
    "get/user/posts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/posts/user");
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);


export const deletePost = createAsyncThunk(
    "delete/post",
    async ({ id }, { dispatch }) => {
        try {
            const { data } = await axios.delete(`/api/posts/remove/${id}`);
            dispatch(getUserPosts());
            toast.success(data.message);

        } catch (err) {
            toast.error(err.response.data.message);
        }

    }
);

export const updatePost = createAsyncThunk(
    "update/post",
    async ({ id, updateData, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/posts/update/${id}`, updateData);
            toast.success(data.message);
            navigate('/posts');
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);


const initialState = {
    post: null,
    posts: [],
    userPosts: [],
    error: null,
    loading: null
};


const PostsSlice = createSlice({
    name: "posts/slice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // ----- get all posts -----

            .addCase(getPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // ----- get user posts -----

            .addCase(getUserPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.userPosts = action.payload;
                state.loading = false;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // ----- get single post -----

            .addCase(getSinglePost.fulfilled, (state, action) => {
                state.post = action.payload;
            })
            .addCase(getSinglePost.rejected, (state, action) => {
                state.error = action.payload;
            })

            // ----- delete user post -----

            .addCase(deletePost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
            })

            // ----- update user post -----

            .addCase(updatePost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;
            })
    }
})

export default PostsSlice.reducer;