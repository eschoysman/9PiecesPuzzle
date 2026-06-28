import {configureStore} from '@reduxjs/toolkit'

import counterReducer from '@/app/features/counter/counterSlice'
import puzzleSolutionReducer from '@/app/features/puzzle/puzzleSolutionSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    puzzleSolution: puzzleSolutionReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// https://react-redux.js.org/tutorials/quick-start
// https://medium.com/@msgold/understanding-redux-slices-in-react-with-typescript-building-a-weather-app-c3f519c88944