import { configureStore } from '@reduxjs/toolkit';
import todoreducer from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoreducer, // ✅ must be in an object
  },
  devTools: import.meta.env.MODE === 'development', // ✅ avoid CSP eval in production
});
