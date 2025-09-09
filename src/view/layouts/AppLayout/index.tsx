import s from "./index.module.scss";

import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer/footer";
import { useAppSelector, useThunks } from "../../../common/helpers/reduxHook";
import { QuizState } from "../../../store/reducers/quiz.reducer";
import Skeleton from "../../ui/Skeleton";
import { useEffect } from "react";
import { QuizThunks } from "../../../store/thunks/quiz.thunks";

export const AppLayout = () => {
  const location = useLocation();
  const { getQuizListThunk } = useThunks(QuizThunks);
  const { quizIsLoading } = useAppSelector(QuizState);

  useEffect(() => {
    getQuizListThunk();
  }, []);

  return (
    <div className={s.App}>
      {quizIsLoading && <Skeleton />}
      <Header />
      <Outlet />
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};
