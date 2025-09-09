import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useEffect, useState } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import {
  RadioButtonTrue,
  RadioButtonFalse,
} from "../../../ui/RadioButtonWithoutSpan";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const FourthSectionPregnance = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [startingDose, setStartingDose] = useState<string>(
    quizList?.startingDose ?? ""
  );
  const [maintenanceDose, setMaintenanceDose] = useState<string>(
    quizList?.maintenanceDose ?? ""
  );

  useEffect(() => {
    if (quizList) {
      setStartingDose(quizList?.startingDose ?? "");
      setMaintenanceDose(quizList?.maintenanceDose ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.FourthSection}>
      <Title>Раздел 4: Профилактика судорог</Title>

      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Стартовая доза: 5 г сухого вещества (20 мл 25% р-ра) в/в
                  медленно в течении 10-20 минут
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"1_1"}
                  value={"true"}
                  onChange={(str) => {
                    setStartingDose(str);
                    onBlurHandler("startingDose", str);
                  }}
                  name={"startingDose"}
                  currentValue={startingDose}
                />
                <RadioButtonFalse
                  id={"1_2"}
                  value={"false"}
                  onChange={(str) => {
                    setStartingDose(str);
                    onBlurHandler("startingDose", str);
                  }}
                  name={"startingDose"}
                  currentValue={startingDose}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Поддерживающая доза: 1-2 г в час сухого вещества сульфата
                  магния при помощи шприца-дозатора (со скоростью 4-8 мл/час).
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"2_1"}
                  value={"true"}
                  onChange={(str) => {
                    setMaintenanceDose(str);
                    onBlurHandler("maintenanceDose", str);
                  }}
                  name={"maintenanceDose"}
                  currentValue={maintenanceDose}
                />
                <RadioButtonFalse
                  id={"2_2"}
                  value={"false"}
                  onChange={(str) => {
                    setMaintenanceDose(str);
                    onBlurHandler("maintenanceDose", str);
                  }}
                  name={"maintenanceDose"}
                  currentValue={maintenanceDose}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
