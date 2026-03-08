import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { IUser } from "../types";

// 1. Define the Async Thunk
export const fetchPublicPortfolio = createAsyncThunk(
  "auth/fetchPublicPortfolio",
  async (username: string, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await axios.get(`https://my-portfolio-api-rvxz.onrender.com/api/portfolio/${username}`);
      
      const theme = res.data.config?.theme || 'emerald';
      document.documentElement.setAttribute('data-theme', theme);

      const state = getState() as { auth: AuthState };
      const token = state.auth.token || localStorage.getItem("token");

      if (token && state.auth.user) {
        // --- FIXED DISPATCH ---
        dispatch(setCredentials({ 
          user: {
            ...state.auth.user, // Preserve uid, email, displayName, etc.
            content: res.data.content,
            config: res.data.config
          }, 
          token: token 
        }));
      }

      return res.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "User not found");
    }
  }
);

// --- Async Thunk to Update Portfolio in MongoDB ---
export const updatePortfolioContent = createAsyncThunk(
  "auth/updatePortfolio",
  async (formData: Partial<IUser>, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      const response = await axios.put(
        "https://my-portfolio-api-rvxz.onrender.com/api/portfolio/update",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // This returns the 'updatedUser' from your controller
      return response.data.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Sync failed");
    }
  }
);

interface AuthState {
  user: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    username: string;
    content?: any; // You can use your IPortfolioContent type here
    config?: {
      theme: string;
      isDark: boolean;
    };
  } | null;
  publicPortfolio: any | null; // Data for the public profile view
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  publicPortfolio: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; token: string }>) => {
      const { user, token } = action.payload;
      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        username: user.email.split("@")[0],
        content: user.content, // Map MongoDB content if provided
        config: user.config,
      };
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.publicPortfolio = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
      localStorage.removeItem("token");
    },
  },
  // 2. Add extraReducers to handle the Thunk lifecycle
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicPortfolio.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPublicPortfolio.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.publicPortfolio = action.payload;
      })
      .addCase(fetchPublicPortfolio.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(updatePortfolioContent.pending, (state) => {
      state.status = "loading";
    })
    .addCase(updatePortfolioContent.fulfilled, (state, action) => {
      state.status = "succeeded";
      if (state.user) {
        // Sync the local user state with the fresh data from MongoDB
        state.user.content = action.payload.content;
        state.user.config = action.payload.config;
        state.user.username = action.payload.username;
      }
    })
    .addCase(updatePortfolioContent.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;