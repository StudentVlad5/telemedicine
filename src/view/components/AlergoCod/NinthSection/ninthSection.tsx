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
import { validate } from "../../../../common/helpers/validate";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const NinthSectionAlergoCod = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [adBefore, setAdBefore] = useState(quizList?.adBefore ?? "");
  const [adAfter, setAdAfter] = useState(quizList?.adAfter ?? "");
  const [pulseBefore, setPulseBefore] = useState(quizList?.pulseBefore ?? "");
  const [pulseAfter, setPulseAfter] = useState(quizList?.pulseAfter ?? "");
  const [saturationBefore, setSaturationBefore] = useState(
    quizList?.saturationBefore ?? ""
  );
  const [saturationAfter, setSaturationAfter] = useState(
    quizList?.saturationAfter ?? ""
  );
  const [compliencesBefore, setCompliencesBefore] = useState(
    quizList?.compliencesBefore ?? ""
  );
  const [compliencesAfter, setCompliencesAfter] = useState(
    quizList?.compliencesAfter ?? ""
  );
  const [consciousnessBefore, setConsciousnessBefore] = useState(
    quizList?.consciousnessBefore ?? ""
  );
  const [consciousnessAfter, setConsciousnessAfter] = useState(
    quizList?.consciousnessAfter ?? ""
  );

  useEffect(() => {
    if (quizList) {
      setAdBefore(quizList?.adBefore ?? "");
      setAdAfter(quizList?.adAfter ?? "");
      setPulseBefore(quizList?.pulseBefore ?? "");
      setPulseAfter(quizList?.pulseAfter ?? "");
      setSaturationBefore(quizList?.saturationBefore ?? "");
      setSaturationAfter(quizList?.saturationAfter ?? "");
      setCompliencesBefore(quizList?.compliencesBefore ?? "");
      setCompliencesAfter(quizList?.compliencesAfter ?? "");
      setConsciousnessBefore(quizList?.consciousnessBefore ?? "");
      setConsciousnessAfter(quizList?.consciousnessAfter ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.NinthSection}>
      <Title>Раздел 8: Оценка после терапии</Title>
      <div className={s.inner}>
        {/* А./ Д */}
        <div className={s.field}>
          <span className={s.title}>А / Д</span>
          <div className={s.inputWrapper}>
            <span>до</span>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={adBefore}
              onChange={(e) => setAdBefore(e.target.value)}
              onBlur={() => onBlurHandler("adBefore", adBefore)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.inputWrapper}>
            <span>после</span>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={adAfter}
              onChange={(e) => setAdAfter(e.target.value)}
              onBlur={() => onBlurHandler("adAfter", adAfter)}
              onKeyPress={validate}
            />
          </div>
        </div>
        {/* Пульс */}
        <div className={s.field}>
          <span className={s.title}>Пульс</span>
          <div className={s.inputWrapper}>
            <span>до</span>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={pulseBefore}
              onChange={(e) => setPulseBefore(e.target.value)}
              onBlur={() => onBlurHandler("pulseBefore", pulseBefore)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.inputWrapper}>
            <span>после</span>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={pulseAfter}
              onChange={(e) => setPulseAfter(e.target.value)}
              onBlur={() => onBlurHandler("pulseAfter", pulseAfter)}
              onKeyPress={validate}
            />
          </div>
        </div>
        {/* Сатурация */}
        <div className={s.field}>
          <span className={s.title}>Сатурация SpO₂</span>
          <div className={s.inputWrapper}>
            <span>до</span>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={saturationBefore}
              onChange={(e) => setSaturationBefore(e.target.value)}
              onBlur={() => onBlurHandler("saturationBefore", saturationBefore)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.inputWrapper}>
            <span>после</span>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={saturationAfter}
              onChange={(e) => setSaturationAfter(e.target.value)}
              onBlur={() => onBlurHandler("saturationAfter", saturationAfter)}
              onKeyPress={validate}
            />
          </div>
        </div>
        {/* Жалобы */}
        <div className={s.field}>
          <span className={s.title}>Жалобы</span>
          <div className={s.inputWrapper}>
            <span>до</span>
            <input
              type="text"
              placeholder={""}
              inputMode={"text"}
              value={compliencesBefore}
              onChange={(e) => setCompliencesBefore(e.target.value)}
              onBlur={() =>
                onBlurHandler("compliencesBefore", compliencesBefore)
              }
            />
          </div>
          <div className={s.inputWrapper}>
            <span>после</span>
            <input
              type="text"
              placeholder={""}
              inputMode={"text"}
              value={compliencesAfter}
              onChange={(e) => setCompliencesAfter(e.target.value)}
              onBlur={() => onBlurHandler("compliencesAfter", compliencesAfter)}
            />
          </div>
        </div>
        {/* сознание */}
        <div className={s.field}>
          <span className={s.title}>Сознание</span>
          <div className={s.inputWrapper}>
            <span>до</span>
            <RadioButtonTrue
              id={"1_1"}
              value={"true"}
              onChange={(str) => {
                setConsciousnessBefore(str);
                onBlurHandler("consciousnessBefore", str);
              }}
              name={"consciousnessBefore"}
              currentValue={consciousnessBefore}
            />
            <RadioButtonFalse
              id={"1_2"}
              value={"false"}
              onChange={(str) => {
                setConsciousnessBefore(str);
                onBlurHandler("consciousnessBefore", str);
              }}
              name={"consciousnessBefore"}
              currentValue={consciousnessBefore}
            />
          </div>
          <div className={s.inputWrapper}>
            <span>после</span>
            <RadioButtonTrue
              id={"2_1"}
              value={"true"}
              onChange={(str) => {
                setConsciousnessAfter(str);
                onBlurHandler("consciousnessAfter", str);
              }}
              name={"consciousnessAfter"}
              currentValue={consciousnessAfter}
            />
            <RadioButtonFalse
              id={"2_2"}
              value={"false"}
              onChange={(str) => {
                setConsciousnessAfter(str);
                onBlurHandler("consciousnessAfter", str);
              }}
              name={"consciousnessAfter"}
              currentValue={consciousnessAfter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
