import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useEffect, useState } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";
import { validate } from "../../../../common/helpers/validate";

export const FifthSectionAlergoCod = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [ad, setAd] = useState(quizList?.ad ?? "");
  const [pulse, setPulse] = useState(quizList?.pulse ?? "");
  const [breathingRate, setBreathingRate] = useState(
    quizList?.breathingRate ?? ""
  );
  const [saturation, setSaturation] = useState(quizList?.saturation ?? "");
  const [temperature, setTemperature] = useState(quizList?.temperature ?? "");
  const [glucoseLevel, setGlucoseLevel] = useState(
    quizList?.glucoseLevel ?? ""
  );

  useEffect(() => {
    if (quizList) {
      setAd(quizList?.ad ?? "");
      setPulse(quizList?.pulse ?? "");
      setBreathingRate(quizList?.breathingRate ?? "");
      setSaturation(quizList?.saturation ?? "");
      setTemperature(quizList?.temperature ?? "");
      setGlucoseLevel(quizList?.glucoseLevel ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.FifthSection}>
      <Title>Раздел 4: Витальные показатели</Title>
      <div className={s.inner}>
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
          </div>
          <div className={s.unit}>
            <span>мм рт ст</span>
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
          </div>
          <div className={s.unit}>
            <span>уд в 1 минуту</span>
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
          </div>
          <div className={s.unit}>
            <span className={s.name}>мин</span>
          </div>
        </div>

        <div className={s.field}>
          <span className={s.title}>Сатурация SpO₂</span>
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
          </div>
          <div className={s.unit}>
            <span className={s.name}>% (с O₂ / без)</span>
          </div>
        </div>

        <div className={s.field}>
          <span className={s.title}>Температура</span>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              onBlur={() => onBlurHandler("temperature", temperature)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.unit}>
            <span>°C</span>
          </div>
        </div>

        <div className={s.field}>
          <span className={s.title}>
            Уровень глюкозы (при наличии глюкометра)
          </span>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={glucoseLevel}
              onChange={(e) => setGlucoseLevel(e.target.value)}
              onBlur={() => onBlurHandler("glucoseLevel", glucoseLevel)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.unit}>
            <span>ммоль/л</span>
          </div>
        </div>
      </div>
    </div>
  );
};
