import s from "./index.module.scss";
import { Title } from "../../../ui/Title";
import { useEffect, useState } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import { CheckBox } from "../../../ui/CheckBox";
import { InputText } from "../../../ui/InputText";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const SeventhSectionAlergoCod = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [isAdrenaline, setIsAdrenaline] = useState<boolean>(false);
  const [isDexamethasone, setIsDexamethasone] = useState<boolean>(false);
  const [isSuprastin, setIsSuprastin] = useState<boolean>(false);
  const [isSolutions, setIsSolutions] = useState<boolean>(false);
  const [isInhalation, setIsInhalation] = useState<boolean>(false);
  const [isOtherapy, setIsOtherapy] = useState<boolean>(false);

  const [adrenaline, setAdrenaline] = useState<string>("");
  const [dexamethasone, setDexamethasone] = useState<string>("");
  const [suprastin, setSuprastin] = useState<string>("");
  const [solutions, setSolutions] = useState<string>("");
  const [inhalation, setInhalation] = useState<string>("");
  const [otherapy, setOtherapy] = useState<string>("");

  useEffect(() => {
    if (quizList) {
      setIsAdrenaline(quizList?.isAdrenaline === "true");
      setIsDexamethasone(quizList?.isDexamethasone === "true");
      setIsSuprastin(quizList?.isSuprastin === "true");
      setIsSolutions(quizList?.isSolutions === "true");
      setIsInhalation(quizList?.isInhalation === "true");
      setIsOtherapy(quizList?.isOtherapy === "true");

      setAdrenaline(quizList?.adrenaline ?? "");
      setDexamethasone(quizList?.dexamethasone ?? "");
      setSuprastin(quizList?.suprastin ?? "");
      setSolutions(quizList?.solutions ?? "");
      setInhalation(quizList?.inhalation ?? "");
      setOtherapy(quizList?.otherapy ?? "");
    }
  }, [quizList]);

  const handleChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    addQuizAnswerThunk({
      params: {
        [id]: [checked],
      },
    });

    switch (id) {
      case "isAdrenaline":
        setIsAdrenaline(checked);
        break;
      case "isDexamethasone":
        setIsDexamethasone(checked);
        break;
      case "isSuprastin":
        setIsSuprastin(checked);
        break;
      case "isSolutions":
        setIsSolutions(checked);
        break;
      case "isInhalation":
        setIsInhalation(checked);
        break;
      case "isOtherapy":
        setIsOtherapy(checked);
        break;
      default:
        break;
    }
  };

  return (
    <div className={s.SeventhSection}>
      <Title>Раздел 6: Проведённая терапия</Title>

      {/* Адреналин */}
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setAdrenaline(e.target.value)}
          value={adrenaline}
          onBlur={() => onBlurHandler("adrenaline", adrenaline)}
          disabled={!isAdrenaline}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id="isAdrenaline"
            checked={isAdrenaline}
            onChange={handleChangeCheckBox}
          >
            Адреналин 0,1% в/м
          </CheckBox>
        </div>
      </div>

      {/* Дексаметазон */}
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setDexamethasone(e.target.value)}
          value={dexamethasone}
          onBlur={() => onBlurHandler("dexamethasone", dexamethasone)}
          disabled={!isDexamethasone}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id="isDexamethasone"
            checked={isDexamethasone}
            onChange={handleChangeCheckBox}
          >
            Преднизолон / Дексаметазон
          </CheckBox>
        </div>
      </div>

      {/* Супрастин */}
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setSuprastin(e.target.value)}
          value={suprastin}
          onBlur={() => onBlurHandler("suprastin", suprastin)}
          disabled={!isSuprastin}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id="isSuprastin"
            checked={isSuprastin}
            onChange={handleChangeCheckBox}
          >
            Супрастин / Димедрол
          </CheckBox>
        </div>
      </div>

      {/* Растворы */}
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setSolutions(e.target.value)}
          value={solutions}
          onBlur={() => onBlurHandler("solutions", solutions)}
          disabled={!isSolutions}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id="isSolutions"
            checked={isSolutions}
            onChange={handleChangeCheckBox}
          >
            Растворы (NaCl,.)
          </CheckBox>
        </div>
      </div>

      {/* Ингаляции */}
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setInhalation(e.target.value)}
          value={inhalation}
          onBlur={() => onBlurHandler("inhalation", inhalation)}
          disabled={!isInhalation}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id="isInhalation"
            checked={isInhalation}
            onChange={handleChangeCheckBox}
          >
            Ингаляции (сальбутамол и др.)
          </CheckBox>
        </div>
      </div>

      {/* терапия */}
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setOtherapy(e.target.value)}
          value={otherapy}
          onBlur={() => onBlurHandler("otherapy", otherapy)}
          disabled={!isOtherapy}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id="isOtherapy"
            checked={isOtherapy}
            onChange={handleChangeCheckBox}
          >
            О₂-терапия
          </CheckBox>
        </div>
      </div>
    </div>
  );
};
