import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    username: string;
    content?: {
      name: string;
      role: string;
      experience: string;
      techStack: [];
      jobs: [];
      projects: [];
      education: [];
    };
    config?: {
    theme: string;
    isDark: boolean;
  }
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: any; token: string }>,
    ) => {
      const { user, token } = action.payload;
      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        username: user.email.split("@")[0], // Deriving username for the SaaS URL
      };
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
