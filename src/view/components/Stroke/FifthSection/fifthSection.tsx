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
  RadioButtonUnknow,
} from "../../../ui/RadioButtonWithoutSpan";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const FifthSectionStroke = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [intracranialHemorrhages, setIntracranialHemorrhages] = useState<any>();
  const [majorSurgeriesOrSevereInjuries, setMajorSurgeriesOrSevereInjuries] =
    useState<any>();
  const [surgicalInterventions, setSurgicalInterventions] = useState<any>();
  const [myocardialInfarction, setMyocardialInfarction] = useState<any>();
  const [stroke, setStroke] = useState<any>();
  const [arterialPuncture, setArterialPuncture] = useState<any>();

  useEffect(() => {
    quizList?.intracranialHemorrhages
      ? setIntracranialHemorrhages(
          quizList?.intracranialHemorrhages === "true"
            ? "true"
            : quizList?.intracranialHemorrhages === "false"
            ? "false"
            : "unknow"
        )
      : setIntracranialHemorrhages("");

    quizList?.majorSurgeriesOrSevereInjuries
      ? setMajorSurgeriesOrSevereInjuries(
          quizList?.majorSurgeriesOrSevereInjuries === "true"
            ? "true"
            : quizList?.majorSurgeriesOrSevereInjuries === "false"
            ? "false"
            : "unknow"
        )
      : setMajorSurgeriesOrSevereInjuries("");

    quizList?.surgicalInterventions
      ? setSurgicalInterventions(
          quizList?.surgicalInterventions === "true"
            ? "true"
            : quizList?.surgicalInterventions === "false"
            ? "false"
            : "unknow"
        )
      : setSurgicalInterventions("");

    quizList?.myocardialInfarction
      ? setMyocardialInfarction(
          quizList?.myocardialInfarction === "true"
            ? "true"
            : quizList?.myocardialInfarction === "false"
            ? "false"
            : "unknow"
        )
      : setMyocardialInfarction("");

    quizList?.stroke
      ? setStroke(
          quizList?.stroke === "true"
            ? "true"
            : quizList?.stroke === "false"
            ? "false"
            : "unknow"
        )
      : setStroke("");

    quizList?.arterialPuncture
      ? setArterialPuncture(
          quizList?.arterialPuncture === "true"
            ? "true"
            : quizList?.arterialPuncture === "false"
            ? "false"
            : "unknow"
        )
      : setArterialPuncture("");
  }, [
    quizList?.intracranialHemorrhages,
    quizList?.majorSurgeriesOrSevereInjuries,
    quizList?.surgicalInterventions,
    quizList?.myocardialInfarction,
    quizList?.stroke,
    quizList?.arterialPuncture,
  ]);
  return (
    <div className={s.FifthSection}>
      <Title>Раздел 4: Соберите анамнез</Title>

      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Внутричерепные кровоизлияния</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"1_1"}
                  value={"true"}
                  onChange={(str) => {
                    setIntracranialHemorrhages(str);
                    onBlurHandler("intracranialHemorrhages", str);
                  }}
                  name={"intracranialHemorrhages"}
                  currentValue={intracranialHemorrhages}
                />
                <RadioButtonFalse
                  id={"1_2"}
                  value={"false"}
                  onChange={(str) => {
                    setIntracranialHemorrhages(str);
                    onBlurHandler("intracranialHemorrhages", str);
                  }}
                  name={"intracranialHemorrhages"}
                  currentValue={intracranialHemorrhages}
                />
                <RadioButtonUnknow
                  id={"1_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setIntracranialHemorrhages(str);
                    onBlurHandler("intracranialHemorrhages", str);
                  }}
                  name={"intracranialHemorrhages"}
                  currentValue={intracranialHemorrhages}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Большие операции или тяжелые травмы за последние 14 суток
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"2_1"}
                  value={"true"}
                  onChange={(str) => {
                    setMajorSurgeriesOrSevereInjuries(str);
                    onBlurHandler("majorSurgeriesOrSevereInjuries", str);
                  }}
                  name={"majorSurgeriesOrSevereInjuries"}
                  currentValue={majorSurgeriesOrSevereInjuries}
                />
                <RadioButtonFalse
                  id={"2_2"}
                  value={"false"}
                  onChange={(str) => {
                    setMajorSurgeriesOrSevereInjuries(str);
                    onBlurHandler("majorSurgeriesOrSevereInjuries", str);
                  }}
                  name={"majorSurgeriesOrSevereInjuries"}
                  currentValue={majorSurgeriesOrSevereInjuries}
                />
                <RadioButtonUnknow
                  id={"2_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setMajorSurgeriesOrSevereInjuries(str);
                    onBlurHandler("majorSurgeriesOrSevereInjuries", str);
                  }}
                  name={"majorSurgeriesOrSevereInjuries"}
                  currentValue={majorSurgeriesOrSevereInjuries}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Недавние внутричерепные или интраспинальные хирургические
                  вмешательства
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"3_1"}
                  value={"true"}
                  onChange={(str) => {
                    setSurgicalInterventions(str);
                    onBlurHandler("surgicalInterventions", str);
                  }}
                  name={"surgicalInterventions"}
                  currentValue={surgicalInterventions}
                />
                <RadioButtonFalse
                  id={"3_2"}
                  value={"false"}
                  onChange={(str) => {
                    setSurgicalInterventions(str);
                    onBlurHandler("surgicalInterventions", str);
                  }}
                  name={"surgicalInterventions"}
                  currentValue={surgicalInterventions}
                />
                <RadioButtonUnknow
                  id={"3_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setSurgicalInterventions(str);
                    onBlurHandler("surgicalInterventions", str);
                  }}
                  name={"surgicalInterventions"}
                  currentValue={surgicalInterventions}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Инфаркт миокарда в предшествующие инсульту 3 месяца
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"4_1"}
                  value={"true"}
                  onChange={(str) => {
                    setMyocardialInfarction(str);
                    onBlurHandler("myocardialInfarction", str);
                  }}
                  name={"myocardialInfarction"}
                  currentValue={myocardialInfarction}
                />
                <RadioButtonFalse
                  id={"4_2"}
                  value={"false"}
                  onChange={(str) => {
                    setMyocardialInfarction(str);
                    onBlurHandler("myocardialInfarction", str);
                  }}
                  name={"myocardialInfarction"}
                  currentValue={myocardialInfarction}
                />
                <RadioButtonUnknow
                  id={"4_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setMyocardialInfarction(str);
                    onBlurHandler("myocardialInfarction", str);
                  }}
                  name={"myocardialInfarction"}
                  currentValue={myocardialInfarction}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Инсульт в предшествующие инсульту 3 месяца
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"5_1"}
                  value={"true"}
                  onChange={(str) => {
                    setStroke(str);
                    onBlurHandler("stroke", str);
                  }}
                  name={"stroke"}
                  currentValue={stroke}
                />
                <RadioButtonFalse
                  id={"5_2"}
                  value={"false"}
                  onChange={(str) => {
                    setStroke(str);
                    onBlurHandler("stroke", str);
                  }}
                  name={"stroke"}
                  currentValue={stroke}
                />
                <RadioButtonUnknow
                  id={"5_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setStroke(str);
                    onBlurHandler("stroke", str);
                  }}
                  name={"stroke"}
                  currentValue={stroke}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Проведена пункция артерии в сложной для компрессии области в
                  предшествующие инсульту 7 дней
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"6_1"}
                  value={"true"}
                  onChange={(str) => {
                    setArterialPuncture(str);
                    onBlurHandler("arterialPuncture", str);
                  }}
                  name={"arterialPuncture"}
                  currentValue={arterialPuncture}
                />
                <RadioButtonFalse
                  id={"6_2"}
                  value={"false"}
                  onChange={(str) => {
                    setArterialPuncture(str);
                    onBlurHandler("arterialPuncture", str);
                  }}
                  name={"arterialPuncture"}
                  currentValue={arterialPuncture}
                />
                <RadioButtonUnknow
                  id={"6_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setArterialPuncture(str);
                    onBlurHandler("arterialPuncture", str);
                  }}
                  name={"arterialPuncture"}
                  currentValue={arterialPuncture}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
