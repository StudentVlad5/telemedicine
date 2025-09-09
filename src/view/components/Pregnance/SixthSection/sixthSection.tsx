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

export const SixthSectionPregnance = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);

  const [movementFetus, setMovementFetus] = useState<boolean>(false);

  useEffect(() => {
    quizList?.movementFetus
      ? setMovementFetus(
          quizList?.movementFetus === "true"
            ? true
            : quizList?.movementFetus === "true"
            ? false
            : false
        )
      : setMovementFetus(false);
  }, [quizList?.movementFetus]);

  function handleChangeCheckBox(e: any) {
    addQuizAnswerThunk({
      params: {
        [e.target.id]: [e.target.checked],
      },
    });
    switch (e.target.id) {
      case "movementFetus":
        setMovementFetus(e.target.checked);
        break;
      default:
        break;
    }
  }
  return (
    <div className={s.FifthSection}>
      <Title>Раздел 6: Оценка состояния плода</Title>

      <div className={s.whiteBox}>
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id={"movementFetus"}
            checked={movementFetus}
            onChange={(e) => handleChangeCheckBox(e)}
          >
            Шевеление плода
          </CheckBox>
        </div>
      </div>
    </div>
  );
};
