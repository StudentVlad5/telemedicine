import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useEffect, useState } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { CheckBox } from "../../../ui/CheckBox";

export const FifthSectionPregnance = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);

  const [firstNifedipineInjection, setFirstNifedipineInjection] =
    useState<boolean>(false);
  const [secondNifedipineInjection, setSecondNifedipineInjection] =
    useState<boolean>(false);

  useEffect(() => {
    quizList?.firstNifedipineInjection
      ? setFirstNifedipineInjection(
          quizList?.firstNifedipineInjection === "true"
            ? true
            : quizList?.firstNifedipineInjection === "true"
            ? false
            : false
        )
      : setFirstNifedipineInjection(false);

    quizList?.secondNifedipineInjection
      ? setSecondNifedipineInjection(
          quizList?.secondNifedipineInjection === "true"
            ? true
            : quizList?.secondNifedipineInjection === "true"
            ? false
            : false
        )
      : setSecondNifedipineInjection(false);
  }, [quizList?.firstNifedipineInjection, quizList?.secondNifedipineInjection]);

  function handleChangeCheckBox(e: any) {
    addQuizAnswerThunk({
      params: {
        [e.target.id]: [e.target.checked],
      },
    });
    switch (e.target.id) {
      case "firstNifedipineInjection":
        setFirstNifedipineInjection(e.target.checked);
        break;
      case "secondNifedipineInjection":
        setSecondNifedipineInjection(e.target.checked);
        break;
      default:
        break;
    }
  }

  return (
    <div className={s.FifthSection}>
      <Title>Раздел 5: Гипотензивное лечение</Title>

      <div className={s.whiteBox}>
        <span className={s.title}>
          Если АД ≥160/110 мм рт.ст- нифедипин 10 мг каждые 20 минут
        </span>
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id={"firstNifedipineInjection"}
            checked={firstNifedipineInjection}
            onChange={(e) => handleChangeCheckBox(e)}
          >
            нифедипин 10 мг - первая инъекция
          </CheckBox>
          <CheckBox
            className={s.check}
            id={"secondNifedipineInjection"}
            checked={secondNifedipineInjection}
            onChange={(e) => handleChangeCheckBox(e)}
          >
            нифедипин 10 мг - вторая инъекция
          </CheckBox>
        </div>
      </div>
    </div>
  );
};
