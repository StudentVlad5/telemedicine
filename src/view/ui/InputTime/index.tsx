import s from "./index.module.scss";
import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "onBlur"
>;

export const InputTime = ({
  title,
  onChangeHh,
  onChangeMm,
  onBlurHh,
  onBlurMm,
  valueHh,
  valueMm,
  ...otherProps
}: {
  title?: string;
  onChangeHh?: (str: string) => void;
  onChangeMm?: (str: string) => void;
  onBlurHh?: () => void;
  onBlurMm?: () => void;
  valueHh: string;
  valueMm: string;
} & HTMLInputProps) => {
  function validate(evt: any) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  const onChangeHandlerHh = (e: any, onChange: any) => {
    if (+e.target.value > 23) {
      onChange("23");
      return;
    }
    if (+e.target.value < 0) {
      onChange("00");
      return;
    }
    onChange(e.target.value);
  };

  const onChangeHandlerMm = (e: any, onChange: any) => {
    if (+e.target.value > 59) {
      onChange("59");
      return;
    }
    if (+e.target.value < 0) {
      onChange("00");
      return;
    }
    onChange(e.target.value);
  };

  return (
    <div className={s.InputTimeWrapper}>
      {title && <span className={s.inputTitle}>{title}</span>}
      <div className={s.InputTime}>
        <div className={classNames(s.hour, s.timeBox)}>
          <input
            type="text"
            placeholder={"00"}
            inputMode="numeric"
            maxLength={2}
            value={valueHh}
            onKeyPress={validate}
            onChange={(e) => onChangeHandlerHh(e, onChangeHh)}
            onBlur={onBlurHh}
            {...otherProps}
          />
          <span className={s.title}>Hour</span>
        </div>
        <div className={s.delimiter}>:</div>
        <div className={classNames(s.hour, s.timeBox)}>
          <input
            type="text"
            placeholder={"00"}
            maxLength={2}
            onKeyPress={validate}
            inputMode="numeric"
            onChange={(e) => onChangeHandlerMm(e, onChangeMm)}
            value={valueMm}
            onBlur={onBlurMm}
            {...otherProps}
          />
          <span className={s.title}>Minute</span>
        </div>
      </div>
    </div>
  );
};
