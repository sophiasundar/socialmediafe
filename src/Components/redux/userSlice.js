

// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../global.js";

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    console.log("User Data:", userData);

    try {
      const response = await axios.post(`${API}/api/users/register`, userData, {
       
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      // Handle errors properly
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    }
  }
);

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/api/users/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    }
  }
);

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  successMessage : null,
};

// Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },

    Logout(state) {
      state.user = null;
      localStorage.removeItem("user");
      state.successMessage = null;
    },

  

    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = "User registered successfully";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Registration failed";
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // store the user and token
        state.successMessage = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed";
      });
     
    
  },
});

export const { Logout, updateProfile, clearMessages } = userSlice.actions;
export default userSlice.reducer;
