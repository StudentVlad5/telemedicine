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
import { InputText } from "../../../ui/InputText";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const SecondSectionCodeCardio = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [isChestPain, setIsChestPain] = useState("");
  const [natureChestPain, setNatureChestPain] = useState("");
  const [localizationChestPain, setLocalizationChestPain] = useState("");
  const [irradiationChestPain, setIrradiationChestPain] = useState("");
  const [durationChestPain, setDurationChestPain] = useState("");
  const [isShortnessBreath, setIsShortnessBreath] = useState("");
  const [isWeakness, setIsWeakness] = useState("");
  const [isNausea, setIsNausea] = useState("");
  const [isLossOfConsciousness, setIsLossOfConsciousness] = useState("");

  useEffect(() => {
    if (quizList) {
      setIsChestPain(quizList?.isChestPain ?? "");
      setNatureChestPain(quizList?.natureChestPain ?? "");
      setLocalizationChestPain(quizList?.localizationChestPain ?? "");
      setIrradiationChestPain(quizList?.irradiationChestPain ?? "");
      setDurationChestPain(quizList?.durationChestPain ?? "");
      setIsShortnessBreath(quizList?.isShortnessBreath ?? "");
      setIsWeakness(quizList?.isWeakness ?? "");
      setIsNausea(quizList?.isNausea ?? "");
      setIsLossOfConsciousness(quizList?.isLossOfConsciousness ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.SecondSection}>
      <Title>Раздел 2: Клиническая картина</Title>

      <div className={s.field}>
        <span className={s.title}>Боль в груди</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_1"
              value="true"
              onChange={(str) => {
                setIsChestPain(str);
                onBlurHandler("isChestPain", str);
              }}
              name="isChestPain"
              currentValue={isChestPain}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_2"
              value="false"
              onChange={(str) => {
                setIsChestPain(str);
                onBlurHandler("isChestPain", str);
              }}
              name="isChestPain"
              currentValue={isChestPain}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Характер:</span>
        <div className={s.whiteBox}>
          <InputText
            className={s.textInputStyle}
            onChange={(e) => setNatureChestPain(e.target.value)}
            value={natureChestPain}
            onBlur={() => onBlurHandler("natureChestPain", natureChestPain)}
            disabled={!isChestPain}
          />
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Локализация:</span>
        <div className={s.whiteBox}>
          <InputText
            className={s.textInputStyle}
            onChange={(e) => setLocalizationChestPain(e.target.value)}
            value={localizationChestPain}
            onBlur={() =>
              onBlurHandler("localizationChestPain", localizationChestPain)
            }
            disabled={!isChestPain}
          />
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Иррадиация:</span>
        <div className={s.whiteBox}>
          <InputText
            className={s.textInputStyle}
            onChange={(e) => setIrradiationChestPain(e.target.value)}
            value={localizationChestPain}
            onBlur={() =>
              onBlurHandler("irradiationChestPain", irradiationChestPain)
            }
            disabled={!isChestPain}
          />
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Длительность:</span>
        <div className={s.whiteBox}>
          <InputText
            className={s.textInputStyle}
            onChange={(e) => setDurationChestPain(e.target.value)}
            value={durationChestPain}
            onBlur={() => onBlurHandler("durationChestPain", durationChestPain)}
            disabled={!isChestPain}
          />
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Одышка</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="2_1"
              value="true"
              onChange={(str) => {
                setIsShortnessBreath(str);
                onBlurHandler("isShortnessBreath", str);
              }}
              name="isShortnessBreath"
              currentValue={isShortnessBreath}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="2_2"
              value="false"
              onChange={(str) => {
                setIsShortnessBreath(str);
                onBlurHandler("isShortnessBreath", str);
              }}
              name="isShortnessBreath"
              currentValue={isShortnessBreath}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Потливость, слабость</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_1"
              value="true"
              onChange={(str) => {
                setIsWeakness(str);
                onBlurHandler("isWeakness", str);
              }}
              name="isWeakness"
              currentValue={isWeakness}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_2"
              value="false"
              onChange={(str) => {
                setIsWeakness(str);
                onBlurHandler("isWeakness", str);
              }}
              name="isWeakness"
              currentValue={isWeakness}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Тошнота / рвота</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_1"
              value="true"
              onChange={(str) => {
                setIsNausea(str);
                onBlurHandler("isNausea", str);
              }}
              name="isNausea"
              currentValue={isNausea}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_2"
              value="false"
              onChange={(str) => {
                setIsNausea(str);
                onBlurHandler("isNausea", str);
              }}
              name="isNausea"
              currentValue={isNausea}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Потеря сознания / головокружение</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="5_1"
              value="true"
              onChange={(str) => {
                setIsLossOfConsciousness(str);
                onBlurHandler("isLossOfConsciousness", str);
              }}
              name="isLossOfConsciousness"
              currentValue={isLossOfConsciousness}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="5_2"
              value="false"
              onChange={(str) => {
                setIsLossOfConsciousness(str);
                onBlurHandler("isLossOfConsciousness", str);
              }}
              name="isLossOfConsciousness"
              currentValue={isLossOfConsciousness}
            />
            <span>нет</span>
          </div>
        </div>
      </div>
    </div>
  );
};
