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
  RadioButtonFalse,
  RadioButtonTrue,
} from "../../../ui/RadioButtonWithoutSpan";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const ThirdSectionAlergoCod = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [sign, setSign] = useState("");
  const [rash, setRash] = useState("");
  const [swelling, setswelling] = useState("");
  const [shortnessOfBreath, setShortnessOfBreath] = useState("");
  const [tachypnea, setTachypnea] = useState("");

  useEffect(() => {
    if (quizList) {
      quizList?.sign ? setSign(quizList?.sign) : setSign("");
      quizList?.rash ? setRash(quizList?.rash) : setRash("");
      quizList?.swelling ? setswelling(quizList?.swelling) : setswelling("");
      quizList?.shortnessOfBreath
        ? setShortnessOfBreath(quizList?.shortnessOfBreath)
        : setShortnessOfBreath("");
      quizList?.tachypnea
        ? setTachypnea(quizList?.tachypnea)
        : setTachypnea("");
    }
  }, [quizList]);

  return (
    <div className={s.ThirdSection}>
      <Title>Раздел 3: Соберите следующую информацию</Title>
      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Признак</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"1_1"}
                  value={"true"}
                  onChange={(str) => {
                    setSign(str);
                    onBlurHandler("sign", str);
                  }}
                  name={"sign"}
                  currentValue={sign}
                />
                <RadioButtonFalse
                  id={"1_2"}
                  value={"false"}
                  onChange={(str) => {
                    setSign(str);
                    onBlurHandler("sign", str);
                  }}
                  name={"sign"}
                  currentValue={sign}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Сыпь / крапивница</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"2_1"}
                  value={"true"}
                  onChange={(str) => {
                    setRash(str);
                    onBlurHandler("rash", str);
                  }}
                  name={"rash"}
                  currentValue={rash}
                />
                <RadioButtonFalse
                  id={"2_2"}
                  value={"false"}
                  onChange={(str) => {
                    setRash(str);
                    onBlurHandler("rash", str);
                  }}
                  name={"rash"}
                  currentValue={rash}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Отёк лица / языка / гортани</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"3_1"}
                  value={"true"}
                  onChange={(str) => {
                    setswelling(str);
                    onBlurHandler("swelling", str);
                  }}
                  name={"swelling"}
                  currentValue={swelling}
                />
                <RadioButtonFalse
                  id={"3_2"}
                  value={"false"}
                  onChange={(str) => {
                    setswelling(str);
                    onBlurHandler("swelling", str);
                  }}
                  name={"swelling"}
                  currentValue={swelling}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Затруднение дыхания, хрипы, стридор
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"4_1"}
                  value={"true"}
                  onChange={(str) => {
                    setShortnessOfBreath(str);
                    onBlurHandler("shortnessOfBreath", str);
                  }}
                  name={"shortnessOfBreath"}
                  currentValue={shortnessOfBreath}
                />
                <RadioButtonFalse
                  id={"4_2"}
                  value={"false"}
                  onChange={(str) => {
                    setShortnessOfBreath(str);
                    onBlurHandler("shortnessOfBreath", str);
                  }}
                  name={"shortnessOfBreath"}
                  currentValue={shortnessOfBreath}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Одышка, тахипноэ</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"5_1"}
                  value={"true"}
                  onChange={(str) => {
                    setTachypnea(str);
                    onBlurHandler("tachypnea", str);
                  }}
                  name={"tachypnea"}
                  currentValue={tachypnea}
                />
                <RadioButtonFalse
                  id={"5_2"}
                  value={"false"}
                  onChange={(str) => {
                    setTachypnea(str);
                    onBlurHandler("tachypnea", str);
                  }}
                  name={"tachypnea"}
                  currentValue={tachypnea}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
