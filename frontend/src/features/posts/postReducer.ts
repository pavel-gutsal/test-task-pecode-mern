import axios from "axios";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postService } from '../../servicies/post.servicies';
import { IPost, IFormData} from '../../types';

type InitialState = {
  posts: IPost[];
  download:'idle' | 'failed' | 'pending' | 'fullfilled';
  posting: 'idle' | 'failed' | 'pending' | 'fullfilled';
  errorDownload: string | null;
  errorPost: string | null;
};

const initialState: InitialState = {
  posts: [],
  download:'idle',
  posting: 'idle',
  errorDownload: null,
  errorPost: null,
};

export const createPostThunk = createAsyncThunk(
  'posts/createTodoThunk', 
  async (data: IFormData, thunkAPI) => {
    try {
      return await postService.createTodo(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (
          err.response
          && err.response.data
          && err.response.data.error
        ) {
          return thunkAPI.rejectWithValue(err.response.data.error);
        } else {
          return thunkAPI.rejectWithValue(err.message);
        }
      }
    }
});

export const downloadPostsThunk = createAsyncThunk(
  'posts/downloadPostsThunk',
  async (_, thunkAPI) => {
  try {
    return await postService.download();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (
        err.response
        && err.response.data
        && err.response.data.error
      ) {
        return thunkAPI.rejectWithValue(err.response.data.error);
      } else {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
});


const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    sortPosts: (state) => {
      state.posts.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createPostThunk.pending, (state) => {
        state.errorPost = null;
        state.posting = 'pending';
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        state.posting = 'fullfilled';
        state.errorPost = null;
        if ( state.posts && state.posts.length > 0 ) {
          state.posts = [ ...state.posts, action.payload ];
        } else {
          state.posts = action.payload;
        }

      })
      .addCase(createPostThunk.rejected, (state, action ) => {
        if (typeof action.payload === 'string') {
          state.errorPost = action.payload;
        }else {
          state.errorPost = 'error';
        }
        state.posting = 'failed';
      })

      .addCase(downloadPostsThunk.pending, (state) => {
        state.errorDownload = null;
        state.download = 'pending';
      })
      .addCase(downloadPostsThunk.fulfilled, (state, action) => {
        state.download = 'fullfilled';
        state.errorDownload = null;
        state.posts = [ ...action.payload ];
      })
      .addCase(downloadPostsThunk.rejected, (state, action ) => {
        if (typeof action.payload === 'string') {
          state.errorDownload = action.payload;
        }else {
          state.errorDownload = 'error';
        }
        state.download = 'failed';
      })
  }},
);

export const { sortPosts } = postSlice.actions;

export default postSlice.reducer;