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
  RadioButtonUnknow,
} from "../../../ui/RadioButtonWithoutSpan";
import { Textarea } from "../../../ui/Textarea";
import { CheckBox } from "../../../ui/CheckBox";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const SixthSectionStroke = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [smallOperations, setSmallOperations] = useState<any>();
  const [cardiovascularDiseases, setCardiovascularDiseases] = useState<any>();
  const [acuteInfectiousDisease, setAcuteInfectiousDisease] = useState<any>();
  const [hemorrhages, setHemorrhages] = useState<any>();
  const [onmk, setOnmk] = useState<any>();
  const [convulsions, setConvulsions] = useState<any>();
  const [hemorrhagicStroke, setHemorrhagicStroke] = useState<boolean>(false);
  const [SACStroke, setSACStroke] = useState<boolean>(false);
  const [ischemicStroke, setIschemicStroke] = useState<boolean>(false);
  const [
    transient_cerebrovascular_accident,
    setTransient_cerebrovascular_accident,
  ] = useState<boolean>(false);
  const [unknown_accident, setUnknown_accident] = useState<boolean>(false);
  const [noteChecklistSMP, setNoteChecklistSMP] = useState<string>("");

  useEffect(() => {
    quizList?.smallOperations
      ? setSmallOperations(
          quizList?.smallOperations === "true"
            ? "true"
            : quizList?.smallOperations === "false"
            ? "false"
            : "unknow"
        )
      : setSmallOperations("");

    quizList?.cardiovascularDiseases
      ? setCardiovascularDiseases(
          quizList?.cardiovascularDiseases === "true"
            ? "true"
            : quizList?.cardiovascularDiseases === "false"
            ? "false"
            : "unknow"
        )
      : setCardiovascularDiseases("");

    quizList?.acuteInfectiousDisease
      ? setAcuteInfectiousDisease(
          quizList?.acuteInfectiousDisease === "true"
            ? "true"
            : quizList?.acuteInfectiousDisease === "false"
            ? "false"
            : "unknow"
        )
      : setAcuteInfectiousDisease("");

    quizList?.hemorrhages
      ? setHemorrhages(
          quizList?.hemorrhages === "true"
            ? "true"
            : quizList?.hemorrhages === "false"
            ? "false"
            : "unknow"
        )
      : setHemorrhages("");

    quizList?.convulsions
      ? setConvulsions(
          quizList?.convulsions === "true"
            ? "true"
            : quizList?.convulsions === "false"
            ? "false"
            : "unknow"
        )
      : setConvulsions("");

    quizList?.onmk
      ? setOnmk(
          quizList?.onmk === "true"
            ? "true"
            : quizList?.onmk === "false"
            ? "false"
            : "unknow"
        )
      : setOnmk("");

    quizList?.hemorrhagicStroke
      ? setHemorrhagicStroke(
          quizList?.hemorrhagicStroke === "true"
            ? true
            : quizList?.hemorrhagicStroke === "true"
            ? false
            : false
        )
      : setHemorrhagicStroke(false);

    quizList?.SACStroke
      ? setSACStroke(
          quizList?.SACStroke === "true"
            ? true
            : quizList?.SACStroke === "true"
            ? false
            : false
        )
      : setSACStroke(false);

    quizList?.ischemicStroke
      ? setIschemicStroke(
          quizList?.ischemicStroke === "true"
            ? true
            : quizList?.ischemicStroke === "true"
            ? false
            : false
        )
      : setIschemicStroke(false);

    quizList?.transient_cerebrovascular_accident
      ? setTransient_cerebrovascular_accident(
          quizList?.transient_cerebrovascular_accident === "true"
            ? true
            : quizList?.transient_cerebrovascular_accident === "true"
            ? false
            : false
        )
      : setTransient_cerebrovascular_accident(false);
    quizList?.unknown_accident
      ? setUnknown_accident(
          quizList?.unknown_accident === "true"
            ? true
            : quizList?.unknown_accident === "true"
            ? false
            : false
        )
      : setUnknown_accident(false);

    quizList?.noteChecklistSMP
      ? setNoteChecklistSMP(quizList?.noteChecklistSMP)
      : setNoteChecklistSMP("");
  }, [
    quizList?.noteChecklistSMP,
    quizList?.onmk,
    quizList?.smallOperations,
    quizList?.cardiovascularDiseases,
    quizList?.acuteInfectiousDisease,
    quizList?.hemorrhages,
    quizList?.convulsions,
    quizList?.transient_cerebrovascular_accident,
    quizList?.unknown_accident,
    quizList?.hemorrhagicStroke,
    quizList?.SACStroke,
    quizList?.ischemicStroke,
  ]);

  function handleChangeCheckBox(e: any) {
    console.log("e.target.id", e.target.id);
    setHemorrhagicStroke(false);
    setUnknown_accident(false);
    setSACStroke(false);
    setIschemicStroke(false);
    setTransient_cerebrovascular_accident(false);
    addQuizAnswerThunk({
      params: {
        hemorrhagicStroke: false,
        SACStroke: false,
        ischemicStroke: false,
        transient_cerebrovascular_accident: false,
        unknown_accident: false,
        [e.target.id]: [e.target.checked],
      },
    });
    switch (e.target.id) {
      case "hemorrhagicStroke":
        setHemorrhagicStroke(e.target.checked);
        break;
      case "SACStroke":
        setSACStroke(e.target.checked);
        break;
      case "ischemicStroke":
        setIschemicStroke(e.target.checked);
        break;
      case "transient_cerebrovascular_accident":
        setTransient_cerebrovascular_accident(e.target.checked);
        break;
      case "unknown_accident":
        setUnknown_accident(e.target.checked);
        break;
      default:
        break;
    }
  }
  return (
    <div className={s.SixthSection}>
      <Title>Раздел 4: Соберите анамнез</Title>

      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Малые операции или инвазивные вмешательства в последние 10
                  дней
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"1_1"}
                  value={"true"}
                  onChange={(str) => {
                    setSmallOperations(str);
                    onBlurHandler("smallOperations", str);
                  }}
                  name={"smallOperations"}
                  currentValue={smallOperations}
                />
                <RadioButtonFalse
                  id={"1_2"}
                  value={"false"}
                  onChange={(str) => {
                    setSmallOperations(str);
                    onBlurHandler("smallOperations", str);
                  }}
                  name={"smallOperations"}
                  currentValue={smallOperations}
                />
                <RadioButtonUnknow
                  id={"1_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setSmallOperations(str);
                    onBlurHandler("smallOperations", str);
                  }}
                  name={"smallOperations"}
                  currentValue={smallOperations}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Сердечно-сосудистые заболевания <br />{" "}
                  <small>
                    (подострый бактериальный эндокардит, острый перикардит)
                  </small>
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"2_1"}
                  value={"true"}
                  onChange={(str) => {
                    setCardiovascularDiseases(str);
                    onBlurHandler("cardiovascularDiseases", str);
                  }}
                  name={"cardiovascularDiseases"}
                  currentValue={cardiovascularDiseases}
                />
                <RadioButtonFalse
                  id={"2_2"}
                  value={"false"}
                  onChange={(str) => {
                    setCardiovascularDiseases(str);
                    onBlurHandler("cardiovascularDiseases", str);
                  }}
                  name={"cardiovascularDiseases"}
                  currentValue={cardiovascularDiseases}
                />
                <RadioButtonUnknow
                  id={"2_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setCardiovascularDiseases(str);
                    onBlurHandler("cardiovascularDiseases", str);
                  }}
                  name={"cardiovascularDiseases"}
                  currentValue={cardiovascularDiseases}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Острое инфекционное заболевание</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"3_1"}
                  value={"true"}
                  onChange={(str) => {
                    setAcuteInfectiousDisease(str);
                    onBlurHandler("acuteInfectiousDisease", str);
                  }}
                  name={"acuteInfectiousDisease"}
                  currentValue={acuteInfectiousDisease}
                />
                <RadioButtonFalse
                  id={"3_2"}
                  value={"false"}
                  onChange={(str) => {
                    setAcuteInfectiousDisease(str);
                    onBlurHandler("acuteInfectiousDisease", str);
                  }}
                  name={"acuteInfectiousDisease"}
                  currentValue={acuteInfectiousDisease}
                />
                <RadioButtonUnknow
                  id={"3_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setAcuteInfectiousDisease(str);
                    onBlurHandler("acuteInfectiousDisease", str);
                  }}
                  name={"acuteInfectiousDisease"}
                  currentValue={acuteInfectiousDisease}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Кровоизлияния в ЖКТ и мочевыводящих путях не позднее 21 дня до
                  инсульта
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"4_1"}
                  value={"true"}
                  onChange={(str) => {
                    setHemorrhages(str);
                    onBlurHandler("hemorrhages", str);
                  }}
                  name={"hemorrhages"}
                  currentValue={hemorrhages}
                />
                <RadioButtonFalse
                  id={"4_2"}
                  value={"false"}
                  onChange={(str) => {
                    setHemorrhages(str);
                    onBlurHandler("hemorrhages", str);
                  }}
                  name={"hemorrhages"}
                  currentValue={hemorrhages}
                />
                <RadioButtonUnknow
                  id={"4_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setHemorrhages(str);
                    onBlurHandler("hemorrhages", str);
                  }}
                  name={"hemorrhages"}
                  currentValue={hemorrhages}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Судорожные приступы в дебюте заболевания
                  <br />
                  (имеется связь с острой церебральной ишемией)
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"5_1"}
                  value={"true"}
                  onChange={(str) => {
                    setConvulsions(str);
                    onBlurHandler("convulsions", str);
                  }}
                  name={"convulsions"}
                  currentValue={convulsions}
                />
                <RadioButtonFalse
                  id={"5_2"}
                  value={"false"}
                  onChange={(str) => {
                    setConvulsions(str);
                    onBlurHandler("convulsions", str);
                  }}
                  name={"convulsions"}
                  currentValue={convulsions}
                />
                <RadioButtonUnknow
                  id={"5_3"}
                  value={"unknow"}
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
                <span className={s.title}>ОНМК ранее:</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"6_1"}
                  value={"true"}
                  onChange={(str) => {
                    setOnmk(str);
                    onBlurHandler("onmk", str);
                  }}
                  name={"onmk"}
                  currentValue={onmk}
                />
                <RadioButtonFalse
                  id={"6_2"}
                  value={"false"}
                  onChange={(str) => {
                    setOnmk(str);
                    onBlurHandler("onmk", str);
                  }}
                  name={"onmk"}
                  currentValue={onmk}
                />
                <RadioButtonUnknow
                  id={"6_3"}
                  value={"unknow"}
                  //   onChange={(str) => setOnmk(str)}
                  onChange={(str) => {
                    setOnmk(str);
                    onBlurHandler("onmk", str);
                  }}
                  name={"onmk"}
                  currentValue={onmk}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className={s.whiteBox}>
          <span className={s.title}></span>
          <div className={s.checkboxWrapper}>
            <CheckBox
              className={s.check}
              id={"hemorrhagicStroke"}
              checked={hemorrhagicStroke}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              Геморрагический инсульт
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"ischemicStroke"}
              checked={ischemicStroke}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              Ишемический инсульт
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"transient_cerebrovascular_accident"}
              checked={transient_cerebrovascular_accident}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              Преходящее нарушение мозгового кровообращения (ПНМК)
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"SACStroke"}
              checked={SACStroke}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              Субарахноидальное кровоизлияние (САК)
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"unknown_accident"}
              checked={unknown_accident}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              Другое
            </CheckBox>
          </div>
        </div>

        <div>
          <Textarea
            className={s.textarea}
            title={"Примечание к чек-листу от СМП"}
            value={noteChecklistSMP}
            onChange={(e) => setNoteChecklistSMP(e.target.value)}
            onBlur={() => {
              onBlurHandler("noteChecklistSMP", noteChecklistSMP ?? "");
            }}
          />
        </div>

        <div className={s.textInputs}></div>
      </div>
    </div>
  );
};
