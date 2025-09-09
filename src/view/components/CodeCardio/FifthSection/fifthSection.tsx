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
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const FifthSectionCodeCardio = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [isASK, setIsASK] = useState("");
  const [isClopidogrel, setIsClopidogrel] = useState("");
  const [isHeparin, setIsHeparin] = useState("");
  const [isNitroglycerin, setIsNitroglycerin] = useState("");
  const [isMorphine, setIsMorphine] = useState("");
  const [isTLT, setIsTLT] = useState("");

  useEffect(() => {
    if (quizList) {
      setIsASK(quizList?.isASK ?? "");
      setIsClopidogrel(quizList?.isClopidogrel ?? "");
      setIsHeparin(quizList?.isHeparin ?? "");
      setIsNitroglycerin(quizList?.isNitroglycerin ?? "");
      setIsMorphine(quizList?.isMorphine ?? "");
      setIsTLT(quizList?.isTLT ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.FifthSection}>
      <Title>Раздел 5: Догоспитальное лечение (по протоколу ОКС)</Title>

      <div className={s.field}>
        <span className={s.title}>АСК 300 мг разжевать</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_1"
              value="true"
              onChange={(str) => {
                setIsASK(str);
                onBlurHandler("isASK", str);
              }}
              name="isASK"
              currentValue={isASK}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_2"
              value="false"
              onChange={(str) => {
                setIsASK(str);
                onBlurHandler("isASK", str);
              }}
              name="isASK"
              currentValue={isASK}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>
          Клопидогрел 300–600 мг (если нет противопоказаний)
        </span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="2_1"
              value="true"
              onChange={(str) => {
                setIsClopidogrel(str);
                onBlurHandler("isClopidogrel", str);
              }}
              name="isClopidogrel"
              currentValue={isClopidogrel}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="2_2"
              value="false"
              onChange={(str) => {
                setIsClopidogrel(str);
                onBlurHandler("isClopidogrel", str);
              }}
              name="isClopidogrel"
              currentValue={isClopidogrel}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Гепарин/Эноксапарин (если есть)</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_1"
              value="true"
              onChange={(str) => {
                setIsHeparin(str);
                onBlurHandler("isHeparin", str);
              }}
              name="isHeparin"
              currentValue={isHeparin}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_2"
              value="false"
              onChange={(str) => {
                setIsHeparin(str);
                onBlurHandler("isHeparin", str);
              }}
              name="isHeparin"
              currentValue={isHeparin}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>
          Нитроглицерин (при отсутствии гипотонии)
        </span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_1"
              value="true"
              onChange={(str) => {
                setIsNitroglycerin(str);
                onBlurHandler("isNitroglycerin", str);
              }}
              name="isNitroglycerin"
              currentValue={isNitroglycerin}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_2"
              value="false"
              onChange={(str) => {
                setIsNitroglycerin(str);
                onBlurHandler("isNitroglycerin", str);
              }}
              name="isNitroglycerin"
              currentValue={isNitroglycerin}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Морфин/анальгетик при болевом синдроме</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="5_1"
              value="true"
              onChange={(str) => {
                setIsMorphine(str);
                onBlurHandler("isMorphine", str);
              }}
              name="isMorphine"
              currentValue={isMorphine}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="5_2"
              value="false"
              onChange={(str) => {
                setIsMorphine(str);
                onBlurHandler("isMorphine", str);
              }}
              name="isMorphine"
              currentValue={isMorphine}
            />
            <span>нет</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>ТЛТ</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="6_1"
              value="true"
              onChange={(str) => {
                setIsTLT(str);
                onBlurHandler("isTLT", str);
              }}
              name="isTLT"
              currentValue={isTLT}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="6_2"
              value="false"
              onChange={(str) => {
                setIsTLT(str);
                onBlurHandler("isTLT", str);
              }}
              name="isTLT"
              currentValue={isTLT}
            />
            <span>нет</span>
          </div>
        </div>
      </div>
    </div>
  );
};
