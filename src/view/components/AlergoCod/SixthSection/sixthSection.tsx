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

export const SixthSectionAlergoCod = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [isMedicin, setIsMedicin] = useState<boolean>(false);
  const [isFoodProduct, setIsFoodProduct] = useState<boolean>(false);
  const [isStingInsect, setIsStingInsect] = useState<boolean>(false);
  const [isAllergen, setIsAllergen] = useState<boolean>(false);
  const [isNotEstablished, setIsNotEstablished] = useState<boolean>(false);

  const [medicin, setMedicin] = useState<string>("");
  const [foodProduct, setFoodProduct] = useState<string>("");
  const [stingInsect, setStingInsect] = useState<string>("");
  const [allergen, setAllergen] = useState<string>("");
  const [notEstablished, setNotEstablished] = useState<string>("");

  useEffect(() => {
    if (quizList) {
      setIsMedicin(quizList?.isMedicin === "true" ? true : false);
      setIsFoodProduct(quizList?.isFoodProduct === "true" ? true : false);
      setIsStingInsect(quizList?.isStingInsect === "true" ? true : false);
      setIsAllergen(quizList?.isAllergen === "true" ? true : false);
      setIsNotEstablished(quizList?.isNotEstablished === "true" ? true : false);

      setMedicin(quizList?.medicin ?? "");
      setFoodProduct(quizList?.foodProduct ?? "");
      setStingInsect(quizList?.stingInsect ?? "");
      setAllergen(quizList?.allergen ?? "");
      setNotEstablished(quizList?.notEstablished ?? "");
    }
  }, [quizList]);

  function handleChangeCheckBox(e: any) {
    addQuizAnswerThunk({
      params: {
        [e.target.id]: [e.target.checked],
      },
    });
    switch (e.target.id) {
      case "isMedicin":
        setIsMedicin(e.target.checked);
        break;
      case "isFoodProduct":
        setIsFoodProduct(e.target.checked);
        break;
      case "isStingInsect":
        setIsStingInsect(e.target.checked);
        break;
      case "isAllergen":
        setIsAllergen(e.target.checked);
        break;
      case "isNotEstablished":
        setIsNotEstablished(e.target.checked);
        break;
      default:
        break;
    }
  }

  return (
    <div className={s.SixthSection}>
      <Title>Раздел 5: Предполагаемый аллерген</Title>

      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setMedicin(e.target.value)}
          value={medicin}
          onBlur={() => onBlurHandler("medicin", medicin)}
          disabled={!isMedicin}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id={"isMedicin"}
            checked={isMedicin}
            onChange={(e) => handleChangeCheckBox(e)}
          >
            Лекарственный препарат
          </CheckBox>
        </div>
      </div>
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setFoodProduct(e.target.value)}
          value={foodProduct}
          onBlur={() => onBlurHandler("foodProduct", foodProduct)}
          disabled={!isFoodProduct}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id={"isFoodProduct"}
            checked={isFoodProduct}
            onChange={(e) => handleChangeCheckBox(e)}
          >
            Пищевой продукт
          </CheckBox>
        </div>
      </div>
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setStingInsect(e.target.value)}
          value={stingInsect}
          onBlur={() => onBlurHandler("stingInsect", stingInsect)}
          disabled={!isStingInsect}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id={"isStingInsect"}
            checked={isStingInsect}
            onChange={(e) => handleChangeCheckBox(e)}
          >
            Укус / ужаление насекомого
          </CheckBox>
        </div>
      </div>
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setAllergen(e.target.value)}
          value={allergen}
          onBlur={() => onBlurHandler("allergen", allergen)}
          disabled={!isAllergen}
        />
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id={"isAllergen"}
            checked={isAllergen}
            onChange={(e) => handleChangeCheckBox(e)}
          >
            Контактный аллерген (косметика, латекс и др.)
          </CheckBox>
        </div>
      </div>
      <div className={s.whiteBox}>
        <div className={s.checkboxWrapper}>
          <CheckBox
            className={s.check}
            id={"isNotEstablished"}
            checked={isNotEstablished}
            onChange={(e) => handleChangeCheckBox(e)}
          >
            Неустановлен
          </CheckBox>
        </div>
      </div>
      <div className={s.whiteBox}>
        <InputText
          className={s.textInputStyle}
          onChange={(e) => setNotEstablished(e.target.value)}
          value={notEstablished}
          onBlur={() => onBlurHandler("notEstablished", notEstablished)}
        />
        <div className={s.checkboxWrapper}>Дополнительный Комментарий:</div>
      </div>
    </div>
  );
};
