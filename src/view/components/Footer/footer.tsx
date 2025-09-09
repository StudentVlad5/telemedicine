import s from "./index.module.scss";
import { Button } from "../../ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useThunks } from "../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../store/thunks/quiz.thunks";
import { Modal } from "../../ui/Modal";
import { listOfPoints } from "../../../common/config";

export const Footer = () => {
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [maxPagesLen, setMaxPagesLen] = useState(5);
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { pointId, pageId } = useParams();

  useMemo(() => {
    if (pointId) {
      const maxLength = listOfPoints.find((it) => it.id === pointId);
      if (maxLength) setMaxPagesLen(maxLength.maxPage);
    }
  }, [pointId]);

  const onClickNextBtnHandler = () => {
    if (pageId) navigate(`/${pointId}/${+pageId + 1}`);
  };

  const onClickPrevBtnHandler = () => {
    if (pageId) navigate(`/${pointId}/${+pageId - 1}`);
  };

  const cleanLocalStorage = () => {
    localStorage.removeItem("application_number");
    localStorage.removeItem("id");
    localStorage.removeItem("start_time");
    localStorage.removeItem("start_time_auto");
    localStorage.removeItem("firstTime");
    localStorage.removeItem("pointOfCase");
    localStorage.removeItem("pointOfHospital");
    localStorage.removeItem("pointOfRouter");
    localStorage.removeItem("sex");
    // удаляем данные формы
    localStorage.removeItem("cars");
    localStorage.removeItem("form_id");
    // localStorage.removeItem("car");
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    // localStorage.removeItem("organization");
    localStorage.removeItem("organizations");
    localStorage.removeItem("travel_time");
    localStorage.removeItem("status");
    localStorage.removeItem("transmitted");
  };

  const onClickFinishBtnHandler = () => {
    addQuizAnswerThunk({
      params: {
        endTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
      },
    });
    cleanLocalStorage();
    setIsOpenModal(true);
  };

  const onClickSuccessButton = () => {
    navigate("/");
    setIsOpenModal(false);
  };

  const resetChecklist = () => {
    addQuizAnswerThunk({
      params: {
        anketaStatus: "canceled",
      },
    });
    cleanLocalStorage();
    navigate("/");
  };

  return (
    <footer className={s.Footer}>
      {pageId !== "1" ? (
        <Button onClick={onClickPrevBtnHandler} classname={s.prevBtn}>
          Назад
        </Button>
      ) : (
        <div className={s.emptyContainer}></div>
      )}
      <div className={s.page}>
        {pageId}/{maxPagesLen}
      </div>
      {Number(pageId) !== +maxPagesLen ? (
        <Button onClick={onClickNextBtnHandler} classname={s.nextBtn}>
          Дальше
        </Button>
      ) : (
        <>
          <Button classname={s.endBtn} onClick={onClickFinishBtnHandler}>
            Пациент передан
          </Button>

          <div className={s.btnBox}>
            <Button classname={s.resetCheckList} onClick={resetChecklist}>
              Аннулировать чек-лист
            </Button>
          </div>
        </>
      )}
      <Modal
        isVisible={isOpenModal}
        notClose={true}
        content={<p>Чек-лист успешно заполнен и отправлен</p>}
        footer={
          <button
            type="button"
            className={s.successBtn}
            onClick={onClickSuccessButton}
          >
            Ок
          </button>
        }
      />
    </footer>
  );
};
