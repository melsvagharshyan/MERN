import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './Slices/authSlice';
import PostsSlice from './Slices/postsSlice';


export const store = configureStore({
  reducer: {
     auth: AuthSlice,
     posts: PostsSlice
  }
});
