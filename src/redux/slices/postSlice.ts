import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios';

interface Post {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

interface PostsState {
  posts: Post[];
  filteredPosts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'rejected';
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  filteredPosts: [],
  status: 'idle',
  error: null,
};

interface PostData {
  name: string;
  description: string;
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axiosInstance.get(`/posts`);
  return response.data;
});

export const addPost = createAsyncThunk('posts/addPost', async (postData: PostData, _) => {
  const response = await axiosInstance.post(`/posts`, postData)

  return response.data;
})

export const deletePost = createAsyncThunk('posts/delete', async (postId: number) => {
  const response = await axiosInstance.delete(`/posts/${postId}`)

  return response.data;
})

export const filterPostsByName = createAsyncThunk('posts/filter', async (name: string) => {
  return name
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.posts = action.payload;
        state.filteredPosts = state.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
        state.filteredPosts = state.posts;
        state.status = "succeeded"
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message || 'Failed to add post';
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const indexPost = state.posts.findIndex(item => item.id === action.payload.id)

        if (indexPost !== -1) {
          state.posts.splice(indexPost, 1)
          state.filteredPosts = state.posts;
        }

        state.status = 'succeeded'
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete post';
        state.status = 'failed'
      })
      .addCase(filterPostsByName.fulfilled, (state, action: PayloadAction<string>) => {
        if (action.payload.length !== 0) {
          const filteredPosts = state.posts.filter(item => item.name === action.payload)
          state.filteredPosts = filteredPosts
        } else {
          state.filteredPosts = state.posts
        }
      })
  },
});

export default postsSlice.reducer;
