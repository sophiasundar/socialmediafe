import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../global";



// Thunk to fetch all posts
export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async (_, { rejectWithValue, getState }) => {
      const { user } = getState(); // Access user state for token
      const token = user?.token;
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
export const createPost = createAsyncThunk(
  'post/createPost',
  async (postData, { rejectWithValue, getState }) => {
    const token = getState().user.token || localStorage.getItem("token"); // Access token from Redux or fallback to localStorage
    
    if (!token) {
      return rejectWithValue({ message: 'Authorization token is missing' });
    }

    try {
      const response = await axios.post(`${API}/api/posts/new-post`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.post;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId, { rejectWithValue, getState }) => {
    const token = getState().user.token || localStorage.getItem("token");

    if (!token) {
      return rejectWithValue({ message: 'Authorization token is missing' });
    }

    try {
      await axios.delete(`${API}/api/posts/delete-post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return postId; // Return the ID of the deleted post
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const likePost = createAsyncThunk(
  'post/likePost',
  async (postId, { rejectWithValue, getState }) => {
    const token = getState().user?.token || localStorage.getItem("token"); // Fallback to localStorage
    if (!token) {
      return rejectWithValue({ message: "Authorization token is missing" });
    }
    try {
      const response = await axios.put(`${API}/api/posts/like/${postId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return { postId, likes: response.data.likes }; // Return the post ID and updated likes array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Thunk to add a comment to a post
export const commentOnPost = createAsyncThunk(
  'post/commentOnPost',
  async ({ postId, text }, { rejectWithValue, getState }) => {
    const token = getState().user.token || localStorage.getItem("token"); // Access token

    if (!token) {
      return rejectWithValue({ message: 'Authorization token is missing' });
    }

    try {
      const response = await axios.post(
        `${API}/api/posts/comment/${postId}`,
        { text }, // Send the comment text
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { postId, comments: response.data.comments }; // Return the updated comments
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);


export const getComments = createAsyncThunk(
  'post/getComments',
  async (postId, { rejectWithValue, getState }) => {
    const token = getState().user.token || localStorage.getItem("token"); // Access token

    if (!token) {
      return rejectWithValue({ message: 'Authorization token is missing' });
    }

    try {
      const response = await axios.get(`${API}/api/posts/comments/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.comments);
      return { postId, comments: response.data.comments }; // Return fetched comments
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);






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
      })
       // Delete Post Thunk
    .addCase(deletePost.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.status = 'succeeded'; // Reset status to succeeded
    })
    .addCase(deletePost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(likePost.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(likePost.fulfilled, (state, action) => {
      const { postId, likes } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);
      if (postIndex !== -1) {
        // Update the likes for the correct post
        state.posts[postIndex] = {
          ...state.posts[postIndex],
          likes,
        };
      }
      state.status = 'succeeded';
    })
    .addCase(likePost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(commentOnPost.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(commentOnPost.fulfilled, (state, action) => {
      const { postId, comments } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);
      if (postIndex !== -1) {
        // Update comments for the correct post
        state.posts[postIndex].comments = comments;
      }
      state.status = 'succeeded';
    })
    .addCase(commentOnPost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(getComments.pending, (state) => {
      state.status = 'loading'; // This sets the status to loading when we start fetching comments
    })
    .addCase(getComments.fulfilled, (state, action) => {
      const { postId, comments } = action.payload;
      const postIndex = state.posts.findIndex((post) => post._id === postId);
    
      if (postIndex !== -1) {
        // Replace existing comments with the fetched comments
        state.posts[postIndex].comments = comments;
      }
      state.status = 'succeeded'; // Set the status to succeeded after the comments are fetched
    })
    .addCase(getComments.rejected, (state, action) => {
      state.status = 'failed'; // Set the status to failed if fetching comments fails
      state.error = action.payload; // Capture the error message in case of failure
    });
    
  },
});

export default postSlice.reducer;
