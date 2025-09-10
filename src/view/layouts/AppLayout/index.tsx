import s from "./index.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer/footer";
import Skeleton from "../../ui/Skeleton";
import { useAppContext } from "../../../common/helpers/AppContext";

export const AppLayout = () => {
  const location = useLocation();
  // const { getQuizListThunk } = useThunks(QuizThunks);
  // const { quizIsLoading } = useAppSelector(QuizState);

  // useEffect(() => {
  //   getQuizListThunk();
  // }, []);
  const { isLoading } = useAppContext();

  return (
    <div className={s.App}>
      {isLoading && <Skeleton />}
      <Header />
      <Outlet />
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};
