import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useEffect, useState } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { RadioButtonTrue } from "../../../ui/RadioButtonWithoutSpan";
import { InputTime } from "../../../ui/InputTime";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";
import { validate } from "../../../../common/helpers/validate";

export const ThirdSectionCodeCardio = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [firstMedicalContactHh, setFirstMedicalContactHh] = useState("");
  const [firstMedicalContactMm, setFirstMedicalContactMm] = useState("");
  const [adLeftHand, setAdLeftHand] = useState("");
  const [adRightHand, setAdRightHand] = useState("");
  const [pulse, setPulse] = useState("");
  const [breathingRate, setBreathingRate] = useState("");
  const [rhythm, setRhythm] = useState("");
  const [deficit, setDeficit] = useState("");
  const [chdd, setChdd] = useState("");
  const [satO, setSatO] = useState("");
  const [isSignsOfHF, setIsSignsOfHF] = useState("");

  useEffect(() => {
    if (quizList) {
      setFirstMedicalContactHh(quizList?.firstMedicalContactHh ?? "");
      setFirstMedicalContactMm(quizList?.firstMedicalContactMm ?? "");
      setAdLeftHand(quizList?.adLeftHand ?? "");
      setAdRightHand(quizList?.adRightHand ?? "");
      setPulse(quizList?.pulse ?? "");
      setBreathingRate(quizList?.breathingRate ?? "");
      setRhythm(quizList?.rhythm ?? "");
      setDeficit(quizList?.deficit ?? "");
      setChdd(quizList?.chdd ?? "");
      setSatO(quizList?.satO ?? "");
      setIsSignsOfHF(quizList?.isSignsOfHF ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.ThirdSection}>
      <Title>Раздел 3: Физикальный осмотр</Title>

      <div className={s.field}>
        <span className={s.title}>Первый медицинский контакт</span>
        <div className={s.whiteBox}>
          <InputTime
            valueHh={firstMedicalContactHh}
            valueMm={firstMedicalContactMm}
            onChangeHh={(str) => setFirstMedicalContactHh(str)}
            onChangeMm={(str) => setFirstMedicalContactMm(str)}
            onBlurHh={() =>
              onBlurHandler(
                "firstMedicalContactHh",
                !firstMedicalContactHh
                  ? "00"
                  : firstMedicalContactHh.length === 1
                  ? `0${firstMedicalContactHh}`
                  : firstMedicalContactHh
              )
            }
            onBlurMm={() => {
              onBlurHandler(
                "firstMedicalContactMm",
                !firstMedicalContactMm
                  ? "00"
                  : firstMedicalContactMm.length === 1
                  ? `0${firstMedicalContactMm}`
                  : firstMedicalContactMm
              );
            }}
          />
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>А /Д (на обеих руках)</span>
        <div className={s.inputWrapper}>
          <div className={s.columnChange}>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={adLeftHand}
              onChange={(e) => setAdLeftHand(e.target.value)}
              onBlur={() => onBlurHandler("adLeftHand", adLeftHand)}
              onKeyPress={validate}
            />
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={adRightHand}
              onChange={(e) => setAdRightHand(e.target.value)}
              onBlur={() => onBlurHandler("adRightHand", adRightHand)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.unit}>
            <span>мм рт ст</span>
          </div>
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
        <span className={s.title}>Частота дыхания</span>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder={"_ _"}
            inputMode={"numeric"}
            value={breathingRate}
            onChange={(e) => setBreathingRate(e.target.value)}
            onBlur={() => onBlurHandler("breathingRate", breathingRate)}
            onKeyPress={validate}
          />
          <div className={s.unit}>
            <span>мин</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Ритм</span>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder={"_ _"}
            inputMode={"numeric"}
            value={rhythm}
            onChange={(e) => setRhythm(e.target.value)}
            onBlur={() => onBlurHandler("rhythm", rhythm)}
            onKeyPress={validate}
          />
          <div className={s.unit}>
            <span></span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Дефицит</span>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder={"_ _"}
            inputMode={"numeric"}
            value={deficit}
            onChange={(e) => setDeficit(e.target.value)}
            onBlur={() => onBlurHandler("deficit", deficit)}
            onKeyPress={validate}
          />
          <div className={s.unit}>
            <span></span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>ЧДД</span>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder={"_ _"}
            inputMode={"numeric"}
            value={chdd}
            onChange={(e) => setChdd(e.target.value)}
            onBlur={() => onBlurHandler("chdd", chdd)}
            onKeyPress={validate}
          />
          <div className={s.unit}>
            <span></span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>SatO₂ (SpO₂)</span>
        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder={"_ _"}
            inputMode={"numeric"}
            value={satO}
            onChange={(e) => setSatO(e.target.value)}
            onBlur={() => onBlurHandler("satO", satO)}
            onKeyPress={validate}
          />
          <div className={s.unit}>
            <span></span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Признаки СН (отеки, хрипы)</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_1"
              value="true"
              onChange={(str) => {
                setIsSignsOfHF(str);
                onBlurHandler("isSignsOfHF", str);
              }}
              name="isSignsOfHF"
              currentValue={isSignsOfHF}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_2"
              value="false"
              onChange={(str) => {
                setIsSignsOfHF(str);
                onBlurHandler("isSignsOfHF", str);
              }}
              name="isSignsOfHF"
              currentValue={isSignsOfHF}
            />
            <span>нет</span>
          </div>
        </div>
      </div>
    </div>
  );
};
