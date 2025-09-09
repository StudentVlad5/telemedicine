import { useEffect, useMemo, useState } from "react";
import { Button } from "../../ui/Button";
import { useAppSelector, useThunks } from "../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../store/reducers/quiz.reducer";
import Skeleton from "../../ui/Skeleton";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../ui/Modal";
import classNames from "classnames";
import ListOfPoints from "../../components/ListOfCases/listOfPoints";
import ListOfHospitals from "../../components/ListOfCases/listOfHospitals";
import Identification from "../../components/ListOfCases/identification";
import s from "./index.module.scss";

export const StartPage = () => {
  const navigate = useNavigate();
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizIsLoading } = useAppSelector(QuizState);
  const [containerColor, setContainerColor] = useState("#fff");
  const [number, setNumber] = useState<string>("");
  const [employeeID, setEmployeeID] = useState<string>("");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [isOpenClue, setIsOpenClue] = useState<boolean>(false);
  const [isOpenClue2, setIsOpenClue2] = useState<boolean>(false);
  const [invalidMessage, setInvalidMessage] = useState("");
  const [pointOfRouter, setPointOfRouter] = useState(""); // указать роутер для маршрутизации
  const [pointOfCase, setPointOfCase] = useState(""); // причина вызова
  const [pointOfHospital, setPointOfHospital] = useState(
    "Актюбинская областная многопрофильная больница"
  ); // выбранная больница

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useMemo(() => {
    if (employeeID && employeeID.length !== 5)
      setInvalidMessage("Введите 5 символов");
    else setInvalidMessage("");
  }, [employeeID]);

  const onSubmitFormHandler = async () => {
    localStorage.setItem("id", Date.now().toString());
    localStorage.setItem("application_number", number);
    localStorage.setItem("pointOfCase", pointOfCase);
    localStorage.setItem("pointOfHospital", pointOfHospital);
    localStorage.setItem("pointOfRouter", pointOfRouter);
    const startTimeAutoHh = new Date().getHours();
    const startTimeAutoMm = new Date().getMinutes();
    localStorage.setItem("firstTime", Date.now().toString());
    localStorage.setItem(
      "start_time_auto",
      `${startTimeAutoHh}:${startTimeAutoMm}`
    );
    addQuizAnswerThunk({
      params: {
        employeeID,
        startTimeAutoHh,
        startTimeAutoMm,
        pointOfCase,
        pointOfHospital,
        pointOfRouter,
      },
    });
    navigate(`/${pointOfRouter}/1`);
  };

  return (
    <div className={s.StartPage}>
      {quizIsLoading && <Skeleton />}
      <div
        className={classNames(
          s.pointsContainer,
          `color${containerColor.slice(1)}`
        )}
      >
        <ListOfPoints
          setContainerColor={setContainerColor}
          pointOfCase={pointOfCase}
          setPointOfCase={setPointOfCase}
          setPointOfRouter={setPointOfRouter}
        />
        <Identification
          setNumber={setNumber}
          number={number}
          employeeID={employeeID}
          setEmployeeID={setEmployeeID}
          setIsOpenClue={setIsOpenClue}
          setIsOpenClue2={setIsOpenClue2}
          setEmployeeName={setEmployeeName}
          invalidMessage={invalidMessage}
        />
      </div>
      <p className={s.employeeName}>{employeeName}</p>
      <ListOfHospitals
        setPointOfHospital={setPointOfHospital}
        pointOfHospital={pointOfHospital}
      />
      <Button
        disabled={
          !number ||
          quizIsLoading ||
          !!invalidMessage ||
          !employeeID ||
          !pointOfHospital ||
          !pointOfCase
        }
        onClick={onSubmitFormHandler}
      >
        Заполнить новый чек-лист
      </Button>
      <Modal
        isVisible={isOpenClue}
        onClose={() => setIsOpenClue(false)}
        content={<p>Введите № бригады. Например, "15"</p>}
      />
      <Modal
        isVisible={isOpenClue2}
        onClose={() => setIsOpenClue2(false)}
        content={<p>Введите идентификатор сотрудника. Например, "12345"</p>}
      />
    </div>
  );
};
