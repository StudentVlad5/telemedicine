import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import { QuizReducer } from './reducers/quiz.reducer';

const middleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
});

const rootReducer = combineReducers({
    QuizReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
