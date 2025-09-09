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
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const FourthSectionCodeCardio = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [isECCarriedOut, setIsECCarriedOut] = useState("");
  const [isElevation, setIsElevation] = useState("");
  const [isDepression, setIsDepression] = useState("");
  const [isFibrillation, setIsFibrillation] = useState("");

  useEffect(() => {
    if (quizList) {
      setIsECCarriedOut(quizList?.isECCarriedOut ?? "");
      setIsElevation(quizList?.isElevation ?? "");
      setIsDepression(quizList?.isDepression ?? "");
      setIsFibrillation(quizList?.isFibrillation ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.FourthSection}>
      <Title>Раздел 4: ЭКГ (до 10 минут от контакта!)</Title>

      <div className={s.field}>
        <span className={s.title}>Проведена ЭКГ (12 отведений)</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_1"
              value="true"
              onChange={(str) => {
                setIsECCarriedOut(str);
                onBlurHandler("isECCarriedOut", str);
              }}
              name="isECCarriedOut"
              currentValue={isECCarriedOut}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_2"
              value="false"
              onChange={(str) => {
                setIsECCarriedOut(str);
                onBlurHandler("isECCarriedOut", str);
              }}
              name="isECCarriedOut"
              currentValue={isECCarriedOut}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Есть элевация ST ≥ 1 мм</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="2_1"
              value="true"
              onChange={(str) => {
                setIsElevation(str);
                onBlurHandler("isElevation", str);
              }}
              name="isElevation"
              currentValue={isElevation}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="2_2"
              value="false"
              onChange={(str) => {
                setIsElevation(str);
                onBlurHandler("isElevation", str);
              }}
              name="isElevation"
              currentValue={isElevation}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Есть депрессия ST, инверсия T</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_1"
              value="true"
              onChange={(str) => {
                setIsDepression(str);
                onBlurHandler("isDepression", str);
              }}
              name="isDepression"
              currentValue={isDepression}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_2"
              value="false"
              onChange={(str) => {
                setIsDepression(str);
                onBlurHandler("isDepression", str);
              }}
              name="isDepression"
              currentValue={isDepression}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Есть депрессия ST, инверсия T</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_1"
              value="true"
              onChange={(str) => {
                setIsFibrillation(str);
                onBlurHandler("isFibrillation", str);
              }}
              name="isFibrillation"
              currentValue={isFibrillation}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_2"
              value="false"
              onChange={(str) => {
                setIsFibrillation(str);
                onBlurHandler("isFibrillation", str);
              }}
              name="isFibrillation"
              currentValue={isFibrillation}
            />
            <span>нет</span>
          </div>
        </div>
      </div>
    </div>
  );
};
