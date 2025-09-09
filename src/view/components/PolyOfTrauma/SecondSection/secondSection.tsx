import { useEffect, useState } from "react";
import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { CheckBox } from "../../../ui/CheckBox";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { validate } from "../../../../common/helpers/validate";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const SecondSectionPolyOfTrauma = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [clearConsciousness, setClearConsciousness] = useState<string>("");
  const [coma, setComa] = useState<string>("");
  const [stupor, setStupor] = useState<string>("");
  const [sopor, setSopor] = useState<string>("");

  const [ad, setAd] = useState(quizList?.ad ?? "");
  const [pulse, setPulse] = useState(quizList?.pulse ?? "");
  const [saturation, setSaturation] = useState(quizList?.saturation ?? "");

  useEffect(() => {
    if (quizList) {
      setClearConsciousness(quizList?.clearConsciousness ?? "");
      setComa(quizList?.coma ?? "");
      setStupor(quizList?.stupor ?? "");
      setSopor(quizList?.sopor ?? "");
      setAd(quizList?.ad ?? "");
      setPulse(quizList?.pulse ?? "");
      setSaturation(quizList?.saturation ?? "");
    }
  }, [quizList]);

  function handleChangeCheckBox(e: any) {
    setClearConsciousness("false");
    setComa("false");
    setStupor("false");
    setSopor("false");
    addQuizAnswerThunk({
      params: {
        clearConsciousness: "false",
        coma: "false",
        stupor: "false",
        sopor: "false",
        [e.target.id]: [e.target.checked],
      },
    });
    switch (e.target.id) {
      case "clearConsciousness":
        setClearConsciousness(e.target.checked);
        break;
      case "coma":
        setComa(e.target.checked);
        break;
      case "stupor":
        setStupor(e.target.checked);
        break;
      case "sopor":
        setSopor(e.target.checked);
        break;
      default:
        break;
    }
  }

  return (
    <div className={s.SecondSection}>
      <Title>Раздел 2: Соберите следующую информацию</Title>
      <div className={s.inner}>
        <div className={s.whiteBox}>
          <span className={s.title}>Уровень сознания:</span>
          <div className={s.checkboxWrapper}>
            <CheckBox
              className={s.check}
              id={"clearConsciousness"}
              checked={clearConsciousness === "true"}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              <span className={s.title}>Ясное</span>
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"stupor"}
              checked={stupor === "true"}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              <span className={s.title}> Оглушение</span>
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"sopor"}
              checked={sopor === "true"}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              <span className={s.title}>Сопор</span>
            </CheckBox>
            <CheckBox
              className={s.check}
              id={"coma"}
              checked={coma === "true"}
              onChange={(e) => handleChangeCheckBox(e)}
            >
              <span className={s.title}>Кома</span>
            </CheckBox>
          </div>
        </div>
        <div className={s.primaryBox}>
          <div className={s.field}>
            <span className={s.title}>А / Д</span>
            <div className={s.inputWrapper}>
              <input
                type="text"
                placeholder={"_ _"}
                inputMode={"numeric"}
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                onBlur={() => onBlurHandler("ad", ad)}
                onKeyPress={validate}
              />
              <div className={s.unit}>
                <span>мм рт ст</span>
              </div>{" "}
            </div>
          </div>
          <div className={s.field}>
            <span className={s.title}>Пульс</span>
            <div className={s.inputWrapper}>
              <input
                type="text"
                placeholder={"_ _"}
                inputMode={"numeric"}
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                onBlur={() => onBlurHandler("pulse", pulse)}
                onKeyPress={validate}
              />

              <div className={s.unit}>
                <span>уд в 1 минуту</span>
              </div>
            </div>
          </div>
          <div className={s.field}>
            <span className={s.title}>Сатурация</span>
            <div className={s.inputWrapper}>
              <input
                type="text"
                placeholder={"_ _"}
                inputMode={"numeric"}
                value={saturation}
                onChange={(e) => setSaturation(e.target.value)}
                onBlur={() => onBlurHandler("saturation", saturation)}
                onKeyPress={validate}
              />

              <div className={s.unit}>
                <span>
                  P<small>SO2</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
