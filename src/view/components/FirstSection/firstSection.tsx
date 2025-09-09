import s from "./index.module.scss";
import { Title } from "../../ui/Title";
import { InputText } from "../../ui/InputText";
import { Textarea } from "../../ui/Textarea";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector, useThunks } from "../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../store/thunks/quiz.thunks";
import { InputNumber } from "../../ui/InputNumber";
import { QuizState } from "../../../store/reducers/quiz.reducer";
import { InputDate } from "../../ui/InputDate";
import { RadioButton } from "../../ui/RadioButton";
import { useOnBlurHandler } from "../../../common/helpers/useOnBlurHandler";

export const FirstSection = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [patientFullName, setPatientFullName] = useState<string>(
    quizList?.patientFullName ? quizList.patientFullName : ""
  );
  const [patientINN, setPatientINN] = useState<string>(
    quizList?.patientINN ? quizList.patientINN : ""
  );
  const [birthdayDate, setBirthdayDate] = useState<string>(
    quizList?.birthdayDate ? quizList.birthdayDate : ""
  );
  const [comments, setComments] = useState<string>(
    quizList?.comments ? quizList.comments : ""
  );
  const [homeAddress, setHomeAddress] = useState<string>(
    quizList?.homeAddress ? quizList.homeAddress : ""
  );
  const [userLocation, setUserLocation] = useState("");
  const [invalidMessage, setInvalidMessage] = useState("");
  const [sex, setSex] = useState("");

  useEffect(() => {
    if (!quizList?.userLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation(latitude + ", " + longitude);
            onBlurHandler("userLocation", latitude + ", " + longitude);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser");
      }
    }
  }, [quizList?.userLocation]);

  useMemo(() => {
    if (patientINN && patientINN.length !== 12)
      setInvalidMessage("Длинна ИИН - 12 символов");
    else setInvalidMessage("");
  }, [patientINN]);

  useMemo(() => {
    if (quizList) {
      setPatientFullName(quizList.patientFullName ?? "");
      setPatientINN(quizList.patientINN ?? "");
      setHomeAddress(quizList.homeAddress ?? "");
      setComments(quizList.comments ?? "");
      setSex(quizList.sex ?? "");
      if (quizList.userLocation) {
        setUserLocation(quizList.userLocation);
      }
    }
  }, [quizList]);

  return (
    <div className={s.PatientInformation}>
      <Title>Раздел 1: Информация по пациенту</Title>
      <div className={s.inner}>
        <InputText
          title={"ФИО пациента"}
          onChange={(e) => setPatientFullName(e.target.value)}
          value={patientFullName}
          subtitle={
            "Внесите информацию по визуальному осмотру, если данных по личности не имеются"
          }
          onBlur={() => onBlurHandler("patientFullName", patientFullName)}
        />

        <InputNumber
          title={"ИИН пациента"}
          invalidMessage={invalidMessage}
          inputMode={"numeric"}
          onChange={(e) => setPatientINN(e.target.value)}
          value={patientINN}
          minLength={12}
          maxLength={12}
          onBlur={() => onBlurHandler("patientINN", patientINN)}
        />

        <div className={s.birthdayDataContainer}>
          <span>Дата рождения</span>
          <InputDate
            valueDate={birthdayDate}
            max={new Date().toISOString().split("T")[0]}
            onChangeDate={(e) => setBirthdayDate(e.target.value)}
            onBlur={() => {
              onBlurHandler("birthdayDate", birthdayDate);
            }}
          />
        </div>

        <Textarea
          title={"Комментарий"}
          onChange={(e) => setComments(e.target.value)}
          value={comments}
          onBlur={() => onBlurHandler("comments", comments)}
        />

        <Textarea
          title={"Домашний адрес"}
          onChange={(e) => setHomeAddress(e.target.value)}
          value={homeAddress}
          onBlur={() => onBlurHandler("homeAddress", homeAddress)}
        />

        <Textarea
          title={"Место прикрепления"}
          onChange={(e) => setUserLocation(e.target.value)}
          value={userLocation}
          onBlur={() => onBlurHandler("userLocation", userLocation)}
        />

        <div className={s.sexDataContainer}>
          <span>Пол пациента</span>
          <RadioButton
            id={"man"}
            value={"М"}
            onChange={(str) => {
              setSex(str);
              onBlurHandler("sex", str);
            }}
            name={"sex"}
            currentValue={sex}
          />
          <RadioButton
            id={"woman"}
            value={"Ж"}
            onChange={(str) => {
              setSex(str);
              onBlurHandler("sex", str);
            }}
            name={"sex"}
            currentValue={sex}
          />
        </div>
      </div>
    </div>
  );
};
