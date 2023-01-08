import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../api";



export const login = createAsyncThunk(
    "users/login",
    async ({ formData, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/users/login", formData);
            toast.success("Successfully logged");
            navigate("/");
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

export const register = createAsyncThunk(
    "users/register",
    async ({ formData, navigate }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/users/register", formData);
            toast.success("Successfully registered");
            navigate("/signin");
            return data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        };
    }
);


const initialState = {
    user: "",
    token: null,
    error: null,
    loading: false
};


const AuthSlice = createSlice({
    name: "auth/slice",
    initialState,
    reducers: {
        setLogout(state) {
            localStorage.removeItem("user");
            state.token = null;
            state.user = "";
        },
        setUser(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false;
            })

            // ----- Login -----

            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false;
            })

    }
});

export const { setLogout, setUser, clearError } = AuthSlice.actions;
export default AuthSlice.reducer;