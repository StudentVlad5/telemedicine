import { useEffect } from "react";
import { IMaskInput } from "react-imask";
import { InputNumber } from "../../ui/InputNumber";
import classNames from "classnames";
import ClueImg from "../../../assets/images/clue.png";
import { baseUrl } from "../../../common/config";
import s from "./index.module.scss";

const Identification = ({
  setNumber,
  number,
  employeeID,
  setEmployeeID,
  setIsOpenClue,
  setIsOpenClue2,
  setEmployeeName,
  invalidMessage,
}: {
  setNumber: (number: string) => void;
  number: string;
  employeeID: string;
  invalidMessage: string;
  setEmployeeID: (employeeID: string) => void;
  setIsOpenClue: (isOpenClue: boolean) => void;
  setIsOpenClue2: (isOpenClue2: boolean) => void;
  setEmployeeName: (employeeName: string) => void;
}) => {
  useEffect(() => {
    async function getData() {
      await fetch(`${baseUrl}/getvrach?employeeID=${employeeID}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response was not ok");
          }
          return response.json();
        })
        .then((newrData) => {
          if ("discription" in newrData) {
            newrData.discription === ""
              ? setEmployeeName("Успешная регистрация без идентификации")
              : setEmployeeName(newrData.discription);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (employeeID && employeeID.length > 4 && number && number.length > 0) {
      getData();
    }
  }, [employeeID, number, setEmployeeName]);

  const onChange = (e: any) => {
    setNumber(e.target.value);
  };

  return (
    <>
      {" "}
      <div className={s.inputWrapper}>
        <IMaskInput
          className={s.textInput}
          value={number}
          inputMode="numeric"
          onChange={onChange}
          placeholder="Введите № бригады СМП"
          mask={"00"}
        />
        <button
          type="button"
          title="The brigade number"
          className={s.clue}
          onClick={() => setIsOpenClue(true)}
        >
          <img src={ClueImg} alt="" />
        </button>
      </div>
      <div className={classNames(s.inputWrapper, s.oneItem)}>
        {invalidMessage && (
          <span className={s.invalidMessage}>{invalidMessage}</span>
        )}
        <InputNumber
          value={employeeID}
          placeholder={"Идентификатор сотрудника"}
          inputMode={"numeric"}
          onChange={(e) => setEmployeeID(e.target.value)}
          maxLength={5}
          minLength={5}
        />
        <button
          type="button"
          title="Employee ID"
          className={s.clue}
          onClick={() => setIsOpenClue2(true)}
        >
          <img src={ClueImg} alt="" />
        </button>
      </div>
    </>
  );
};

export default Identification;
