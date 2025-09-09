import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useState, useEffect } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { RadioButton } from "../../../ui/RadioButton";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const SecondSectionPregnance = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [paritet, setParitet] = useState<string>("");
  const [application, setApplication] = useState<string>("");

  useEffect(() => {
    quizList?.paritet ? setParitet(quizList?.paritet) : setParitet("");

    quizList?.application
      ? setApplication(quizList?.application)
      : setApplication("");
  }, [quizList?.application, quizList?.paritet]);

  return (
    <div className={s.SecondSection}>
      <Title>Раздел 2: Паритет</Title>
      <div className={s.field}>
        <span className={s.title}>Вид беременности</span>
        <div className={s.inputWrapper}>
          <RadioButton
            id={"paritet_1"}
            value={"Первобеременная"}
            onChange={(str) => {
              setParitet(str);
              onBlurHandler("paritet", str);
            }}
            name={"paritet"}
            currentValue={paritet}
          />
          <RadioButton
            id={"paritet_2"}
            value={"Повторнобеременная"}
            onChange={(str) => {
              setParitet(str);
              onBlurHandler("paritet", str);
            }}
            name={"paritet"}
            currentValue={paritet}
          />
        </div>
      </div>
      <div className={s.field}>
        <span className={s.title}>Обращение</span>
        <div className={s.inputWrapper}>
          <RadioButton
            id={"application_1"}
            value={"Первичное"}
            onChange={(str) => {
              setApplication(str);
              onBlurHandler("application", str);
            }}
            name={"application"}
            currentValue={application}
          />
          <RadioButton
            id={"application_2"}
            value={"Повторное"}
            onChange={(str) => {
              setApplication(str);
              onBlurHandler("application", str);
            }}
            name={"application"}
            currentValue={application}
          />
        </div>
      </div>
    </div>
  );
};
