import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, getMe } from "../../services/auth.api";
import { getToken, saveToken, clearToken } from "../../utils/auth";

export const loginAsync = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await loginUser(credentials);
            saveToken(res.data.token);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

export const registerAsync = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const res = await registerUser(data);
            saveToken(res.data.token);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
);

export const getMeAsync = createAsyncThunk(
    "auth/getMe",
    async (_, { rejectWithValue }) => {
        const token = getToken();
        if (!token) {
            return rejectWithValue({ message: "No token", invalidSession: true });
        }

        try {
            const res = await getMe();
            return res.data;
        } catch (err) {
            const invalidSession = [401, 403].includes(err.response?.status);
            if (invalidSession) clearToken();
            return rejectWithValue({
                message: err.response?.data?.message || "Failed to load user",
                invalidSession,
            });
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: getToken() || null,
        loading: false,
        error: null,
        isAuthenticated: false,
        sessionChecked: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.sessionChecked = true;
            clearToken();
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.sessionChecked = true;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // Login
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.sessionChecked = true;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // GetMe
            .addCase(getMeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.sessionChecked = true;
            })
            .addCase(getMeAsync.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                if (action.payload?.invalidSession) {
                    state.token = null;
                }
                state.isAuthenticated = false;
                state.sessionChecked = true;
                state.error = action.payload?.message || "Failed to load user";
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
