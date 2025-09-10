// import { useEffect } from "react";
import { InputNumber } from "../../ui/InputNumber";
import classNames from "classnames";
import s from "./index.module.scss";

const Identification = ({
  id,
  setId,
  invalidMessage,
}: {
  id: string;
  invalidMessage: string;
  setId: (id: string) => void;
}) => {
  const onChange = (e: any) => {
    setId(e.target.value);
  };

  return (
    <>
      {" "}
      <div className={s.inputWrapper}>
        <InputNumber
          className={s.textInput}
          value={id}
          inputMode="numeric"
          onChange={onChange}
          placeholder="Введите идентификатор"
          maxLength={7}
          minLength={7}
        />
      </div>
      <div className={classNames(s.inputWrapper, s.oneItem)}>
        {invalidMessage && (
          <span className={s.invalidMessage}>{invalidMessage}</span>
        )}
      </div>
    </>
  );
};

export default Identification;
