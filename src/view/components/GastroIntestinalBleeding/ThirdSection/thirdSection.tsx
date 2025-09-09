import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useState, useEffect, useMemo } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { RadioButton } from "../../../ui/RadioButton";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";
import { validate } from "../../../../common/helpers/validate";

export const ThirdSectionGastroIntestinalBleeding = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [symptomOfPaleSpot, setSymptomOfPaleSpot] = useState<any>();
  const [
    localizationOfGastroIntestinalBleeding,
    setLocalizationOfGastroIntestinalBleeding,
  ] = useState<string>(
    quizList?.localizationOfGastroIntestinalBleeding
      ? quizList.localizationOfGastroIntestinalBleeding
      : ""
  );
  const [vomitingBlood, setVomitingBlood] = useState<any>(
    quizList?.vomitingBlood ?? ""
  );
  const [stoolWithBlood, setStoolWithBlood] = useState<any>(
    quizList?.stoolWithBlood ?? ""
  );
  const [colorOfBlood, setColorOfBlood] = useState<any>(
    quizList?.colorOfBlood ?? ""
  );
  const [bloodLoss, setBloodLoss] = useState<any>(quizList?.bloodLoss ?? "");

  useMemo(() => {
    if (quizList) {
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

    quizList?.localizationOfGastroIntestinalBleeding
      ? setLocalizationOfGastroIntestinalBleeding(
          quizList?.localizationOfGastroIntestinalBleeding === "желудок"
            ? "желудок"
            : quizList?.localizationOfGastroIntestinalBleeding === "кишечник"
            ? "кишечник"
            : "желудок"
        )
      : setLocalizationOfGastroIntestinalBleeding("");

    quizList?.vomitingBlood
      ? setVomitingBlood(
          quizList?.vomitingBlood === "да"
            ? "да"
            : quizList?.vomitingBlood === "нет"
            ? "нет"
            : "да"
        )
      : setVomitingBlood("");

    quizList?.stoolWithBlood
      ? setStoolWithBlood(
          quizList?.stoolWithBlood === "да"
            ? "да"
            : quizList?.stoolWithBlood === "нет"
            ? "нет"
            : "да"
        )
      : setStoolWithBlood("");

    quizList?.colorOfBlood
      ? setColorOfBlood(
          quizList?.colorOfBlood === "темная"
            ? "темная"
            : quizList?.colorOfBlood === "алая"
            ? "алая"
            : "темная"
        )
      : setColorOfBlood("");
  }, [quizList]);

  return (
    <div className={s.ThirdSection}>
      <Title>Раздел 2: Соберите следующую информацию</Title>

      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow}>
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
                <span className={s.title}>
                  Локализация желудочно – кишечного кровотечения
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButton
                  id={"localizationOfGastroIntestinalBleeding_1"}
                  value={"желудок"}
                  onChange={(str) => {
                    setLocalizationOfGastroIntestinalBleeding(str);
                    onBlurHandler(
                      "localizationOfGastroIntestinalBleeding",
                      str
                    );
                  }}
                  name={"localizationOfGastroIntestinalBleeding"}
                  currentValue={localizationOfGastroIntestinalBleeding}
                />
                <RadioButton
                  id={"localizationOfGastroIntestinalBleeding_2"}
                  value={"кишечник"}
                  onChange={(str) => {
                    setLocalizationOfGastroIntestinalBleeding(str);
                    onBlurHandler(
                      "localizationOfGastroIntestinalBleeding",
                      str
                    );
                  }}
                  name={"localizationOfGastroIntestinalBleeding"}
                  currentValue={localizationOfGastroIntestinalBleeding}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Рвота с кровью</span>
              </td>
              <td className={s.tdButton}>
                <RadioButton
                  id={"vomitingBlood_1"}
                  value={"да"}
                  onChange={(str) => {
                    setVomitingBlood(str);
                    onBlurHandler("vomitingBlood", str);
                  }}
                  name={"vomitingBlood"}
                  currentValue={vomitingBlood}
                />
                <RadioButton
                  id={"vomitingBlood_2"}
                  value={"нет"}
                  onChange={(str) => {
                    setVomitingBlood(str);
                    onBlurHandler("vomitingBlood", str);
                  }}
                  name={"vomitingBlood"}
                  currentValue={vomitingBlood}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Стул с кровью</span>
              </td>
              <td className={s.tdButton}>
                <RadioButton
                  id={"stoolWithBlood_1"}
                  value={"да"}
                  onChange={(str) => {
                    setStoolWithBlood(str);
                    onBlurHandler("stoolWithBlood", str);
                  }}
                  name={"stoolWithBlood"}
                  currentValue={stoolWithBlood}
                />
                <RadioButton
                  id={"stoolWithBlood_2"}
                  value={"нет"}
                  onChange={(str) => {
                    setStoolWithBlood(str);
                    onBlurHandler("stoolWithBlood", str);
                  }}
                  name={"stoolWithBlood"}
                  currentValue={stoolWithBlood}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Цвет крови</span>
              </td>
              <td className={s.tdButton}>
                <RadioButton
                  id={"colorOfBlood_1"}
                  value={"темная"}
                  onChange={(str) => {
                    setColorOfBlood(str);
                    onBlurHandler("colorOfBlood", str);
                  }}
                  name={"colorOfBlood"}
                  currentValue={colorOfBlood}
                />
                <RadioButton
                  id={"colorOfBlood_2"}
                  value={"алая"}
                  onChange={(str) => {
                    setColorOfBlood(str);
                    onBlurHandler("colorOfBlood", str);
                  }}
                  name={"colorOfBlood"}
                  currentValue={colorOfBlood}
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
