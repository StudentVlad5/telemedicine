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

export const EightSectionAlergoCod = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);

  const [isCatheter, setIsCatheter] = useState<boolean>(false);
  const [isEkg, setIsEkg] = useState<boolean>(false);
  const [isTrachealIntubation, setIsTrachealIntubation] =
    useState<boolean>(false);
  const [isCardiopulmonaryResuscitation, setIsCardiopulmonaryResuscitation] =
    useState<boolean>(false);

  useEffect(() => {
    if (quizList) {
      setIsCatheter(quizList?.isCatheter === "true");
      setIsEkg(quizList?.isEkg === "true");
      setIsTrachealIntubation(quizList?.isTrachealIntubation === "true");
      setIsCardiopulmonaryResuscitation(
        quizList?.isCardiopulmonaryResuscitation === "true"
      );
    }
  }, [quizList]);

  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    addQuizAnswerThunk({
      params: {
        [id]: [checked],
      },
    });

    switch (id) {
      case "isCatheter":
        setIsCatheter(checked);
        break;
      case "isEkg":
        setIsEkg(checked);
        break;
      case "isTrachealIntubation":
        setIsTrachealIntubation(checked);
        break;
      case "isCardiopulmonaryResuscitation":
        setIsCardiopulmonaryResuscitation(checked);
        break;
      default:
        break;
    }
  };

  return (
    <div className={s.EightSection}>
      <Title>Раздел 7: Дополнительно</Title>

      <div className={s.whiteBox}>
        <CheckBox
          className={s.check}
          id="isCatheter"
          checked={isCatheter}
          onChange={handleChangeCheckBox}
        >
          Катетеризация периферической вены
        </CheckBox>
      </div>

      <div className={s.whiteBox}>
        <CheckBox
          className={s.check}
          id="isEkg"
          checked={isEkg}
          onChange={handleChangeCheckBox}
        >
          ЭКГ
        </CheckBox>
      </div>

      <div className={s.whiteBox}>
        <CheckBox
          className={s.check}
          id="isTrachealIntubation"
          checked={isTrachealIntubation}
          onChange={handleChangeCheckBox}
        >
          Трахеальная интубация
        </CheckBox>
      </div>

      <div className={s.whiteBox}>
        <CheckBox
          className={s.check}
          id="isCardiopulmonaryResuscitation"
          checked={isCardiopulmonaryResuscitation}
          onChange={handleChangeCheckBox}
        >
          Сердечно-лёгочная реанимация
        </CheckBox>
      </div>
    </div>
  );
};
