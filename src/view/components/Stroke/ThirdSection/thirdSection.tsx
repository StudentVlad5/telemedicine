import s from "./index.module.scss";
import { CheckBox } from "../../../ui/CheckBox";
import { Title } from "../../../ui/Title";
import { InputTime } from "../../../ui/InputTime";
import { useState, useEffect } from "react";
import {
  useAppSelector,
  useThunks,
} from "../../../../common/helpers/reduxHook";
import { QuizThunks } from "../../../../store/thunks/quiz.thunks";
import { QuizState } from "../../../../store/reducers/quiz.reducer";
import {
  RadioButtonFalse,
  RadioButtonTrue,
  RadioButtonUnknow,
} from "../../../ui/RadioButtonWithoutSpan";
import { useOnBlurHandler } from "../../../../common/helpers/useOnBlurHandler";

export const ThirdSectionStroke = () => {
  const { addQuizAnswerThunk } = useThunks(QuizThunks);
  const { quizList } = useAppSelector(QuizState);
  const { onBlurHandler } = useOnBlurHandler({ addQuizAnswerThunk });

  const [beginStrokeTreatment, setBeginStrokeTreatment] =
    useState<boolean>(false);
  const [intravenousAccess, setIntravenousAccess] = useState<any>();
  const [patientTakingAnticoagulants, setPatientTakingAnticoagulants] =
    useState<any>();
  const [deliveryTimeHh, setDeliveryTimeHh] = useState<string>("");
  const [deliveryTimeMm, setDeliveryTimeMm] = useState<string>("");
  const [takeECG, setTakeECG] = useState<any>();

  useEffect(() => {
    quizList?.beginStrokeTreatment
      ? setBeginStrokeTreatment(
          quizList?.beginStrokeTreatment === "true"
            ? true
            : quizList?.beginStrokeTreatment === "true"
            ? false
            : false
        )
      : setBeginStrokeTreatment(false);

    quizList?.intravenousAccess
      ? setIntravenousAccess(
          quizList?.intravenousAccess === "true"
            ? "true"
            : quizList?.intravenousAccess === "true"
            ? "false"
            : "false"
        )
      : setIntravenousAccess("");

    quizList?.patientTakingAnticoagulants
      ? setPatientTakingAnticoagulants(
          quizList?.patientTakingAnticoagulants === "true"
            ? "true"
            : quizList?.patientTakingAnticoagulants === "false"
            ? "false"
            : "unknow"
        )
      : setPatientTakingAnticoagulants("");

    quizList?.takeECG
      ? setTakeECG(
          quizList?.takeECG === "true"
            ? "true"
            : quizList?.takeECG === "true"
            ? "false"
            : "false"
        )
      : setTakeECG("");

    quizList?.deliveryTimeHh
      ? setDeliveryTimeHh(quizList?.deliveryTimeHh)
      : setDeliveryTimeHh("");

    quizList?.deliveryTimeMm
      ? setDeliveryTimeMm(quizList?.deliveryTimeMm)
      : setDeliveryTimeMm("");
  }, [
    quizList?.beginStrokeTreatment,
    quizList?.intravenousAccess,
    quizList?.patientTakingAnticoagulants,
    quizList?.takeECG,
    quizList?.deliveryTimeHh,
    quizList?.deliveryTimeMm,
  ]);

  return (
    <div className={s.ThirdSection}>
      <Title>Раздел 2: Действия при подозрении на инсульт</Title>

      <div className={s.inner}>
        <CheckBox
          id={"1"}
          checked={beginStrokeTreatment}
          onChange={(e) => {
            setBeginStrokeTreatment(e.target.checked);
            onBlurHandler("beginStrokeTreatment", e.target.checked);
          }}
        >
          <div className={s.checkbox}>
            <span className={s.title}>
              Начата ли процедура лечения инсульта
            </span>
          </div>
        </CheckBox>
      </div>

      <div className={s.whiteBox}>
        <InputTime
          title={"Предполагаемое время доставки пациента в инсультный центр"}
          placeholder="00"
          valueHh={deliveryTimeHh}
          valueMm={deliveryTimeMm}
          onChangeHh={(str) => setDeliveryTimeHh(str)}
          onChangeMm={(str) => setDeliveryTimeMm(str)}
          onBlurHh={() =>
            onBlurHandler(
              "deliveryTimeHh",
              !deliveryTimeHh
                ? "00"
                : deliveryTimeHh.length === 1
                ? `0${deliveryTimeHh}`
                : deliveryTimeHh
            )
          }
          onBlurMm={() => {
            onBlurHandler(
              "deliveryTimeMm",
              !deliveryTimeMm
                ? "00"
                : deliveryTimeMm.length === 1
                ? `0${deliveryTimeMm}`
                : deliveryTimeMm
            );
          }}
        />
      </div>

      <div className={s.inner}>
        <table>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Установлен <strong>внутривенный доступ</strong>
                </span>{" "}
                <br />
                <span className={s.subtitle}>
                  (предпочтительно 2 канюли большого диаметра с портом)
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"1_1"}
                  value={"true"}
                  onChange={(str) => {
                    setIntravenousAccess(str);
                    onBlurHandler("intravenousAccess", str);
                  }}
                  name={"intravenousAccess"}
                  currentValue={intravenousAccess}
                />
                <RadioButtonFalse
                  id={"1_2"}
                  value={"false"}
                  onChange={(str) => {
                    setIntravenousAccess(str);
                    onBlurHandler("intravenousAccess", str);
                  }}
                  name={"intravenousAccess"}
                  currentValue={intravenousAccess}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>
                  Пациент принимает <strong>антикоагулянты</strong>
                </span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"2_1"}
                  value={"true"}
                  onChange={(str) => {
                    setPatientTakingAnticoagulants(str);
                    onBlurHandler("patientTakingAnticoagulants", str);
                  }}
                  name={"patientTakingAnticoagulants"}
                  currentValue={patientTakingAnticoagulants}
                />
                <RadioButtonFalse
                  id={"2_2"}
                  value={"false"}
                  onChange={(str) => {
                    setPatientTakingAnticoagulants(str);
                    onBlurHandler("patientTakingAnticoagulants", str);
                  }}
                  name={"patientTakingAnticoagulants"}
                  currentValue={patientTakingAnticoagulants}
                />
                <RadioButtonUnknow
                  id={"2_3"}
                  value={"unknow"}
                  onChange={(str) => {
                    setPatientTakingAnticoagulants(str);
                    onBlurHandler("patientTakingAnticoagulants", str);
                  }}
                  name={"patientTakingAnticoagulants"}
                  currentValue={patientTakingAnticoagulants}
                />
              </td>
            </tr>

            <tr className={s.tableRow}>
              <td className={s.checkbox}>
                <span className={s.title}>Снимите ЭКГ у пациента</span>
              </td>
              <td className={s.tdButton}>
                <RadioButtonTrue
                  id={"3_1"}
                  value={"true"}
                  onChange={(str) => {
                    setTakeECG(str);
                    onBlurHandler("takeECG", str);
                  }}
                  name={"takeECG"}
                  currentValue={takeECG}
                />
                <RadioButtonFalse
                  id={"3_2"}
                  value={"false"}
                  onChange={(str) => {
                    setTakeECG(str);
                    onBlurHandler("takeECG", str);
                  }}
                  name={"takeECG"}
                  currentValue={takeECG}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
