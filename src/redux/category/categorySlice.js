import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/categories`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (newCategory, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/categories`,
                newCategory,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async ({ id, kategoryName }, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/categories/${id}`,
                { kategoryName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.result;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });

        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categories = [...state.categories, action.payload.result];
            toast.success(action.payload.message);
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(updateCategory.fulfilled, (state, action) => {
            const { id, kategoryName } = action.payload;
            const categoryIndex = state.categories.findIndex((cat) => cat.id === id);
            if (categoryIndex !== -1) {
                state.categories[categoryIndex].kategoryName = kategoryName;
            }
            toast.success(action.payload.message);
        });
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter(
                (cat) => cat.id !== action.payload
            );
            if (state.categories.length === 0) {
                state.categories = [];
            }
            toast.success(action.payload.message);
        });
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.error = action.payload.message;
            toast.error(action.payload.message);
        });
    },
});

export default categorySlice.reducer;
