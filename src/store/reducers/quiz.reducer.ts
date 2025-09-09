import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../ReduxStore";

interface stateType {
    quizList: any,
    quizIsLoading: boolean
}

const initialState: stateType = {
    quizList: null,
    quizIsLoading: false
}
export const slice = createSlice({
    name: 'QuizReducer',
    initialState,
    reducers: {
        setQuizListAction: (state, action: PayloadAction<any>) : void  => {
            state.quizList = action.payload
        },
        setQuizIsLoadingAction: (state, action: PayloadAction<boolean>) : void  => {
            state.quizIsLoading = action.payload
        }
    }
})

export const QuizReducer = slice.reducer
export const QuizActions = slice.actions
export const QuizState = (state: RootState) => state.QuizReducer
