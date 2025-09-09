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
import { InputText } from "../../../ui/InputText";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";
import { validate } from "../../../../common/helpers/validate";

export const ThirdSectionPolyOfTrauma = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [symptomOfPaleSpot, setSymptomOfPaleSpot] = useState<any>();
  const [localizationOfWound, setLocalizationOfWound] = useState<string>(
    quizList?.localizationOfWound ? quizList.localizationOfWound : ""
  );
  const [wound, setWound] = useState<any>(
    quizList?.wound ? quizList.wound : ""
  );
  const [bloodLoss, setBloodLoss] = useState<any>(quizList?.bloodLoss ?? "");
  const [bloodLossCheck, setBloodLossCheck] = useState<any>(
    quizList?.bloodLoss ?? ""
  );

  useEffect(() => {
    if (quizList) {
      setLocalizationOfWound(quizList?.localizationOfWound ?? "");
      setBloodLoss(quizList?.bloodLoss ?? "");
    }
  }, [quizList]);

  useEffect(() => {
    quizList?.symptomOfPaleSpot
      ? setSymptomOfPaleSpot(
          quizList?.symptomOfPaleSpot === "менее 5 сек"
            ? "менее 5 сек"
            : quizList?.symptomOfPaleSpot === "более 5 сек"
            ? "более 5 сек"
            : "менее 5 сек"
        )
      : setSymptomOfPaleSpot("");

    quizList?.wound
      ? setWound(
          quizList?.wound === "открытая рана"
            ? "открытая рана"
            : quizList?.wound === "закрытая рана"
            ? "закрытая рана"
            : "открытая рана"
        )
      : setWound("");

    quizList?.bloodLossCheck
      ? setBloodLossCheck(
          quizList?.bloodLossCheck === "да"
            ? "да"
            : quizList?.bloodLossCheck === "нет"
            ? "нет"
            : "да"
        )
      : setBloodLossCheck("");
  }, [quizList]);

  return (
    <div className={s.ThirdSection}>
      <Title>Раздел 2: Соберите следующую информацию</Title>

      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow} style={{ alignItems: "flex-start" }}>
              <td className={s.checkbox}>
                <span className={s.title}>Симптом бледного пятна</span>
              </td>
              <td className={s.tdButton}>
                <RadioButton
                  id={"symptomOfPaleSpot_1"}
                  value={"менее 5 сек"}
                  onChange={(str) => {
                    setSymptomOfPaleSpot(str);
                    onBlurHandler("symptomOfPaleSpot", str);
                  }}
                  name={"symptomOfPaleSpot"}
                  currentValue={symptomOfPaleSpot}
                />
                <RadioButton
                  id={"symptomOfPaleSpot_2"}
                  value={"более 5 сек"}
                  onChange={(str) => {
                    setSymptomOfPaleSpot(str);
                    onBlurHandler("symptomOfPaleSpot", str);
                  }}
                  name={"symptomOfPaleSpot"}
                  currentValue={symptomOfPaleSpot}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Локализация ранения</span>
              </td>
              <td className={s.tdButton}>
                <InputText
                  onChange={(e) => setLocalizationOfWound(e.target.value)}
                  value={localizationOfWound}
                  onBlur={() =>
                    onBlurHandler("localizationOfWound", localizationOfWound)
                  }
                />
              </td>
              <td
                className={s.tdButton}
                style={{ marginLeft: "auto", marginTop: "30px" }}
              >
                <RadioButton
                  id={"wound_1"}
                  value={"открытая рана"}
                  onChange={(str) => {
                    setWound(str);
                    onBlurHandler("wound", str);
                  }}
                  name={"wound"}
                  currentValue={wound}
                />
                <RadioButton
                  id={"wound_2"}
                  value={"закрытая рана"}
                  onChange={(str) => {
                    setWound(str);
                    onBlurHandler("wound", str);
                  }}
                  name={"wound"}
                  currentValue={wound}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Кровопотеря</span>
              </td>
              <td className={s.tdButton}>
                <div className={s.inputWrapper}>
                  <input
                    type="number"
                    placeholder={"_ _"}
                    inputMode={"numeric"}
                    value={bloodLoss}
                    onChange={(e) => setBloodLoss(e.target.value)}
                    onBlur={() => onBlurHandler("bloodLoss", bloodLoss)}
                    onKeyPress={validate}
                  />

                  <div className={s.unit}>
                    <span>мл</span>
                  </div>
                </div>
              </td>
              <td
                className={s.tdButton}
                style={{ marginLeft: "auto", marginTop: "30px" }}
              >
                <RadioButton
                  id={"bloodLossCheck_1"}
                  value={"да"}
                  onChange={(str) => {
                    setBloodLossCheck(str);
                    onBlurHandler("bloodLossCheck", str);
                  }}
                  name={"bloodLossCheck"}
                  currentValue={bloodLossCheck}
                />
                <RadioButton
                  id={"bloodLossCheck_2"}
                  value={"нет"}
                  onChange={(str) => {
                    setBloodLossCheck(str);
                    onBlurHandler("bloodLossCheck", str);
                  }}
                  name={"bloodLossCheck"}
                  currentValue={bloodLossCheck}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
