import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                credentials
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : { message: "Network error" }
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        status: "idle",
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;
                sessionStorage.setItem("token", action.payload.accessToken);
                sessionStorage.setItem("user", JSON.stringify(action.payload.result));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
