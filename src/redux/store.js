import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import categoryReducer from "./category/categorySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        category: categoryReducer,
    },
});

export default store;
