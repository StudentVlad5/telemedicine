import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useEffect, useState } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { RadioButtonTrue } from "../../../ui/RadioButtonWithoutSpan";
import { InputTime } from "../../../ui/InputTime";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";
import { validate } from "../../../../common/helpers/validate";

export const SixthSectionCodeCardio = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [timeOfBuginOfSymptomsHh, setTimeOfBuginOfSymptomsHh] = useState("");
  const [timeOfBuginOfSymptomsMm, setTimeOfBuginOfSymptomsMm] = useState("");
  const [oxygen, setOxygen] = useState("");
  const [isVenousAccess, setIsVenousAccess] = useState("");

  useEffect(() => {
    if (quizList) {
      setTimeOfBuginOfSymptomsHh(quizList?.timeOfBuginOfSymptomsHh ?? "");
      setTimeOfBuginOfSymptomsMm(quizList?.timeOfBuginOfSymptomsMm ?? "");
      setOxygen(quizList?.oxygen ?? "");
      setIsVenousAccess(quizList?.isVenousAccess ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.SixthSection}>
      <Title>Раздел 6: Передача пациента</Title>

      <div className={s.field}>
        <span className={s.title}>Время начала симптомов</span>
        <div className={s.whiteBox}>
          <InputTime
            valueHh={timeOfBuginOfSymptomsHh}
            valueMm={timeOfBuginOfSymptomsMm}
            onChangeHh={(str) => setTimeOfBuginOfSymptomsHh(str)}
            onChangeMm={(str) => setTimeOfBuginOfSymptomsMm(str)}
            onBlurHh={() =>
              onBlurHandler(
                "timeOfBuginOfSymptomsHh",
                !timeOfBuginOfSymptomsHh
                  ? "00"
                  : timeOfBuginOfSymptomsHh.length === 1
                  ? `0${timeOfBuginOfSymptomsHh}`
                  : timeOfBuginOfSymptomsHh
              )
            }
            onBlurMm={() => {
              onBlurHandler(
                "timeOfBuginOfSymptomsMm",
                !timeOfBuginOfSymptomsMm
                  ? "00"
                  : timeOfBuginOfSymptomsMm.length === 1
                  ? `0${timeOfBuginOfSymptomsMm}`
                  : timeOfBuginOfSymptomsMm
              );
            }}
          />
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Кислород (если SatO₂ &lt; 90%)</span>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder={"_ _"}
            inputMode={"numeric"}
            value={oxygen}
            onChange={(e) => setOxygen(e.target.value)}
            onBlur={() => onBlurHandler("oxygen", oxygen)}
            onKeyPress={validate}
          />
          <div className={s.unit}>
            <span>%</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>
          Венозный доступ (в/в катетер установлен)
        </span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_1"
              value="true"
              onChange={(str) => {
                setIsVenousAccess(str);
                onBlurHandler("isVenousAccess", str);
              }}
              name="isVenousAccess"
              currentValue={isVenousAccess}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_2"
              value="false"
              onChange={(str) => {
                setIsVenousAccess(str);
                onBlurHandler("isVenousAccess", str);
              }}
              name="isVenousAccess"
              currentValue={isVenousAccess}
            />
            <span>нет</span>
          </div>
        </div>
      </div>
    </div>
  );
};
