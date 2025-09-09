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
import { InputTime } from "../../../ui/InputTime";
import {
  RadioButtonFalse,
  RadioButtonTrue,
} from "../../../ui/RadioButtonWithoutSpan";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const FourthSectionPolyOfTrauma = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [anesthesia, setAnesthesia] = useState<any>(quizList?.anesthesia ?? "");
  const [instalOfPeripheralCatheter, setInstalOfPeripheralCatheter] =
    useState<any>(quizList?.instalOfPeripheralCatheter ?? "");
  const [infusion, setInfusion] = useState<any>(quizList?.infusion ?? "");

  const [timeOfAppOfTourniquetPolyHh, setTimeOfAppOfTourniquetPolyHh] =
    useState<string>("");
  const [timeOfAppOfTourniquetPolyMm, setTimeOfAppOfTourniquetPolyMm] =
    useState<string>("");
  const [pressureBandage, setPressureBandage] = useState<any>(
    quizList?.pressureBandage ?? ""
  );

  useEffect(() => {
    quizList?.anesthesia
      ? setAnesthesia(
          quizList?.anesthesia === "наркотическое"
            ? "наркотическое"
            : quizList?.anesthesia === "ненаркотическое"
            ? "ненаркотическое"
            : "другое"
        )
      : setAnesthesia("");

    quizList?.instalOfPeripheralCatheter
      ? setInstalOfPeripheralCatheter(
          quizList?.instalOfPeripheralCatheter === "да"
            ? "да"
            : quizList?.instalOfPeripheralCatheter === "нет"
            ? "нет"
            : "другое"
        )
      : setInstalOfPeripheralCatheter("");

    quizList?.infusion
      ? setInfusion(
          quizList?.infusion === "глюкоза 5%"
            ? "глюкоза 5%"
            : quizList?.infusion === "физ раствор 0,9%"
            ? "физ раствор 0,9%"
            : quizList?.infusion === "полиглюкин"
            ? "полиглюкин"
            : quizList?.infusion === "аминокапроновая"
            ? "аминокапроновая"
            : quizList?.infusion === "кислота 5%"
            ? "кислота 5%"
            : "другое"
        )
      : setInfusion("");

    quizList?.timeOfAppOfTourniquetPolyHh
      ? setTimeOfAppOfTourniquetPolyHh(quizList?.timeOfAppOfTourniquetPolyHh)
      : setTimeOfAppOfTourniquetPolyHh("");
    quizList?.timeOfAppOfTourniquetPolyMm
      ? setTimeOfAppOfTourniquetPolyMm(quizList?.timeOfAppOfTourniquetPolyMm)
      : setTimeOfAppOfTourniquetPolyMm("");

    quizList?.pressureBandage
      ? setPressureBandage(
          quizList?.pressureBandage === "true"
            ? "true"
            : quizList?.pressureBandage === "false"
            ? "false"
            : "true"
        )
      : setPressureBandage("");
  }, [quizList]);

  return (
    <div className={s.ThirdSection}>
      <Title>Раздел 2: Соберите следующую информацию</Title>

      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Обезболивание</span>
              </td>
              <td className={s.tdButton}>
                <RadioButton
                  id={"anesthesia_1"}
                  value={"наркотическое"}
                  onChange={(str) => {
                    setAnesthesia(str);
                    onBlurHandler("anesthesia", str);
                  }}
                  name={"anesthesia"}
                  currentValue={anesthesia}
                />
                <RadioButton
                  id={"anesthesia_2"}
                  value={"ненаркотическое"}
                  onChange={(str) => {
                    setAnesthesia(str);
                    onBlurHandler("anesthesia", str);
                  }}
                  name={"anesthesia"}
                  currentValue={anesthesia}
                />
                <RadioButton
                  id={"anesthesia_3"}
                  value={"другое"}
                  onChange={(str) => {
                    setAnesthesia(str);
                    onBlurHandler("anesthesia", str);
                  }}
                  name={"anesthesia"}
                  currentValue={anesthesia}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <span className={s.title}>Остановка кровотечения:</span>
        <div className={s.wrapperBox}>
          <div className={s.wrapper}>
            <span className={s.title}>Наложение жгута</span>
            <div className={s.whiteBox}>
              <InputTime
                title={""}
                placeholder="00"
                valueHh={timeOfAppOfTourniquetPolyHh}
                valueMm={timeOfAppOfTourniquetPolyMm}
                onChangeHh={(str) => setTimeOfAppOfTourniquetPolyHh(str)}
                onChangeMm={(str) => setTimeOfAppOfTourniquetPolyMm(str)}
                onBlurHh={() =>
                  onBlurHandler(
                    "timeOfAppOfTourniquetPolyHh",
                    !timeOfAppOfTourniquetPolyHh
                      ? "00"
                      : timeOfAppOfTourniquetPolyHh.length === 1
                      ? `0${timeOfAppOfTourniquetPolyHh}`
                      : timeOfAppOfTourniquetPolyHh
                  )
                }
                onBlurMm={() => {
                  onBlurHandler(
                    "timeOfAppOfTourniquetPolyMm",
                    !timeOfAppOfTourniquetPolyMm
                      ? "00"
                      : timeOfAppOfTourniquetPolyMm.length === 1
                      ? `0${timeOfAppOfTourniquetPolyMm}`
                      : timeOfAppOfTourniquetPolyMm
                  );
                }}
              />
            </div>
          </div>
          <div className={s.wrapper}>
            <span className={s.title}>Давящая повязка</span>
            <div className={s.checkboxRadio}>
              <RadioButtonTrue
                id={"pressureBandage_1"}
                value={"true"}
                onChange={(str) => {
                  setPressureBandage(str);
                  onBlurHandler("pressureBandage", str);
                }}
                name={"pressureBandage"}
                currentValue={pressureBandage}
              />
              <RadioButtonFalse
                id={"pressureBandage_2"}
                value={"false"}
                onChange={(str) => {
                  setPressureBandage(str);
                  onBlurHandler("pressureBandage", str);
                }}
                name={"pressureBandage"}
                currentValue={pressureBandage}
              />
            </div>
          </div>
        </div>
        <table>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Установка периферического катетера
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButton
                  id={"instalOfPeripheralCatheter"}
                  value={"да"}
                  onChange={(str) => {
                    setInstalOfPeripheralCatheter(str);
                    onBlurHandler("instalOfPeripheralCatheter", str);
                  }}
                  name={"instalOfPeripheralCatheter"}
                  currentValue={instalOfPeripheralCatheter}
                />
                <RadioButton
                  id={"instalOfPeripheralCatheter_2"}
                  value={"нет"}
                  onChange={(str) => {
                    setInstalOfPeripheralCatheter(str);
                    onBlurHandler("instalOfPeripheralCatheter", str);
                  }}
                  name={"instalOfPeripheralCatheter"}
                  currentValue={instalOfPeripheralCatheter}
                />
                <RadioButton
                  id={"instalOfPeripheralCatheter_3"}
                  value={"другое"}
                  onChange={(str) => {
                    setInstalOfPeripheralCatheter(str);
                    onBlurHandler("instalOfPeripheralCatheter", str);
                  }}
                  name={"instalOfPeripheralCatheter"}
                  currentValue={instalOfPeripheralCatheter}
                />
              </td>
            </tr>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Инфузия</span>
              </td>
              <td className={s.tdButton}>
                <RadioButton
                  id={"infusion"}
                  value={"глюкоза 5%"}
                  onChange={(str) => {
                    setInfusion(str);
                    onBlurHandler("infusion", str);
                  }}
                  name={"infusion"}
                  currentValue={infusion}
                />
                <RadioButton
                  id={"infusion_2"}
                  value={"физ раствор 0,9%"}
                  onChange={(str) => {
                    setInfusion(str);
                    onBlurHandler("infusion", str);
                  }}
                  name={"infusion"}
                  currentValue={infusion}
                />
                <RadioButton
                  id={"infusion_3"}
                  value={"полиглюкин"}
                  onChange={(str) => {
                    setInfusion(str);
                    onBlurHandler("infusion", str);
                  }}
                  name={"infusion"}
                  currentValue={infusion}
                />
                <RadioButton
                  id={"infusion_4"}
                  value={"аминокапроновая"}
                  onChange={(str) => {
                    setInfusion(str);
                    onBlurHandler("infusion", str);
                  }}
                  name={"infusion"}
                  currentValue={infusion}
                />
                <RadioButton
                  id={"infusion_5"}
                  value={"кислота 5%"}
                  onChange={(str) => {
                    setInfusion(str);
                    onBlurHandler("infusion", str);
                  }}
                  name={"infusion"}
                  currentValue={infusion}
                />
                <RadioButton
                  id={"infusion_6"}
                  value={"другое"}
                  onChange={(str) => {
                    setInfusion(str);
                    onBlurHandler("infusion", str);
                  }}
                  name={"infusion"}
                  currentValue={infusion}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
