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

export const FourthSectionAlergoCod = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [painInTheStomach, setPainInTheStomach] = useState("");
  const [pressureReduction, setPressureReduction] = useState("");
  const [passOff, setPassOff] = useState("");
  const [convulsions, setConvulsions] = useState("");
  const [cyanosis, setCyanosis] = useState("");

  useEffect(() => {
    if (quizList) {
      quizList?.painInTheStomach
        ? setPainInTheStomach(quizList?.painInTheStomach)
        : setPainInTheStomach("");
      quizList?.pressureReduction
        ? setPressureReduction(quizList?.pressureReduction)
        : setPressureReduction("");
      quizList?.passOff ? setPassOff(quizList?.passOff) : setPassOff("");
      quizList?.convulsions
        ? setConvulsions(quizList?.convulsions)
        : setConvulsions("");
      quizList?.cyanosis ? setCyanosis(quizList?.cyanosis) : setCyanosis("");
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
                <span className={s.title}>Тошнота / рвота / боль в животе</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"1_1"}
                  value={"true"}
                  onChange={(str) => {
                    setPainInTheStomach(str);
                    onBlurHandler("painInTheStomach", str);
                  }}
                  name={"painInTheStomach"}
                  currentValue={painInTheStomach}
                />
                <RadioButtonFalse
                  id={"1_2"}
                  value={"false"}
                  onChange={(str) => {
                    setPainInTheStomach(str);
                    onBlurHandler("painInTheStomach", str);
                  }}
                  name={"painInTheStomach"}
                  currentValue={painInTheStomach}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Снижение давления / обморок</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"2_1"}
                  value={"true"}
                  onChange={(str) => {
                    setPressureReduction(str);
                    onBlurHandler("pressureReduction", str);
                  }}
                  name={"pressureReduction"}
                  currentValue={pressureReduction}
                />
                <RadioButtonFalse
                  id={"2_2"}
                  value={"false"}
                  onChange={(str) => {
                    setPressureReduction(str);
                    onBlurHandler("pressureReduction", str);
                  }}
                  name={"pressureReduction"}
                  currentValue={pressureReduction}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Потеря сознания</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"3_1"}
                  value={"true"}
                  onChange={(str) => {
                    setPassOff(str);
                    onBlurHandler("passOff", str);
                  }}
                  name={"passOff"}
                  currentValue={passOff}
                />
                <RadioButtonFalse
                  id={"3_2"}
                  value={"false"}
                  onChange={(str) => {
                    setPassOff(str);
                    onBlurHandler("passOff", str);
                  }}
                  name={"passOff"}
                  currentValue={passOff}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Судороги</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"4_1"}
                  value={"true"}
                  onChange={(str) => {
                    setConvulsions(str);
                    onBlurHandler("convulsions", str);
                  }}
                  name={"convulsions"}
                  currentValue={convulsions}
                />
                <RadioButtonFalse
                  id={"4_2"}
                  value={"false"}
                  onChange={(str) => {
                    setConvulsions(str);
                    onBlurHandler("convulsions", str);
                  }}
                  name={"convulsions"}
                  currentValue={convulsions}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Цианоз (губ, конечностей)</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"5_1"}
                  value={"true"}
                  onChange={(str) => {
                    setCyanosis(str);
                    onBlurHandler("cyanosis", str);
                  }}
                  name={"cyanosis"}
                  currentValue={cyanosis}
                />
                <RadioButtonFalse
                  id={"5_2"}
                  value={"false"}
                  onChange={(str) => {
                    setCyanosis(str);
                    onBlurHandler("cyanosis", str);
                  }}
                  name={"cyanosis"}
                  currentValue={cyanosis}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
