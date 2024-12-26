import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../global";


// Thunk to fetch all posts
export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async (_, { rejectWithValue, getState }) => {
      const { user } = getState(); // Access user state for token
      const token = user?.token; // Replace with your token path
      console.log("Token in Redux: ", token);
      try {
        const response = await axios.get(`${API}/api/posts/getall-posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.posts;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || { message: error.message }
        );
      }
    }
  );
  
// Thunk to create a new post
export const createPost = createAsyncThunk('post/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API}/api/posts/new-post`, postData); // Adjust to your API endpoint
    return response.data.post; // Assuming response contains the created post
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  posts: [],
  status: 'idle', // 'loading', 'succeeded', 'failed'
  error: null,
};

// Post slice definition
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload); // Add the new post to the posts array
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
