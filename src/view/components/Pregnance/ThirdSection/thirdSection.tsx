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
import { CheckBox } from "../../../ui/CheckBox";
import { Textarea } from "../../../ui/Textarea";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const ThirdSectionPregnance = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [ad, setAd] = useState<string>(quizList?.ad ?? "");
  const [headPain, setHeadPain] = useState<string>(quizList?.headPain ?? "");
  const [breakVision, setBreakVision] = useState<string>(
    quizList?.breakVision ?? ""
  );
  const [painEpigastricRegion, setPainEpigastricRegion] = useState<string>(
    quizList?.painEpigastricRegion ?? ""
  );
  const [vomiting, setVomiting] = useState<string>(quizList?.vomiting ?? "");
  const [tremor, setTremor] = useState<string>(quizList?.tremor ?? "");
  const [oliguria, setOliguria] = useState<string>(quizList?.oliguria ?? "");
  const [catheterizationOfVein, setCatheterizationOfVein] = useState<string>(
    quizList?.catheterizationOfVein ?? ""
  );
  const [bladderCatheterization, setBladderCatheterization] = useState<string>(
    quizList?.bladderCatheterization ?? ""
  );
  const [amnioticFluid, setAmnioticFluid] = useState<boolean>(false);
  const [blood, setBlood] = useState<boolean>(false);
  const [other, setOther] = useState<boolean>(false);
  const [noteToOther, setNoteToOther] = useState<string>("");

  useEffect(() => {
    if (quizList) {
      setAd(quizList?.ad ?? "");
      setHeadPain(quizList?.headPain ?? "");
      setBreakVision(quizList?.breakVision ?? "");
      setPainEpigastricRegion(quizList?.painEpigastricRegion ?? "");
      setVomiting(quizList?.vomiting ?? "");
      setTremor(quizList?.tremor ?? "");
      setOliguria(quizList?.oliguria ?? "");
      setCatheterizationOfVein(quizList?.catheterizationOfVein ?? "");
      setBladderCatheterization(quizList?.bladderCatheterization ?? "");
      setNoteToOther(quizList?.noteToOther ?? "");
      quizList?.amnioticFluid
        ? setAmnioticFluid(
            quizList?.amnioticFluid === "true"
              ? true
              : quizList?.amnioticFluid === "true"
              ? false
              : false
          )
        : setAmnioticFluid(false);
      quizList?.blood
        ? setBlood(
            quizList?.blood === "true"
              ? true
              : quizList?.blood === "true"
              ? false
              : false
          )
        : setBlood(false);
      quizList?.other
        ? setOther(
            quizList?.other === "true"
              ? true
              : quizList?.other === "true"
              ? false
              : false
          )
        : setOther(false);
    }
  }, [quizList]);

  function handleChangeCheckBox(e: any) {
    addQuizAnswerThunk({
      params: {
        [e.target.id]: [e.target.checked],
      },
    });
    switch (e.target.id) {
      case "amnioticFluid":
        setAmnioticFluid(e.target.checked);
        break;
      case "blood":
        setBlood(e.target.checked);
        break;
      case "other":
        setOther(e.target.checked);
        break;
      default:
        break;
    }
  }

  return (
    <div className={s.ThirdSection}>
      <Title>Раздел 3: Действия медицинского персонала</Title>
      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>АД</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"1_1"}
                  value={"true"}
                  onChange={(str) => {
                    setAd(str);
                    onBlurHandler("ad", str);
                  }}
                  name={"ad"}
                  currentValue={ad}
                />
                <RadioButtonFalse
                  id={"1_2"}
                  value={"false"}
                  onChange={(str) => {
                    setAd(str);
                    onBlurHandler("ad", str);
                  }}
                  name={"ad"}
                  currentValue={ad}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Головная боль</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"2_1"}
                  value={"true"}
                  onChange={(str) => {
                    setHeadPain(str);
                    onBlurHandler("headPain", str);
                  }}
                  name={"headPain"}
                  currentValue={headPain}
                />
                <RadioButtonFalse
                  id={"2_2"}
                  value={"false"}
                  onChange={(str) => {
                    setHeadPain(str);
                    onBlurHandler("headPain", str);
                  }}
                  name={"headPain"}
                  currentValue={headPain}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Нарушение зрения</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"3_1"}
                  value={"true"}
                  onChange={(str) => {
                    setBreakVision(str);
                    onBlurHandler("breakVision", str);
                  }}
                  name={"breakVision"}
                  currentValue={breakVision}
                />
                <RadioButtonFalse
                  id={"3_2"}
                  value={"false"}
                  onChange={(str) => {
                    setBreakVision(str);
                    onBlurHandler("breakVision", str);
                  }}
                  name={"breakVision"}
                  currentValue={breakVision}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Боль в эпигастральной области</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"4_1"}
                  value={"true"}
                  onChange={(str) => {
                    setPainEpigastricRegion(str);
                    onBlurHandler("painEpigastricRegion", str);
                  }}
                  name={"painEpigastricRegion"}
                  currentValue={painEpigastricRegion}
                />
                <RadioButtonFalse
                  id={"4_2"}
                  value={"false"}
                  onChange={(str) => {
                    setPainEpigastricRegion(str);
                    onBlurHandler("painEpigastricRegion", str);
                  }}
                  name={"painEpigastricRegion"}
                  currentValue={painEpigastricRegion}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Боль в правой верхней части живота, тошнота, рвота
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"5_1"}
                  value={"true"}
                  onChange={(str) => {
                    setVomiting(str);
                    onBlurHandler("vomiting", str);
                  }}
                  name={"vomiting"}
                  currentValue={vomiting}
                />
                <RadioButtonFalse
                  id={"5_2"}
                  value={"false"}
                  onChange={(str) => {
                    setVomiting(str);
                    onBlurHandler("vomiting", str);
                  }}
                  name={"vomiting"}
                  currentValue={vomiting}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Подергивание мышц или тремор</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"6_1"}
                  value={"true"}
                  onChange={(str) => {
                    setTremor(str);
                    onBlurHandler("tremor", str);
                  }}
                  name={"tremor"}
                  currentValue={tremor}
                />
                <RadioButtonFalse
                  id={"6_2"}
                  value={"false"}
                  onChange={(str) => {
                    setTremor(str);
                    onBlurHandler("tremor", str);
                  }}
                  name={"tremor"}
                  currentValue={tremor}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Олигурия</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"7_1"}
                  value={"true"}
                  onChange={(str) => {
                    setOliguria(str);
                    onBlurHandler("oliguria", str);
                  }}
                  name={"oliguria"}
                  currentValue={oliguria}
                />
                <RadioButtonFalse
                  id={"7_2"}
                  value={"false"}
                  onChange={(str) => {
                    setOliguria(str);
                    onBlurHandler("oliguria", str);
                  }}
                  name={"oliguria"}
                  currentValue={oliguria}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Катетеризация вены</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"8_1"}
                  value={"true"}
                  onChange={(str) => {
                    setCatheterizationOfVein(str);
                    onBlurHandler("catheterizationOfVein", str);
                  }}
                  name={"catheterizationOfVein"}
                  currentValue={catheterizationOfVein}
                />
                <RadioButtonFalse
                  id={"8_2"}
                  value={"false"}
                  onChange={(str) => {
                    setCatheterizationOfVein(str);
                    onBlurHandler("catheterizationOfVein", str);
                  }}
                  name={"catheterizationOfVein"}
                  currentValue={catheterizationOfVein}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Катетеризация мочевого пузыря</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"9_1"}
                  value={"true"}
                  onChange={(str) => {
                    setBladderCatheterization(str);
                    onBlurHandler("bladderCatheterization", str);
                  }}
                  name={"bladderCatheterization"}
                  currentValue={bladderCatheterization}
                />
                <RadioButtonFalse
                  id={"9_2"}
                  value={"false"}
                  onChange={(str) => {
                    setBladderCatheterization(str);
                    onBlurHandler("bladderCatheterization", str);
                  }}
                  name={"bladderCatheterization"}
                  currentValue={bladderCatheterization}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className={s.whiteBox}>
          <span className={s.title}>Выделения из половых путей</span>
          <div className={s.checkboxWrapper}>
            <CheckBox
              className={s.check}
              id={"amnioticFluid"}
              checked={amnioticFluid}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              Околоплодные воды
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"blood"}
              checked={blood}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              Кровь
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"other"}
              checked={other}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              Другое
            </CheckBox>
          </div>
        </div>

        <div>
          {other && (
            <Textarea
              className={s.textarea}
              title={"Примечание к пункту"}
              value={noteToOther}
              onChange={(e) => setNoteToOther(e.target.value)}
              onBlur={() => {
                onBlurHandler("noteToOther", noteToOther ?? "");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
