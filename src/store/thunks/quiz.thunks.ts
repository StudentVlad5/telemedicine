import { AppDispatch, RootState } from "../ReduxStore";
import {QuizActions} from "../reducers/quiz.reducer";
import {baseUrl} from "../../common/config";

export const QuizThunks = {
    getQuizListThunk: () => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            dispatch(QuizActions.setQuizIsLoadingAction(true))

            // @ts-ignore
            const urlParams = new URLSearchParams({
                identifier: localStorage.getItem('id'),
                application_number: localStorage.getItem('application_number'),
            }).toString()

            const response = await fetch(`${baseUrl}/read?${urlParams}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const res = await response.json();
            dispatch(QuizActions.setQuizListAction(res.normal))

        } catch (e) {
            console.log(e)
        } finally {
            dispatch(QuizActions.setQuizIsLoadingAction(false))
        }
    },
    addQuizAnswerThunk: ({ params } : { params: any }) => async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
        try {
            // dispatch(QuizActions.setQuizIsLoadingAction(true))

            // @ts-ignore
            const urlParams = new URLSearchParams({
                identifier: localStorage.getItem('id'),
                application_number: localStorage.getItem('application_number'),
                ...params
            }).toString()

            const response = await fetch(`${baseUrl}/edit?${urlParams}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const res = await response.json();
            dispatch(QuizActions.setQuizListAction(res.normal))
        } catch (e) {
            console.log(e)
        } finally {
            // dispatch(QuizActions.setQuizIsLoadingAction(false))
        }
    }
}
