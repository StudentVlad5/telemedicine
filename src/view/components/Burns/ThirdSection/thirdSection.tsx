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
import { Button } from "../../../ui/Button";
import BodyModal from "./bodyModal";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const ThirdSectionBurns = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [isOpen, setIsOpen] = useState(false);
  const [symptomPaleSpots, setSymptomPaleSpots] = useState("");
  const [localizationOfPlaces, setLocalizationOfPlaces] = useState("");
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  useEffect(() => {
    if (quizList) {
      setSymptomPaleSpots(quizList?.symptomPaleSpots ?? "");
      setLocalizationOfPlaces(quizList?.localizationOfPlaces ?? "");
      setSelectedZones(quizList?.selectedZones ?? []);
    }
  }, [quizList]);

  return (
    <div className={s.ThirdSection}>
      <Title>Раздел 2: Соберите следующую информацию</Title>

      <div className={s.field}>
        <span className={s.title}>Симптом бледного пятна</span>
        <div className={s.radioGroup}>
          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_1"
              value="less5"
              onChange={(str) => {
                setSymptomPaleSpots(str);
                onBlurHandler("symptomPaleSpots", str);
              }}
              name="symptomPaleSpots"
              currentValue={symptomPaleSpots}
            />
            <span>менее 5 сек</span>
          </div>

          <div className={s.subtitleBn}>
            <RadioButtonTrue
              id="1_2"
              value="more5"
              onChange={(str) => {
                setSymptomPaleSpots(str);
                onBlurHandler("symptomPaleSpots", str);
              }}
              name="symptomPaleSpots"
              currentValue={symptomPaleSpots}
            />
            <span>более 5 сек</span>
          </div>
        </div>
      </div>
      <div className={s.field}>
        <span className={s.title}>Локализация мест ожога</span>
        <div className={s.inputWrapper}>
          <input
            placeholder=""
            title="localizationOfPlaces"
            type="text"
            inputMode="text"
            value={localizationOfPlaces}
            onChange={(e) => setLocalizationOfPlaces(e.target.value)}
            onBlur={() =>
              onBlurHandler("localizationOfPlaces", localizationOfPlaces)
            }
          />
        </div>
      </div>

      <div className={s.field}>
        <span className={s.title}>Площадь поражения</span>
        <div className={s.inputWrapper}>
          <Button classname={s.chooseButton} onClick={() => setIsOpen(true)}>
            Выбрать
          </Button>
          {isOpen && (
            <BodyModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              selectedZones={selectedZones}
              setSelectedZones={setSelectedZones}
            />
          )}
        </div>
      </div>
    </div>
  );
};
