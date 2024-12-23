// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../global.js";
import {jwtDecode} from 'jwt-decode';


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

// Async thunk for logging in a user   ${API}/api/users/login`
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
      localStorage.setItem("user", JSON.stringify(data));  // Store user data
      localStorage.setItem("token", data.token);  // Store token separately
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

export const fetchUserProfile = createAsyncThunk(
  "users/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return rejectWithValue("No token found");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;  // Get the userId from the token

      // Make the API call using the userId
      const response = await axios.get(`${API}/api/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token to authenticate
        },
      });

      return response.data;  // Return the profile data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for updating user profile  
export const updateUserProfile = createAsyncThunk(
  "users/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API}/api/users/profile/${userData.userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// Async thunk for fetching followers and following
export const fetchFollowersAndFollowing = createAsyncThunk(
  "user/fetchFollowersAndFollowing",
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.user?.token || localStorage.getItem("token"); // Fallback to localStorage

    if (!token) {
      return rejectWithValue("Token is missing");
    }

    try {
      const response = await axios.get(`${API}/api/users/followers-following`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




// Initial state
const initialState = {
  followerRequests: [],
  user: {
    userId: null,
      
  },
  profile: null,
  followers: [],  
  following: [],
  loading: false,
  error: null,
  successMessage : null,
  isEditingProfile: false,

};

// Redux slice
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {

  

    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },

    clearMessages(state) {
      state.error = null;
      state.successMessage = null;
    },

    Logout(state) {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token"); 
      state.successMessage = null;
    },

  

    updateProfile(state, action) {
      state.isEditingProfile = action.payload;
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
        const decodedToken = jwtDecode(action.payload.token);
        state.loading = false;
        state.user = {
          userId: decodedToken.userId,  // Extract and store userId
          email: decodedToken.email,   // Add additional fields if needed
        };
        state.successMessage = "Login successful!";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Login failed";
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.user = {
          ...state.user,
          userId: action.payload._id,  // Ensure userId is stored
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Merge updated user data into existing user object
        state.user = { ...state.user, ...action.payload }; 
        state.profile = { ...state.profile, ...action.payload };
        state.successMessage = "Profile updated successfully!";
        state.isEditingProfile = false;
        state.errorMessage = null; // Clear any previous error message
      })
       .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update profile";
      })
           // for fetching followers and following
      .addCase(fetchFollowersAndFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowersAndFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload.followers; // Store followers
        state.following = action.payload.following; // Store following
      })
      .addCase(fetchFollowersAndFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch followers/following";
      });
    
  },
});

export const { setUser, clearUser, Logout, updateProfile, clearMessages } = userSlice.actions;

export default userSlice.reducer;
