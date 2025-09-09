import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useState, useEffect } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { RadioButtonTrue } from "../../../ui/RadioButtonWithoutSpan";
import { BURN_TYPES, CONSCIOUSNESS_STATES } from "../../../../common/config";
import classNames from "classnames";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";
import { validate } from "../../../../common/helpers/validate";

export const SecondSectionBurns = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [consciousness, setConsciousness] = useState("");
  const [burnType, setBurnType] = useState("");

  const [ad, setAd] = useState(quizList?.ad ?? "");
  const [pulse, setPulse] = useState(quizList?.pulse ?? "");
  const [saturation, setSaturation] = useState(quizList?.saturation ?? "");

  useEffect(() => {
    if (quizList) {
      const foundConsciousness = CONSCIOUSNESS_STATES.find(
        (c) => quizList[c.name]
      );
      if (foundConsciousness) setConsciousness(foundConsciousness.name);

      const foundBurn = BURN_TYPES.find((b) => quizList[b.name]);
      if (foundBurn) setBurnType(foundBurn.name);
    }
  }, [quizList]);

  return (
    <div className={s.SecondSection}>
      <Title>Раздел 4: Витальные показатели</Title>
      <div className={s.container}>
        <div className={s.whiteBox}>
          {/* Состояние сознания */}
          <div className={s.field}>
            <h2 className={s.title}>Уровень сознания:</h2>
            <div className={s.buttonContainer}>
              {CONSCIOUSNESS_STATES.map(({ id, label, name }) => (
                <div key={id} className={s.styledRadioButton}>
                  <RadioButtonTrue
                    id={id}
                    value="true"
                    onChange={() => {
                      setConsciousness(name);
                      onBlurHandler(name, "true");
                      // Сброс остальных
                      CONSCIOUSNESS_STATES.forEach((c) => {
                        if (c.name !== name) onBlurHandler(c.name, "");
                      });
                    }}
                    name="consciousness"
                    currentValue={consciousness === name ? "true" : ""}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.whiteBox}>
          {/* Тип ожога */}
          <div className={s.field}>
            <h2 className={s.title}>Вид ожога:</h2>
            <div className={s.buttonContainer}>
              {BURN_TYPES.map(({ id, label, name }) => (
                <div key={id} className={s.styledRadioButton}>
                  <RadioButtonTrue
                    id={id}
                    value="true"
                    onChange={() => {
                      setBurnType(name);
                      onBlurHandler(name, "true");
                      // Сброс остальных
                      BURN_TYPES.forEach((b) => {
                        if (b.name !== name) onBlurHandler(b.name, "");
                      });
                    }}
                    name="typeOfBurn"
                    currentValue={burnType === name ? "true" : ""}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.inputContainer}>
          {/* AD */}
          <div className={classNames(s.field, s.fields)}>
            <span className={s.title}>А / Д</span>
            <div className={s.inputWrapper}>
              <input
                type="text"
                placeholder="_ _"
                inputMode="numeric"
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

          {/* Пульс */}
          <div className={classNames(s.field, s.fields)}>
            <span className={s.title}>Пульс</span>
            <div className={s.inputWrapper}>
              <input
                type="text"
                placeholder="_ _"
                inputMode="numeric"
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

          {/* Сатурация */}
          <div className={classNames(s.field, s.fields)}>
            <span className={s.title}>Сатурация SpO₂</span>
            <div className={s.inputWrapper}>
              <input
                type="text"
                placeholder="_ _"
                inputMode="numeric"
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
        </div>
      </div>
    </div>
  );
};
