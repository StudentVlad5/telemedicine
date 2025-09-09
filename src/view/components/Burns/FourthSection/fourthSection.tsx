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
import { InputTime } from "../../../ui/InputTime";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const FourthSectionBurns = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [analgesia, setAnalgesia] = useState("");
  const [pressureBandage, setPressureBandage] = useState("");
  const [tourniquetHh, setTourniquetHh] = useState("");
  const [tourniquetMm, setTourniquetMm] = useState("");
  const [catheter, setCatheter] = useState("");
  const [infusion, setInfusion] = useState("");

  useEffect(() => {
    if (quizList) {
      setAnalgesia(quizList?.analgesia ?? "");
      setPressureBandage(quizList?.pressureBandage ?? "");
      setTourniquetHh(quizList?.tourniquetHh ?? "");
      setTourniquetMm(quizList?.tourniquetMm ?? "");
      setCatheter(quizList?.catheter ?? "");
      setInfusion(quizList?.infusion ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.FourthSection}>
      <Title>Раздел 2: Соберите следующую информацию</Title>

      <div className={s.field}>
        <span className={s.title}>Обезболивание</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_1"
              value="narcotic"
              onChange={(str) => {
                setAnalgesia(str);
                onBlurHandler("analgesia", str);
              }}
              name="analgesia"
              currentValue={analgesia}
            />
            <span>наркотическое</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_2"
              value="non-narcotic"
              onChange={(str) => {
                setAnalgesia(str);
                onBlurHandler("analgesia", str);
              }}
              name="analgesia"
              currentValue={analgesia}
            />
            <span>ненаркотическое</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_3"
              value="other"
              onChange={(str) => {
                setAnalgesia(str);
                onBlurHandler("analgesia", str);
              }}
              name="analgesia"
              currentValue={analgesia}
            />
            <span>другое</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Остановка кровотечения:</span>
      </div>
      <div className={s.field}>
        <div className={s.whiteBox}>
          <InputTime
            title={"Наложение жгута"}
            valueHh={tourniquetHh}
            valueMm={tourniquetMm}
            onChangeHh={(str) => setTourniquetHh(str)}
            onChangeMm={(str) => setTourniquetMm(str)}
            onBlurHh={() =>
              onBlurHandler(
                "tourniquetHh",
                !tourniquetHh
                  ? "00"
                  : tourniquetHh.length === 1
                  ? `0${tourniquetHh}`
                  : tourniquetHh
              )
            }
            onBlurMm={() => {
              onBlurHandler(
                "tourniquetMm",
                !tourniquetMm
                  ? "00"
                  : tourniquetMm.length === 1
                  ? `0${tourniquetMm}`
                  : tourniquetMm
              );
            }}
          />
        </div>
        <span className={s.title}>Давящая повязка</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="2_1"
              value="true"
              onChange={(str) => {
                setPressureBandage(str);
                onBlurHandler("pressureBandage", str);
              }}
              name="pressureBandage"
              currentValue={pressureBandage}
            />
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonFalse
              id="2_2"
              value="non-narcotic"
              onChange={(str) => {
                setPressureBandage(str);
                onBlurHandler("pressureBandage", str);
              }}
              name="pressureBandage"
              currentValue={pressureBandage}
            />
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Установка периферического катетера</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_1"
              value="true"
              onChange={(str) => {
                setAnalgesia(str);
                onBlurHandler("catheter", str);
              }}
              name="catheter"
              currentValue={catheter}
            />
            <span>да</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_2"
              value="false"
              onChange={(str) => {
                setCatheter(str);
                onBlurHandler("catheter", str);
              }}
              name="catheter"
              currentValue={catheter}
            />
            <span>нет</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="3_3"
              value="other"
              onChange={(str) => {
                setCatheter(str);
                onBlurHandler("catheter", str);
              }}
              name="catheter"
              currentValue={catheter}
            />
            <span>другое</span>
          </div>
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Инфузия</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_1"
              value="glucose 5%"
              onChange={(str) => {
                setInfusion(str);
                onBlurHandler("infusion", str);
              }}
              name="infusion"
              currentValue={infusion}
            />
            <span>глюкоза  5%</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_2"
              value="saline solution 0.9%"
              onChange={(str) => {
                setInfusion(str);
                onBlurHandler("infusion", str);
              }}
              name="infusion"
              currentValue={infusion}
            />
            <span>физ раствор 0,9%</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_3"
              value="polyglucin"
              onChange={(str) => {
                setInfusion(str);
                onBlurHandler("infusion", str);
              }}
              name="infusion"
              currentValue={infusion}
            />
            <span>полиглюкин</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_4"
              value="aminocaproic"
              onChange={(str) => {
                setInfusion(str);
                onBlurHandler("infusion", str);
              }}
              name="infusion"
              currentValue={infusion}
            />
            <span>аминокапроновая</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_5"
              value="acid 5%"
              onChange={(str) => {
                setInfusion(str);
                onBlurHandler("infusion", str);
              }}
              name="infusion"
              currentValue={infusion}
            />
            <span>кислота 5%</span>
          </div>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="4_6"
              value="other%"
              onChange={(str) => {
                setInfusion(str);
                onBlurHandler("infusion", str);
              }}
              name="infusion"
              currentValue={infusion}
            />
            <span>другое</span>
          </div>
        </div>
      </div>
    </div>
  );
};
