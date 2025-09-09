import s from "./index.module.scss";
import { Title } from "../../ui/Title";
import { CheckBox } from "../../ui/CheckBox";
import { InputTime } from "../../ui/InputTime";
import { useEffect, useState } from "react";
import { useAppSelector, useThunks } from "../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../store/thunks/quiz.thunks";
// import {useDebounce} from "../../../common/helpers/useDebounceHook";
import { QuizState } from "../../../store/reducers/quiz.reducer";
import { InputDate } from "../../ui/InputDate";
import { useOnBlurHandler } from "../../../common/helpers/useOnBlurHandler";

export const MethodologyFAST = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [saggingFace, setSaggingFace] = useState(false);
  const [handDisplacement, setHandDisplacement] = useState(false);
  const [speechDisorders, setSpeechDisorders] = useState(false);
  const [lossOfBalance, setLossOfBalance] = useState(false);
  const [visionProblems, setVisionProblems] = useState(false);

  const [firstSymptomsTimeHh, setFirstSymptomsTimeHh] = useState<string>("");
  const [firstSymptomsTimeMm, setFirstSymptomsTimeMm] = useState<string>("");
  const [firstSymptomsDate, setFirstSymptomsDate] = useState<string>("");
  const [firstSymptomsTime_unknown, setFirstSymptomsTime_unknown] =
    useState(false);
  const [firstSymptomsDate_unknown, setFirstSymptomsDate_unknown] =
    useState(false);

  const onChangeHandler = (e: any, setValue: any) => {
    setValue(e.target.checked);
  };

  useEffect(() => {
    quizList?.saggingFace
      ? setSaggingFace(JSON.parse(quizList?.saggingFace))
      : setSaggingFace(false);
    quizList?.handDisplacement
      ? setHandDisplacement(JSON.parse(quizList?.handDisplacement))
      : setHandDisplacement(false);
    quizList?.speechDisorders
      ? setSpeechDisorders(JSON.parse(quizList?.speechDisorders))
      : setSpeechDisorders(false);
    quizList?.lossOfBalance
      ? setLossOfBalance(JSON.parse(quizList?.lossOfBalance))
      : setLossOfBalance(false);
    quizList?.visionProblems
      ? setVisionProblems(JSON.parse(quizList?.visionProblems))
      : setVisionProblems(false);
    quizList?.firstSymptomsTimeHh
      ? setFirstSymptomsTimeHh(quizList?.firstSymptomsTimeHh)
      : setFirstSymptomsTimeHh("");
    quizList?.firstSymptomsTimeMm
      ? setFirstSymptomsTimeMm(quizList?.firstSymptomsTimeMm)
      : setFirstSymptomsTimeMm("");
    quizList?.firstSymptomsDate
      ? setFirstSymptomsDate(quizList?.firstSymptomsDate)
      : setFirstSymptomsDate("");
    quizList?.firstSymptomsTime_unknown
      ? setFirstSymptomsTime_unknown(
          JSON.parse(quizList?.firstSymptomsTime_unknown)
        )
      : setFirstSymptomsTime_unknown(false);
    quizList?.firstSymptomsDate_unknown
      ? setFirstSymptomsDate_unknown(
          JSON.parse(quizList?.firstSymptomsDate_unknown)
        )
      : setFirstSymptomsDate_unknown(false);
  }, [
    quizList?.firstSymptomsTimeHh,
    quizList?.firstSymptomsTimeMm,
    quizList?.firstSymptomsDate,
    quizList?.handDisplacement,
    quizList?.saggingFace,
    quizList?.speechDisorders,
    quizList?.lossOfBalance,
    quizList?.visionProblems,
    quizList?.firstSymptomsTime_unknown,
    quizList?.firstSymptomsDate_unknown,
  ]);

  return (
    <div className={s.MethodologyFAST}>
      <Title>Методика BE FAST</Title>
      <div className={s.inner}>
        <div className={s.checkBoxBlock}>
          <CheckBox
            id={"1"}
            checked={lossOfBalance}
            onChange={(e) => {
              onChangeHandler(e, setLossOfBalance);
              onBlurHandler("lossOfBalance", e.target.checked);
            }}
          >
            <span className={s.title}>
              Потеря равновесия (трудности с координацией)
            </span>
          </CheckBox>

          <CheckBox
            id={"2"}
            checked={visionProblems}
            onChange={(e) => {
              onChangeHandler(e, setVisionProblems);
              onBlurHandler("visionProblems", e.target.checked);
            }}
          >
            <span className={s.title}>
              Проблемы со зрением, двоение в глазах
            </span>
          </CheckBox>

          <CheckBox
            id={"3"}
            checked={saggingFace}
            onChange={(e) => {
              onChangeHandler(e, setSaggingFace);
              onBlurHandler("saggingFace", e.target.checked);
            }}
          >
            <span className={s.title}>Провисание на лице</span>
          </CheckBox>

          <CheckBox
            id={"4"}
            checked={handDisplacement}
            onChange={(e) => {
              onChangeHandler(e, setHandDisplacement);
              onBlurHandler("handDisplacement", e.target.checked);
            }}
          >
            <span className={s.title}>Смещение рук</span>
          </CheckBox>

          <CheckBox
            id={"5"}
            checked={speechDisorders}
            onChange={(e) => {
              onChangeHandler(e, setSpeechDisorders);
              onBlurHandler("speechDisorders", e.target.checked);
            }}
          >
            <span className={s.title}>Нарушения речи</span>
          </CheckBox>
        </div>
        <div className={s.timeBlock}>
          <InputTime
            title={"Введите дату и время появления первых симптомов"}
            placeholder="00"
            valueHh={firstSymptomsTimeHh}
            valueMm={firstSymptomsTimeMm}
            onChangeHh={(str) => setFirstSymptomsTimeHh(str)}
            onChangeMm={(str) => setFirstSymptomsTimeMm(str)}
            onBlurHh={() => {
              localStorage.setItem(
                "start_time",
                `${firstSymptomsTimeHh ?? "00"}:${firstSymptomsTimeMm ?? "00"}`
              );
              onBlurHandler(
                "firstSymptomsTimeHh",
                !firstSymptomsTimeHh
                  ? "00"
                  : firstSymptomsTimeHh.length === 1
                  ? `0${firstSymptomsTimeHh}`
                  : firstSymptomsTimeHh
              );
            }}
            onBlurMm={() => {
              localStorage.setItem(
                "start_time",
                `${firstSymptomsTimeHh ?? "00"}:${firstSymptomsTimeMm ?? "00"}`
              );
              onBlurHandler(
                "firstSymptomsTimeMm",
                !firstSymptomsTimeMm
                  ? "00"
                  : firstSymptomsTimeMm.length === 1
                  ? `0${firstSymptomsTimeMm}`
                  : firstSymptomsTimeMm
              );
            }}
          />

          <InputDate
            valueDate={firstSymptomsDate}
            max={new Date().toISOString().split("T")[0]}
            onChangeDate={(e) => setFirstSymptomsDate(e.target.value)}
            onBlur={() => {
              onBlurHandler("firstSymptomsDate", firstSymptomsDate ?? "");
              onBlurHandler("firstSymptomsDate_unknown", false);
            }}
          />
        </div>

        <div className={s.unknownBox}>
          <CheckBox
            id={"6"}
            checked={firstSymptomsTime_unknown}
            onChange={(e) => {
              onChangeHandler(e, setFirstSymptomsTime_unknown);
              onBlurHandler("firstSymptomsTime_unknown", e.target.checked);
            }}
          >
            <span className={s.title}>время не известно</span>
          </CheckBox>

          <CheckBox
            id={"7"}
            checked={firstSymptomsDate_unknown}
            onChange={(e) => {
              onChangeHandler(e, setFirstSymptomsDate_unknown);
              onBlurHandler("firstSymptomsDate_unknown", e.target.checked);
            }}
          >
            <span className={s.title}>дата не известна</span>
          </CheckBox>
        </div>
      </div>
    </div>
  );
};
