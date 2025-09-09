import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useEffect, useState } from "react";
// import {useDebounce} from "../../../common/helpers/useDebounceHook";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { RadioButton } from "../../../ui/RadioButton";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";
import { validate } from "../../../../common/helpers/validate";

export const FourthSectionStroke = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [bloodSugarLevel, setBloodSugarLevel] = useState(
    quizList?.bloodSugarLevel ?? ""
  );
  const [bodyTemperature, setBodyTemperature] = useState(
    quizList?.bodyTemperature ?? ""
  );
  const [arterialPressureS, setArterialPressureS] = useState(
    quizList?.arterialPressureS ?? ""
  );
  const [arterialPressureD, setArterialPressureD] = useState(
    quizList?.arterialPressureD ?? ""
  );
  const [patientBodyWeight, setPatientBodyWeight] = useState(
    quizList?.patientBodyWeight ?? ""
  );
  const [patientAge, setPatientAge] = useState(quizList?.patientAge ?? "");

  useEffect(() => {
    if (quizList) {
      setBloodSugarLevel(quizList?.bloodSugarLevel ?? "");
      setBodyTemperature(quizList?.bodyTemperature ?? "");
      setArterialPressureS(quizList?.arterialPressureS ?? "");
      setArterialPressureD(quizList?.arterialPressureD ?? "");
      setPatientBodyWeight(quizList?.patientBodyWeight ?? "");
      setPatientAge(quizList?.patientAge ?? "");
    }
  }, [quizList]);

  return (
    <div className={s.FourthSection}>
      <Title>Раздел 3: Соберите следующую информацию</Title>
      <div className={s.inner}>
        <div className={s.field}>
          <span className={s.title}>Содержание сахара в крови</span>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={bloodSugarLevel}
              onChange={(e) => setBloodSugarLevel(e.target.value)}
              onBlur={() => onBlurHandler("bloodSugarLevel", bloodSugarLevel)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.unit}>
            <span>ммоль/л</span>
          </div>
        </div>

        <div className={s.field}>
          <span className={s.title}>Температура тела</span>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={bodyTemperature}
              onChange={(e) => setBodyTemperature(e.target.value)}
              onBlur={() => onBlurHandler("bodyTemperature", bodyTemperature)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.unit}>
            <span>°C</span>
          </div>
        </div>

        <div className={s.field}>
          <span className={s.title}>Артериальное давление</span>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={arterialPressureS}
              onChange={(e) => setArterialPressureS(e.target.value)}
              onBlur={() =>
                onBlurHandler("arterialPressureS", arterialPressureS)
              }
              onKeyPress={validate}
            />
            <span className={s.name}>САД</span>
          </div>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={arterialPressureD}
              onChange={(e) => setArterialPressureD(e.target.value)}
              onBlur={() =>
                onBlurHandler("arterialPressureD", arterialPressureD)
              }
              onKeyPress={validate}
            />
            <span className={s.name}>ДАД</span>
          </div>
        </div>

        <div className={s.field}>
          <span className={s.title}>Масса тела пациента</span>
          <div className={s.inputWrapper}>
            <RadioButton
              id={"patientBodyWeight_1"}
              value={"50-75"}
              onChange={(str) => {
                setPatientBodyWeight(str);
                onBlurHandler("patientBodyWeight", str);
              }}
              name={"patientBodyWeight"}
              currentValue={patientBodyWeight}
            />
            <RadioButton
              id={"patientBodyWeight_2"}
              value={"76-100"}
              onChange={(str) => {
                setPatientBodyWeight(str);
                onBlurHandler("patientBodyWeight", str);
              }}
              name={"patientBodyWeight"}
              currentValue={patientBodyWeight}
            />
            <RadioButton
              id={"patientBodyWeight_3"}
              value={"101+"}
              onChange={(str) => {
                setPatientBodyWeight(str);
                onBlurHandler("patientBodyWeight", str);
              }}
              name={"patientBodyWeight"}
              currentValue={patientBodyWeight}
            />
          </div>
          <div className={s.unit}>
            <span>кг</span>
          </div>
        </div>

        <div className={s.field}>
          <span className={s.title}>Возраст пациента</span>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder={"_ _"}
              inputMode={"numeric"}
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              onBlur={() => onBlurHandler("patientAge", patientAge)}
              onKeyPress={validate}
            />
          </div>
          <div className={s.unit}>
            <span>лет</span>
          </div>
        </div>
      </div>
    </div>
  );
};
